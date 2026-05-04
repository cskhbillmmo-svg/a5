const revealItems = document.querySelectorAll('.reveal');
const destinationUrl = 'https://billmmo.com';

const outboundLinks = document.querySelectorAll('.to-offer');
outboundLinks.forEach((link) => {
  link.href = destinationUrl;
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${index * 80}ms`;
  observer.observe(item);
});

document.querySelectorAll('.bank-pill').forEach((pill) => {
  pill.addEventListener('click', () => {
    document.querySelectorAll('.bank-pill').forEach((p) => p.classList.remove('active'));
    pill.classList.add('active');
  });
});

const bankSearch = document.getElementById('bankSearch');
const bankCards = document.querySelectorAll('.bank-card');
bankSearch?.addEventListener('input', (e) => {
  const q = e.target.value.toLowerCase().trim();
  bankCards.forEach((card) => {
    const name = card.querySelector('.bank-name')?.textContent.toLowerCase() || '';
    card.classList.toggle('hidden', q && !name.includes(q));
  });
});

const bankSection = document.getElementById('khoi-4');
bankSection?.addEventListener('click', (e) => {
  if (e.target.closest('.bank-search')) return;
  if (e.target.closest('.bank-pill')) return;
  if (!e.target.closest('.bank-card') && !e.target.closest('.section-cta')) return;
  e.preventDefault();
  window.open(destinationUrl, '_blank', 'noopener');
});

bankSection?.querySelectorAll('.bank-card').forEach((el) => {
  el.style.cursor = 'pointer';
});

const pageLoader = document.getElementById('pageLoader');
if (pageLoader) pageLoader.classList.add('hide');

const topnav = document.getElementById('topnav');
const topnavBurger = document.getElementById('topnavBurger');
const topnavLinks = document.getElementById('topnavLinks');

function updateTopnav() {
  if (!topnav) return;
  if (window.scrollY > 200) topnav.classList.add('show');
  else topnav.classList.remove('show');
}
window.addEventListener('scroll', updateTopnav, { passive: true });
updateTopnav();

topnavBurger?.addEventListener('click', () => {
  topnavLinks?.classList.toggle('open');
});

topnavLinks?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    topnavLinks.classList.remove('open');
  });
});

const countdownEl = document.getElementById('countdown');
function updateCountdown() {
  if (!countdownEl) return;
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  const diff = Math.max(0, end - Date.now());
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  const pad = (n) => String(n).padStart(2, '0');
  countdownEl.textContent = `${pad(h)}:${pad(m)}:${pad(s)}`;
}
setInterval(updateCountdown, 1000);
updateCountdown();

const todayCountEl = document.getElementById('todayCount');
if (todayCountEl) {
  let todayN = 1247;
  setInterval(() => {
    todayN += Math.floor(Math.random() * 3) + 1;
    todayCountEl.textContent = todayN.toLocaleString('vi-VN');
  }, 4500);
}

const scrollProgress = document.getElementById('scrollProgress');
function updateScrollProgress() {
  const scrolled = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const percent = maxScroll > 0 ? (scrolled / maxScroll) * 100 : 0;
  if (scrollProgress) scrollProgress.style.width = percent + '%';
}
window.addEventListener('scroll', updateScrollProgress, { passive: true });
updateScrollProgress();

function animateCounter(el, target, duration = 1800, suffix = '') {
  const start = performance.now();
  const startValue = 0;
  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(startValue + (target - startValue) * eased);
    el.textContent = value.toLocaleString('vi-VN') + suffix;
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = target.toLocaleString('vi-VN') + suffix;
  }
  requestAnimationFrame(tick);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      animateCounter(el, target, 1800, suffix);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll('.stat-num').forEach((el) => counterObserver.observe(el));

const txTableBody = document.querySelector('#khoi-transactions .data-table tbody');
if (txTableBody) {
  const fakeNames = [
    'Bill chuyển khoản', 'Bill biến động số dư', 'Bill số dư tài khoản', 'Bill màn hình app'
  ];
  const fakeBanks = [
    'Vietcombank', 'Techcombank', 'MB Bank', 'ACB', 'BIDV', 'VPBank', 'Sacombank',
    'OCB', 'HDBank', 'VIB', 'SHB', 'Eximbank', 'TPBank', 'VietinBank', 'MSB'
  ];
  let txCounter = 9;

  function addNewTransaction() {
    const name = fakeNames[Math.floor(Math.random() * fakeNames.length)];
    const bank = fakeBanks[Math.floor(Math.random() * fakeBanks.length)];
    const amount = (Math.floor(Math.random() * 200) + 10) * 100000;
    const tr = document.createElement('tr');
    tr.style.opacity = '0';
    tr.style.transform = 'translateY(-10px)';
    tr.style.transition = 'all 0.4s ease';
    tr.innerHTML = `<td>${txCounter++}</td><td>${name} ${amount.toLocaleString('vi-VN')}đ</td><td>${bank}</td><td><span class="status-success">Thành công</span></td>`;
    txTableBody.insertBefore(tr, txTableBody.firstChild);
    requestAnimationFrame(() => {
      tr.style.opacity = '1';
      tr.style.transform = 'translateY(0)';
    });
    while (txTableBody.children.length > 8) {
      txTableBody.removeChild(txTableBody.lastChild);
    }
  }

  setInterval(addNewTransaction, 7000);
}

const winnersRow = document.querySelector('.winners-row');
if (winnersRow) {
  let scrollDir = 1;
  setInterval(() => {
    if (winnersRow.matches(':hover')) return;
    const max = winnersRow.scrollWidth - winnersRow.clientWidth;
    if (winnersRow.scrollLeft >= max - 1) scrollDir = -1;
    else if (winnersRow.scrollLeft <= 0) scrollDir = 1;
    winnersRow.scrollBy({ left: scrollDir * 2, behavior: 'auto' });
  }, 30);
}

document.querySelectorAll('.bank-card:not(.off)').forEach((card) => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-4px) scale(1.02)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
