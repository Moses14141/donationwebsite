document.addEventListener("DOMContentLoaded", () => {
    // Hamburger Menu code
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

    // Navigation with Blink Transition
    const navLinks = document.querySelectorAll(".nav-menu a:not(#translate-link)");
    const wrapper = document.querySelector("#wokovuway-wrapper");
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

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
    wrapper.style.transition = "opacity 0.4s ease-in-out"; // Increased duration for smoothness
    requestAnimationFrame(() => {
        wrapper.style.opacity = "1";
    });

    navLinks.forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const href = this.getAttribute("href");
            if (href && href !== currentPage && !href.startsWith("#")) {
                e.preventDefault();
                wrapper.classList.add("fade-out-full"); // New class for full fade

                navLinks.forEach(link => link.classList.remove("active"));
                this.classList.add("active");

                if (navMenu.classList.contains("active")) {
                    navMenu.classList.remove("active");
                    hamburger.querySelector("i").classList.remove("fa-times");
                    hamburger.querySelector("i").classList.add("fa-bars");
                }

                setTimeout(() => {
                    window.location.href = href;
                }, 400); // Matches new CSS duration
            }
        });
    });
});