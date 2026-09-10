document.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "f") {
    if (!document.fullscreenElement)
      document.documentElement.requestFullscreen?.();
    else document.exitFullscreen?.();
  }
  if (e.key.toLowerCase() === "p") {
    window.print();
  }
});

// Enable right-click downloading of background images
window.addEventListener('load', () => {
  document.querySelectorAll('*').forEach(el => {
    const bg = window.getComputedStyle(el).backgroundImage;
    if (bg && bg !== 'none' && bg.includes('url(')) {
      // Don't add to the grain overlay
      if (el.classList.contains('grain')) return;
      
      const url = bg.slice(bg.indexOf('url(') + 4, bg.lastIndexOf(')')).replace(/["']/g, '');
      const img = document.createElement('img');
      img.src = url;
      img.style.position = 'absolute';
      img.style.inset = '0';
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.opacity = '0';
      img.style.cursor = 'context-menu';
      
      // Make sure parent can contain absolute element
      if (window.getComputedStyle(el).position === 'static') {
        el.style.position = 'relative';
      }
      
      el.appendChild(img);
    }
  });
});

// Intersection Observer for scroll animations
document.addEventListener('DOMContentLoaded', () => {
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px', // trigger slightly before it hits the very bottom
    threshold: 0.05
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        // Stop observing once animated in so it doesn't blink or re-trigger
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Select all elements that should animate
  const animatedElements = document.querySelectorAll('.fade-up, .fade-in, .slide, .gc-card, .benefit');
  animatedElements.forEach(el => {
    // Add base fade-up class if it doesn't already have one
    if (!el.classList.contains('fade-up') && !el.classList.contains('fade-in')) {
       el.classList.add('fade-up');
    }
    observer.observe(el);
  });
});
