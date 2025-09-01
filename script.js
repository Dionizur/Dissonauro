// Interactive features for DinoVerse index page

document.addEventListener('DOMContentLoaded', function() {
    // Animate egg on hover
    const egg = document.querySelector('.egg');
    egg.addEventListener('mouseenter', function() {
        egg.style.transform = 'rotate(60deg) scale(1.2)';
        egg.style.transition = 'transform 0.5s ease';
    });
    egg.addEventListener('mouseleave', function() {
        egg.style.transform = 'rotate(30deg) scale(1)';
    });

    // Animate paw on click
    const paw = document.querySelector('.paw');
    paw.addEventListener('click', function() {
        paw.style.transform = 'rotate(90deg) scale(1.5)';
        paw.style.transition = 'transform 0.3s ease';
        setTimeout(() => {
            paw.style.transform = 'rotate(45deg) scale(1)';
        }, 300);
    });

    // Dynamic subtitle change on menu button hover
    const subtitle = document.querySelector('.subtitle');
    const originalText = subtitle.textContent;
    const menuButtons = document.querySelectorAll('.menu-button');

    menuButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            const buttonText = this.textContent;
            subtitle.textContent = `Descubra mais sobre ${buttonText.toLowerCase()}!`;
            subtitle.style.color = '#40916c';
        });
        button.addEventListener('mouseleave', function() {
            subtitle.textContent = originalText;
            subtitle.style.color = '#000000';
        });
    });

    // Add click effect to login button
    const loginButton = document.querySelector('.login-button');
    loginButton.addEventListener('click', function(e) {
        e.preventDefault();
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
            window.location.href = this.href;
        }, 150);
    });

    // Random background color change on container hover (subtle)
    const container = document.querySelector('.container');
    container.addEventListener('mouseenter', function() {
        const colors = ['#d8f3dc', '#b7e4c7', '#95d5b2'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        this.style.backgroundColor = randomColor;
        this.style.transition = 'background-color 0.5s ease';
    });
    container.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '#d8f3dc';
    });
});
