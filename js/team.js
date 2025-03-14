console.log('Script file loaded');
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a:not(#translate-link)');
    const translateLink = document.querySelector('#translate-link');
    const wrapper = document.querySelector('#wokovuway-wrapper');
    const currentPage = window.location.pathname.split('/').pop() || 'team.html';

    console.log('Elements loaded:', { hamburger, navMenu, wrapper, currentPage, navLinks: navLinks.length, translateLink });

    // Reset link styles
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

    // Fade-in on page load
    if (wrapper) {
        wrapper.style.opacity = '0';
        wrapper.style.transition = 'opacity 0.4s ease-in-out';
        requestAnimationFrame(() => {
            wrapper.style.opacity = '1';
        });
    }

    // Hamburger menu logic
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const isActive = navMenu.classList.contains('active');
            hamburger.querySelector('i').classList.toggle('fa-bars', !isActive);
            hamburger.querySelector('i').classList.toggle('fa-times', isActive);
        });
    }

    // Navigation links
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href !== currentPage && !href.startsWith('#')) {
                e.preventDefault();
                resetLinkStyles(navLinks);
                this.classList.add('active');
                this.style.transition = 'all 0.3s ease';

                // Apply fade-out to wrapper
                wrapper.classList.add('fade-out-full');
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    hamburger.querySelector('i').classList.remove('fa-times');
                    hamburger.querySelector('i').classList.add('fa-bars');
                }

                setTimeout(() => {
                    window.location.href = href;
                }, 400); // Match home page timing
            }
        });
    });

    // Translate link logic
    if (translateLink) {
        translateLink.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPage = currentPage.includes('french') ? currentPage.replace('_french', '') : currentPage.replace('.html', '_french.html');
            resetLinkStyles(navLinks);
            navLinks.forEach(link => {
                if (link.getAttribute('href') === targetPage) {
                    link.classList.add('active');
                    link.style.transition = 'all 0.3s ease';
                }
            });

            wrapper.classList.add('fade-out-full');
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.querySelector('i').classList.remove('fa-times');
                hamburger.querySelector('i').classList.add('fa-bars');
            }

            setTimeout(() => {
                window.location.href = targetPage;
            }, 400); // Match home page timing
        });
    }

    // Image load handling
    const teamImages = document.querySelectorAll('.team-img');
    teamImages.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => img.classList.add('loaded'));
        }
    });
});