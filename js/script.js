// js/script.js

function goToMemory(page) {
  const overlay = document.querySelector('.fade-overlay');
  overlay.style.opacity = '1';
  setTimeout(() => {
    window.location.href = page;
  }, 1000);
}
