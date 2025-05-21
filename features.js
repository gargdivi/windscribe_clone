// Features Page JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initFeatureCategories();
    initFeatureDetails();
    initStatsCounter();
    initScrollAnimations();
    initParallaxEffects();
});

// Feature Categories Interaction
function initFeatureCategories() {
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        // Click handling
        card.addEventListener('click', () => {
            const category = card.querySelector('h3').textContent;
            const targetSection = document.querySelector(`#${category.toLowerCase().replace(/\s+/g, '-')}`);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                
                // Highlight the section briefly
                targetSection.classList.add('highlight');
                setTimeout(() => {
                    targetSection.classList.remove('highlight');
                }, 2000);
            }
        });

        // Hover effect
        card.addEventListener('mouseenter', () => {
            categoryCards.forEach(c => {
                if (c !== card) {
                    c.style.opacity = '0.7';
                }
            });
        });

        card.addEventListener('mouseleave', () => {
            categoryCards.forEach(c => {
                c.style.opacity = '1';
            });
        });
    });
}

// Feature Details Interaction
function initFeatureDetails() {
    const featureSections = document.querySelectorAll('.feature-section');
    
    featureSections.forEach((section, index) => {
        // Add animation classes based on index
        const content = section.querySelector('.feature-content');
        const image = section.querySelector('.feature-image');
        
        if (content && image) {
            content.classList.add(index % 2 === 0 ? 'slide-in-left' : 'slide-in-right');
            image.classList.add(index % 2 === 0 ? 'slide-in-right' : 'slide-in-left');
        }

        // Add hover effect to feature images
        const featureImage = section.querySelector('.feature-image img');
        if (featureImage) {
            featureImage.addEventListener('mouseenter', () => {
                featureImage.style.transform = 'scale(1.05)';
            });

            featureImage.addEventListener('mouseleave', () => {
                featureImage.style.transform = 'scale(1)';
            });
        }

        // Add click handling for feature list items
        const featureList = section.querySelector('.feature-list');
        if (featureList) {
            const listItems = featureList.querySelectorAll('li');
            listItems.forEach(item => {
                item.addEventListener('click', () => {
                    // Remove active class from all items
                    listItems.forEach(li => li.classList.remove('active'));
                    // Add active class to clicked item
                    item.classList.add('active');
                });
            });
        }
    });
}

// Stats Counter Animation
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.textContent);
                let currentValue = 0;
                const duration = 2000; // 2 seconds
                const increment = finalValue / (duration / 16); // 60fps

                const counter = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= finalValue) {
                        target.textContent = finalValue.toLocaleString();
                        clearInterval(counter);
                    } else {
                        target.textContent = Math.floor(currentValue).toLocaleString();
                    }
                }, 16);

                observer.unobserve(target);
            }
        });
    }, {
        threshold: 0.5
    });

    stats.forEach(stat => observer.observe(stat));
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.feature-section, .category-card, .stat-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        observer.observe(element);
    });
}

// Parallax Effects
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.feature-image');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Add smooth scrolling for anchor links
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

// Add CSS for animations and effects
const style = document.createElement('style');
style.textContent = `
    .highlight {
        animation: highlight 2s ease-out;
    }

    .slide-in-left {
        animation: slideInLeft 1s ease-out;
    }

    .slide-in-right {
        animation: slideInRight 1s ease-out;
    }

    .fade-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }

    .feature-list li {
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .feature-list li:hover {
        transform: translateX(10px);
    }

    .feature-list li.active {
        color: #4CAF50;
        font-weight: 600;
    }

    @keyframes highlight {
        0% {
            background-color: rgba(76, 175, 80, 0.1);
        }
        100% {
            background-color: transparent;
        }
    }

    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style); 