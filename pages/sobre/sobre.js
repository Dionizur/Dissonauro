// Animação de entrada dos elementos
document.addEventListener('DOMContentLoaded', function() {
    // Observador de interseção para animações
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observar elementos com animação
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    const slideLeftElements = document.querySelectorAll('.slide-in-left');
    slideLeftElements.forEach(el => observer.observe(el));

    const slideRightElements = document.querySelectorAll('.slide-in-right');
    slideRightElements.forEach(el => observer.observe(el));

    // Adicionar atrasos para animação em cascata
    const valueCards = document.querySelectorAll('.value-card');
    valueCards.forEach((card, index) => {
        card.style.transitionDelay = `${0.6 + index * 0.1}s`;
    });

    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach((member, index) => {
        member.style.transitionDelay = `${0.8 + index * 0.2}s`;
    });

    const milestones = document.querySelectorAll('.milestone');
    milestones.forEach((milestone, index) => {
        milestone.style.transitionDelay = `${1 + index * 0.1}s`;
    });
});