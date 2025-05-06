(function() {
  'use strict';

  // a simple await，until #chat-room-bot loaded
  function onReady(selector, fn) {
    const el = document.querySelector(selector);
    if (el) return fn(el);
    setTimeout(() => onReady(selector, fn), 200);
  }

  onReady('#chat-room-bot', (container) => {
    // 1. get the container and make sure it uses relative positioning
    if (getComputedStyle(container).position === 'static') {
      container.style.position = 'relative';
    }

    // 2. insert style
    const style = document.createElement('style');
    style.textContent = `
      /* floating round button */
      #chat-room-bot .floating-btn {
        position: absolute;
        top: -50px;
        right: 20px;
        width: 32px; height: 32px;
        border: 1px solid #000;
        border-radius: 50%;
        background: #fff;
        color: #B28CFF;
        cursor: pointer;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 6px rgba(0,0,0,0.15);
        transition: background 0.3s, color 0.3s, box-shadow 0.3s;
      }
      #chat-room-bot .floating-btn:hover {
        background: #32295F;
        color: #C597ED;
        border: 1px solid #C597ED;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
      }
      #chat-room-bot .floating-btn:focus {
        outline: 2px solid rgba(197,151,237,0.6);
        outline-offset: 2px;
      }

      /* Emoji panel */
      #chat-room-bot .emoji-panel {
        position: absolute;
        top: -200px;       /* adjust accordingly */
        right: 120px;
        width: 160px;
        padding: 8px;
        background: #fff;
        border: 1px solid #ccc;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            /* scroll bars */
        max-height: 180px;
        overflow-y: auto;
        overflow-x: hidden;
        display: none;     /* hidden initially */
        grid-template-columns: repeat(4, 1fr);
        gap: 4px;
        z-index: 9998;
      }
      #chat-room-bot .emoji-panel span {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        width: 32px; height: 32px;
        cursor: pointer;
        border-radius: 4px;
        transition: background 0.2s;
      }
      #chat-room-bot .emoji-panel span:hover {
        background: rgba(50, 41, 95, 0.1);
      }
    `;
    document.head.appendChild(style);

    // 3. create and append the floating button
    const btn = document.createElement('button');
    btn.className = 'floating-btn';
    btn.textContent = '😊';
    btn.title = 'Open Emoji Panel';
    container.appendChild(btn);

    // 4. create the Emoji oanel
    const panel = document.createElement('div');
    panel.className = 'emoji-panel';
    // add more emoji later. This is what my sub will work on ^_^  more emojis~
    const emojis = ['😊','😂','❤️','👍','🎉','🥳','😎','😉','😋','😛','😜','🤪','😝','🤑','🤗','🤭','🫢','🫣','🤫','🤔','🫡','🤤','🤠','🥳','🥸','😎','🤓','🧐','🙃','🫠','🤐','🤨','😐','😑','😶','🫥','😶‍🌫️','😒','🙄','😬','😮‍💨','🤥','🫨','🙂‍↔️','🙂‍↕️','😌','😔','😪','😴','😷','🤒','🤕','🤢','🤮','🤧','🥵','🥶','🥴','😵','😵‍💫','🤯','🥱','😕','🫤','😟','🙁','☹️','😮','😯','😲','😳','🥺','🥹','😦','😧','😨','😰','😥','😢','😭','😱','😖','😣','😞','😓','😩','😫','😤','😡','😠','🤬','😈','👿','💀','☠️','💩','🤡','👹','👺','👻','👽','👾','🤖','😺','😸','😹','😻','😼','😽','🙀','😿','😾','🙈','🙉','🙊'];
    emojis.forEach(e => {
      const span = document.createElement('span');
      span.textContent = e;
      span.addEventListener('click', () => {
        insertAtCursor(e);
        togglePanel(false);
      });
      panel.appendChild(span);
    });
    container.appendChild(panel);

    // 5. on-click：toggle the panel between display and hidden
    btn.addEventListener('click', () => {
      togglePanel(panel.style.display !== 'grid');
    });

    // toggle display
    function togglePanel(show) {
      panel.style.display = show ? 'grid' : 'none';
    }

    // insert a cute emoji to the current cursor
    function insertAtCursor(emoji) {
      const input = document.getElementById('InputChat');
      if (!input) return;
      const start = input.selectionStart;
      const end   = input.selectionEnd;
      const val   = input.value;
      input.value = val.slice(0, start) + emoji + val.slice(end);
      const pos = start + emoji.length;
      input.selectionStart = input.selectionEnd = pos;
      input.focus();
    }
  });
})();
