
function playMusic() {
    const audio = document.getElementById("bg-music");
    audio.play();
}

function goBack() {
    document.body.classList.add("zoom-out");
    setTimeout(() => {
        window.location.href = "index.html";
    }, 600);
}
