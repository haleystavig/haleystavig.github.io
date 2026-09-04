// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (toggle && navLinks) {
  toggle.addEventListener('click', () => navLinks.classList.toggle('open'));
}

// Highlight active nav link based on current page filename
const page = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === page || (page === 'index.html' && href === 'index.html')) {
    a.classList.add('active');
  }
});

// Load gallery content from data/content.json
// Called by individual pages that have gallery containers
function loadGalleries(options) {
  fetch('data/content.json')
    .then(r => r.json())
    .then(data => {
      if (options.portraits) {
        const el = document.getElementById(options.portraits);
        if (el) el.innerHTML = data.portraits.map(portraitCard).join('');
      }
      if (options.portfolio) {
        const el = document.getElementById(options.portfolio);
        if (el) el.innerHTML = data.portfolio.map(portfolioCard).join('');
      }
    })
    .catch(() => {
      [options.portraits, options.portfolio].filter(Boolean).forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = '<p style="color:var(--text-muted);grid-column:1/-1;padding:3rem 0;text-align:center">Photos coming soon.</p>';
      });
    });
}

function portraitCard(item) {
  return `<div class="gc">
    <div class="gc-img portrait-ratio">
      ${item.image ? `<img src="${item.image}" alt="${item.title}" loading="lazy">` : '<div class="gc-grid-ph"></div>'}
    </div>
    <p class="gc-name">${item.title}</p>
    <p class="gc-desc">${item.description}</p>
    <p class="gc-price">${item.price}</p>
  </div>`;
}

function portfolioCard(item) {
  return `<div class="gc">
    <div class="gc-img portfolio-ratio">
      ${item.image ? `<img src="${item.image}" alt="${item.title}" loading="lazy">` : '<div class="gc-grid-ph"></div>'}
    </div>
    <p class="gc-name">${item.title}</p>
    <p class="gc-desc">${item.description}</p>
  </div>`;
}
