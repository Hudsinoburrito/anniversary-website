
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".memory-card");
    cards.forEach(card => {
        card.addEventListener("click", () => {
            const target = card.getAttribute("data-target");
            document.body.style.transition = "opacity 1s";
            document.body.style.opacity = 0;
            setTimeout(() => {
                window.location.href = target;
            }, 1000);
        });
    });
});
