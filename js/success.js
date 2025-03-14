console.log('Script file loaded');
document.addEventListener("DOMContentLoaded", () => {
    // Video Control
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
    const navLinks = document.querySelectorAll(".nav-menu a:not(#translate-link)");
    const translateLink = document.querySelector('#translate-link');
    const wrapper = document.querySelector("#wokovuway-wrapper");
    const currentPage = window.location.pathname.split('/').pop() || 'success_french.html'; // Adjusted default

    // Debugging: Log elements
    console.log('Elements loaded:', { hamburger, navMenu, wrapper, currentPage, navLinks: navLinks.length, translateLink });

    // Reset all styles and set active link on load
    const resetLinkStyles = (links) => {
        links.forEach(link => {
            link.classList.remove('active');
            link.style.background = 'none'; // Reset hover
            link.style.color = '#333';
            link.style.transition = 'none'; // Disable transition during reset
        });
    };

    resetLinkStyles(navLinks);
    navLinks.forEach(link => {
        const href = link.getAttribute("href");
        if (href === currentPage) {
            link.classList.add("active");
            link.style.transition = 'all 0.3s ease'; // Re-enable for active link
        }
    });

    // Force style recalculation
    document.body.offsetHeight;

    // Soft fade-in on page load
    if (wrapper) {
        wrapper.style.opacity = "0";
        wrapper.style.transition = 'opacity 0.2s ease-in-out'; // Matches CSS
        requestAnimationFrame(() => {
            wrapper.style.opacity = "1";
        });
    } else {
        console.error('Wrapper not found in DOM');
    }

    // Hamburger menu logic
    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            console.log('Hamburger clicked');
            navMenu.classList.toggle("active");
            const isActive = navMenu.classList.contains("active");
            console.log('Nav menu active state:', isActive);
            hamburger.querySelector("i").classList.toggle("fa-bars", !isActive);
            hamburger.querySelector("i").classList.toggle("fa-times", isActive);
        });
    } else {
        console.error('Hamburger or nav-menu not found:', { hamburger, navMenu });
    }

    // Navigation links
    navLinks.forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const href = this.getAttribute("href");
            if (href && href !== currentPage && !href.startsWith("#")) {
                e.preventDefault();
                console.log('Nav link clicked:', href);

                // Reset all links’ styles
                resetLinkStyles(navLinks);
                this.classList.add("active");
                this.style.transition = 'all 0.3s ease';

                // Force style recalculation
                document.body.offsetHeight;

                wrapper.classList.add("fade-out");
                if (navMenu.classList.contains("active")) {
                    navMenu.classList.remove("active");
                    hamburger.querySelector("i").classList.remove("fa-times");
                    hamburger.querySelector("i").classList.add("fa-bars");
                }

                setTimeout(() => {
                    console.log('Navigating to:', href);
                    window.location.href = href;
                }, 250); // Increased slightly to ensure reset renders
            }
        });

        // Debug hover
        anchor.addEventListener('mouseover', () => console.log('Hover on:', anchor.getAttribute('href')));
        anchor.addEventListener('mouseout', () => console.log('Hover off:', anchor.getAttribute('href')));
    });

    // Translate link
    if (translateLink) {
        translateLink.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Translate link clicked');
            const targetPage = currentPage.includes('french') ? currentPage.replace('_french', '') : currentPage.replace('.html', '_french.html');
            console.log('Target page:', targetPage);

            // Reset all nav links’ styles
            resetLinkStyles(navLinks);

            // Activate corresponding nav link (if any)
            navLinks.forEach(link => {
                if (link.getAttribute('href') === targetPage) {
                    link.classList.add('active');
                    link.style.transition = 'all 0.3s ease';
                }
            });

            // Force style recalculation
            document.body.offsetHeight;

            wrapper.classList.add('fade-out');
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.querySelector('i').classList.remove('fa-times');
                hamburger.querySelector('i').classList.add('fa-bars');
            }

            setTimeout(() => {
                console.log('Navigating to:', targetPage);
                window.location.href = targetPage;
            }, 250);
        });

        // Debug hover for translate link
        translateLink.addEventListener('mouseover', () => console.log('Hover on translate-link'));
        translateLink.addEventListener('mouseout', () => console.log('Hover off translate-link'));
    } else {
        console.error('Translate link not found in DOM');
    }

    // Internal links (e.g., "Read More" in footer)
    const internalLinks = document.querySelectorAll('a:not(.nav-menu a):not(#translate-link)');
    internalLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            const href = this.getAttribute("href");
            if (href && !href.startsWith("#") && href !== currentPage && !href.startsWith('mailto:')) {
                e.preventDefault();
                console.log('Internal link clicked:', href);

                resetLinkStyles(navLinks);
                navLinks.forEach(navLink => {
                    if (navLink.getAttribute('href') === href) {
                        navLink.classList.add('active');
                        navLink.style.transition = 'all 0.3s ease';
                    }
                });

                document.body.offsetHeight;

                wrapper.classList.add("fade-out");
                setTimeout(() => {
                    console.log('Navigating to:', href);
                    window.location.href = href;
                }, 250);
            }
        });
    });
});


console.log('Script file loaded');
document.addEventListener("DOMContentLoaded", () => {
    // Existing variable declarations
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-menu a:not(#translate-link)");
    const translateLink = document.querySelector('#translate-link');
    const wrapper = document.querySelector("#wokovuway-wrapper");
    const currentPage = window.location.pathname.split('/').pop() || 'success.html';

    // Add image load handling
    const catalogImages = document.querySelectorAll('.thumbnail img');
    catalogImages.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => img.classList.add('loaded'));
        }
    });

    // Rest of your existing success.js code...
});