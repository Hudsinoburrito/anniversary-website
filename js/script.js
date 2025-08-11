// js/script.js - timeline + sprite + transition logic

// Put sprites across the page in random-ish positions
(function placeSprites() {
  const layer = document.getElementById('sprite-layer');
  if (!layer) return;

  const spriteFiles = [
    'images/heart1.png',
    'images/heart2.png',
    'images/sparkle.png',
    'images/star.png'
  ];

  // create 10 decorative sprites
  for (let i = 0; i < 10; i++) {
    const img = document.createElement('img');
    img.src = spriteFiles[i % spriteFiles.length];
    img.className = 'sprite';
    // random-ish positions but not off-screen
    img.style.left = (5 + Math.random() * 85) + 'vw';
    img.style.top = (5 + Math.random() * 80) + 'vh';
    img.style.opacity = 0.6 + Math.random() * 0.4;
    img.style.transform = `scale(${0.8 + Math.random() * 0.7})`;
    img.style.animationDelay = (Math.random() * 4) + 's';
    layer.appendChild(img);
  }
})();

// Click a timeline item to animate and navigate:
(function wireTimeline() {
  const items = document.querySelectorAll('.timeline-item');
  const overlay = document.getElementById('fade-overlay');

  items.forEach(item => {
    item.addEventListener('click', (ev) => {
      // create a subtle zoom effect on the clicked preview
      const preview = item.querySelector('.preview img');
      if (preview) {
        preview.style.transition = 'transform 0.6s ease, filter 0.6s ease';
        preview.style.transform = 'scale(1.25)';
        preview.style.filter = 'brightness(1.05)';
      }

      // fade to white overlay
      overlay.style.pointerEvents = 'auto';
      overlay.style.opacity = '1';

      // after short delay, navigate to the memory page
      const target = item.getAttribute('data-target');
      setTimeout(() => window.location.href = target, 850);
    });
  });
})();

// Helper used by memory pages: fade-out + navigate back
function navigateWithFade(url) {
  const overlay = document.getElementById('fade-overlay');
  if (!overlay) {
    // try creating overlay if memory page doesn't have it
    const o = document.createElement('div');
    o.id = 'fade-overlay';
    o.style.position = 'fixed';
    o.style.inset = '0';
    o.style.background = 'white';
    o.style.zIndex = 9999;
    o.style.opacity = 0;
    o.style.transition = 'opacity 0.9s';
    document.body.appendChild(o);
  }
  const overlayNow = document.getElementById('fade-overlay');
  overlayNow.style.opacity = '1';
  setTimeout(() => window.location.href = url, 850);
}

/* Audio fade-in helper for memory pages */
function fadeInAudio(audioEl, duration = 1000) {
  if (!audioEl) return;
  audioEl.volume = 0;
  audioEl.play().catch(() => {
    // autoplay blocked — user must press play
  });
  const step = 50;
  const steps = duration / step;
  let i = 0;
  const iv = setInterval(() => {
    i++;
    audioEl.volume = Math.min(1, (i / steps));
    if (i >= steps) clearInterval(iv);
  }, step);
}

/* Audio fade-out helper */
function fadeOutAudio(audioEl, duration = 600) {
  if (!audioEl) return;
  const step = 50;
  const steps = duration / step;
  let i = 0;
  const startVol = audioEl.volume || 1;
  const iv = setInterval(() => {
    i++;
    audioEl.volume = Math.max(0, startVol * (1 - (i / steps)));
    if (i >= steps) {
      clearInterval(iv);
      audioEl.pause();
      audioEl.currentTime = 0;
    }
  }, step);
}

/* For memory pages, wire up buttons when used there */
document.addEventListener('DOMContentLoaded', () => {
  // wire return buttons (if present)
  const backButtons = document.querySelectorAll('.btn-return, .back-button');
  backButtons.forEach(b => {
    b.addEventListener('click', (e) => {
      e.preventDefault();
      // fade out audio nicely if exists
      const audio = document.querySelector('audio.memory-audio');
      if (audio) fadeOutAudio(audio, 600);
      navigateWithFade('index.html');
    });
  });

  // wire play/pause music buttons (if present)
  const playBtns = document.querySelectorAll('.btn-play');
  playBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const audio = document.querySelector('audio.memory-audio');
      if (!audio) return;
      if (audio.paused) {
        fadeInAudio(audio, 800);
      } else {
        fadeOutAudio(audio, 400);
      }
    });
  });
});
