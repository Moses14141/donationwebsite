console.log('Script file loaded');
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const wrapper = document.querySelector('#wokovuway-wrapper');
    const currentPage = window.location.pathname.split('/').pop() || 'privacy.html';

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

    // Add translate link logic if needed
    const translateLink = document.querySelector('#translate-link');
    if (translateLink) {
        translateLink.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPage = currentPage.includes('french') ? currentPage.replace('_french', '') : currentPage.replace('.html', '_french.html');
            resetLinkStyles(navLinks);
            navLinks.forEach(link => {
                if (link.getAttribute('href') === targetPage) link.classList.add('active');
            });
            wrapper.classList.add('fade-out-full');
            setTimeout(() => window.location.href = targetPage, 400);
        });
    }
});