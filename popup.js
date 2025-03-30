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
    // Main platform toggles
    platforms.forEach((platform) => {
      const toggle = document.getElementById(`${platform}-toggle`);
      const isEnabled = settings[platform] !== false; // default: true
      toggle.checked = isEnabled;

      toggle.addEventListener("change", () => {
        chrome.storage.sync.set({ [platform]: toggle.checked });
      });
    });

    // YouTube sub-options
    youtubeOptions.forEach((key) => {
      const checkbox = document.getElementById(key);
      const isChecked = settings[key] !== false; // default: true
      checkbox.checked = isChecked;

      checkbox.addEventListener("change", () => {
        chrome.storage.sync.set({ [key]: checkbox.checked });
      });
    });
  });
});

const notes = {
  youtube: `
    <strong>YouTube</strong><br/><br/>
    - YouTube does have its own seek bar, but it's kept out of view and it doesn't allow the user to tell the length of the video at a glance.<br/><br/>
    - YouTube Shorts interface is crazy cluttered, so we have some options to remove most elements from view.<br/><br/>
    - The seek bar doesn't work perfectly--you can't "drag" it, but I think it is a lot better than YouTube's default one. (PRs are very welcome here)
  `,
  instagram: `
    <strong>Instagram</strong><br/><br/>
    - Instagram has a pretty clean video interface, so we only add native seeking controls.
  `,
  facebook: `
    <strong>Facebook</strong><br/><br/>
    - Facebook has a crazy amount of clutter on its reels, and also no seeking controls. So kind of the worst of both worlds.<br/><br/>
    - Facebook's HTML structure is extremely obsfuscated, so we just remove all the clutter and added a seek bar. If anyone wants to add more fine-grained control, PRs are most welcome!
  `,
  tiktok: `
    <strong>TikTok</strong><br/><br/>
    - TikTok actually has pretty good seek behavior! (with the comments open).<br/><br/>
    - Shame it's such an terrible platform.
  `,
};

document.addEventListener("DOMContentLoaded", () => {
  // Existing setup (platforms array, toggles, etc)...

  // Modal setup
  const modal = document.getElementById("notes-modal");
  const modalBody = document.getElementById("modal-body");
  const modalClose = document.getElementById("modal-close");

  document.querySelectorAll(".notes-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const platform = link.getAttribute("data-platform");
      modalBody.innerHTML = notes[platform] || "No notes available.";
      modal.style.display = "block";
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
