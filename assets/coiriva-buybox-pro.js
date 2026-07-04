// Coiriva v2.5.5 – Buy Box Audit PRO | Sticky CTA + button states
(function () {
  function initSticky() {
    var sticky = document.querySelector('[data-coiriva-sticky-atc]');
    var mainButton = document.querySelector('.main-product-form .product-form__submit, product-form[data-main="true"] .product-form__submit, .product-form__submit.coiriva-premium-atc');
    var trigger = document.querySelector('.product-form__buttons') || mainButton;
    var stickyButton = document.querySelector('[data-coiriva-sticky-submit]');
    if (!sticky || !mainButton || !trigger || !stickyButton) return;

    sticky.hidden = false;
    document.body.classList.add('coiriva-sticky-atc-active');

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) sticky.classList.remove('is-visible');
        else if (window.scrollY > 500) sticky.classList.add('is-visible');
      });
    }, { threshold: 0.05 });
    observer.observe(trigger);

    stickyButton.addEventListener('click', function () { mainButton.click(); });
  }

  function initButtonStates() {
    document.querySelectorAll('.product-form__submit.coiriva-premium-atc').forEach(function (button) {
      if (button.dataset.coirivaCtaReady === 'true') return;
      button.dataset.coirivaCtaReady = 'true';
      var label = button.querySelector('.main-atc__label__text');
      if (label && !label.dataset.originalText) label.dataset.originalText = label.textContent.trim();
      var form = button.closest('form');
      if (!form) return;
      form.addEventListener('submit', function () {
        if (!label) return;
        button.setAttribute('aria-busy', 'true');
        label.textContent = 'ADDING...';
        window.setTimeout(function () {
          if (button.getAttribute('aria-busy') === 'true') {
            button.removeAttribute('aria-busy');
            label.textContent = label.dataset.originalText || 'ADD TO CART — SHIPS TODAY';
          }
        }, 2200);
      });
    });
  }

  function init() {
    initSticky();
    initButtonStates();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
