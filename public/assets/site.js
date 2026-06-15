const storageKey = 'safari-format-theme';
const root = document.documentElement;
const toggle = document.querySelector('[data-theme-toggle]');

function applyTheme(theme) {
  root.dataset.theme = theme;
  if (toggle) {
    toggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
  }
}

const saved = localStorage.getItem(storageKey);
if (saved === 'light' || saved === 'dark') {
  applyTheme(saved);
}

toggle?.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem(storageKey, next);
  applyTheme(next);
});
