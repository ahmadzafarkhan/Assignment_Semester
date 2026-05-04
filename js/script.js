// ========== MOBILE MENU TOGGLE ==========
const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');

if (menuBtn) {
    menuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('show');
    });
}

// ========== SET ACTIVE NAV LINK ==========
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ========== BACKGROUND SLIDESHOW (FIXED) ==========
let slideIndex = 0;
let slidesTimer;

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    if (!slides.length) return;
    
    // Hide all slides
    slides.forEach(slide => {
        slide.classList.remove('active-slide');
    });
    
    // Show current slide
    if (index >= slides.length) slideIndex = 0;
    if (index < 0) slideIndex = slides.length - 1;
    
    slides[slideIndex].classList.add('active-slide');
}

function nextSlide() {
    slideIndex++;
    const slides = document.querySelectorAll('.slide');
    if (slideIndex >= slides.length) {
        slideIndex = 0;
    }
    showSlide(slideIndex);
}

function startSlideshow() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;
    
    // Show first slide
    slideIndex = 0;
    showSlide(slideIndex);
    
    // Clear existing timer
    if (slidesTimer) clearInterval(slidesTimer);
    
    // Start new timer (change every 5 seconds)
    slidesTimer = setInterval(nextSlide, 5000);
}

function stopSlideshow() {
    if (slidesTimer) {
        clearInterval(slidesTimer);
        slidesTimer = null;
    }
}

// ========== CHECK IF ON HOME PAGE AND START SLIDESHOW ==========
function isHomePage() {
    const path = window.location.pathname;
    const fileName = path.split('/').pop();
    return fileName === 'index.html' || fileName === '' || path === '/' || path.endsWith('/');
}

// Start slideshow when page loads (only on home page)
document.addEventListener('DOMContentLoaded', function() {
    setActiveNavLink();
    
    if (isHomePage()) {
        // Small delay to ensure DOM is fully ready
        setTimeout(startSlideshow, 100);
    }
});

// Stop slideshow when leaving home page (optional, for performance)
window.addEventListener('beforeunload', function() {
    stopSlideshow();
});

// ========== CONTACT FORM HANDLING ==========
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const feedback = document.getElementById('feedback');
        
        if (!name || !email) {
            feedback.innerHTML = '❌ Please fill in name and email';
            feedback.style.color = 'red';
            return;
        }
        
        if (!email.includes('@') || !email.includes('.')) {
            feedback.innerHTML = '❌ Please enter a valid email address';
            feedback.style.color = 'red';
            return;
        }
        
        feedback.innerHTML = '✅ Thank you! A security expert will contact you within 24 hours.';
        feedback.style.color = 'green';
        this.reset();
        
        setTimeout(() => {
            feedback.innerHTML = '';
        }, 5000);
    });
}

console.log('TechHub website loaded successfully!');