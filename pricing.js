// Pricing Page JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initPricingToggle();
    initPricingCards();
    initComparisonTable();
    initFAQ();
    initScrollAnimations();
});

// Pricing Toggle (Monthly/Yearly)
function initPricingToggle() {
    const toggle = document.querySelector('.toggle-switch input');
    const monthlyPrices = document.querySelectorAll('.monthly-price');
    const yearlyPrices = document.querySelectorAll('.yearly-price');
    const monthlyLabels = document.querySelectorAll('.monthly-label');
    const yearlyLabels = document.querySelectorAll('.yearly-label');

    if (!toggle) return;

    toggle.addEventListener('change', () => {
        const isYearly = toggle.checked;
        
        // Toggle prices
        monthlyPrices.forEach(price => {
            price.style.display = isYearly ? 'none' : 'block';
        });
        yearlyPrices.forEach(price => {
            price.style.display = isYearly ? 'block' : 'none';
        });

        // Toggle labels
        monthlyLabels.forEach(label => {
            label.style.opacity = isYearly ? '0.5' : '1';
        });
        yearlyLabels.forEach(label => {
            label.style.opacity = isYearly ? '1' : '0.5';
        });

        // Animate price changes
        const cards = document.querySelectorAll('.pricing-card');
        cards.forEach(card => {
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
                card.style.transform = card.classList.contains('featured') ? 'scale(1.05)' : 'scale(1)';
            }, 150);
        });
    });
}

// Pricing Cards Interaction
function initPricingCards() {
    const cards = document.querySelectorAll('.pricing-card');
    
    cards.forEach(card => {
        // Hover effect
        card.addEventListener('mouseenter', () => {
            cards.forEach(c => {
                if (c !== card) {
                    c.style.opacity = '0.7';
                }
            });
        });

        card.addEventListener('mouseleave', () => {
            cards.forEach(c => {
                c.style.opacity = '1';
            });
        });

        // Click tracking
        const ctaButton = card.querySelector('.pricing-cta');
        if (ctaButton) {
            ctaButton.addEventListener('click', (e) => {
                const plan = card.querySelector('.pricing-header h3').textContent;
                const price = card.querySelector('.pricing-price').textContent;
                const isYearly = document.querySelector('.toggle-switch input').checked;
                
                // Log the selection (replace with actual analytics)
                console.log('Plan selected:', {
                    plan,
                    price,
                    billing: isYearly ? 'yearly' : 'monthly',
                    timestamp: new Date().toISOString()
                });

                // Optional: Add to cart or redirect to checkout
                // e.preventDefault();
                // window.location.href = `/checkout?plan=${encodeURIComponent(plan)}&billing=${isYearly ? 'yearly' : 'monthly'}`;
            });
        }
    });
}

// Comparison Table Features
function initComparisonTable() {
    const table = document.querySelector('.comparison-table');
    if (!table) return;

    // Make table rows interactive
    const rows = table.querySelectorAll('tr');
    rows.forEach(row => {
        row.addEventListener('mouseenter', () => {
            const cells = row.querySelectorAll('td');
            cells.forEach(cell => {
                cell.style.backgroundColor = '#f8f9fa';
            });
        });

        row.addEventListener('mouseleave', () => {
            const cells = row.querySelectorAll('td');
            cells.forEach(cell => {
                cell.style.backgroundColor = '';
            });
        });
    });

    // Add tooltips for feature descriptions
    const tooltipCells = table.querySelectorAll('td[data-tooltip]');
    tooltipCells.forEach(cell => {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = cell.dataset.tooltip;
        cell.appendChild(tooltip);

        cell.addEventListener('mouseenter', () => {
            tooltip.style.opacity = '1';
            tooltip.style.visibility = 'visible';
        });

        cell.addEventListener('mouseleave', () => {
            tooltip.style.opacity = '0';
            tooltip.style.visibility = 'hidden';
        });
    });
}

// FAQ Accordion
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (!question || !answer) return;

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    if (otherAnswer) {
                        otherAnswer.style.maxHeight = '0';
                    }
                }
            });

            // Toggle current item
            item.classList.toggle('active');
            answer.style.maxHeight = isActive ? '0' : answer.scrollHeight + 'px';
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.pricing-card, .comparison-section, .faq-item');
    
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

// Add CSS for tooltips
const style = document.createElement('style');
style.textContent = `
    .tooltip {
        position: absolute;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 0.9rem;
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
        pointer-events: none;
        max-width: 200px;
        text-align: center;
    }

    .fade-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
`;
document.head.appendChild(style); 