const API_BASE = 'http://localhost:8787';

type StatusType = 'success' | 'error';

function createStarfield() {
  const starfield = document.getElementById('starfield');
  if (!starfield) return;
  const starCount = 100;

  for (let i = 0; i < starCount; i += 1) {
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

createStarfield();

const loginForm = document.getElementById('loginForm') as HTMLFormElement | null;
const loginBtn = document.getElementById('loginBtn') as HTMLButtonElement | null;
const formStatus = document.getElementById('formStatus') as HTMLElement | null;

function showStatus(message: string, type: StatusType) {
  if (!formStatus) return;
  formStatus.textContent = message;
  formStatus.className = `form-status ${type}`;
}

if (loginForm && loginBtn) {
  loginForm.addEventListener('submit', async e => {
    e.preventDefault();

    const emailInput = document.getElementById('email') as HTMLInputElement | null;
    const passwordInput = document.getElementById('password') as HTMLInputElement | null;
    const email = emailInput?.value.trim() ?? '';
    const password = passwordInput?.value ?? '';

    if (!email || !password) {
      showStatus('Please fill in all fields', 'error');
      return;
    }

    loginBtn.classList.add('loading');
    loginBtn.disabled = true;
    if (formStatus) {
      formStatus.className = 'form-status';
      formStatus.textContent = '';
    }

    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data: { token?: string; error?: string } = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      showStatus('Access granted. Initializing dashboard...', 'success');

      if (data.token) {
        localStorage.setItem('teacher_token', data.token);
        localStorage.setItem('teacher_email', email);
      }

      setTimeout(() => {
        window.location.href = '/dashboard.html';
      }, 1500);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Connection failed. Please try again.';
      showStatus(message, 'error');
    } finally {
      loginBtn.classList.remove('loading');
      loginBtn.disabled = false;
    }
  });
}

document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && e.ctrlKey && loginForm) {
    loginForm.dispatchEvent(new Event('submit'));
  }
});

const devBypassBtn = document.getElementById('devBypassBtn') as HTMLButtonElement | null;
if (devBypassBtn) {
  devBypassBtn.addEventListener('click', () => {
    localStorage.setItem('teacher_token', 'dev-bypass-token');
    localStorage.setItem('teacher_email', 'dev@localhost');
    showStatus('Dev mode activated. Redirecting...', 'success');

    setTimeout(() => {
      window.location.href = '/dashboard.html';
    }, 800);
  });
}

const inputs = document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('.form-input');
inputs.forEach(input => {
  input.addEventListener('focus', () => {
    input.parentElement?.classList.add('focused');
  });
  input.addEventListener('blur', () => {
    input.parentElement?.classList.remove('focused');
  });
});
