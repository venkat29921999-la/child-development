document.addEventListener('DOMContentLoaded', () => {

  const roleSelect = document.getElementById('roleSelect');
  const authCard = document.getElementById('authCard');
  const authBack = document.getElementById('authBack');
  const roleBadge = document.getElementById('roleBadge');
  const ageGroupField = document.getElementById('ageGroupField');
  const specialtyField = document.getElementById('specialtyField');
  const roleCards = document.querySelectorAll('.role-card');

  authCard.style.display = 'none';

  /* ===== ROLE SELECTION ===== */
  let selectedRole = 'user';
  roleCards.forEach(card => {
    card.addEventListener('click', () => {
      const role = card.dataset.role;
      selectedRole = role;
      roleSelect.style.display = 'none';
      authCard.style.display = 'grid';
      authCard.classList.add('show');

      if (role === 'admin') {
        roleBadge.innerHTML = '<i class="fa-solid fa-user-shield"></i> Signing in as Admin / Specialist';
        ageGroupField.style.display = 'none';
        specialtyField.style.display = 'flex';
      } else {
        roleBadge.innerHTML = '<i class="fa-solid fa-user"></i> Signing in as Parent / User';
        ageGroupField.style.display = 'flex';
        specialtyField.style.display = 'none';
      }
    });
  });

  authBack.addEventListener('click', () => {
    authCard.style.display = 'none';
    authCard.classList.remove('show');
    roleSelect.style.display = 'flex';
  });

  /* ===== LOGIN / SIGNUP TABS ===== */
  const authTabs = document.querySelectorAll('.auth-tab');
  const authForms = document.querySelectorAll('.auth-form');
  authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      authTabs.forEach(t => t.classList.remove('active'));
      authForms.forEach(f => f.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(tab.dataset.target).classList.add('active');
    });
  });

  /* ===== SWITCH LINKS INSIDE FORMS ===== */
  document.querySelectorAll('.switch-to').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.dataset.target;
      authTabs.forEach(t => t.classList.toggle('active', t.dataset.target === target));
      authForms.forEach(f => f.classList.toggle('active', f.id === target));
    });
  });

  /* ===== PASSWORD VISIBILITY TOGGLE ===== */
  document.querySelectorAll('.toggle-pass').forEach(icon => {
    icon.addEventListener('click', () => {
      const input = icon.previousElementSibling;
      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      icon.classList.toggle('fa-eye');
      icon.classList.toggle('fa-eye-slash');
    });
  });

  /* ===== FORM SUBMIT FEEDBACK + REDIRECT ===== */
  document.querySelectorAll('.auth-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const note = document.getElementById('authNote');
      note.textContent = form.id === 'login'
        ? "Welcome back! Redirecting to your dashboard..."
        : "Account created! Redirecting to your dashboard...";
      const destination = selectedRole === 'admin' ? 'admindashboard.html' : 'userdashboard.html';
      setTimeout(() => { window.location.href = destination; }, 1100);
    });
  });

});