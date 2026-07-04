// Coiriva v2.5.5 – Smart Savings Engine + Buy Box Sync
(function () {
  function money(cents) {
    cents = parseInt(cents, 10) || 0;
    var value = cents / 100;
    return '$' + (value % 1 === 0 ? value.toFixed(0) : value.toFixed(2));
  }

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

  function getCtaText(qty, pack) {
    if (qty >= 8) return 'SAVE MORE TODAY';
    if (qty >= 4) return 'GET THE BEST VALUE';
    if (qty >= 2) return 'START GROWING TODAY';
    return 'ADD TO CART — SHIPS TODAY';
  }

  function updateButtonText(text) {
    document.querySelectorAll('.coiriva-premium-atc .main-atc__label__text').forEach(function (el) {
      if (!el.dataset.originalText) el.dataset.originalText = el.textContent.trim();
      el.textContent = text;
    });
    var stickyCta = document.querySelector('[data-coiriva-sticky-cta]');
    if (stickyCta) stickyCta.textContent = text;
  }

  function updateSticky(card) {
    var stickyPrice = document.querySelector('[data-coiriva-sticky-price]');
    var stickyPack = document.querySelector('[data-coiriva-sticky-pack]');
    var price = parseInt(card.getAttribute('data-coiriva-price'), 10) || 0;
    var compare = parseInt(card.getAttribute('data-coiriva-compare'), 10) || 0;
    var savings = parseInt(card.getAttribute('data-coiriva-savings'), 10) || 0;
    var pack = card.getAttribute('data-coiriva-pack') || 'Garden Pack';
    if (stickyPrice) {
      stickyPrice.innerHTML = money(price) + (compare > price ? ' <s>' + money(compare) + '</s>' : '');
    }
    if (stickyPack) {
      stickyPack.textContent = pack + (savings > 0 ? ' · Save ' + money(savings) : '');
    }
  }

  function updateSummary(root, card) {
    var summary = root.querySelector('[data-coiriva-bundle-summary]');
    var valueSummary = root.querySelector('[data-coiriva-value-summary]');
    var meter = root.querySelector('[data-coiriva-value-meter]');
    var meterLabel = root.querySelector('[data-coiriva-value-meter-label]');
    var headline = root.querySelector('[data-coiriva-bundle-headline]');
    var qty = parseInt(card.getAttribute('data-coiriva-qty'), 10) || 1;
    var pack = card.getAttribute('data-coiriva-pack') || 'Garden Pack';
    var bricks = parseInt(card.getAttribute('data-coiriva-bricks'), 10) || qty * 2;
    var savings = parseInt(card.getAttribute('data-coiriva-savings'), 10) || 0;
    var perBrick = parseInt(card.getAttribute('data-coiriva-per-brick'), 10) || 0;
    var cta = getCtaText(qty, pack);

    if (summary) {
      var prefix = qty >= 4 ? '⭐' : '🌿';
      summary.textContent = prefix + ' ' + pack + ' selected · ' + bricks + ' bricks · ' + money(perBrick) + ' / brick' + (savings > 0 ? ' · Save ' + money(savings) : '') + '.';
    }
    if (valueSummary) {
      var label = valueSummary.querySelector('.coiriva-value-summary__label');
      var strong = valueSummary.querySelector('strong');
      var small = valueSummary.querySelector('small');
      if (label) label.textContent = qty >= 4 ? 'Best value selected' : 'Garden pack selected';
      if (strong) strong.textContent = savings > 0 ? "You're saving " + money(savings) + ' with ' + pack + '.' : pack + ' is ready for your next growing project.';
      if (small) small.textContent = qty >= 4 ? 'Best balance of price, quantity and everyday garden use.' : 'A simple starter option for pots, herbs and small projects.';
    }
    if (meter) meter.style.width = qty >= 8 ? '100%' : qty >= 4 ? '82%' : qty >= 2 ? '62%' : '42%';
    if (meterLabel) meterLabel.textContent = qty >= 8 ? 'MAX SAVINGS' : qty >= 4 ? 'BEST VALUE' : qty >= 2 ? 'BETTER VALUE' : 'GOOD VALUE';
    if (headline) headline.textContent = qty >= 4 ? 'Best value selected' : 'Garden pack selected';
    updateButtonText(cta);
    updateSticky(card);
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
      card.addEventListener('click', function () { activateCard(root, card, true); });
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
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
