// Coiriva v2.5.3 – CRO Ultimate | Smart Offer Engine
(function () {
  function money(cents, symbol) {
    cents = Number(cents) || 0;
    var value = cents / 100;
    var fixed = value % 1 === 0 ? value.toFixed(0) : value.toFixed(2);
    return (symbol || '$') + fixed;
  }

  function getCards(bundleRoot) {
    return Array.prototype.slice.call(bundleRoot.querySelectorAll('[data-coiriva-qty]')).sort(function (a, b) {
      return (parseInt(a.dataset.coirivaQty, 10) || 0) - (parseInt(b.dataset.coirivaQty, 10) || 0);
    });
  }

  function activeCard(bundleRoot) {
    return bundleRoot.querySelector('[data-coiriva-qty].is-active') || bundleRoot.querySelector('[data-coiriva-qty][aria-checked="true"]') || getCards(bundleRoot)[0];
  }

  function nextCard(cards, currentQty) {
    if (currentQty <= 1) return cards.find(function (card) { return parseInt(card.dataset.coirivaQty, 10) === 2; });
    if (currentQty === 2) return cards.find(function (card) { return parseInt(card.dataset.coirivaQty, 10) === 4; });
    return null;
  }

  function setText(root, selector, value) {
    var el = root.querySelector(selector);
    if (el) el.textContent = value;
  }

  function render(root, bundleRoot) {
    var card = activeCard(bundleRoot);
    if (!card) return;
    var cards = getCards(bundleRoot);
    var qty = parseInt(card.dataset.coirivaQty, 10) || 1;
    var pack = card.dataset.coirivaPack || 'Garden Pack';
    var bricks = parseInt(card.dataset.coirivaBricks, 10) || (qty * 2);
    var price = parseInt(card.dataset.coirivaPrice, 10) || 0;
    var savings = Math.max(0, parseInt(card.dataset.coirivaSavings, 10) || 0);
    var perBrick = parseInt(card.dataset.coirivaPerBrick, 10) || (bricks ? Math.round(price / bricks) : 0);
    var symbol = root.dataset.currencySymbol || '$';
    var next = nextCard(cards, qty);
    var state = 'confirmed';
    var icon = '✅';
    var eyebrow = 'Excellent choice';
    var title = pack + ' selected';
    var message = 'You are getting a strong value for your next planting project.';
    var cta = 'Add To Cart';

    if (next) {
      state = 'upgrade';
      var nextQty = parseInt(next.dataset.coirivaQty, 10) || 0;
      var nextPack = next.dataset.coirivaPack || 'Next Pack';
      var nextPrice = parseInt(next.dataset.coirivaPrice, 10) || 0;
      var nextSavings = Math.max(0, parseInt(next.dataset.coirivaSavings, 10) || 0);
      var difference = Math.max(0, nextPrice - price);
      icon = qty === 1 ? '🌱' : '⭐';
      eyebrow = qty === 1 ? 'Upgrade recommended' : 'Best value upgrade';
      title = qty === 1 ? 'Most gardeners choose Home Garden Pack' : 'Unlock the Best Value Pack';
      message = 'Upgrade to ' + nextPack + ' for only +' + money(difference, symbol) + ' and save ' + money(nextSavings, symbol) + ' today.';
      cta = qty === 1 ? 'Upgrade & Save' : 'Unlock Best Value';
      root.dataset.coirivaTargetQty = String(nextQty);
    } else if (qty >= 8) {
      icon = '🌿';
      eyebrow = 'Commercial choice';
      title = 'Grower Pack selected';
      message = 'Perfect for larger garden projects, raised beds, and repeat planting.';
      cta = 'Add To Cart';
      delete root.dataset.coirivaTargetQty;
    } else if (qty >= 4) {
      icon = '✅';
      eyebrow = 'Best price unlocked';
      title = 'Excellent choice — Best Value Pack';
      message = 'You are already getting our recommended pack and lowest cost per brick.';
      cta = 'Add To Cart';
      delete root.dataset.coirivaTargetQty;
    }

    root.classList.toggle('is-upgrade', state === 'upgrade');
    root.classList.toggle('is-confirmed', state !== 'upgrade');
    root.classList.remove('is-changing');
    void root.offsetWidth;
    root.classList.add('is-changing');

    setText(root, '[data-coiriva-offer-icon]', icon);
    setText(root, '[data-coiriva-offer-eyebrow]', eyebrow);
    setText(root, '[data-coiriva-offer-title]', title);
    setText(root, '[data-coiriva-offer-message]', message);
    setText(root, '[data-coiriva-offer-savings]', money(savings, symbol));
    setText(root, '[data-coiriva-offer-per-brick]', money(perBrick, symbol));
    setText(root, '[data-coiriva-offer-cta]', cta);
  }

  function initOffer(root) {
    if (!root || root.dataset.coirivaSmartOfferReady === 'true') return;
    var scope = root.closest('[data-coiriva-buybox-pro]') || document;
    var bundleRoot = scope.querySelector('[data-coiriva-smart-bundle]');
    if (!bundleRoot) return;
    root.dataset.coirivaSmartOfferReady = 'true';

    var cta = root.querySelector('[data-coiriva-offer-cta]');
    if (cta) {
      cta.addEventListener('click', function () {
        var targetQty = root.dataset.coirivaTargetQty;
        if (targetQty) {
          var target = bundleRoot.querySelector('[data-coiriva-qty="' + targetQty + '"]');
          if (target) {
            target.click();
            target.focus({ preventScroll: true });
            return;
          }
        }
        var atc = document.querySelector('.main-product-atc, [name="add"]');
        if (atc) atc.click();
      });
    }

    bundleRoot.addEventListener('coiriva:bundle-change', function () {
      render(root, bundleRoot);
    });
    bundleRoot.addEventListener('click', function (event) {
      if (event.target.closest('[data-coiriva-qty]')) {
        window.requestAnimationFrame(function () { render(root, bundleRoot); });
      }
    });
    render(root, bundleRoot);
  }

  function init() {
    document.querySelectorAll('[data-coiriva-smart-offer]').forEach(initOffer);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
