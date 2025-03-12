document.addEventListener('DOMContentLoaded', () => {
    // Hamburger Menu and Navigation with Blink Transition
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const wrapper = document.querySelector('#wokovuway-wrapper');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // Set active link and fade in on load
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Soft fade-in on page load
    if (wrapper) {
        wrapper.style.opacity = '0.2';
        requestAnimationFrame(() => {
            wrapper.style.opacity = '1';
        });
    }

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const isActive = navMenu.classList.contains('active');
            hamburger.querySelector('i').classList.toggle('fa-bars', !isActive);
            hamburger.querySelector('i').classList.toggle('fa-times', isActive);
        });
    } else {
        console.error('Hamburger or nav-menu not found in the DOM.');
    }

    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href !== currentPage && !href.startsWith('#')) {
                e.preventDefault();
                wrapper.classList.add('fade-out');

                navLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');

                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    hamburger.querySelector('i').classList.remove('fa-times');
                    hamburger.querySelector('i').classList.add('fa-bars');
                }

                // Navigate after fade-out
                setTimeout(() => {
                    window.location.href = href;
                }, 200); // Matches CSS duration
            }
        });
    });

    // Subtle Blink for Internal Links (e.g., "Donate Now", "Read More")
    const internalLinks = document.querySelectorAll('a:not(.nav-menu a)');
    internalLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && !href.startsWith('#') && href !== currentPage && !href.includes('gofundme.com')) {
                e.preventDefault();
                wrapper.classList.add('fade-out');

                setTimeout(() => {
                    window.location.href = href;
                }, 200);

                navLinks.forEach(navLink => {
                    const navHref = navLink.getAttribute('href');
                    if (navHref === href) {
                        navLinks.forEach(item => item.classList.remove('active'));
                        navLink.classList.add('active');
                    }
                });
            }
        });
    });

    // Hero Slider
    const slides = document.querySelectorAll('#donation-hero .slide');
    const dotsContainer = document.querySelector('#donation-hero .slider-dots');
    let currentSlide = 0;

    if (slides.length && dotsContainer) {
        slides.forEach((_, i) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.dataset.slide = i;
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                currentSlide = i;
                updateSlides();
            });
            dotsContainer.appendChild(dot);
        });

        function updateSlides() {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === currentSlide);
            });
            document.querySelectorAll('#donation-hero .dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === currentSlide);
            });
        }

        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlides();
        }, 5000);
    }
});