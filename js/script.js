// js/script.js

function openMemory(num) {
  const overlay = document.getElementById("fade-overlay");
  overlay.style.opacity = 1;
  setTimeout(() => {
    window.location.href = `memory${num}.html`;
  }, 600);
}

function goHome() {
  const overlay = document.getElementById("fade-overlay");
  if (overlay) {
    overlay.style.opacity = 1;
    setTimeout(() => {
      window.location.href = "index.html";
    }, 600);
  } else {
    window.location.href = "index.html";
  }
}

function toggleMusic() {
  const music = document.getElementById("bg-music");
  if (!music) return;
  if (music.paused) {
    music.play();
  } else {
    music.pause();
  }
}

// Floating sprites
window.addEventListener("DOMContentLoaded", () => {
  const spriteLayer = document.getElementById("sprite-layer");
  if (spriteLayer) {
    for (let i = 0; i < 10; i++) {
      const sprite = document.createElement("div");
      sprite.classList.add("sprite");
      sprite.style.left = Math.random() * 100 + "vw";
      sprite.style.top = Math.random() * 100 + "vh";
      spriteLayer.appendChild(sprite);
    }
  }
});
