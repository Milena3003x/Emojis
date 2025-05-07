// ==UserScript==
// @name emoji
// @namespace https://www.bondageprojects.com/
// @version 0.0.1
// @description test enhance chat description
// @author Ayako Qt
// @match https://bondageprojects.elementfx.com/*
// @match https://www.bondageprojects.elementfx.com/*
// @match https://bondage-europe.com/*
// @match https://www.bondage-europe.com/*
// @run-at document-end
// @icon https://www.google.com/s2/favicons?sz=64&domain=elementfx.com
// @grant none
// ==/UserScript==
(function() {
  // Delay a bit until the page’s own scripts have created #chat-room-bot
  setTimeout(() => {
    const script = document.createElement('script');
    script.setAttribute('crossorigin', 'anonymous');
    // cache‑bust so you always get the latest during development:
    script.src = 'https://ayako-qt.github.io/Emojis/js/emojiPicker.js?_=' + Date.now();
    document.head.appendChild(script);
  }, 6000);
})();