console.log("Content script loaded!");

const modifyInstagramUI = () => {
  if (!window.location.hostname.includes("instagram.com")) return;

  document.querySelectorAll('[aria-label="Play"]').forEach((element) => {
    if (element.parentElement?.parentElement) {
      element.parentElement.parentElement.remove();
    }
  });

  document
    .querySelectorAll('[data-visualcompletion="ignore"]')
    .forEach((element) => {
      element.remove();
    });

  document.querySelectorAll("video").forEach((element) => {
    element.controls = true;
    element.controlsList = "nofullscreen";
    element.loop = true;
    element.muted = false;
    element.onmouseup = () => {
      element.muted = false;
    };
    element.onseeked = () => {
      element.muted = false;
    };
    element.onended = () => {
      element.muted = false;
    };
    element.onclick = () => {
      if (element.paused) {
        element.play();
      } else {
        element.pause();
      }
    };
  });

  document.addEventListener(
    "visibilitychange",
    (event) => {
      event.stopImmediatePropagation();
    },
    true
  );
};

window.onload = () => {
  setInterval(modifyInstagramUI, 500);
};
