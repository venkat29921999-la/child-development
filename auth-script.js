document.addEventListener('DOMContentLoaded', () => {

  const roleSelect = document.getElementById('roleSelect');
  const authCard = document.getElementById('authCard');
  const authBack = document.getElementById('authBack');
  const roleBadge = document.getElementById('roleBadge');
  const ageGroupField = document.getElementById('ageGroupField');
  const specialtyField = document.getElementById('specialtyField');
  const ageGroupSelect = ageGroupField.querySelector('select');
  const specialtySelect = specialtyField.querySelector('select');
  const roleCards = document.querySelectorAll('.role-card');
  const note = document.getElementById('authNote');

  authCard.style.display = 'none';

  /* ===== ROLE SELECTION ===== */

  let selectedRole = "user";

  function setRole(role) {

    selectedRole = role;

    if (role === "admin") {

      roleBadge.innerHTML =
        '<i class="fa-solid fa-user-shield"></i> Signing in as Admin / Specialist';

      ageGroupField.style.display = "none";
      ageGroupSelect.required = false;

      specialtyField.style.display = "flex";
      specialtySelect.required = true;

    } else {

      roleBadge.innerHTML =
        '<i class="fa-solid fa-user"></i> Signing in as Parent / User';

      ageGroupField.style.display = "flex";
      ageGroupSelect.required = true;

      specialtyField.style.display = "none";
      specialtySelect.required = false;
    }
  }

  roleCards.forEach(card => {

    card.addEventListener("click", () => {

      setRole(card.dataset.role);

      roleSelect.style.display = "none";
      authCard.style.display = "grid";
      authCard.classList.add("show");

    });

  });

  setRole("user");

  authBack.addEventListener("click", () => {

    authCard.style.display = "none";
    authCard.classList.remove("show");
    roleSelect.style.display = "flex";

  });

  /* ===== LOGIN / SIGNUP TABS ===== */

  const authTabs = document.querySelectorAll(".auth-tab");
  const authForms = document.querySelectorAll(".auth-form");

  function switchToTab(target) {

    authTabs.forEach(tab => {
      tab.classList.toggle("active", tab.dataset.target === target);
    });

    authForms.forEach(form => {
      form.classList.toggle("active", form.id === target);
    });

    note.textContent = "";
  }

  authTabs.forEach(tab => {

    tab.addEventListener("click", () => {

      switchToTab(tab.dataset.target);

    });

  });

  document.querySelectorAll(".switch-to").forEach(link => {

    link.addEventListener("click", e => {

      e.preventDefault();

      switchToTab(link.dataset.target);

    });

  });

  /* ===== PASSWORD SHOW / HIDE ===== */

  document.querySelectorAll(".toggle-pass").forEach(icon => {

    icon.addEventListener("click", () => {

      const input = icon.previousElementSibling;

      if (input.type === "password") {

        input.type = "text";
        icon.classList.replace("fa-eye", "fa-eye-slash");

      } else {

        input.type = "password";
        icon.classList.replace("fa-eye-slash", "fa-eye");

      }

    });

  });

  /* ===== ERROR MESSAGE ===== */

  function showError(message) {

    note.style.color = "#E0656A";
    note.textContent = message;

  }

  /* ===== LOGIN VALIDATION ===== */

  function validateLogin() {

    const email = document.querySelector('#login input[name="loginEmail"]');
    const password = document.querySelector('#login input[name="loginPassword"]');

    if (!email.value.trim() || !email.checkValidity()) {

      showError("Please enter a valid email address.");
      email.focus();
      return false;

    }

    if (!password.value.trim()) {

      showError("Please enter your password.");
      password.focus();
      return false;

    }

    return true;

  }

  /* ===== SIGNUP VALIDATION ===== */

  function validateSignup() {

    const name = document.querySelector('#signup input[name="signupName"]');
    const email = document.querySelector('#signup input[name="signupEmail"]');
    const password = document.querySelector('#signup input[name="signupPassword"]');
    const terms = document.getElementById("termsCheckbox");

    if (!name.value.trim()) {

      showError("Please enter your full name.");
      return false;

    }

    if (!email.value.trim() || !email.checkValidity()) {

      showError("Please enter a valid email.");
      return false;

    }

    if (password.value.length < 6) {

      showError("Password must be at least 6 characters.");
      return false;

    }

    if (selectedRole === "user" && !ageGroupSelect.value) {

      showError("Please select your child's age group.");
      return false;

    }

    if (selectedRole === "admin" && !specialtySelect.value) {

      showError("Please select your specialty.");
      return false;

    }

    if (!terms.checked) {

      showError("Please accept Terms & Privacy Policy.");
      return false;

    }

    return true;

  }

  /* ===================================================
          LOGIN BUTTON
          Redirect to Dashboard
  =================================================== */

  document.getElementById("loginSubmitBtn").addEventListener("click", () => {

    if (!validateLogin()) return;

    note.style.color = "green";
    note.textContent = "Login successful! Redirecting...";

    setTimeout(() => {

      if (selectedRole === "admin") {

        window.location.href = "admindashboard.html";

      } else {

        window.location.href = "userdashboard.html";

      }

    }, 1000);

  });

  /* ===================================================
          SIGNUP BUTTON
          Redirect to LOGIN FORM ONLY
  =================================================== */

  document.getElementById("signupSubmitBtn").addEventListener("click", () => {

    if (!validateSignup()) return;

    note.style.color = "green";
    note.textContent = "Account created successfully! Please login.";

    document.getElementById("signup").reset();

    setTimeout(() => {

      switchToTab("login");

      note.style.color = "green";
      note.textContent = "Please login with your new account.";

    }, 1200);

  });

  /* ===== PREVENT FORM SUBMIT ===== */

  authForms.forEach(form => {

    form.addEventListener("submit", e => {

      e.preventDefault();

    });

  });

});