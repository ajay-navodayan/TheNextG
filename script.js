// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');

mobileMenuBtn.addEventListener('click', function() {
    mobileMenuBtn.classList.toggle('active');
    mobileNav.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const mobileNavLinks = document.querySelectorAll('.nav-link-mobile');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', function() {
        mobileMenuBtn.classList.remove('active');
        mobileNav.classList.remove('active');
    });
});

// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
function scrollToSection(sectionId, targetForm = false) {
    const element = targetForm ? document.getElementById('contactForm') : document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Ensure focus on the form for accessibility
        if (targetForm) {
            const firstInput = element.querySelector('input');
            if (firstInput) firstInput.focus();
        }
    }
}

// Add smooth scrolling to all nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Ripple effect for buttons
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple effect to buttons
document.querySelectorAll('.ripple-btn').forEach(button => {
    button.addEventListener('click', createRipple);
});

// Add functionality to hero buttons
document.querySelector('.btn-primary').addEventListener('click', function() {
    scrollToSection('contact', true); // Target the form specifically
    console.log('Request a Call clicked');
});

document.querySelector('.btn-secondary').addEventListener('click', function() {
    scrollToSection('services');
    console.log('Explore Our Services clicked');
});

// Fade in animation on scroll
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

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Contact form handling with EmailJS
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    // Load EmailJS SDK
    const emailjsScript = document.createElement('script');
    emailjsScript.src = 'https://cdn.jsdelivr.net/npm/emailjs-com@3.2.0/dist/email.min.js';
    document.head.appendChild(emailjsScript);

    emailjsScript.onload = function() {
        // Initialize EmailJS with your public key
        emailjs.init('tOUXZvaZw5UB8D30K'); // Replace with your EmailJS public key

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Simulate form submission UI
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<span>Sending...</span>';
            submitBtn.disabled = true;
            
            // Send email via EmailJS
            emailjs.send('service_kl6jweh', 'template_29ouuek', {
                from_name: data.name,
                from_email: data.email,
                phone: data.phone,
                service: data.service,
                message: data.message
            })
            .then(function(response) {
                submitBtn.innerHTML = '<span>Message Sent!</span>';
                submitBtn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = 'linear-gradient(135deg, #00d4ff, #0ea5e9)';
                    contactForm.reset();
                }, 2000);
            }, function(error) {
                submitBtn.innerHTML = '<span>Error Sending!</span>';
                submitBtn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = 'linear-gradient(135deg, #00d4ff, #0ea5e9)';
                }, 2000);
                console.error('EmailJS error:', error);
            });
        });
    };
}

// Animated counter for stats
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Format number
        if (target >= 1000) {
            element.textContent = Math.floor(current / 1000) + ',000+';
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Trigger counter animation when stats section is visible
const statsSection = document.getElementById('stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate the numeric stats
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const text = stat.textContent;
                    if (text.includes('30,000+')) {
                        animateCounter(stat, 30000);
                    } else if (text.includes('14+')) {
                        animateCounter(stat, 14);
                    } else if (text.includes('5')) {
                        animateCounter(stat, 5);
                    }
                });
                
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-background');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add intersection observer for service cards
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach((card, index) => {
    const cardObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
            }
        });
    }, { threshold: 0.2 });
    
    cardObserver.observe(card);
});

// Add smooth reveal animation for about section
const aboutSection = document.getElementById('about');
if (aboutSection) {
    const aboutObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.3 });
    
    aboutObserver.observe(aboutSection);
}

// Add typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', function() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 100);
        }, 500);
    }
});

// Add dynamic year to footer
const currentYear = new Date().getFullYear();
const copyrightText = document.querySelector('.footer-bottom-content p');
if (copyrightText) {
    copyrightText.textContent = `© ${currentYear} THE NEXT G. All Rights Reserved.`;
}

// Add scroll progress indicator
function addScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #00d4ff, #0ea5e9);
        z-index: 10000;
        transform-origin: 0%;
        transform: scaleX(0);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = scrollTop / documentHeight;
        
        progressBar.style.transform = `scaleX(${scrollPercent})`;
        progressBar.style.width = '100%';
    });
}

// Initialize scroll progress
addScrollProgress();

// Add enhanced hover effects for social links
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(5deg)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Add focus states for accessibility
document.querySelectorAll('button, a, input, select, textarea').forEach(element => {
    element.addEventListener('focus', function() {
        this.style.outline = '2px solid #00d4ff';
        this.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
});

// Add performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounced scroll handler
const debouncedScrollHandler = debounce(function() {
    // Handle scroll events here
}, 10);
window.addEventListener('scroll', debouncedScrollHandler);

