/**
 * Language toggle (MK / EN)
 * - Switches ALL elements that have data-mk and data-en
 * - Persists choice in localStorage
 * - Safe with GSAP & Three.js (DOM text only)
 */

export function initLanguageToggle() {
  const buttons = document.querySelectorAll(".lang-toggle button");
  const translatableElements = document.querySelectorAll("[data-mk][data-en]");

  function applyLanguage(lang) {
    // Set document language
    document.documentElement.lang = lang;

    // Swap text content
    translatableElements.forEach(el => {
      el.innerHTML = el.dataset[lang];
    });

    // Toggle active button state
    buttons.forEach(btn => {
      btn.classList.toggle("active", btn.dataset.lang === lang);
    });

    // Persist language
    localStorage.setItem("lang", lang);
  }

  // Button click handlers
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      applyLanguage(btn.dataset.lang);
    });
  });

  // Init with saved language or default to MK
  const savedLang = localStorage.getItem("lang") || "mk";
  applyLanguage(savedLang);
}
