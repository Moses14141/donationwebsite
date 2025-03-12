document.addEventListener("DOMContentLoaded", () => {
    // Hero Slider (existing code)
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

    // Gallery Slider (existing code)
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

    // Hamburger Menu and Navigation (updated code)
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    if (!hamburger || !navMenu) {
        console.error("Hamburger or nav-menu not found:", { hamburger, navMenu });
    } else {
        hamburger.addEventListener("click", () => {
            console.log("Hamburger clicked");
            navMenu.classList.toggle("active");
            const isActive = navMenu.classList.contains("active");
            hamburger.querySelector("i").classList.toggle("fa-bars", !isActive);
            hamburger.querySelector("i").classList.toggle("fa-times", isActive);
        });
    }

    const navLinks = document.querySelectorAll(".nav-menu a");
    console.log("Found nav links:", navLinks.length);

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        const href = link.getAttribute("href");
        if (href === currentPage) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });

    navLinks.forEach((anchor, index) => {
        anchor.addEventListener("click", function (e) {
            const href = this.getAttribute("href");
            console.log(`Nav link ${index} clicked: ${href}`);

            if (href && href.startsWith("#")) {
                e.preventDefault();
                const targetId = href;
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });
                } else {
                    console.warn(`Target element ${targetId} not found`);
                }

                if (navMenu.classList.contains("active")) {
                    navMenu.classList.remove("active");
                    hamburger.querySelector("i").classList.remove("fa-times");
                    hamburger.querySelector("i").classList.add("fa-bars");
                }
            } else if (href) {
                console.log(`Navigating to external page: ${href}`);
                navLinks.forEach(link => link.classList.remove("active"));
                this.classList.add("active");

                if (navMenu.classList.contains("active")) {
                    navMenu.classList.remove("active");
                    hamburger.querySelector("i").classList.remove("fa-times");
                    hamburger.querySelector("i").classList.add("fa-bars");
                }
                window.location.href = href;
            } else {
                console.warn("No href attribute found on link");
            }
        });
    });

    const internalLinks = document.querySelectorAll('a:not(.nav-menu a)');
    internalLinks.forEach((link, index) => {
        link.addEventListener("click", function (e) {
            const href = this.getAttribute("href");
            console.log(`Internal link ${index} clicked: ${href}`);

            if (href && !href.startsWith("#") && href !== currentPage) {
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

    // Video Autoplay Fallback (existing code)
    const video = document.querySelector("#wokovuway-support video");
    if (video) {
        video.play().catch(error => console.error("Autoplay failed:", error));
    } else {
        console.warn("Support video not found");
    }
});