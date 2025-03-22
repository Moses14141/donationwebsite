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
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.dot');

        const showSlide = (index) => {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        };

        const nextSlide = () => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        };

        let slideTimer = setInterval(nextSlide, slideInterval);

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                clearInterval(slideTimer);
                currentSlide = index;
                showSlide(currentSlide);
                slideTimer = setInterval(nextSlide, slideInterval);
            });
        });

        const slider = document.querySelector('.slider');
        slider.addEventListener('mouseenter', () => clearInterval(slideTimer));
        slider.addEventListener('mouseleave', () => {
            slideTimer = setInterval(nextSlide, slideInterval);
        });
    }

    // Video Autoplay
    const video = document.querySelector('#wokovuway-support video');
    if (video) {
        video.play().catch(error => console.error('Autoplay failed:', error));
    }

    // Counting Animation for Impact Numbers
    const impactItems = document.querySelectorAll('.impact-item h3');
    const impactSection = document.querySelector('#wokovuway-impact');
    let hasAnimated = false;

    const animateCount = (element, target, duration) => {
        let start = 0;
        const increment = target / (duration / 16); // 60 FPS approximation
        const plusSign = element.textContent.includes('+') ? '+' : '';
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = Math.floor(target).toLocaleString() + plusSign;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start).toLocaleString() + plusSign;
            }
        }, 16);
    };

    const startCountAnimation = () => {
        if (hasAnimated) return;
        impactItems.forEach(item => {
            const text = item.textContent.replace(/[^0-9]/g, ''); // Extract number
            const target = parseInt(text, 10);
            animateCount(item, target, 2000); // 2 seconds duration
        });
        hasAnimated = true;
    };

    // Intersection Observer to trigger animation when section is in view
    const observer = new IntersectionObserver(
        (entries) => {
            if (entries[0].isIntersecting) {
                startCountAnimation();
            }
        },
        { threshold: 0.5 } // Trigger when 50% of the section is visible
    );

    if (impactSection) {
        observer.observe(impactSection);
    }
});