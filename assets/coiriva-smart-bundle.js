// Coiriva v2.5.0 – CRO Ultimate | Smart Bundle PRO
(function () {
  function findQuantityInput() {
    return document.querySelector('input[name="quantity"]');
  }

  function updateQuantity(qty) {
    var input = findQuantityInput();
    if (!input) return;
    input.value = qty;
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
  }

  function updateSummary(root, card) {
    var summary = root.querySelector('[data-coiriva-bundle-summary]');
    if (!summary) return;
    var qty = parseInt(card.getAttribute('data-coiriva-qty'), 10) || 1;
    var pack = card.getAttribute('data-coiriva-pack') || 'Garden Pack';
    var bricks = qty * 2;
    var prefix = qty >= 4 ? '⭐' : '🌿';
    summary.textContent = prefix + ' ' + pack + ' selected · ' + bricks + ' bricks ready for your next growing project.';
  }

  function activateCard(root, selected, shouldSyncQuantity) {
    var cards = root.querySelectorAll('[data-coiriva-qty]');
    cards.forEach(function (card) {
      var active = card === selected;
      card.classList.toggle('is-active', active);
      card.setAttribute('aria-checked', active ? 'true' : 'false');
      if (active) {
        card.classList.remove('is-changing');
        void card.offsetWidth;
        card.classList.add('is-changing');
      }
    });
    var qty = parseInt(selected.getAttribute('data-coiriva-qty'), 10) || 1;
    if (shouldSyncQuantity !== false) updateQuantity(qty);
    updateSummary(root, selected);
    root.dispatchEvent(new CustomEvent('coiriva:bundle-change', {
      bubbles: true,
      detail: {
        quantity: qty,
        pack: selected.getAttribute('data-coiriva-pack') || '',
        price: parseInt(selected.getAttribute('data-coiriva-price'), 10) || 0,
        savings: parseInt(selected.getAttribute('data-coiriva-savings'), 10) || 0,
        perBrick: parseInt(selected.getAttribute('data-coiriva-per-brick'), 10) || 0
      }
    }));
  }

  function initSmartBundle(root) {
    if (!root || root.dataset.coirivaSmartBundleReady === 'true') return;
    root.dataset.coirivaSmartBundleReady = 'true';
    var cards = root.querySelectorAll('[data-coiriva-qty]');
    if (!cards.length) return;

    cards.forEach(function (card) {
      card.addEventListener('click', function () {
        activateCard(root, card, true);
      });
      card.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          activateCard(root, card, true);
        }
      });
    });

    var defaultCard = root.querySelector('[data-coiriva-qty="4"]') || root.querySelector('.is-active') || cards[0];
    activateCard(root, defaultCard, true);
  }

  function init() {
    document.querySelectorAll('[data-coiriva-smart-bundle]').forEach(initSmartBundle);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
