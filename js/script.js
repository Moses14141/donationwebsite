console.log('Script file loaded');
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const wrapper = document.querySelector('#wokovuway-wrapper');
    const currentPage = window.location.pathname.split('/').pop() || 'privacy.html';
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.slider-dots');
    let currentSlide = 0;
    const slideInterval = 3000; // 3 seconds

    console.log('Elements loaded:', { hamburger, navMenu, wrapper, currentPage, navLinks: navLinks.length, slides: slides.length });

    // Navigation Link Handling
    const resetLinkStyles = (links) => {
        links.forEach(link => {
            link.classList.remove('active');
            link.style.background = 'none';
            link.style.color = '#333';
            link.style.transition = 'none';
        });
    };

    resetLinkStyles(navLinks);
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
            link.style.transition = 'all 0.3s ease';
        }
    });

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const isActive = navMenu.classList.contains('active');
            hamburger.querySelector('i').classList.toggle('fa-bars', !isActive);
            hamburger.querySelector('i').classList.toggle('fa-times', isActive);
        });
    }

    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href !== currentPage && !href.startsWith('#')) {
                e.preventDefault();
                resetLinkStyles(navLinks);
                this.classList.add('active');
                this.style.transition = 'all 0.3s ease';
                wrapper.classList.add('fade-out-full');
                setTimeout(() => window.location.href = href, 400);
            }
        });
    });

    // Slider Functionality
    if (slides.length > 0) {
        // Create dots dynamically
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.dot');

        // Function to show a specific slide
        const showSlide = (index) => {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        };

        // Automatic slide transition
        const nextSlide = () => {
            currentSlide = (currentSlide + 1) % slides.length; // Loops infinitely
            showSlide(currentSlide);
        };

        // Start auto-sliding non-stop
        let slideTimer = setInterval(nextSlide, slideInterval);

        // Dot click handling (optional manual control)
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                clearInterval(slideTimer); // Pause auto-slide on manual interaction
                currentSlide = index;
                showSlide(currentSlide);
                slideTimer = setInterval(nextSlide, slideInterval); // Restart auto-slide
            });
        });

        // Optional: Pause on hover (remove if you want non-stop even on hover)
        const slider = document.querySelector('.slider');
        slider.addEventListener('mouseenter', () => clearInterval(slideTimer));
        slider.addEventListener('mouseleave', () => {
            slideTimer = setInterval(nextSlide, slideInterval);
        });
    } else {
        console.warn('No slides found in #wokovuway-hero');
    }

    // Video Autoplay
    const video = document.querySelector('#wokovuway-support video');
    if (video) {
        video.play().catch(error => console.error('Autoplay failed:', error));
    } else {
        console.warn('Support video not found');
    }
});