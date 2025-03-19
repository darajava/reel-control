document.getElementById("changeColor").addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: modifyHeader,
  });
});

function modifyHeader() {
  let header = document.querySelector("header");
  if (header) {
    header.style.backgroundColor = "blue";
  }
}
