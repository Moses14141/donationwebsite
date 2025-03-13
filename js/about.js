console.log('Script file loaded');
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a:not(#translate-link)');
    const translateLink = document.querySelector('#translate-link');
    const wrapper = document.querySelector('#wokovuway-wrapper');
    const currentPage = window.location.pathname.split('/').pop() || 'about.html';

    // Debugging: Log elements
    console.log('Elements loaded:', { hamburger, navMenu, wrapper, currentPage, navLinks: navLinks.length, translateLink });

    // Reset all styles and set active link on load
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
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
            link.style.transition = 'all 0.3s ease';
        }
    });

    // Force style recalculation
    document.body.offsetHeight;

    // Fade-in on page load
    if (wrapper) {
        wrapper.style.opacity = '0';
        wrapper.style.transition = 'opacity 0.4s ease-in-out';
        requestAnimationFrame(() => {
            wrapper.style.opacity = '1';
        });
    } else {
        console.error('Wrapper not found in DOM');
    }

    // Image load handling
    const aboutImage = document.querySelector('.img-responsive');
    if (aboutImage) {
        console.log('Image found:', aboutImage.src);
        if (aboutImage.complete) {
            console.log('Image already loaded');
            aboutImage.classList.add('loaded');
        } else {
            aboutImage.addEventListener('load', () => {
                console.log('Image loaded');
                aboutImage.classList.add('loaded');
            });
        }
        // Error handling
        aboutImage.addEventListener('error', () => {
            console.error('Image failed to load:', aboutImage.src);
            aboutImage.classList.add('loaded'); // Show anyway if error
        });
    } else {
        console.error('Image with class .img-responsive not found');
    }

    // Hamburger menu logic
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            console.log('Hamburger clicked');
            navMenu.classList.toggle('active');
            const isActive = navMenu.classList.contains('active');
            hamburger.querySelector('i').classList.toggle('fa-bars', !isActive);
            hamburger.querySelector('i').classList.toggle('fa-times', isActive);
        });
    } else {
        console.error('Hamburger or nav-menu not found:', { hamburger, navMenu });
    }

    // Navigation links
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href !== currentPage && !href.startsWith('#')) {
                e.preventDefault();
                console.log('Nav link clicked:', href);
                resetLinkStyles(navLinks);
                this.classList.add('active');
                this.style.transition = 'all 0.3s ease';
                document.body.offsetHeight;
                wrapper.classList.add('fade-out-full');
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    hamburger.querySelector('i').classList.remove('fa-times');
                    hamburger.querySelector('i').classList.add('fa-bars');
                }
                setTimeout(() => {
                    console.log('Navigating to:', href);
                    window.location.href = href;
                }, 400);
            }
        });
    });

    // Translate link
    if (translateLink) {
        translateLink.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Translate link clicked');
            const targetPage = currentPage.includes('french') ? currentPage.replace('_french', '') : currentPage.replace('.html', '_french.html');
            console.log('Target page:', targetPage);
            resetLinkStyles(navLinks);
            navLinks.forEach(link => {
                if (link.getAttribute('href') === targetPage) {
                    link.classList.add('active');
                    link.style.transition = 'all 0.3s ease';
                }
            });
            document.body.offsetHeight;
            wrapper.classList.add('fade-out-full');
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.querySelector('i').classList.remove('fa-times');
                hamburger.querySelector('i').classList.add('fa-bars');
            }
            setTimeout(() => {
                console.log('Navigating to:', targetPage);
                window.location.href = targetPage;
            }, 400);
        });
    } else {
        console.error('Translate link not found in DOM');
    }
});