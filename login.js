// Default password - change this after first login
const DEFAULT_PASSWORD = '123456';

// Check if user is already logged in
window.addEventListener('load', function() {
    const isAuthenticated = sessionStorage.getItem('isAuthenticated');
    if (isAuthenticated) {
        window.location.href = 'dashboard.html';
    }
    
    // Focus on password input
    document.getElementById('password').focus();
});

// Login form handler
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const passwordInput = document.getElementById('password').value.trim();
    const errorMessage = document.getElementById('errorMessage');
    
    // Get saved password from localStorage or use default
    const savedPassword = localStorage.getItem('sitePassword') || DEFAULT_PASSWORD;
    
    if (passwordInput === savedPassword) {
        // Set authentication flag
        sessionStorage.setItem('isAuthenticated', 'true');
        sessionStorage.setItem('loginTime', new Date().toISOString());
        
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
    } else {
        showError('❌ Incorrect password! Please try again.');
        
        // Clear input
        document.getElementById('password').value = '';
        document.getElementById('password').focus();
    }
});

function showError(message) {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    
    // Hide error after 3 seconds
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 3000);
}

// Enter key support
document.getElementById('password').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        document.getElementById('loginForm').dispatchEvent(new Event('submit'));
    }
});
