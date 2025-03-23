chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  try {
    const { otp, source, timestamp } = message;
    if (otp && source && timestamp) {
      chrome.storage.local.get(['otps'], (result) => {
        const otps = result.otps || [];
        otps.push({ otp, source, timestamp });
        chrome.storage.local.set({ otps }, () => {
          chrome.notifications.create({
            type: 'basic',
            iconUrl: 'https://images.unsplash.com/photo-1564866657317-0a45e9f7c31a',
            title: 'New OTP Detected',
            message: `OTP: ${otp} from ${source}`,
          });
        });
      });
    }
  } catch (error) {
    console.error('Error processing OTP message:', error);
  }
});