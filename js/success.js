document.addEventListener("DOMContentLoaded", () => {
    // Video Control
    const video = document.getElementById("tm-video");
    const controlButton = document.getElementById("tm-video-control-button");

    controlButton.addEventListener("click", () => {
        if (video.paused) {
            video.play();
            controlButton.classList.remove("fa-play");
            controlButton.classList.add("fa-pause");
        } else {
            video.pause();
            controlButton.classList.remove("fa-pause");
            controlButton.classList.add("fa-play");
        }
    });

    // Hamburger Menu
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-menu a");

    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navLinks.forEach(l => l.classList.remove("active"));
            link.classList.add("active");
            navMenu.classList.remove("active");
        });
    });
});