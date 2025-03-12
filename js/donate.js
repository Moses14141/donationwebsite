document.addEventListener("DOMContentLoaded", () => {
    // Hero Slider (existing code)
    const heroSlides = document.querySelectorAll('#donation-hero .slide');
    const heroDotsContainer = document.querySelector('#donation-hero .slider-dots');
    let heroCurrent = 0;

    function createHeroDots() {
        if (!heroDotsContainer) {
            console.error("Slider dots container not found");
            return;
        }
        heroSlides.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => heroGoTo(i));
            heroDotsContainer.appendChild(dot);
        });
    }

    function updateHeroDots() {
        const dots = heroDotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, i) => dot.classList.toggle('active', i === heroCurrent));
    }

    function showHeroSlide(index) {
        heroSlides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        updateHeroDots();
    }

    function heroNextSlide() {
        heroCurrent = (heroCurrent + 1) % heroSlides.length;
        showHeroSlide(heroCurrent);
    }

    function heroGoTo(index) {
        heroCurrent = index;
        showHeroSlide(heroCurrent);
    }

    createHeroDots();
    showHeroSlide(heroCurrent);
    setInterval(heroNextSlide, 5000);

    // Hamburger Menu and Navigation (updated code)
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (!hamburger || !navMenu) {
        console.error("Hamburger or nav-menu not found:", { hamburger, navMenu });
        return;
    }

    hamburger.addEventListener('click', () => {
        console.log("Hamburger clicked");
        navMenu.classList.toggle('active');
        const isActive = navMenu.classList.contains('active');
        hamburger.querySelector('i').classList.toggle('fa-bars', !isActive);
        hamburger.querySelector('i').classList.toggle('fa-times', isActive);
    });

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
});