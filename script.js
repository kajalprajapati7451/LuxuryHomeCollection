// Initialize AOS animations
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Preloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 600);
    }, 1500);
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const backToTop = document.querySelector('.back-to-top');
    
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Tab functionality
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const tabId = this.getAttribute('data-tab');
        
        // Remove active class from all buttons and panes
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));
        
        // Add active class to clicked button and corresponding pane
        this.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});

// Form submission
document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // In real implementation, send data to server
    console.log('Form submitted:', data);
    
    // Show success message
    alert('Thank you for your interest! Our representative will contact you within 24 hours.');
    this.reset();
    
    // Close form if in modal (optional)
    // Reset form animation
    this.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(input => {
        input.style.transform = 'scale(0.95)';
        setTimeout(() => {
            input.style.transform = 'scale(1)';
        }, 100);
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const overlay = document.querySelector('.hero-overlay');
    
    if (hero && overlay) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translate3d(0, ${rate}px, 0)`;
        overlay.style.opacity = 1 - (scrolled / 1000);
    }
});

// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.feature-item, .amenity-card, .plan-feature').forEach(el => {
    observer.observe(el);
});

// Count-up animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        element.textContent = Math.floor(start);
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// Initialize counters when they come into view
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                const target = parseInt(counter.textContent);
                animateCounter(counter, target);
            });
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    counterObserver.observe(statsSection);
}

// Image lazy loading
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// Add current year to footer
document.querySelector('.footer-bottom p:first-child').innerHTML = 
    `&copy; ${new Date().getFullYear()} Supreme Project Kharadi. All rights reserved.`;

// Newsletter subscription (optional)
const newsletterForm = document.createElement('form');
newsletterForm.className = 'newsletter-form';
newsletterForm.innerHTML = `
    <h4>Stay Updated</h4>
    <div class="form-group">
        <input type="email" placeholder="Enter your email" required>
        <button type="submit" class="btn btn-primary">
            <i class="fas fa-paper-plane"></i>
        </button>
    </div>
`;

// Add newsletter to footer if needed
const footerBrand = document.querySelector('.footer-brand');
if (footerBrand) {
    footerBrand.appendChild(newsletterForm);
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        alert(`Thank you for subscribing with ${email}!`);
        this.reset();
    });
}
// Add these functions to your existing script.js

// Set current year in footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Map initialization
function initMap() {
    // In a real implementation, you would initialize Google Maps API
    const mapFrame = document.getElementById('main-map');
    
    // Add hover effect to map
    mapFrame.addEventListener('mouseenter', function() {
        this.style.filter = 'brightness(1.1)';
    });
    
    mapFrame.addEventListener('mouseleave', function() {
        this.style.filter = 'brightness(1)';
    });
    
    // Add click event to map overlay
    const mapOverlay = document.querySelector('.map-overlay');
    mapOverlay.addEventListener('click', function() {
        alert('Opening directions to Supreme Project, Kharadi...');
        // In real implementation, open Google Maps directions
        window.open('https://www.google.com/maps/dir//Kharadi,+Pune,+Maharashtra/@18.5744664,73.927407,17z/data=!4m6!4m5!1m0!1m2!1m1!1s0x3bc2c13b01310c71:0x7c3ab9d8d92623c!3e0', '_blank');
    });
}

// Initialize map when page loads
window.addEventListener('load', initMap);

// Theme-specific animations
document.addEventListener('DOMContentLoaded', function() {
    // Add floating animation to map features
    const mapFeatures = document.querySelectorAll('.map-feature');
    mapFeatures.forEach((feature, index) => {
        feature.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Add scroll effect for map section
    const mapSection = document.querySelector('.map-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.3 });
    
    if (mapSection) {
        observer.observe(mapSection);
    }
    
    // Add ripple effect to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .btn {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);