let running = false;

document.getElementById("start").onclick = async () => {
  const keywords = document.getElementById("keywords").value.split("\n");
  const delay = parseInt(document.getElementById("delay").value);
  const safeMode = document.getElementById("safeMode").checked;

  running = true;

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.tabs.sendMessage(tab.id, {
    action: "start",
    keywords,
    delay,
    safeMode
  });
};

document.getElementById("stop").onclick = async () => {
  running = false;

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.tabs.sendMessage(tab.id, {
    action: "stop"
  });
};