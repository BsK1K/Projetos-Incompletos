// ============================================================
// MAGIS AUTOSEP — popup.js v1.1
// Injeta o content script diretamente para funcionar em file://
// ============================================================

'use strict';

let isRunning = false;
let shouldStop = false;
let currentKeywordIndex = 0;
let keywords = [];
let confirmResolve = null;

const $ = id => document.getElementById(id);

const keywordsInput      = $('keywordsInput');
const delayInput         = $('delayInput');
const timeoutInput       = $('timeoutInput');
const safeModeToggle     = $('safeModeToggle');
const confirmPrintToggle = $('confirmPrintToggle');
const btnStart           = $('btnStart');
const btnStop            = $('btnStop');
const statusDot          = $('statusDot');
const progressSection    = $('progressSection');
const progressText       = $('progressText');
const progressPct        = $('progressPct');
const progressFill       = $('progressFill');
const currentKwDisplay   = $('currentKwDisplay');
const currentKwText      = $('currentKwText');
const logArea            = $('logArea');
const confirmOverlay     = $('confirmOverlay');
const confirmIcon        = $('confirmIcon');
const confirmTitle       = $('confirmTitle');
const confirmKw          = $('confirmKw');
const confirmAction      = $('confirmAction');
const btnConfirm         = $('btnConfirm');
const btnSkip            = $('btnSkip');
const btnCancelStep      = $('btnCancelStep');

// ── LOG ────────────────────────────────────────────────────
function addLog(type, msg) {
  const entry = document.createElement('div');
  entry.className = 'log-entry ' + type;
  const now = new Date().toTimeString().slice(0, 8);
  const icons = { success: '✓', error: '✗', info: '→', warn: '!', action: '⚡' };
  entry.innerHTML = '<span class="log-time">' + now + '</span><span class="log-status">' + (icons[type]||'·') + '</span><span class="log-msg">' + msg + '</span>';
  logArea.prepend(entry);
  const entries = logArea.querySelectorAll('.log-entry');
  if (entries.length > 80) entries[entries.length - 1].remove();
}

$('btnClearLog').addEventListener('click', () => { logArea.innerHTML = ''; });

function updateProgress(index, total) {
  if (total === 0) return;
  const pct = Math.round((index / total) * 100);
  progressText.textContent = index + ' / ' + total;
  progressPct.textContent  = pct + '%';
  progressFill.style.width = pct + '%';
}

function setCurrentKw(kw) {
  if (kw) {
    currentKwDisplay.style.display = 'flex';
    currentKwText.textContent = '"' + kw + '"';
  } else {
    currentKwDisplay.style.display = 'none';
  }
}

function setStatus(state) {
  statusDot.className = 'status-dot ' + state;
}

// ── CONFIRM MODAL ──────────────────────────────────────────
function askConfirm(icon, title, kw, action) {
  return new Promise(resolve => {
    confirmIcon.textContent   = icon;
    confirmTitle.textContent  = title;
    confirmKw.textContent     = kw ? '"' + kw + '"' : '';
    confirmAction.textContent = action;
    confirmOverlay.classList.add('open');
    confirmResolve = resolve;
  });
}

btnConfirm.addEventListener('click', () => {
  confirmOverlay.classList.remove('open');
  if (confirmResolve) { confirmResolve('confirm'); confirmResolve = null; }
});
btnSkip.addEventListener('click', () => {
  confirmOverlay.classList.remove('open');
  if (confirmResolve) { confirmResolve('skip'); confirmResolve = null; }
});
btnCancelStep.addEventListener('click', () => {
  confirmOverlay.classList.remove('open');
  if (confirmResolve) { confirmResolve('cancel'); confirmResolve = null; }
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getActiveTab() {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tabs[0]) throw new Error('Nenhuma aba ativa encontrada. Clique na aba do simulador primeiro.');
  return tabs[0];
}

// ── EXECUTE FUNCTION DIRECTLY IN PAGE ─────────────────────
// Serializa a função e executa no contexto da página via executeScript
async function execInPage(tabId, func, args) {
  args = args || [];
  const results = await chrome.scripting.executeScript({
    target: { tabId: tabId },
    func: func,
    args: args,
  });
  return results[0] ? results[0].result : null;
}

// ── PAGE FUNCTIONS (executadas no contexto da página) ──────
function pageSetSearch(value) {
  var el = document.querySelector('[data-automation="search-input"]');
  if (!el) return { success: false, error: 'Campo de busca não encontrado' };
  el.value = value;
  el.dispatchEvent(new Event('input', { bubbles: true }));
  return { success: true };
}

function pageClickSearch() {
  if (window.MagisAPI) { window.MagisAPI.clickSearch(); return { success: true }; }
  var el = document.querySelector('[data-automation="search-btn"]');
  if (!el) return { success: false, error: 'Botão buscar não encontrado' };
  el.click();
  return { success: true };
}

function pageSelectAll() {
  if (window.MagisAPI) {
    window.MagisAPI.selectAll();
    var stats = window.MagisAPI.getStats();
    return { success: true, count: stats.filtered };
  }
  var cb = document.querySelector('[data-automation="check-all"]');
  if (!cb) return { success: false, error: 'Checkbox não encontrado' };
  if (!cb.checked) { cb.checked = true; cb.dispatchEvent(new Event('change', { bubbles: true })); }
  return { success: true, count: document.querySelectorAll('.row-check:checked').length };
}

function pageClickPrint() {
  if (window.MagisAPI) {
    var stats = window.MagisAPI.getStats();
    if (stats.selected === 0) return { success: false, error: 'Nenhum item selecionado' };
    window.MagisAPI.clickPrint();
    return { success: true };
  }
  var el = document.querySelector('[data-automation="print-btn"]');
  if (!el || el.disabled) return { success: false, error: 'Botão imprimir não disponível' };
  el.click();
  return { success: true };
}

function pageConfirmPrint() {
  if (window.MagisAPI) { window.MagisAPI.confirmPrint(); return { success: true }; }
  var el = document.querySelector('#btnConfirmPrint');
  if (!el) return { success: false, error: 'Botão confirmar impressão não encontrado' };
  el.click();
  return { success: true };
}

function pageGetStats() {
  if (window.MagisAPI) return window.MagisAPI.getStats();
  return {
    total: 0, filtered: 0,
    selected: document.querySelectorAll('.row-check:checked').length,
    currentSearch: (document.querySelector('[data-automation="search-input"]') || {}).value || '',
  };
}

function pagePluginLog(type, action, msg) {
  if (window.MagisAPI) window.MagisAPI.pluginLog(type, action, msg);
  return { success: true };
}

// ── SAFE STEP ──────────────────────────────────────────────
async function safeStep(icon, title, kw, description, fn) {
  if (safeModeToggle.checked) {
    const result = await askConfirm(icon, title, kw, description);
    if (result === 'cancel') { addLog('warn', 'Cancelado: ' + title); shouldStop = true; return false; }
    if (result === 'skip')   { addLog('warn', 'Pulado: ' + title); return 'skipped'; }
  }
  await fn();
  return true;
}

// ── MAIN LOOP ──────────────────────────────────────────────
async function runAutomation() {
  const delay = parseInt(delayInput.value) || 2000;
  const tab = await getActiveTab();
  const tabId = tab.id;

  addLog('info', 'Conectado: ' + (tab.url || '').slice(0, 55) + '...');

  for (let i = 0; i < keywords.length; i++) {
    if (shouldStop) break;

    const kw = keywords[i];
    currentKeywordIndex = i;
    setCurrentKw(kw);
    updateProgress(i, keywords.length);
    addLog('info', '── Keyword ' + (i+1) + '/' + keywords.length + ': "' + kw + '"');

    // STEP 1: Digitar
    const step1 = await safeStep('⌨️', 'Digitar Palavra-Chave', kw, 'Inserir "' + kw + '" no campo de busca', async () => {
      const res = await execInPage(tabId, pageSetSearch, [kw]);
      if (!res || !res.success) throw new Error((res && res.error) || 'Falha ao preencher busca');
      addLog('action', 'Campo preenchido: "' + kw + '"');
      await execInPage(tabId, pagePluginLog, ['info', 'PLUGIN', 'Digitando: "' + kw + '"']);
    });
    if (step1 === false || shouldStop) break;
    await sleep(Math.floor(delay / 4));

    // STEP 2: Buscar
    if (step1 !== 'skipped') {
      const step2 = await safeStep('🔍', 'Executar Busca', kw, 'Clicar em "Buscar"', async () => {
        const res = await execInPage(tabId, pageClickSearch);
        if (!res || !res.success) throw new Error((res && res.error) || 'Falha ao buscar');
        addLog('action', 'Busca executada: "' + kw + '"');
        await execInPage(tabId, pagePluginLog, ['search', 'PLUGIN', 'Busca: "' + kw + '"']);
      });
      if (step2 === false || shouldStop) break;
      await sleep(Math.floor(delay / 2));
    }

    // STEP 3: Selecionar todos
    const step3 = await safeStep('☑️', 'Selecionar Todos', kw, 'Marcar todos os pedidos filtrados', async () => {
      const res = await execInPage(tabId, pageSelectAll);
      if (!res || !res.success) throw new Error((res && res.error) || 'Falha ao selecionar');
      addLog('success', (res.count || 0) + ' pedidos selecionados');
      await execInPage(tabId, pagePluginLog, ['select', 'PLUGIN', 'Selecionados: ' + (res.count||0) + ' — "' + kw + '"']);
    });
    if (step3 === false || shouldStop) break;
    await sleep(Math.floor(delay / 4));

    // STEP 4: Imprimir
    const stats = await execInPage(tabId, pageGetStats);
    const selectedCount = (stats && stats.selected) || 0;

    if (selectedCount > 0) {
      const step4 = await safeStep('🖨️', 'Imprimir Etiquetas', kw, 'Enviar ' + selectedCount + ' etiqueta(s) para impressão', async () => {
        const res = await execInPage(tabId, pageClickPrint);
        if (!res || !res.success) throw new Error((res && res.error) || 'Falha ao imprimir');
        addLog('action', 'Modal aberto (' + selectedCount + ' etiquetas)');
        await sleep(500);
      });
      if (step4 === false || shouldStop) break;

      if (step4 !== 'skipped') {
        const step4b = await safeStep('✅', 'Confirmar Impressão', kw, 'Clicar em "Confirmar Impressão" no modal', async () => {
          const res = await execInPage(tabId, pageConfirmPrint);
          if (!res || !res.success) throw new Error((res && res.error) || 'Falha ao confirmar');
          addLog('success', '✓ Impresso: "' + kw + '" (' + selectedCount + ' etiquetas)');
          await execInPage(tabId, pagePluginLog, ['print', 'PLUGIN', 'Impresso: ' + selectedCount + ' — "' + kw + '"']);
        });
        if (step4b === false || shouldStop) break;
      }
    } else {
      addLog('warn', 'Sem pedidos para "' + kw + '", impressão ignorada');
    }

    if (i < keywords.length - 1 && !shouldStop) {
      addLog('info', 'Aguardando ' + delay + 'ms...');
      await sleep(delay);
    }
  }

  if (!shouldStop) {
    updateProgress(keywords.length, keywords.length);
    addLog('success', '✓ Concluído! ' + keywords.length + ' keyword(s) processada(s).');
  } else {
    addLog('warn', '⏹ Interrompido');
  }

  stopAutomation();
}

// ── START / STOP ───────────────────────────────────────────
function startAutomation() {
  const raw = keywordsInput.value.trim();
  if (!raw) { addLog('error', 'Informe pelo menos uma palavra-chave!'); return; }
  keywords = raw.split('\n').map(k => k.trim()).filter(Boolean);
  if (!keywords.length) { addLog('error', 'Nenhuma keyword válida'); return; }

  isRunning = true; shouldStop = false; currentKeywordIndex = 0;
  btnStart.disabled = true; btnStop.disabled = false;
  setStatus('running');
  progressSection.classList.add('visible');
  updateProgress(0, keywords.length);
  addLog('info', '▶ ' + keywords.length + ' keyword(s) | delay: ' + delayInput.value + 'ms | Modo Seguro: ' + (safeModeToggle.checked ? 'ON' : 'OFF'));

  runAutomation().catch(err => {
    addLog('error', 'Erro: ' + err.message);
    stopAutomation();
  });
}

function stopAutomation() {
  isRunning = false; shouldStop = true;
  btnStart.disabled = false; btnStop.disabled = true;
  setStatus(''); setCurrentKw(null);
  confirmOverlay.classList.remove('open');
  if (confirmResolve) { confirmResolve('cancel'); confirmResolve = null; }
}

btnStart.addEventListener('click', () => { if (!isRunning) startAutomation(); });
btnStop.addEventListener('click', () => { shouldStop = true; addLog('warn', 'Interrompendo...'); btnStop.disabled = true; });

// ── SETTINGS ───────────────────────────────────────────────
function saveSettings() {
  chrome.storage.local.set({ keywords: keywordsInput.value, delay: delayInput.value, timeout: timeoutInput.value, safeMode: safeModeToggle.checked, confirmPrint: confirmPrintToggle.checked });
}
function loadSettings() {
  chrome.storage.local.get(['keywords','delay','timeout','safeMode','confirmPrint'], function(data) {
    if (data.keywords) keywordsInput.value = data.keywords;
    if (data.delay)    delayInput.value    = data.delay;
    if (data.timeout)  timeoutInput.value  = data.timeout;
    if (data.safeMode     !== undefined) safeModeToggle.checked    = data.safeMode;
    if (data.confirmPrint !== undefined) confirmPrintToggle.checked = data.confirmPrint;
  });
}
[keywordsInput, delayInput, timeoutInput, safeModeToggle, confirmPrintToggle].forEach(function(el) { el.addEventListener('change', saveSettings); });

loadSettings();
addLog('info', 'Plugin pronto. Abra o simulador e clique em Iniciar.');
