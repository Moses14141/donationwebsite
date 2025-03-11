document.addEventListener("DOMContentLoaded", () => {
    // Hero Slider
    const slides = document.querySelectorAll(".slide");
    const dotsContainer = document.querySelector(".slider-dots");
    let currentSlide = 0;

    // Create dots dynamically
    slides.forEach((_, i) => {
        const dot = document.createElement("span");
        dot.classList.add("dot");
        dot.dataset.slide = i;
        if (i === 0) dot.classList.add("active");
        dot.addEventListener("click", () => {
            currentSlide = i;
            updateSlides();
        });
        dotsContainer.appendChild(dot);
    });

    function updateSlides() {
        slides.forEach((slide, i) => {
            slide.classList.toggle("active", i === currentSlide);
        });
        document.querySelectorAll(".dot").forEach((dot, i) => {
            dot.classList.toggle("active", i === currentSlide);
        });
    }

    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlides();
    }, 5000);

    // Gallery Slider
    const gallerySlider = document.querySelector(".gallery-slider");
    const prevBtn = document.querySelector(".gallery-prev");
    const nextBtn = document.querySelector(".gallery-next");

    prevBtn.addEventListener("click", () => {
        gallerySlider.scrollBy({ left: -320, behavior: "smooth" });
    });

    nextBtn.addEventListener("click", () => {
        gallerySlider.scrollBy({ left: 320, behavior: "smooth" });
    });

    // Hamburger Menu
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });
});