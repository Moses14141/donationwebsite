// Console log bilingue : Bilingual console log
console.log('Fichier de script bénévole chargé / Volunteer script file loaded');

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const wrapper = document.querySelector('#wokovuway-wrapper');
    const form = document.querySelector('#volunteer-form');
    // Vérifie la page actuelle / Check the current page
    const currentPage = window.location.pathname.split('/').pop() || 'bénévole.html'; // Par défaut en français / Default to French

    // Éléments chargés / Loaded elements
    console.log('Éléments chargés / Loaded elements:', { hamburger, navMenu, wrapper, form, currentPage, navLinks: navLinks.length });

    // Fonction pour réinitialiser les styles des liens / Function to reset link styles
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

    // Gestion du menu hamburger / Hamburger menu handling
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const isActive = navMenu.classList.contains('active');
            hamburger.querySelector('i').classList.toggle('fa-bars', !isActive);
            hamburger.querySelector('i').classList.toggle('fa-times', isActive);
        });
    }

    // Gestion des clics sur les liens de navigation / Navigation link click handling
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

    // Gestion de base du formulaire (placeholder) / Basic form handling (placeholder)
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = form.querySelector('#name').value;
            const email = form.querySelector('#email').value;
            if (name && email) {
                // Message bilingue / Bilingual message
                alert(`Merci, ${name} ! Nous avons reçu votre candidature bénévole et vous contacterons bientôt à ${email}. / Thank you, ${name}! We’ve received your volunteer application and will contact you soon at ${email}.`);
                form.reset();
            }
        });
    }
});