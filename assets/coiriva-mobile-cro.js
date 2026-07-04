// Coiriva v2.5.5 – Mobile CRO PRO
// Adds lightweight mobile-only UX helpers: body class, CTA viewport state, sticky CTA label guard.
(function () {
  var mq = window.matchMedia('(max-width: 749px)');
  var ticking = false;

  function setMobileClass() {
    document.documentElement.classList.toggle('coiriva-mobile-cro', mq.matches);
    if (document.body) document.body.classList.toggle('coiriva-mobile-cro', mq.matches);
  }

  function getMainCta() {
    return document.querySelector('.product-form__submit.coiriva-premium-atc, .product-form__submit, .shopify-payment-button__button');
  }

  function syncCtaState() {
    if (!mq.matches || !document.body) return;
    var cta = getMainCta();
    if (!cta) return;
    var rect = cta.getBoundingClientRect();
    var inThumbZone = rect.top < window.innerHeight && rect.bottom > window.innerHeight * 0.42;
    document.body.classList.toggle('coiriva-mobile-cta-visible', inThumbZone);
    ticking = false;
  }

  function requestSync() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(syncCtaState);
  }

  function improveStickyLabel() {
    if (!mq.matches) return;
    var stickyLabel = document.querySelector('[data-coiriva-sticky-cta]');
    if (!stickyLabel) return;
    var text = (stickyLabel.textContent || '').trim();
    if (text.length > 24) stickyLabel.textContent = text.replace('ADD TO CART — ', '').replace('START GROWING TODAY', 'ADD TO CART').replace('GET THE BEST VALUE', 'BEST VALUE');
  }

  function init() {
    setMobileClass();
    improveStickyLabel();
    syncCtaState();
    window.addEventListener('scroll', requestSync, { passive: true });
    window.addEventListener('resize', function () { setMobileClass(); improveStickyLabel(); requestSync(); }, { passive: true });
    document.addEventListener('coiriva:bundle-change', function () { window.setTimeout(improveStickyLabel, 30); });
    if (mq.addEventListener) mq.addEventListener('change', function () { setMobileClass(); improveStickyLabel(); requestSync(); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
