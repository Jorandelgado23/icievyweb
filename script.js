/**
 * Mobile Navigation Toggle
 */
const menuToggle = document.querySelector('#mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('is-active'); // Animates hamburger to X
    });
}

// Close menu when clicking outside or on a link
document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && e.target !== menuToggle) {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('is-active');
    }
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('is-active');
    });
});

/**
 * Single Product Printing Logic
 * Opens a temporary window with just the selected product formatted as a tag
 */
function printSingleProduct(button) {
    const productCard = button.closest('.product-card');
    const printWindow = window.open('', '_blank', 'width=600,height=800');
    
    // Gather all current stylesheets to maintain design in the print window
    const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"], style'))
                        .map(s => s.outerHTML).join('');

    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
            <head>
                <title>Price Tag - Creates by Icievyy</title>
                ${styles}
                <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Montserrat:wght@500;700&display=swap" rel="stylesheet">
            </head>
            <body class="print-mode">
                <div class="product-card">
                    ${productCard.innerHTML}
                </div>
                <script>
                    window.onload = function() {
                        window.print();
                        setTimeout(() => window.close(), 500);
                    };
                <\/script>
            </body>
        </html>
    `);
    printWindow.document.close();
}

/**
 * Scroll Animation Observer
 */
const observerOptions = { 
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px' // Starts animation slightly before element enters view
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
            observer.unobserve(entry.target); // Stop observing once animated
        }
    });
}, observerOptions);

// Initialize elements for animation
document.querySelectorAll('.product-card, .intro-text, .intro-image').forEach(el => {
    // Initial styles
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.8s cubic-bezier(0.2, 1, 0.3, 1)";
    
    // Create a class-based trigger for the animation
    el.classList.add('animate-on-scroll');
    observer.observe(el);
});

// Add this small CSS helper via JS or to your style.css
const style = document.createElement('style');
style.textContent = `
    .reveal {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);