document.addEventListener('DOMContentLoaded', () => {
    // Hamburger Menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (!hamburger || !navMenu) {
        console.error("Hamburger or nav-menu not found:", { hamburger, navMenu });
    } else {
        hamburger.addEventListener('click', () => {
            console.log("Hamburger clicked");
            navMenu.classList.toggle('active');
            const isActive = navMenu.classList.contains('active');
            hamburger.querySelector('i').classList.toggle('fa-bars', !isActive);
            hamburger.querySelector('i').classList.toggle('fa-times', isActive);
        });
    }

    // Navigation Link Handling
    const navLinks = document.querySelectorAll('.nav-menu a');
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
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            console.log(`Nav link ${index} clicked: ${href}`);

            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href;
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                    });
                } else {
                    console.warn(`Target element ${targetId} not found`);
                }

                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    hamburger.querySelector('i').classList.remove('fa-times');
                    hamburger.querySelector('i').classList.add('fa-bars');
                }
            } else if (href) {
                console.log(`Navigating to external page: ${href}`);
                navLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');

                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    hamburger.querySelector('i').classList.remove('fa-times');
                    hamburger.querySelector('i').classList.add('fa-bars');
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

    // Scroll Animation
    function animateOnScroll() {
        const elements = document.querySelectorAll('.col-md-6, .values-list li');
        elements.forEach(element => {
            const position = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (position < windowHeight * 0.8) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    document.querySelectorAll('.col-md-6, .values-list li').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
});