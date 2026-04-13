let running = false;

chrome.runtime.onMessage.addListener(async (msg) => {
  if (msg.action === "start") {
    running = true;
    await runAutomation(msg.keywords, msg.delay, msg.safeMode);
  }

  if (msg.action === "stop") {
    running = false;
    alert("Automação parada!");
  }
});

async function runAutomation(keywords, delay, safeMode) {
  for (let word of keywords) {
    if (!running) break;

    log(`Processando: ${word}`);

    if (safeMode) {
      const confirm = window.confirm(`Buscar "${word}"?`);
      if (!confirm) continue;
    }

    await typeSearch(word);
    await sleep(delay);

    if (safeMode) {
      if (!window.confirm("Clicar em buscar?")) continue;
    }

    clickSearch();
    await sleep(delay);

    if (safeMode) {
      if (!window.confirm("Selecionar todos?")) continue;
    }

    selectAll();
    await sleep(delay);

    if (safeMode) {
      if (!window.confirm("Imprimir?")) continue;
    }

    print();
    await sleep(delay);
  }

  log("Finalizado!");
}

function log(text) {
  console.log("[PLUGIN]", text);
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function typeSearch(text) {
  const input = document.querySelector("#busca");
  if (input) input.value = text;
}

//function typeSearch(text) {
//  const input = document.querySelector("input[type='text']");
//  if (input) {
//    input.value = text;
//  }
//}

function clickSearch() {
  const btn = [...document.querySelectorAll("button")]
    .find(b => b.innerText.toLowerCase().includes("buscar"));
  if (btn) btn.click();
}

function selectAll() {
  const checkbox = document.querySelector("input[type='checkbox']");
  if (checkbox) checkbox.click();
}

function print() {
  window.print();
}