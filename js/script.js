function goToMemory(num) {
  const fade = document.getElementById("fade-screen");
  fade.style.opacity = "1";

  setTimeout(() => {
    window.location.href = `memory${num}.html`;
  }, 800);
}

function returnToTimeline() {
  const fade = document.getElementById("fade-screen");
  fade.style.opacity = "1";

  setTimeout(() => {
    window.location.href = `index.html`;
  }, 800);
}

// Optional: fade in when arriving on a memory page
window.addEventListener("load", () => {
  const fade = document.getElementById("fade-screen");
  if (fade) fade.style.opacity = "0";
});
