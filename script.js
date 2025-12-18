// Mobile Menu
const menuToggle = document.querySelector('#mobile-menu');
const navLinks = document.querySelector('.nav-links');

if(menuToggle) {
    menuToggle.onclick = () => navLinks.classList.toggle('active');
}

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close');

document.querySelectorAll('.gallery-card img').forEach(image => {
    image.onclick = () => {
        lightbox.style.display = 'flex';
        lightboxImg.src = image.src;
    };
});

if(closeBtn) {
    closeBtn.onclick = () => lightbox.style.display = 'none';
}

// Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-card');

filterBtns.forEach(btn => {
    btn.onclick = () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');

        galleryItems.forEach(item => {
            if(filter === 'all' || item.classList.contains(filter)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    };
});