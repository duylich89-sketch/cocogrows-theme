/* Coiriva Ultimate v2.2.1 — Gallery Performance */
(function () {
  function initGallery(gallery) {
    if (!gallery || gallery.dataset.coirivaPerfReady === 'true') return;
    gallery.dataset.coirivaPerfReady = 'true';

    var counter = gallery.querySelector('.coiriva-gallery__counter');
    var total = Number(gallery.dataset.coirivaMediaCount || 0);
    var slides = Array.prototype.slice.call(gallery.querySelectorAll('.product__media-item[data-media-id]'));
    var thumbs = gallery.querySelectorAll('[data-target] button, .thumbnail[aria-current]');

    function indexOfActive() {
      var active = gallery.querySelector('.product__media-item.is-active[data-media-id]');
      var index = slides.indexOf(active);
      if (index < 0) {
        var visible = slides.find(function (slide) { return !slide.classList.contains('hidden'); });
        index = slides.indexOf(visible);
      }
      return index < 0 ? 0 : index;
    }

    function updateCounter() {
      if (!counter || !slides.length) return;
      var visibleSlides = slides.filter(function (slide) { return !slide.classList.contains('hidden'); });
      var active = gallery.querySelector('.product__media-item.is-active[data-media-id]');
      var visibleIndex = visibleSlides.indexOf(active);
      if (visibleIndex < 0) visibleIndex = indexOfActive();
      var visibleTotal = visibleSlides.length || total || slides.length;
      var pad = function (num) { return String(num).padStart(2, '0'); };
      counter.textContent = pad(visibleIndex + 1) + ' / ' + pad(visibleTotal);
      counter.classList.add('is-updating');
      window.setTimeout(function () { counter.classList.remove('is-updating'); }, 180);
    }

    function warmNextImages() {
      var activeIndex = indexOfActive();
      [activeIndex + 1, activeIndex + 2].forEach(function (i) {
        var img = slides[i] && slides[i].querySelector('img[loading="lazy"]');
        if (!img) return;
        img.setAttribute('loading', 'eager');
        if (img.decode) img.decode().catch(function () {});
      });
    }

    var observer = new MutationObserver(function () {
      updateCounter();
      warmNextImages();
    });

    slides.forEach(function (slide) {
      observer.observe(slide, { attributes: true, attributeFilter: ['class'] });
    });

    gallery.addEventListener('slideChanged', function () {
      updateCounter();
      warmNextImages();
    });

    gallery.addEventListener('click', function (event) {
      var thumb = event.target.closest('[data-target]');
      if (!thumb) return;
      window.setTimeout(function () {
        updateCounter();
        warmNextImages();
      }, 120);
    });

    var firstImage = gallery.querySelector('.product__media-item img');
    if (firstImage) {
      firstImage.setAttribute('fetchpriority', 'high');
      firstImage.setAttribute('loading', 'eager');
      if (firstImage.decode) firstImage.decode().catch(function () {});
    }

    Array.prototype.slice.call(gallery.querySelectorAll('img')).forEach(function (img, index) {
      img.setAttribute('decoding', 'async');
      if (index > 0 && !img.getAttribute('loading')) img.setAttribute('loading', 'lazy');
    });

    updateCounter();
    warmNextImages();
  }

  function boot() {
    document.querySelectorAll('media-gallery.coiriva-gallery-performance').forEach(initGallery);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  document.addEventListener('shopify:section:load', boot);
})();
