// Generate starfield
function createStarfield() {
  const starfield = document.getElementById('starfield');
  const starCount = 100;

  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.width = `${Math.random() * 2 + 1}px`;
    star.style.height = star.style.width;
    star.style.animationDelay = `${Math.random() * 3}s`;
    star.style.animationDuration = `${Math.random() * 2 + 2}s`;
    starfield.appendChild(star);
  }
}

// Initialize starfield on load
createStarfield();

// Form handling
const loginForm = document.getElementById('loginForm');
const loginBtn = document.getElementById('loginBtn');
const formStatus = document.getElementById('formStatus');

// API base URL - points to the main server
const API_BASE = 'http://localhost:8787';

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  if (!email || !password) {
    showStatus('Please fill in all fields', 'error');
    return;
  }

  // Start loading state
  loginBtn.classList.add('loading');
  loginBtn.disabled = true;
  formStatus.className = 'form-status';
  formStatus.textContent = '';

  try {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Authentication failed');
    }

    // Success - store token and redirect
    showStatus('Access granted. Initializing dashboard...', 'success');
    
    if (data.token) {
      localStorage.setItem('teacher_token', data.token);
      localStorage.setItem('teacher_email', email);
    }

    // Redirect to dashboard after short delay
    setTimeout(() => {
      window.location.href = '/dashboard.html';
    }, 1500);

  } catch (error) {
    showStatus(error.message || 'Connection failed. Please try again.', 'error');
  } finally {
    loginBtn.classList.remove('loading');
    loginBtn.disabled = false;
  }
});

function showStatus(message, type) {
  formStatus.textContent = message;
  formStatus.className = `form-status ${type}`;
}

// Add keyboard shortcut hints
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && e.ctrlKey) {
    loginForm.dispatchEvent(new Event('submit'));
  }
});

// Animate inputs on focus
const inputs = document.querySelectorAll('.form-input');
inputs.forEach(input => {
  input.addEventListener('focus', () => {
    input.parentElement.classList.add('focused');
  });
  input.addEventListener('blur', () => {
    input.parentElement.classList.remove('focused');
  });
});
