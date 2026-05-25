// ===== ROLE TOGGLE =====
const roleBtns = document.querySelectorAll('.role-btn');
roleBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    roleBtns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed','false'); });
    btn.classList.add('active'); btn.setAttribute('aria-pressed','true');
  });
});

// ===== PASSWORD TOGGLE (login page) =====
const togglePwd = document.getElementById('toggle-pwd');
const passwordInput = document.getElementById('password');
if (togglePwd && passwordInput && !togglePwd.dataset.bound) {
  togglePwd.dataset.bound = 'auth-js';
  togglePwd.addEventListener('click', () => {
    const isText = passwordInput.type === 'text';
    passwordInput.type = isText ? 'password' : 'text';
    togglePwd.textContent = isText ? '👁️' : '🙈';
    togglePwd.setAttribute('aria-label', isText ? 'Show password' : 'Hide password');
  });
}

// ===== CONFIRM PASSWORD TOGGLE (register page) =====
const toggleConfirmPwd = document.getElementById('toggle-confirm-pwd');
const confirmPasswordInput = document.getElementById('confirm-password');
if (toggleConfirmPwd && confirmPasswordInput && !toggleConfirmPwd.dataset.bound) {
  toggleConfirmPwd.dataset.bound = 'auth-js';
  toggleConfirmPwd.addEventListener('click', () => {
    const isText = confirmPasswordInput.type === 'text';
    confirmPasswordInput.type = isText ? 'password' : 'text';
    toggleConfirmPwd.textContent = isText ? '👁️' : '🙈';
    toggleConfirmPwd.setAttribute('aria-label', isText ? 'Show confirm password' : 'Hide confirm password');
  });
}

// ===== PASSWORD TOGGLE (register page - standard input) =====
const toggleRegPwd = document.getElementById('toggle-reg-pwd');
const regPasswordInput = document.getElementById('reg-password');
if (toggleRegPwd && regPasswordInput && !toggleRegPwd.dataset.bound) {
  toggleRegPwd.dataset.bound = 'auth-js';
  toggleRegPwd.addEventListener('click', () => {
    const isText = regPasswordInput.type === 'text';
    regPasswordInput.type = isText ? 'password' : 'text';
    toggleRegPwd.textContent = isText ? '👁️' : '🙈';
    toggleRegPwd.setAttribute('aria-label', isText ? 'Show password' : 'Hide password');
  });
}

// ===== FORM VALIDATION & SUBMIT (login page) =====
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', async e => {
    e.preventDefault();
    let valid = true;
    const email    = document.getElementById('email');
    const emailErr = document.getElementById('email-error');
    const pwd      = document.getElementById('password');
    const pwdErr   = document.getElementById('password-error');

    // 1. Basic Format Validation
    if (!email.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      emailErr.textContent = 'Please enter a valid email address.';
      email.classList.add('error'); valid = false;
    } else { emailErr.textContent = ''; email.classList.remove('error'); }

    if (!pwd.value || pwd.value.length < 6) {
      pwdErr.textContent = 'Password must be at least 6 characters.';
      pwd.classList.add('error'); valid = false;
    } else { pwdErr.textContent = ''; pwd.classList.remove('error'); }

    if (!valid) return;

    // 2. API Request
    const btn = document.getElementById('login-submit');
    const originalText = btn.textContent;
    btn.textContent = 'Signing in…'; btn.disabled = true;

    try {
      const data = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email: email.value, password: pwd.value })
      });

      // Login success
      localStorage.setItem('jwtToken', data.token);
      localStorage.setItem('accessExam_role', data.role.toLowerCase());
      localStorage.setItem('accessExam_username', data.name);
      if (data.disabilityType) {
        localStorage.setItem('accessExam_disability', data.disabilityType.toLowerCase());
      }

      setTimeout(() => {
        window.location.href = data.role === 'ADMIN' ? 'admin-dashboard.html' : 'student-dashboard.html';
      }, 1200);

    } catch (error) {
      pwdErr.textContent = error.message || 'Invalid email or password.';
      pwd.classList.add('error');
      btn.textContent = originalText;
      btn.disabled = false;
    }
  });
}

// ===== REGISTER FORM =====
const registerForm = document.getElementById('register-form');
if (registerForm) {
  registerForm.addEventListener('submit', async e => {
    e.preventDefault();
    let valid = true;

    const firstName = document.getElementById('first-name');
    const firstNameErr = document.getElementById('first-name-error');
    const lastName = document.getElementById('last-name');
    const lastNameErr = document.getElementById('last-name-error');
    const email = document.getElementById('reg-email');
    const emailErr = document.getElementById('email-error');
    const pwd = document.getElementById('reg-password');
    const pwdErr = document.getElementById('password-error');
    const confirmPwd = document.getElementById('confirm-password');
    const confirmErr = document.getElementById('confirm-error');
    const terms = document.getElementById('terms');
    const termsErr = document.getElementById('terms-error');

    // Reset errors
    const clearError = (input, err) => {
      if (err) err.textContent = '';
      if (input) input.classList.remove('error');
    };
    const setError = (input, err, msg) => {
      if (err) err.textContent = msg;
      if (input) input.classList.add('error');
      valid = false;
    };

    clearError(firstName, firstNameErr);
    clearError(lastName, lastNameErr);
    clearError(email, emailErr);
    clearError(pwd, pwdErr);
    clearError(confirmPwd, confirmErr);
    if (termsErr) termsErr.textContent = '';

    // First Name
    if (!firstName.value.trim()) {
      setError(firstName, firstNameErr, 'First name is required.');
    }

    // Last Name
    if (!lastName.value.trim()) {
      setError(lastName, lastNameErr, 'Last name is required.');
    }

    // Email
    if (!email.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      setError(email, emailErr, 'Please enter a valid email address.');
    }

    // Password
    if (!pwd.value || pwd.value.length < 8) {
      setError(pwd, pwdErr, 'Password must be at least 8 characters.');
    }

    // Confirm Password
    if (pwd.value !== confirmPwd.value) {
      setError(confirmPwd, confirmErr, 'Passwords do not match.');
    }

    // Terms
    if (terms && !terms.checked) {
      if (termsErr) termsErr.textContent = 'You must agree to the Terms of Service.';
      valid = false;
    }

    if (!valid) return;

    const disabilitySelect = document.getElementById('disability-type');
    let disabilityType = 'NONE';
    if (disabilitySelect && disabilitySelect.value) {
      disabilityType = disabilitySelect.value.toUpperCase();
    }

    const btn = document.getElementById('register-submit');
    const originalText = btn.textContent;
    btn.textContent = 'Creating account…'; btn.disabled = true;

    try {
      const data = await apiFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          name: `${firstName.value.trim()} ${lastName.value.trim()}`,
          email: email.value.trim(),
          password: pwd.value,
          disabilityType: disabilityType,
          role: 'STUDENT'
        })
      });

      // Login success
      localStorage.setItem('jwtToken', data.token);
      localStorage.setItem('accessExam_role', data.role.toLowerCase());
      localStorage.setItem('accessExam_username', data.name);
      localStorage.setItem('accessExam_disability', disabilityType.toLowerCase());

      setTimeout(() => {
        window.location.href = 'student-dashboard.html';
      }, 1200);

    } catch (error) {
      pwdErr.textContent = error.message || 'Registration failed.';
      pwd.classList.add('error');
      btn.textContent = originalText;
      btn.disabled = false;
    }
  });
}

// ===== ACCESSIBILITY QUICK PANEL =====
const qaContrast  = document.getElementById('qa-contrast');
const qaLarge     = document.getElementById('qa-large-text');
const qaTTSAuthJs = document.getElementById('qa-tts');

if (qaContrast && !qaContrast.dataset.bound) {
  qaContrast.dataset.bound = 'auth-js';
  qaContrast.addEventListener('click', () => {
    document.body.classList.toggle('high-contrast');
    qaContrast.classList.toggle('active');
  });
}

if (qaLarge && !qaLarge.dataset.bound) {
  qaLarge.dataset.bound = 'auth-js';
  qaLarge.addEventListener('click', () => {
    document.body.classList.toggle('large-text');
    qaLarge.classList.toggle('active');
  });
}

// TTS button on register.html (no inline script there)
if (qaTTSAuthJs && !qaTTSAuthJs.dataset.bound) {
  qaTTSAuthJs.dataset.bound = 'auth-js';
  qaTTSAuthJs.addEventListener('click', () => {
    qaTTSAuthJs.classList.toggle('active');
    const msg = qaTTSAuthJs.classList.contains('active') ? 'Text to speech enabled' : 'Text to speech disabled';
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(msg);
      speechSynthesis.speak(u);
    }
  });
}
