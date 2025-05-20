// Scroll to top button functionality
document.addEventListener('DOMContentLoaded', function() {
    let scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerText = '↑';
    scrollTopBtn.classList.add('scroll-top');
    document.body.appendChild(scrollTopBtn);

    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
