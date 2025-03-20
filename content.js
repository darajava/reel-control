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

const modifyFacebookUI = () => {
  if (!window.location.hostname.includes("facebook.com")) return;
};

const modifyYoutubeUI = () => {
  console.log(
    "window.location.hostname!!!",
    window.location.hostname,
    window.location.pathname
  );
  if (!window.location.hostname.includes("youtube.com")) return;
  if (!window.location.pathname.includes("shorts")) {
    document.querySelectorAll("video").forEach((video) => {
      video.controls = false;
    });
  }

  // ytd-shorts-player-controls

  document.querySelectorAll("ytd-shorts-player-controls").forEach((element) => {
    element.remove();
  });

  // yt-progress-bar

  document.querySelectorAll("yt-progress-bar").forEach((element) => {
    element.remove();
  });

  // reel-sound-metadata-view-model

  document
    .querySelectorAll("reel-sound-metadata-view-model")
    .forEach((element) => {
      element.remove();
    });

  // yt-shorts-suggested-action-view-model

  document
    .querySelectorAll("yt-shorts-suggested-action-view-model")
    .forEach((element) => {
      element.remove();
    });

  // yt-shorts-video-title-view-model

  document
    .querySelectorAll("yt-shorts-video-title-view-model")
    .forEach((element) => {
      element.remove();
    });

  // yt-reel-multi-format-link-view-model

  document
    .querySelectorAll("yt-reel-multi-format-link-view-model")
    .forEach((element) => {
      element.remove();
    });

  // yt-reel-metapanel-view-model

  document
    .querySelectorAll("yt-reel-metapanel-view-model")
    .forEach((element) => {
      element.parentElement.parentElement.parentElement.style.position =
        "relative";
      element.parentElement.parentElement.parentElement.style.bottom = "30px";

      element.parentElement.parentElement.style.pointerEvents = "none";

      element.style.pointerEvents = "none";
      element.style.opacity = "0.8";
    });

  // .metadata-container.ytd-reel-player-overlay-renderer

  document
    .querySelectorAll(".metadata-container.ytd-reel-player-overlay-renderer")
    .forEach((element) => {
      element.style.position = "relative";
      element.style.bottom = "30px";
      element.style.backgroundImage = "none";
    });

  document.querySelectorAll("video").forEach((video) => {
    video.controls = true;
    if (video.attributes["data-no-fullscreen"]) {
      video.attributes["data-no-fullscreen"].value = "false";
    }
    video.style.objectFit = "contain";
  });

  // yt-subscribe-button-view-model

  document
    .querySelectorAll("yt-subscribe-button-view-model")
    .forEach((element) => {
      element.style.pointerEvents = "all";
    });
};

const modifyTikTokUI = () => {
  if (!window.location.hostname.includes("tiktok.com")) return;
};

window.onload = () => {
  setInterval(modifyInstagramUI, 500);
  setInterval(modifyFacebookUI, 500);
  setInterval(modifyYoutubeUI, 500);
  setInterval(modifyTikTokUI, 500);
};
