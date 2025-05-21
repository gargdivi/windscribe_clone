document.addEventListener('DOMContentLoaded', function() {
    // Platform detection and auto-select
    const platformCards = document.querySelectorAll('.platform-card');
    const userPlatform = detectPlatform();
    
    if (userPlatform) {
        const matchingCard = document.querySelector(`.platform-card[data-platform="${userPlatform}"]`);
        if (matchingCard) {
            matchingCard.classList.add('highlight');
            matchingCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    // Download button click tracking
    const downloadButtons = document.querySelectorAll('.download-btn');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const platform = this.closest('.platform-card').dataset.platform;
            const version = this.dataset.version;
            
            // Track download click (replace with actual analytics)
            console.log(`Download clicked for ${platform} version ${version}`);
            
            // Simulate download start
            simulateDownload(this);
        });
    });

    // Version history accordion
    const versionItems = document.querySelectorAll('.version-item');
    versionItems.forEach(item => {
        const details = item.querySelector('.version-details');
        const actions = item.querySelector('.version-actions');
        
        item.addEventListener('click', function(e) {
            // Don't trigger if clicking on action links
            if (e.target.closest('.version-actions')) return;
            
            const isExpanded = item.classList.contains('expanded');
            
            // Close all items
            versionItems.forEach(vItem => {
                vItem.classList.remove('expanded');
                vItem.querySelector('.version-details').style.maxHeight = null;
            });
            
            // If this item wasn't expanded, expand it
            if (!isExpanded) {
                item.classList.add('expanded');
                details.style.maxHeight = details.scrollHeight + 'px';
            }
        });
    });

    // System requirements tabs
    const requirementTabs = document.querySelectorAll('.requirement-tab');
    const requirementContents = document.querySelectorAll('.requirement-content');
    
    requirementTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const target = this.dataset.target;
            
            // Update active tab
            requirementTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show target content
            requirementContents.forEach(content => {
                content.style.display = content.id === target ? 'block' : 'none';
            });
        });
    });

    // Scroll animations
    const animatedElements = document.querySelectorAll('.platform-card, .version-item, .requirement-card');
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Helper Functions
    function detectPlatform() {
        const userAgent = navigator.userAgent.toLowerCase();
        
        if (userAgent.includes('win')) return 'windows';
        if (userAgent.includes('mac')) return 'mac';
        if (userAgent.includes('linux')) return 'linux';
        if (userAgent.includes('android')) return 'android';
        if (userAgent.includes('iphone') || userAgent.includes('ipad')) return 'ios';
        
        return null;
    }

    function simulateDownload(button) {
        const originalText = button.innerHTML;
        button.disabled = true;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing download...';
        
        // Simulate download preparation
        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-download"></i> Downloading...';
            
            // Simulate download completion
            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-check"></i> Download Complete!';
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    button.disabled = false;
                    button.innerHTML = originalText;
                }, 3000);
            }, 2000);
        }, 1000);
    }

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Add hover effect for platform cards
    platformCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add version filter functionality
    const versionFilter = document.querySelector('.version-filter');
    if (versionFilter) {
        versionFilter.addEventListener('change', function() {
            const selectedPlatform = this.value;
            
            versionItems.forEach(item => {
                const platform = item.dataset.platform;
                item.style.display = selectedPlatform === 'all' || platform === selectedPlatform ? 'flex' : 'none';
            });
        });
    }
}); 