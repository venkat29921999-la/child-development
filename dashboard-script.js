document.addEventListener('DOMContentLoaded', () => {

  /* ===== SIDEBAR TOGGLE (MOBILE) ===== */
  const sidebar = document.getElementById('sidebar');
  const hamburger = document.getElementById('dashHamburger');
  const closeBtn = document.getElementById('sidebarClose');
  const overlay = document.getElementById('sidebarOverlay');

  function openSidebar(){
    sidebar.classList.add('open');
    overlay.classList.add('show');
  }
  function closeSidebar(){
    sidebar.classList.remove('open');
    overlay.classList.remove('show');
  }

  hamburger?.addEventListener('click', openSidebar);
  closeBtn?.addEventListener('click', closeSidebar);
  overlay?.addEventListener('click', closeSidebar);

  /* ===== SIDEBAR ACTIVE LINK ===== */
  const sideLinks = document.querySelectorAll('.side-link');
  sideLinks.forEach(link => {
    link.addEventListener('click', () => {
      sideLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      closeSidebar();
    });
  });

  /* ===== SCROLL REVEAL ANIMATIONS ===== */
  const animatedEls = document.querySelectorAll('[data-animate]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  animatedEls.forEach(el => observer.observe(el));

  /* ===== STAT COUNTERS ===== */
  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

  function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10);
    const duration = 1300;
    const startTime = performance.now();
    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target).toLocaleString();
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target.toLocaleString();
    }
    requestAnimationFrame(tick);
  }

  /* ===== SETTINGS FORM SAVE FEEDBACK ===== */
  document.querySelectorAll('.dash-card .btn-primary').forEach(btn => {
    if (btn.closest('#settings')) {
      btn.addEventListener('click', () => {
        const original = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Saved!';
        setTimeout(() => { btn.innerHTML = original; }, 1800);
      });
    }
  });

});