console.log('Services script file loaded');
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const wrapper = document.querySelector('#wokovuway-wrapper');
    const currentPage = window.location.pathname.split('/').pop() || 'services.html';

    console.log('Elements loaded:', { hamburger, navMenu, wrapper, currentPage, navLinks: navLinks.length });

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
            hamburger.classList.toggle('active', isActive);
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

    // Scroll Reveal Effect
    try {
        const scrollElements = document.querySelectorAll('#about-us h2, #about-us .lead, .col-md-6, .mission-vision h1, .mission-vision h2, .mission-vision p, .values-list li');
        if (scrollElements.length > 0) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        if (entry.target.matches('.values-list li')) {
                            entry.target.classList.add('bounce');
                        }
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.2,
                rootMargin: '0px 0px -50px 0px'
            });

            scrollElements.forEach(element => {
                element.classList.add('scroll-reveal');
                observer.observe(element);
            });
        }
    } catch (error) {
        console.error('Scroll reveal error:', error);
    }
});