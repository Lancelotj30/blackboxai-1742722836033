const otpRegex = /\b\d{4,6}\b/;

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'childList') {
      const textNodes = Array.from(mutation.addedNodes).filter(node => node.nodeType === Node.TEXT_NODE);
      textNodes.forEach(node => {
        const match = otpRegex.exec(node.textContent);
        if (match) {
          const otp = match[0];
          chrome.runtime.sendMessage({ otp, source: document.location.href, timestamp: Date.now() });
        }
      });
    }
  });
});

observer.observe(document.body, { childList: true, subtree: true });