document.addEventListener("DOMContentLoaded", () => {
  const platforms = ["youtube", "instagram", "facebook"];
  const additionalOptions = [
    "youtube-hide-channel",
    "youtube-hide-title",
    "youtube-hide-description",
    "youtube-hide-track",
    "youtube-hide-search-button",
    "facebook-autounmute",
  ];

  const allKeys = [...platforms, ...additionalOptions];

  chrome.storage.sync.get(allKeys, (settings) => {
    // Main platform toggles
    platforms.forEach((platform) => {
      const toggle = document.getElementById(`${platform}-toggle`);
      const isEnabled = settings[platform] !== false; // default: true
      toggle.checked = isEnabled;

      toggle.addEventListener("change", () => {
        chrome.storage.sync.set({ [platform]: toggle.checked });
      });
    });

    const optionDefaults = {
      "youtube-hide-channel": false,
      "youtube-hide-title": false,
      "youtube-hide-description": true,
      "youtube-hide-track": true,
      "youtube-hide-search-button": true,
      'facebook-autounmute': false,
    };

    additionalOptions.forEach((key) => {
      const checkbox = document.getElementById(key);
      const isChecked =
        settings[key] !== undefined ? settings[key] : optionDefaults[key];
      checkbox.checked = isChecked;

      checkbox.addEventListener("change", () => {
        chrome.storage.sync.set({ [key]: checkbox.checked });
      });
    });
  });
});

const notes = {
  instagram: `
    <strong>Instagram</strong><br/><br/>
    - Instagram has a pretty clean video interface, so we only add the native video controls.
  `,
  youtube: `
    <strong>YouTube Shorts</strong><br/><br/>
    - YouTube does have its own progress bar, but it's proprietary and kept out of view and so it doesn't allow the user to tell the length of the video at a glance.<br/><br/>
    - YouTube Shorts interface is crazy cluttered, so we have some options to remove most elements from view.
  `,
  facebook: `
    <strong>Facebook Reels</strong><br/><br/>
    - Facebook Reels have a crazy amount of clutter, and also no progress bar or video controls.<br/><br/>
    - Facebook's HTML structure is extremely obfuscated, so we just removed all the clutter and added a progress bar. If anyone wants to add more fine-grained control, PRs are most welcome here!
  `,
  tiktok: `
    <strong>TikTok</strong><br/><br/>
    - TikTok actually has pretty good video control behavior! So we leave it alone. (with the comments open).
  `,
  soliloquy: `
    <strong>Soliloquy Apps</strong><br/><br/>
    Enjoying this extension?<br/><br/>We also built <span class="audio">Audio</span><span class="diary">Diary</span>--a super smart voice-powered journal that's gotten lots of love from its users.<br/><br/><center><a href="https://audiodiary.ai" class="audio-diary-link" target="_blank">Try it out here!</a></center>
  `,
};

document.addEventListener("DOMContentLoaded", () => {
  // Existing setup (platforms array, toggles, etc)...

  // Modal setup
  const modal = document.getElementById("notes-modal");
  const modalBody = document.getElementById("modal-body");
  const modalClose = document.getElementById("modal-close");

  document.querySelectorAll(".modal-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const platform = link.getAttribute("data-platform");
      modalBody.innerHTML = notes[platform] || "No notes available.";
      modal.style.display = "flex";
    });
  });

  modalClose.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});
