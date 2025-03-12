document.addEventListener('DOMContentLoaded', () => {
    // Hamburger Menu and Navigation with Smooth Transition
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a:not(#translate-link)');
    const wrapper = document.querySelector('#wokovuway-wrapper');
    const currentPage = window.location.pathname.split('/').pop() || 'contact.html';

    // Set active link and fade in on load
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Smoother fade-in on page load
    if (wrapper) {
        wrapper.style.opacity = '0';
        wrapper.style.transition = 'opacity 0.4s ease-in-out';
        requestAnimationFrame(() => {
            wrapper.style.opacity = '1';
        });
    } else {
        console.error('Wrapper not found in the DOM.');
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
                wrapper.classList.add('fade-out-full');

                navLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');

                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    hamburger.querySelector('i').classList.remove('fa-times');
                    hamburger.querySelector('i').classList.add('fa-bars');
                }

                setTimeout(() => {
                    window.location.href = href;
                }, 400); // Matches CSS duration
            }
        });
    });

    // Internal Links (e.g., "Read More", email link)
    const internalLinks = document.querySelectorAll('a:not(.nav-menu a)');
    internalLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && !href.startsWith('#') && href !== currentPage && !href.startsWith('mailto:')) {
                e.preventDefault();
                wrapper.classList.add('fade-out-full');

                setTimeout(() => {
                    window.location.href = href;
                }, 400);

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

    // Translate Link Functionality (Smooth Transition)
    const translateLink = document.querySelector('#translate-link');
    if (translateLink) {
        translateLink.addEventListener('click', (e) => {
            e.preventDefault();
            const href = currentPage === 'contact.html' ? 'contact_french.html' : 'contact.html'; // Toggle between English and French
            wrapper.classList.add('fade-out-full');

            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.querySelector('i').classList.remove('fa-times');
                hamburger.querySelector('i').classList.add('fa-bars');
            }

            setTimeout(() => {
                window.location.href = href;
            }, 400);
        });
    }
});