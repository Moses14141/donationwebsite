document.addEventListener("DOMContentLoaded", () => {
    // Video Control (unchanged)
    const video = document.getElementById("tm-video");
    const controlButton = document.getElementById("tm-video-control-button");

    if (video && controlButton) {
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
    }

    // Hamburger Menu and Navigation with Blink Transition
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-menu a");
    const wrapper = document.querySelector("#wokovuway-wrapper");
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // Set active link and fade in on load
    navLinks.forEach(link => {
        const href = link.getAttribute("href");
        if (href === currentPage) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });

    // Soft fade-in on page load
    if (wrapper) {
        wrapper.style.opacity = "0.2";
        requestAnimationFrame(() => {
            wrapper.style.opacity = "1";
        });
    }

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            const isActive = navMenu.classList.contains("active");
            hamburger.querySelector("i").classList.toggle("fa-bars", !isActive);
            hamburger.querySelector("i").classList.toggle("fa-times", isActive);
        });
    }

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

                // Navigate after fade-out
                setTimeout(() => {
                    window.location.href = href;
                }, 200); // Matches CSS duration
            }
        });
    });

    // Subtle Blink for Internal Links (e.g., "Read More" in footer)
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
});