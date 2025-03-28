document.addEventListener("DOMContentLoaded", () => {
  const platforms = ["youtube", "instagram", "facebook"];
  const youtubeOptions = [
    "youtube-hide-channel",
    "youtube-hide-title",
    "youtube-hide-description",
    "youtube-hide-track",
    "youtube-hide-search-button",
  ];

  const allKeys = [...platforms, ...youtubeOptions];

  chrome.storage.sync.get(allKeys, (settings) => {
    platforms.forEach((platform) => {
      const toggle = document.getElementById(`${platform}-toggle`);
      const message = document.getElementById(`${platform}-message`);

      // Default to true
      const isEnabled = settings[platform] !== false;
      toggle.checked = isEnabled;

      toggle.addEventListener("change", () => {
        const enabled = toggle.checked;
        chrome.storage.sync.set({ [platform]: enabled });
        message.style.display = enabled ? "none" : "block";

        if (platform === "youtube") {
          document.getElementById("youtube-suboptions").style.display = enabled
            ? "block"
            : "none";
        }
      });

      message.style.display = isEnabled ? "none" : "block";

      if (platform === "youtube") {
        document.getElementById("youtube-suboptions").style.display = isEnabled
          ? "block"
          : "none";
      }
    });

    youtubeOptions.forEach((key) => {
      const checkbox = document.getElementById(key);
      const isEnabled = settings[key] !== false;
      checkbox.checked = isEnabled;

      checkbox.addEventListener("change", () => {
        chrome.storage.sync.set({ [key]: checkbox.checked });
      });
    });
  });
});
