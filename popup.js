document.addEventListener('DOMContentLoaded', () => {
    const otpContainer = document.getElementById('otp-container');
    const refreshButton = document.getElementById('refresh');
    const clearButton = document.getElementById('clear');

    function renderOTPs(otps) {
        otpContainer.innerHTML = '';
        if (otps.length === 0) {
            otpContainer.innerHTML = '<p>No OTP Messages Available</p>';
            return;
        }
        otps.forEach(({ otp, source, timestamp }) => {
            const card = document.createElement('div');
            card.className = 'bg-white p-4 rounded shadow';
            card.innerHTML = `<p>OTP: ${otp}</p><p>Source: <a href="${source}" target="_blank">${source}</a></p><p>Time: ${new Date(timestamp).toLocaleString()}</p>`;
            otpContainer.appendChild(card);
        });
    }

    function fetchOTPs() {
        chrome.storage.local.get(['otps'], (result) => {
            const otps = result.otps || [];
            renderOTPs(otps);
        });
    }

    refreshButton.addEventListener('click', fetchOTPs);
    clearButton.addEventListener('click', () => {
        chrome.storage.local.clear(() => {
            otpContainer.innerHTML = '<p>No OTP Messages Available</p>';
        });
    });

    fetchOTPs();
});