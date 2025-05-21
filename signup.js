// Custom Cursor
const cursor = document.querySelector('.custom-cursor');
const cursorTrail = document.querySelector('.cursor-trail');
let trailPositions = [];
const trailLength = 10;

document.addEventListener('mousemove', (e) => {
    // Update main cursor position
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';

    // Update trail positions
    trailPositions.unshift({ x: e.clientX, y: e.clientY });
    if (trailPositions.length > trailLength) {
        trailPositions.pop();
    }

    // Update trail element positions with delay
    trailPositions.forEach((pos, index) => {
        setTimeout(() => {
            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            trail.style.left = pos.x + 'px';
            trail.style.top = pos.y + 'px';
            trail.style.opacity = 1 - (index / trailLength);
            document.body.appendChild(trail);

            // Remove trail element after animation
            setTimeout(() => {
                trail.remove();
            }, 100);
        }, index * 20);
    });
});

// Cursor effects for interactive elements
const interactiveElements = document.querySelectorAll('a, button, input, .custom-checkbox');
interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.classList.add('active');
    });
    element.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
    });
});

// Password Strength Checker
const passwordInput = document.getElementById('password');
const strengthLevel = document.querySelector('.strength-level');
const strengthText = document.querySelector('.strength-text');

passwordInput.addEventListener('input', () => {
    const password = passwordInput.value;
    let strength = 0;
    let feedback = '';

    // Length check
    if (password.length >= 8) strength += 25;
    // Uppercase check
    if (/[A-Z]/.test(password)) strength += 25;
    // Lowercase check
    if (/[a-z]/.test(password)) strength += 25;
    // Special character check
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;

    // Update strength bar
    strengthLevel.style.width = `${strength}%`;

    // Update strength text and color
    if (strength <= 25) {
        strengthLevel.style.background = '#ff4444';
        feedback = 'Weak';
    } else if (strength <= 50) {
        strengthLevel.style.background = '#ffbb33';
        feedback = 'Fair';
    } else if (strength <= 75) {
        strengthLevel.style.background = '#00C851';
        feedback = 'Good';
    } else {
        strengthLevel.style.background = '#007E33';
        feedback = 'Strong';
    }

    strengthText.textContent = `Password strength: ${feedback}`;
});

// Password Visibility Toggle
const togglePassword = document.querySelector('.toggle-password');
const passwordInputs = document.querySelectorAll('input[type="password"]');

togglePassword.addEventListener('click', () => {
    const type = passwordInputs[0].type === 'password' ? 'text' : 'password';
    passwordInputs.forEach(input => {
        input.type = type;
    });
    togglePassword.querySelector('i').classList.toggle('fa-eye');
    togglePassword.querySelector('i').classList.toggle('fa-eye-slash');
});

// Form Validation
const form = document.getElementById('signup-form');
const emailInput = document.getElementById('email');
const confirmPasswordInput = document.getElementById('confirm-password');
const submitBtn = document.querySelector('.submit-btn');
const loadingOverlay = document.querySelector('.loading-overlay');

// Email validation
emailInput.addEventListener('input', () => {
    const email = emailInput.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validationMessage = emailInput.parentElement.nextElementSibling;

    if (!email) {
        validationMessage.textContent = 'Email is required';
        validationMessage.style.color = '#ff4444';
    } else if (!emailRegex.test(email)) {
        validationMessage.textContent = 'Please enter a valid email address';
        validationMessage.style.color = '#ff4444';
    } else {
        validationMessage.textContent = 'Email looks good!';
        validationMessage.style.color = '#00C851';
    }
});

// Password confirmation validation
confirmPasswordInput.addEventListener('input', () => {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const validationMessage = confirmPasswordInput.parentElement.nextElementSibling;

    if (!confirmPassword) {
        validationMessage.textContent = 'Please confirm your password';
        validationMessage.style.color = '#ff4444';
    } else if (password !== confirmPassword) {
        validationMessage.textContent = 'Passwords do not match';
        validationMessage.style.color = '#ff4444';
    } else {
        validationMessage.textContent = 'Passwords match!';
        validationMessage.style.color = '#00C851';
    }
});

// Form submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate all fields
    const email = emailInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const termsChecked = document.querySelector('.custom-checkbox input').checked;

    if (!email || !password || !confirmPassword || !termsChecked) {
        showNotification('Please fill in all fields and accept the terms', 'error');
        return;
    }

    if (password !== confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return;
    }

    // Show loading state
    submitBtn.classList.add('loading');
    loadingOverlay.classList.add('active');

    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Show success message
        showNotification('Account created successfully!', 'success');
        
        // Redirect to dashboard (simulated)
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
    } catch (error) {
        showNotification('An error occurred. Please try again.', 'error');
    } finally {
        submitBtn.classList.remove('loading');
        loadingOverlay.classList.remove('active');
    }
});

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;

    document.body.appendChild(notification);

    // Trigger animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add notification styles
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        gap: 0.5rem;
        transform: translateX(120%);
        transition: transform 0.3s ease;
        z-index: 10000;
    }

    .notification.show {
        transform: translateX(0);
    }

    .notification.success {
        border-left: 4px solid #00C851;
    }

    .notification.error {
        border-left: 4px solid #ff4444;
    }

    .notification i {
        font-size: 1.2rem;
    }

    .notification.success i {
        color: #00C851;
    }

    .notification.error i {
        color: #ff4444;
    }
`;
document.head.appendChild(style);

// Social Sign Up Buttons
document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const provider = btn.classList.contains('google') ? 'Google' : 'GitHub';
        showNotification(`Signing up with ${provider}...`, 'info');
        // Add actual social sign-up logic here
    });
}); 