// AfriMedTrip — Main JavaScript

// ── Navbar Scroll ──
const navbar = document.getElementById('navbar');
const isHomePage = window.location.pathname === '/' || window.location.pathname.endsWith('index.html');

if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
      if (!isHomePage) navbar.classList.add('light');
    } else {
      navbar.classList.remove('scrolled');
      if (!isHomePage) navbar.classList.remove('light');
    }
  });
  // On inner pages, always show light nav
  if (!isHomePage) navbar.classList.add('light');
}

// ── Mobile Menu ──
const mobileBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
if (mobileBtn && mobileMenu) {
  mobileBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}

// ── Scroll Reveal ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('revealed');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

// Also handle .fade-up
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      fadeObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));

// ── Progress bar for multi-step forms ──
function updateProgress(step, total) {
  const bar = document.getElementById('progressBar');
  const label = document.getElementById('progressLabel');
  if (bar) bar.style.width = ((step / total) * 100) + '%';
  if (label) label.textContent = `Step ${step} of ${total}`;
}

// ── Form multi-step navigation ──
let currentStep = 1;
const totalSteps = 4;

function goToStep(step) {
  document.querySelectorAll('[data-step]').forEach(el => el.classList.add('hidden'));
  const target = document.querySelector(`[data-step="${step}"]`);
  if (target) {
    target.classList.remove('hidden');
    currentStep = step;
    updateProgress(step, totalSteps);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

window.goToStep = goToStep;

// ── Toast notification ──
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] px-6 py-3 rounded-xl font-semibold text-sm shadow-2xl transition-all
    ${type === 'success' ? 'bg-forest text-white' : 'bg-red-600 text-white'}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 400); }, 3000);
}
window.showToast = showToast;

// ── Smooth anchor hash scroll ──
document.querySelectorAll('a[href*="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const hash = link.getAttribute('href').split('#')[1];
    const target = document.getElementById(hash);
    if (target && link.getAttribute('href').startsWith('#')) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── WhatsApp float ──
const waHtml = `<a href="https://wa.me/255700000000" target="_blank" class="wa-float" title="Chat on WhatsApp">
  <svg width="28" height="28" fill="white" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
</a>`;
document.body.insertAdjacentHTML('beforeend', waHtml);
