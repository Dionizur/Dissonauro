
document.addEventListener('DOMContentLoaded', function() {
    const titles = document.querySelectorAll('.button-content h3');
    
    titles.forEach(title => {
        title.style.opacity = '0';
        title.style.transform = 'translateY(20px)';
        title.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    const buttons = document.querySelectorAll('.page-button');
    
    buttons.forEach((button, index) => {
        setTimeout(() => {
            button.style.opacity = '0';
            button.style.transform = 'translateY(20px)';
            button.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
                button.style.opacity = '1';
                button.style.transform = 'translateY(0)';
            }, 100);
        }, index * 100);
    });
    

    
    setTimeout(() => {
        titles.forEach(title => {
            title.style.opacity = '1';
            title.style.transform = 'translateY(0)';
        });
    }, 500);
});