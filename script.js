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
    
    // 1. Add a class to the body to tell CSS we are in 'Print Mode'
    document.body.classList.add('print-mode-active');
    
    // 2. Mark this specific card as the one to show
    productCard.classList.add('is-printing');

    // 3. Small delay to let the mobile browser render the layout change
    setTimeout(() => {
        window.print();
        
        // 4. Clean up after the print dialog closes
        document.body.classList.remove('print-mode-active');
        productCard.classList.remove('is-printing');
    }, 200);
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