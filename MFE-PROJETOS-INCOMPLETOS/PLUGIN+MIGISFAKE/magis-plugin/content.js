// ============================================================
// MAGIS AUTOSEP — content.js
// Injeta no simulador e executa ações no DOM
// ============================================================

'use strict';

// Seletores dos elementos do simulador (baseados em data-automation)
const SELECTORS = {
  searchInput:  '[data-automation="search-input"]',
  searchBtn:    '[data-automation="search-btn"]',
  checkAll:     '[data-automation="check-all"]',
  printBtn:     '[data-automation="print-btn"]',
  filterLoja:   '[data-automation="filter-loja"]',
  filterDate:   '[data-automation="filter-date"]',
};

// ── UTILITIES ──────────────────────────────────────────────
function getEl(selector) {
  return document.querySelector(selector);
}

function click(selector) {
  const el = getEl(selector);
  if (el) { el.click(); return true; }
  return false;
}

function isSimulatorPage() {
  // Check if MagisAPI is available (injected by simulator)
  return typeof window.MagisAPI !== 'undefined';
}

// ── ACTIONS ────────────────────────────────────────────────

/**
 * Define o valor do campo de busca
 */
function setSearch(value) {
  const el = getEl(SELECTORS.searchInput);
  if (!el) return { success: false, error: 'Campo de busca não encontrado' };
  el.value = value;
  el.dispatchEvent(new Event('input', { bubbles: true }));
  return { success: true };
}

/**
 * Clica no botão Buscar
 */
function clickSearch() {
  if (isSimulatorPage() && window.MagisAPI) {
    window.MagisAPI.clickSearch();
    return { success: true };
  }
  const ok = click(SELECTORS.searchBtn);
  return { success: ok, error: ok ? null : 'Botão de busca não encontrado' };
}

/**
 * Seleciona todos os itens filtrados
 */
function selectAll() {
  if (isSimulatorPage() && window.MagisAPI) {
    window.MagisAPI.selectAll();
    const stats = window.MagisAPI.getStats();
    return { success: true, count: stats.filtered };
  }

  const checkAll = getEl(SELECTORS.checkAll);
  if (!checkAll) return { success: false, error: 'Checkbox "Selecionar todos" não encontrado' };

  if (!checkAll.checked) {
    checkAll.checked = true;
    checkAll.dispatchEvent(new Event('change', { bubbles: true }));
  }
  return { success: true, count: document.querySelectorAll('.row-check:checked').length };
}

/**
 * Clica no botão Imprimir
 */
function clickPrint() {
  if (isSimulatorPage() && window.MagisAPI) {
    const stats = window.MagisAPI.getStats();
    if (stats.selected === 0) return { success: false, error: 'Nenhum item selecionado' };
    window.MagisAPI.clickPrint();
    return { success: true };
  }

  const ok = click(SELECTORS.printBtn);
  return { success: ok, error: ok ? null : 'Botão de impressão não encontrado ou desabilitado' };
}

/**
 * Confirma impressão no modal
 */
function confirmPrint() {
  if (isSimulatorPage() && window.MagisAPI) {
    window.MagisAPI.confirmPrint();
    return { success: true };
  }

  // Fallback: procurar botão de confirmação de impressão
  const confirmBtn = document.querySelector('#btnConfirmPrint');
  if (confirmBtn && confirmBtn.offsetParent !== null) {
    confirmBtn.click();
    return { success: true };
  }
  return { success: false, error: 'Modal de confirmação não encontrado' };
}

/**
 * Retorna estatísticas atuais
 */
function getStats() {
  if (isSimulatorPage() && window.MagisAPI) {
    return window.MagisAPI.getStats();
  }
  return {
    total: 0,
    filtered: 0,
    selected: document.querySelectorAll('.row-check:checked').length,
    currentSearch: getEl(SELECTORS.searchInput)?.value || '',
  };
}

/**
 * Envia log para o simulador
 */
function pluginLog(type, action, msg) {
  if (isSimulatorPage() && window.MagisAPI) {
    window.MagisAPI.pluginLog(type, action, msg);
  }
}

// ── MESSAGE LISTENER ───────────────────────────────────────
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  let result;

  try {
    switch (message.action) {
      case 'SET_SEARCH':
        result = setSearch(message.value);
        break;

      case 'CLICK_SEARCH':
        result = clickSearch();
        break;

      case 'SELECT_ALL':
        result = selectAll();
        break;

      case 'CLICK_PRINT':
        result = clickPrint();
        break;

      case 'CONFIRM_PRINT':
        result = confirmPrint();
        break;

      case 'GET_STATS':
        result = getStats();
        break;

      case 'PLUGIN_LOG':
        pluginLog(message.type, message.action_label || message.action, message.msg);
        result = { success: true };
        break;

      case 'PING':
        result = {
          success: true,
          isSimulator: isSimulatorPage(),
          url: window.location.href,
        };
        break;

      default:
        result = { success: false, error: `Ação desconhecida: ${message.action}` };
    }
  } catch (err) {
    result = { success: false, error: err.message };
    console.error('[MagisAutoSep] Erro:', err);
  }

  sendResponse(result);
  return true; // Keep message channel open for async
});

console.log('[MagisAutoSep] Content script carregado em:', window.location.href);
