// Navbar functionality
document.addEventListener('DOMContentLoaded', function() {
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarMenu = document.getElementById('navbarMenu');

    if (navbarToggle && navbarMenu) {
        // Toggle mobile menu
        navbarToggle.addEventListener('click', function() {
            navbarToggle.classList.toggle('active');
            navbarMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link (mobile)
        const navbarLinks = navbarMenu.querySelectorAll('.navbar-link');
        navbarLinks.forEach(link => {
            link.addEventListener('click', function() {
                navbarToggle.classList.remove('active');
                navbarMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside (mobile)
        document.addEventListener('click', function(event) {
            const isClickInsideNavbar = navbarToggle.contains(event.target) || navbarMenu.contains(event.target);

            if (!isClickInsideNavbar && navbarMenu.classList.contains('active')) {
                navbarToggle.classList.remove('active');
                navbarMenu.classList.remove('active');
            }
        });

        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                navbarToggle.classList.remove('active');
                navbarMenu.classList.remove('active');
            }
        });
    }

    // Set active link based on current page
    setActiveNavbarLink();
});

function setActiveNavbarLink() {
    const currentPath = window.location.pathname;
    const navbarLinks = document.querySelectorAll('.navbar-link');

    navbarLinks.forEach(link => {
        const href = link.getAttribute('href');

        // Remove active class from all links
        link.classList.remove('active');

        // Add active class to current page link
        if (href && currentPath.includes(href)) {
            link.classList.add('active');
        }

        // Special case for index.html
        if (href === 'index.html' && (currentPath === '/' || currentPath.endsWith('/index.html') || currentPath === '')) {
            link.classList.add('active');
        }
    });
}

// Smooth scroll for anchor links (if any)
document.addEventListener('click', function(event) {
    if (event.target.matches('a[href^="#"]')) {
        event.preventDefault();
        const targetId = event.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});
