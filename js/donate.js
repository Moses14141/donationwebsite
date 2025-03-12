document.addEventListener("DOMContentLoaded", () => {
    // Hero Slider
    const slides = document.querySelectorAll("#donation-hero .slide");
    const dotsContainer = document.querySelector("#donation-hero .slider-dots");
    let currentSlide = 0;

    if (!dotsContainer) {
        console.error("Slider dots container not found");
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
        document.querySelectorAll("#donation-hero .dot").forEach((dot, i) => {
            dot.classList.toggle("active", i === currentSlide);
        });
    }

    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlides();
    }, 5000);

    // Hamburger Menu
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

    // Navigation with Smooth Transition
    const navLinks = document.querySelectorAll(".nav-menu a:not(#translate-link)");
    const wrapper = document.querySelector("#wokovuway-wrapper");
    const currentPage = window.location.pathname.split('/').pop() || 'donate.html';

    navLinks.forEach(link => {
        const href = link.getAttribute("href");
        if (href === currentPage) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });

    // Smoother fade-in on page load
    wrapper.style.opacity = "0";
    wrapper.style.transition = "opacity 0.4s ease-in-out";
    requestAnimationFrame(() => {
        wrapper.style.opacity = "1";
    });

    navLinks.forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const href = this.getAttribute("href");
            if (href && href !== currentPage && !href.startsWith("#")) {
                e.preventDefault();
                wrapper.classList.add("fade-out-full");

                navLinks.forEach(link => link.classList.remove("active"));
                this.classList.add("active");

                if (navMenu.classList.contains("active")) {
                    navMenu.classList.remove("active");
                    hamburger.querySelector("i").classList.remove("fa-times");
                    hamburger.querySelector("i").classList.add("fa-bars");
                }

                setTimeout(() => {
                    window.location.href = href;
                }, 400);
            }
        });
    });

    // Internal Links (e.g., GoFundMe, form)
    const internalLinks = document.querySelectorAll('a:not(.nav-menu a)');
    internalLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            const href = this.getAttribute("href");
            if (href && !href.startsWith("#") && href !== currentPage && !href.startsWith("mailto:")) {
                e.preventDefault();
                wrapper.classList.add("fade-out-full");

                setTimeout(() => {
                    window.location.href = href;
                }, 400);

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

    // Translate Link Functionality (Smooth Transition)
    const translateLink = document.querySelector("#translate-link");
    if (translateLink) {
        translateLink.addEventListener("click", (e) => {
            e.preventDefault();
            const href = currentPage === 'donate.html' ? 'donate_french.html' : 'donate.html'; // Toggle between English and French
            wrapper.classList.add("fade-out-full");

            if (navMenu.classList.contains("active")) {
                navMenu.classList.remove("active");
                hamburger.querySelector("i").classList.remove("fa-times");
                hamburger.querySelector("i").classList.add("fa-bars");
            }

            setTimeout(() => {
                window.location.href = href;
            }, 400);
        });
    }
});