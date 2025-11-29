function addScrollButton() {
  if (document.getElementById('ai-studio-scroll-btn')) return;

  const chatContent = document.querySelector('.chat-session-content');

  if (chatContent) {
    const btn = document.createElement('button');
    btn.id = 'ai-studio-scroll-btn';
    btn.innerText = '⬇ Scroll to Bottom';

    btn.addEventListener('click', () => {
      const scroller = document.querySelector('ms-autoscroll-container');
      if (scroller) {
        // Method 1: Scroll to a ridiculously high number to force the browser to hit the limit
        const forceBottom = 9999999;

        scroller.scrollTo({
          top: forceBottom,
          behavior: 'smooth'
        });

        // Method 2: The "Double Tap"
        // Sometimes smooth scrolling decelerates too early.
        // We wait 500ms and force it again to ensure it hits the absolute floor.
        setTimeout(() => {
            scroller.scrollTop = forceBottom;
        }, 500);
      }
    });

    chatContent.insertBefore(btn, chatContent.firstChild);
  }
}

const observer = new MutationObserver((mutations) => {
  addScrollButton();
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});