(function () {
  'use strict';

  function formatMoney(cents) {
    var value = Math.max(0, Number(cents || 0)) / 100;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: (window.Shopify && Shopify.currency && Shopify.currency.active) || 'USD',
      maximumFractionDigits: value % 1 === 0 ? 0 : 2
    }).format(value);
  }

  function messageFor(total, freeGoal, bestGoal, bonusGoal) {
    if (total >= bonusGoal) {
      return '🎉 Maximum savings unlocked — you reached the Premium Gardener Bonus.';
    }
    if (total >= bestGoal) {
      return '🎁 Only ' + formatMoney(bonusGoal - total) + ' left to unlock the Premium Gardener Bonus.';
    }
    if (total >= freeGoal) {
      return '⭐ Free shipping unlocked. Add ' + formatMoney(bestGoal - total) + ' to reach Best Value.';
    }
    if (total > 0) {
      return '🚚 Add ' + formatMoney(freeGoal - total) + ' more to unlock FREE Shipping.';
    }
    return '🚚 Add ' + formatMoney(freeGoal) + ' to unlock FREE Shipping.';
  }

  function updateComponent(el, total) {
    var freeGoal = Number(el.dataset.freeThreshold || 5000);
    var bestGoal = Number(el.dataset.bestThreshold || 10000);
    var bonusGoal = Number(el.dataset.bonusThreshold || 15000);
    var maxGoal = Math.max(bonusGoal, 1);
    var fill = el.querySelector('[data-coiriva-progress-fill]');
    var message = el.querySelector('[data-coiriva-progress-message]');
    var percent = Math.min(100, Math.max(0, (total / maxGoal) * 100));

    el.classList.add('is-updating');
    window.requestAnimationFrame(function () {
      if (fill) fill.style.width = percent.toFixed(2) + '%';
      if (message) message.textContent = messageFor(total, freeGoal, bestGoal, bonusGoal);

      ['free', 'best', 'bonus'].forEach(function (goalName) {
        var threshold = goalName === 'free' ? freeGoal : goalName === 'best' ? bestGoal : bonusGoal;
        var unlocked = total >= threshold;
        el.querySelectorAll('[data-coiriva-progress-marker="' + goalName + '"], [data-coiriva-progress-goal="' + goalName + '"]').forEach(function (node) {
          node.classList.toggle('is-unlocked', unlocked);
        });
      });

      window.setTimeout(function () { el.classList.remove('is-updating'); }, 180);
    });
  }

  function fetchCart(url) {
    return fetch(url || '/cart.js', { credentials: 'same-origin' })
      .then(function (response) { return response.ok ? response.json() : null; })
      .catch(function () { return null; });
  }

  function refreshAll() {
    var components = document.querySelectorAll('[data-coiriva-progress]');
    if (!components.length) return;
    var cartUrl = components[0].dataset.cartUrl || '/cart.js';
    fetchCart(cartUrl).then(function (cart) {
      var total = cart && typeof cart.total_price === 'number' ? cart.total_price : Number(components[0].dataset.cartTotal || 0);
      components.forEach(function (el) { updateComponent(el, total); });
    });
  }

  function init() {
    var components = document.querySelectorAll('[data-coiriva-progress]');
    components.forEach(function (el) {
      updateComponent(el, Number(el.dataset.cartTotal || 0));
    });
    refreshAll();
  }

  document.addEventListener('DOMContentLoaded', init);
  document.addEventListener('cart:updated', refreshAll);
  document.addEventListener('cart:refresh', refreshAll);
  document.addEventListener('product:added', refreshAll);

  document.addEventListener('click', function (event) {
    if (event.target.closest('[name="add"], .product-form__submit, [data-coiriva-sticky-atc-button]')) {
      window.setTimeout(refreshAll, 900);
      window.setTimeout(refreshAll, 1800);
    }
  });
})();
