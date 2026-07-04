// Coiriva v2.3.0 – Premium Buy Box PRO
(function () {
  function findQuantityInput(scope) {
    return scope.querySelector('input[name="quantity"]') || document.querySelector('input[name="quantity"]');
  }

  function initBundles(root) {
    var cards = root.querySelectorAll('[data-coiriva-qty]');
    if (!cards.length) return;
    cards.forEach(function (card) {
      card.addEventListener('click', function () {
        cards.forEach(function (item) { item.classList.remove('is-active'); });
        card.classList.add('is-active');
        var qty = parseInt(card.getAttribute('data-coiriva-qty'), 10) || 1;
        var input = findQuantityInput(document);
        if (input) {
          input.value = qty;
          input.dispatchEvent(new Event('change', { bubbles: true }));
          input.dispatchEvent(new Event('input', { bubbles: true }));
        }
      });
    });
  }

  function initSticky() {
    var sticky = document.querySelector('[data-coiriva-sticky-atc]');
    var mainButton = document.querySelector('.main-product-form .product-form__submit, product-form[data-main="true"] .product-form__submit');
    var trigger = document.querySelector('.product-form__buttons') || mainButton;
    var stickyButton = document.querySelector('[data-coiriva-sticky-submit]');
    if (!sticky || !mainButton || !trigger || !stickyButton) return;

    sticky.hidden = false;
    document.body.classList.add('coiriva-sticky-atc-active');

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          sticky.classList.remove('is-visible');
        } else if (window.scrollY > 500) {
          sticky.classList.add('is-visible');
        }
      });
    }, { threshold: 0.05 });
    observer.observe(trigger);

    stickyButton.addEventListener('click', function () {
      mainButton.click();
    });
  }

  function init() {
    document.querySelectorAll('[data-coiriva-buybox-pro]').forEach(initBundles);
    initSticky();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
