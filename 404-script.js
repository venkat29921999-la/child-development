document.addEventListener('DOMContentLoaded', () => {
  const goBackBtn = document.getElementById('goBackBtn');
  goBackBtn.addEventListener('click', () => {
    // If there's a previous page in history, go back to it.
    // Otherwise fall back to the homepage.
    if (document.referrer && document.referrer !== window.location.href) {
      window.history.back();
    } else if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = 'index.html';
    }
  });
});