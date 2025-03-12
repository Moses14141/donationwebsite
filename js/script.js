document.addEventListener("DOMContentLoaded", () => {
    // Existing Hero Slider code (unchanged)
    const slides = document.querySelectorAll("#wokovuway-hero .slide");
    const dotsContainer = document.querySelector("#wokovuway-hero .slider-dots");
    let currentSlide = 0;

    if (!dotsContainer) {
        console.error("Hero slider dots container not found");
    } else {
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
    }

    function updateSlides() {
        slides.forEach((slide, i) => {
            slide.classList.toggle("active", i === currentSlide);
        });
        document.querySelectorAll("#wokovuway-hero .dot").forEach((dot, i) => {
            dot.classList.toggle("active", i === currentSlide);
        });
    }

    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlides();
    }, 5000);

    // Existing Gallery Slider code (unchanged)
    const gallerySlider = document.querySelector(".gallery-slider");
    const prevBtn = document.querySelector(".gallery-prev");
    const nextBtn = document.querySelector(".gallery-next");

    if (!gallerySlider || !prevBtn || !nextBtn) {
        console.error("Gallery slider elements not found:", { gallerySlider, prevBtn, nextBtn });
    } else {
        prevBtn.addEventListener("click", () => {
            gallerySlider.scrollBy({ left: -320, behavior: "smooth" });
        });
        nextBtn.addEventListener("click", () => {
            gallerySlider.scrollBy({ left: 320, behavior: "smooth" });
        });
    }

    // Existing Hamburger Menu code (unchanged)
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    if (!hamburger || !navMenu) {
        console.error("Hamburger or nav-menu not found:", { hamburger, navMenu });
    } else {
        hamburger.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            const isActive = navMenu.classList.contains("active");
            hamburger.querySelector("i").classList.toggle("fa-bars", !isActive);
            hamburger.querySelector("i").classList.toggle("fa-times", isActive);
        });
    }

    // Subtle Blink Transition for Navigation
    const navLinks = document.querySelectorAll(".nav-menu a");
    const wrapper = document.querySelector("#wokovuway-wrapper");
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // Set active link and gentle fade-in
    navLinks.forEach(link => {
        const href = link.getAttribute("href");
        if (href === currentPage) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });

    // Soft fade-in on load
    wrapper.style.opacity = "0.2";
    requestAnimationFrame(() => {
        wrapper.style.opacity = "1";
    });

    navLinks.forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const href = this.getAttribute("href");
            if (href && href !== currentPage && !href.startsWith("#")) {
                e.preventDefault();
                wrapper.classList.add("fade-out");

                navLinks.forEach(link => link.classList.remove("active"));
                this.classList.add("active");

                if (navMenu.classList.contains("active")) {
                    navMenu.classList.remove("active");
                    hamburger.querySelector("i").classList.remove("fa-times");
                    hamburger.querySelector("i").classList.add("fa-bars");
                }

                // Navigate after subtle fade-out
                setTimeout(() => {
                    window.location.href = href;
                }, 200); // Matches CSS duration
            }
        });
    });

    // Subtle Blink for Internal Links
    const internalLinks = document.querySelectorAll('a:not(.nav-menu a)');
    internalLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            const href = this.getAttribute("href");
            if (href && !href.startsWith("#") && href !== currentPage) {
                e.preventDefault();
                wrapper.classList.add("fade-out");

                setTimeout(() => {
                    window.location.href = href;
                }, 200);

                navLinks.forEach(navLink => {
                    const navHref = navLink.getAttribute("href");
                    if (navHref === href) {
                        navLinks.forEach(item => item.classList.remove("active"));
                        navLink.classList.add("active");
                    }
                });
            }
        });
    });

    // Existing Video Autoplay code (unchanged)
    const video = document.querySelector("#wokovuway-support video");
    if (video) {
        video.play().catch(error => console.error("Autoplay failed:", error));
    }
});