console.log("Content script loaded!");

const modifyInstagramUI = () => {
  chrome.storage.sync.get("instagram", ({ instagram }) => {
    if (instagram === false) return;
    if (!window.location.hostname.includes("instagram.com")) return;

    document.querySelectorAll('[aria-label="Play"]').forEach((element) => {
      if (element.parentElement?.parentElement) {
        element.parentElement.parentElement.style.display = "none";
      }
    });

    document
      .querySelectorAll('[data-visualcompletion="ignore"]')
      .forEach((element) => (element.style.display = "none"));

    document.querySelectorAll("video").forEach((element) => {
      element.controls = true;
      element.controlsList = "nofullscreen";
      element.loop = true;
      element.muted = false;
      element.onmouseup = () => (element.muted = false);
      element.onseeked = () => (element.muted = false);
      element.onended = () => (element.muted = false);
      element.onclick = () =>
        element.paused ? element.play() : element.pause();
    });

    document.addEventListener(
      "visibilitychange",
      (event) => {
        event.stopImmediatePropagation();
      },
      true
    );
  });
};

const modifyFacebookUI = () => {
  chrome.storage.sync.get("facebook", ({ facebook }) => {
    if (facebook === false) return;
    if (!window.location.hostname.includes("facebook.com")) return;

    document
      .querySelectorAll(
        "[data-visualcompletion='ignore-dynamic'] .__fb-dark-mode"
      )
      .forEach((element) => (element.style.display = "none"));

    document.querySelectorAll("video").forEach((video) => {
      video.controls = true;
      video.loop = true;
      video.controlsList = "nofullscreen";
      try {
        video.muted = false;
      } catch (error) {
        console.log(error);
      }

      video.onmouseup = () => (video.muted = false);

      video.onseeking = (e) => {
        e.preventDefault();
        setTimeout(() => {
          video.blur();
          document.querySelector('[role="main"]')?.click();
          console.log("blur");
        }, 100);
      };

      video.onseeked = () => (video.muted = false);
      video.onended = () => (video.muted = false);

      const parent = video.parentElement;
      if (parent) {
        Array.from(parent.children).forEach((sibling) => {
          if (sibling !== video && sibling.hasAttribute("data-instancekey")) {
            sibling.style.display = "none";
          }
        });
      }
    });
  });
};

const modifyYoutubeUI = () => {
  chrome.storage.sync.get("youtube", ({ youtube }) => {
    console.log("youtube is ", youtube);
    let modifyUI = true;

    if (youtube === false) {
      modifyUI = false;
    }

    if (!window.location.hostname.includes("youtube.com")) return;

    if (!window.location.pathname.includes("shorts")) {
      document.querySelectorAll("video").forEach((video) => {
        video.controls = false;
      });
      return;
    }

    // The controls at the top
    document.querySelectorAll("ytd-shorts-player-controls").forEach((el) => {
      el.style.display = modifyUI ? "none" : "flex";
    });

    // The red progress bar at the bottom
    document
      .querySelectorAll("yt-progress-bar")
      .forEach((el) => (el.style.display = modifyUI ? "none" : "block"));

    // The track on the video
    document
      .querySelectorAll("reel-sound-metadata-view-model")
      .forEach((el) => {
        el.style.display = modifyUI ? "none" : "block";
        el.style.border = "1px solid red";
      });

    // Weird suggested search for a given video?
    document
      .querySelectorAll("yt-shorts-suggested-action-view-model")
      .forEach((el) => (el.style.display = modifyUI ? "none" : "block"));

    // The title/description/user-handle of the video
    document.querySelectorAll("yt-reel-metapanel-view-model").forEach((el) => {
      el.parentElement.parentElement.style.pointerEvents = modifyUI
        ? "none"
        : "all";
      el.style.pointerEvents = modifyUI ? "none" : "all";
    });

    // The title of the video
    document
      .querySelectorAll("yt-shorts-video-title-view-model")
      .forEach((el) => {});

    // The channel of the video
    document
      .querySelectorAll("yt-reel-channel-bar-view-model")
      .forEach((el) => {});

    document
      .querySelectorAll(".metadata-container.ytd-reel-player-overlay-renderer")
      .forEach((el) => {
        if (modifyUI) {
          el.style.position = "relative";
          el.style.bottom = "40px";
          el.style.backgroundImage = "none";
        } else {
          el.style.position = "initial";
          el.style.bottom = "initial";
          el.style.backgroundImage = "initial";
        }
      });

    document.querySelectorAll("video").forEach((video) => {
      video.controls = modifyUI ? true : false;
      if (video.attributes["data-no-fullscreen"]) {
        video.attributes["data-no-fullscreen"].value = "false";
      }
      video.style.objectFit = "contain";
    });

    document
      .querySelectorAll("yt-reel-channel-bar-view-model")
      .forEach((el) => (el.style.pointerEvents = "all"));
  });
};

const modifyTikTokUI = () => {
  chrome.storage.sync.get("tiktok", ({ tiktok }) => {
    if (tiktok === false) return;
    if (!window.location.hostname.includes("tiktok.com")) return;
    // Add TikTok-specific logic here
  });
};

window.onload = () => {
  setInterval(modifyInstagramUI, 500);
  setInterval(modifyFacebookUI, 500);
  setInterval(modifyYoutubeUI, 500);
  setInterval(modifyTikTokUI, 500);
};
