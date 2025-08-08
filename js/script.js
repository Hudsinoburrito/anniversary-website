document.querySelectorAll('.timeline-item').forEach((item, index) => {
  item.addEventListener('click', () => {
    document.body.classList.add('fade-out');
    setTimeout(() => {
      window.location.href = `memory${index + 1}.html`;
    }, 700);
  });
});
