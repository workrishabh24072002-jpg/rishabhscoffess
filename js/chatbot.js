(function () {
  const REPLIES = [
    "Thanks for reaching out! Our single-origin beans are roasted fresh every Monday.",
    "Great question — most orders ship within 1-2 business days.",
    "We offer free shipping on orders over $40 within the US.",
    "Our signature blend pairs really well with oat milk, if you're into that!",
    "You can check your order status from the account page anytime.",
    "Yes, all our coffee is ethically sourced and fair-trade certified.",
    "I can help with that! A human agent will follow up by email if needed.",
    "Our subscription saves 15% and you can pause or cancel anytime.",
  ];
  const GREETING = "Hi! I'm Bean, Rishabh's Coffee assistant. Ask me anything ☕";

  function el(tag, attrs = {}, children = []) {
    const node = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => {
      if (k === 'class') node.className = v;
      else if (k === 'style') node.setAttribute('style', v);
      else if (k.startsWith('on')) node.addEventListener(k.slice(2), v);
      else node.setAttribute(k, v);
    });
    (Array.isArray(children) ? children : [children]).forEach((c) => {
      if (c == null) return;
      node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    });
    return node;
  }

  function buildPanel() {
    const messages = el('div', { class: 'chatbot__messages', id: 'chatbot-messages' });
    const input = el('input', {
      class: 'chatbot__input',
      type: 'text',
      placeholder: 'Type a message…',
      'aria-label': 'Chat message',
    });
    const sendBtn = el('button', { class: 'chatbot__send', type: 'button' }, 'Send');
    const closeBtn = el('button', {
      class: 'chatbot__close',
      type: 'button',
      'aria-label': 'Close chat',
    }, '×');

    const panel = el('div', { class: 'chatbot', id: 'chatbot-panel', role: 'dialog', 'aria-label': 'Chat with us' }, [
      el('div', { class: 'chatbot__header' }, [
        el('div', { class: 'chatbot__title' }, [
          el('span', { class: 'chatbot__dot' }),
          document.createTextNode('Bean · Support'),
        ]),
        closeBtn,
      ]),
      messages,
      el('form', { class: 'chatbot__form', onsubmit: (e) => { e.preventDefault(); send(); } }, [
        input,
        sendBtn,
      ]),
    ]);

    function addMessage(text, who) {
      const m = el('div', { class: `chatbot__msg chatbot__msg--${who}` }, text);
      messages.appendChild(m);
      messages.scrollTop = messages.scrollHeight;
      return m;
    }

    function addTyping() {
      const t = el('div', { class: 'chatbot__msg chatbot__msg--bot chatbot__typing' }, [
        el('span'), el('span'), el('span'),
      ]);
      messages.appendChild(t);
      messages.scrollTop = messages.scrollHeight;
      return t;
    }

    function send() {
      const text = input.value.trim();
      if (!text) return;
      addMessage(text, 'user');
      input.value = '';
      const typing = addTyping();
      const delay = 600 + Math.random() * 700;
      setTimeout(() => {
        typing.remove();
        const reply = REPLIES[Math.floor(Math.random() * REPLIES.length)];
        addMessage(reply, 'bot');
      }, delay);
    }

    sendBtn.addEventListener('click', send);
    closeBtn.addEventListener('click', () => panel.classList.remove('chatbot--open'));

    addMessage(GREETING, 'bot');
    return { panel, input };
  }

  document.addEventListener('DOMContentLoaded', () => {
    const triggers = document.querySelectorAll('.chat-btn');
    if (!triggers.length) return;

    const { panel, input } = buildPanel();
    document.body.appendChild(panel);

    triggers.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        panel.classList.toggle('chatbot--open');
        if (panel.classList.contains('chatbot--open')) {
          setTimeout(() => input.focus(), 50);
        }
      });
    });
  });
})();
