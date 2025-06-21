// Heberg.cloud Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initModal();
    initScrollAnimations();
    initFormHandling();
    initButtonHandlers();
    initHeaderScroll();
    initThemeToggle();
});

// Navigation functionality
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav__link');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal links
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
                
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
}

// Modal functionality
function initModal() {
    const urgentBtn = document.getElementById('urgentContact');
    const modal = document.getElementById('urgentModal');
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = document.getElementById('modalOverlay');

    // Open modal
    if (urgentBtn) {
        urgentBtn.addEventListener('click', function() {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    // Close modal functions
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// Scroll animations (AOS-like functionality)
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    function checkAnimations() {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;
            
            // Element is in viewport
            if (elementTop < windowHeight * 0.8 && elementBottom > 0) {
                element.classList.add('aos-animate');
            }
        });
    }

    // Check animations on scroll
    window.addEventListener('scroll', throttle(checkAnimations, 100));
    
    // Initial check
    checkAnimations();
}

// Form handling
function initFormHandling() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };
            
            // Basic validation
            if (!data.name || !data.email || !data.subject || !data.message) {
                showNotification('Veuillez remplir tous les champs requis.', 'error');
                return;
            }
            
            if (!isValidEmail(data.email)) {
                showNotification('Veuillez entrer une adresse email valide.', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Envoi en cours...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                showNotification('Votre message a été envoyé avec succès! Nous vous répondrons dans les plus brefs délais.', 'success');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
}

// Button handlers
function initButtonHandlers() {
    // Discover offers button
    const discoverBtn = document.getElementById('discoverOffers');
    if (discoverBtn) {
        discoverBtn.addEventListener('click', function() {
            const servicesSection = document.getElementById('services');
            if (servicesSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = servicesSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Contact us button
    const contactBtn = document.getElementById('contactUs');
    if (contactBtn) {
        contactBtn.addEventListener('click', function() {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = contactSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Service card buttons
    const serviceButtons = document.querySelectorAll('.service-card__btn');
    serviceButtons.forEach(button => {
        button.addEventListener('click', function() {
            const serviceCard = this.closest('.service-card');
            const serviceTitle = serviceCard.querySelector('.service-card__title').textContent;
            
            // Show service details (simulate modal or page navigation)
            showNotification(`Plus d'informations sur "${serviceTitle}" bientôt disponibles.`, 'info');
        });
    });
}

// Header scroll effects
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', throttle(function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class for styling
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show header on scroll (optional)
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    }, 100));
}

// Utility functions
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <div class="notification__icon">
                ${getNotificationIcon(type)}
            </div>
            <div class="notification__message">${message}</div>
            <button class="notification__close" onclick="this.parentElement.parentElement.remove()">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        </div>
    `;
    
    // Add styles for notification
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 80px;
                right: 20px;
                z-index: 9999;
                max-width: 400px;
                border-radius: var(--radius-lg);
                box-shadow: var(--shadow-lg);
                animation: slideInRight 0.3s ease-out;
            }
            
            .notification--success {
                background: rgba(var(--color-success-rgb), 0.1);
                border: 1px solid rgba(var(--color-success-rgb), 0.3);
                color: var(--color-success);
            }
            
            .notification--error {
                background: rgba(var(--color-error-rgb), 0.1);
                border: 1px solid rgba(var(--color-error-rgb), 0.3);
                color: var(--color-error);
            }
            
            .notification--info {
                background: rgba(var(--color-info-rgb), 0.1);
                border: 1px solid rgba(var(--color-info-rgb), 0.3);
                color: var(--color-info);
            }
            
            .notification__content {
                display: flex;
                align-items: flex-start;
                gap: var(--space-12);
                padding: var(--space-16);
            }
            
            .notification__icon {
                flex-shrink: 0;
                width: 20px;
                height: 20px;
            }
            
            .notification__message {
                flex: 1;
                font-size: var(--font-size-sm);
                line-height: 1.4;
            }
            
            .notification__close {
                background: none;
                border: none;
                cursor: pointer;
                padding: var(--space-2);
                opacity: 0.7;
                transition: opacity var(--duration-fast) var(--ease-standard);
            }
            
            .notification__close:hover {
                opacity: 1;
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @media (max-width: 480px) {
                .notification {
                    top: 70px;
                    right: 10px;
                    left: 10px;
                    max-width: none;
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideInRight 0.3s ease-out reverse';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        success: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20,6 9,17 4,12"></polyline></svg>',
        error: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>',
        info: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'
    };
    return icons[type] || icons.info;
}

// Additional enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Add loading states to buttons on click
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.disabled) {
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            }
        });
    });
    
    // Lazy loading for images (if any are added later)
    const images = document.querySelectorAll('img[data-src]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Performance optimization: Preload critical resources
    const criticalResources = [
        // Add any critical resources here
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = 'image';
        document.head.appendChild(link);
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Tab navigation enhancements
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Add CSS for keyboard navigation
const keyboardStyles = document.createElement('style');
keyboardStyles.textContent = `
    .keyboard-navigation *:focus {
        outline: 2px solid var(--color-primary) !important;
        outline-offset: 2px !important;
    }
    
    .keyboard-navigation .btn:focus {
        box-shadow: var(--focus-ring) !important;
    }
`;
document.head.appendChild(keyboardStyles);

// Theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-color-scheme', currentTheme);
    
    // Update toggle button state
    updateThemeToggleState(currentTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-color-scheme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            // Apply new theme
            document.documentElement.setAttribute('data-color-scheme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Update button state
            updateThemeToggleState(newTheme);
            
            // Show notification
            const message = newTheme === 'dark' ? 
                'Mode sombre activé' : 
                'Mode clair activé';
            showNotification(message, 'info');
        });
    }
}

function updateThemeToggleState(theme) {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const lightIcon = themeToggle.querySelector('.theme-toggle__icon--light');
        const darkIcon = themeToggle.querySelector('.theme-toggle__icon--dark');
        
        if (theme === 'dark') {
            themeToggle.setAttribute('aria-label', 'Basculer vers le mode clair');
        } else {
            themeToggle.setAttribute('aria-label', 'Basculer vers le mode sombre');
        }
    }
}