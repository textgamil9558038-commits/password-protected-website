// Authentication check
window.addEventListener('load', function() {
    const isAuthenticated = sessionStorage.getItem('isAuthenticated');
    const loginTime = sessionStorage.getItem('loginTime');
    
    if (!isAuthenticated) {
        redirectToLogin();
        return;
    }
    
    // Optional: Check session age (24 hours)
    if (loginTime) {
        const sessionAge = Date.now() - new Date(loginTime).getTime();
        const maxSessionAge = 24 * 60 * 60 * 1000; // 24 hours
        
        if (sessionAge > maxSessionAge) {
            logout();
            return;
        }
    }
    
    // Update welcome message with login time
    updateWelcomeMessage(loginTime);
});

function updateWelcomeMessage(loginTime) {
    const timeOptions = { 
        hour: '2-digit', 
        minute: '2-digit', 
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    
    if (loginTime) {
        const loginDate = new Date(loginTime).toLocaleDateString('en-US', timeOptions);
        const welcomeElement = document.querySelector('.welcome-section p');
        if (welcomeElement) {
            welcomeElement.innerHTML += `<br><small>Logged in: ${loginDate}</small>`;
        }
    }
}

// Password change form
document.getElementById('passwordChangeForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const newPassword = document.getElementById('newPassword').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();
    const successMessage = document.getElementById('successMessage');
    
    // Validation
    if (newPassword !== confirmPassword) {
        showDashboardMessage('❌ Passwords do not match!', 'error');
        return;
    }
    
    if (newPassword.length < 4) {
        showDashboardMessage('❌ Password must be at least 4 characters long!', 'error');
        return;
    }
    
    if (newPassword === '123456') {
        showDashboardMessage('❌ Please choose a different password than the default!', 'error');
        return;
    }
    
    // Save new password
    localStorage.setItem('sitePassword', newPassword);
    
    showDashboardMessage('✅ Password successfully changed!', 'success');
    
    // Reset form
    document.getElementById('passwordChangeForm').reset();
});

function showDashboardMessage(message, type) {
    const successMessage = document.getElementById('successMessage');
    successMessage.textContent = message;
    successMessage.style.display = 'block';
    
    if (type === 'error') {
        successMessage.style.background = '#f8d7da';
        successMessage.style.color = '#721c24';
        successMessage.style.borderColor = '#f5c6cb';
    } else {
        successMessage.style.background = '#d4edda';
        successMessage.style.color = '#155724';
        successMessage.style.borderColor = '#c3e6cb';
    }
    
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 4000);
}

// Logout function
function logout() {
    sessionStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('loginTime');
    redirectToLogin();
}

function redirectToLogin() {
    window.location.href = 'index.html';
}

// Quick action buttons
function showMessage(message) {
    // Create notification element
    let notification = document.querySelector('.notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'notification';
        document.body.appendChild(notification);
    }
    
    notification.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Auto-logout on browser close
window.addEventListener('beforeunload', function() {
    // Session will be maintained unless browser is completely closed
});

// Security: Prevent back button access
window.addEventListener('pageshow', function(event) {
    if (event.persisted || (window.performance && window.performance.navigation.type === 2)) {
        const isAuthenticated = sessionStorage.getItem('isAuthenticated');
        if (!isAuthenticated) {
            redirectToLogin();
        }
    }
});
