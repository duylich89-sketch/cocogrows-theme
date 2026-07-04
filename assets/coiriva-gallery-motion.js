/* Coiriva Ultimate v2.2.2 — Premium Gallery PRO Module 2: Motion */
(function () {
  function closestMediaItem(el) {
    return el && el.closest ? el.closest('.product__media-item[data-media-id]') : null;
  }

  function initMotion(gallery) {
    if (!gallery || gallery.dataset.coirivaMotionReady === 'true') return;
    gallery.dataset.coirivaMotionReady = 'true';
    gallery.classList.add('coiriva-gallery-motion-ready');

    var slides = Array.prototype.slice.call(gallery.querySelectorAll('.product__media-item[data-media-id]'));
    var counter = gallery.querySelector('.coiriva-gallery__counter');
    var thumbScroller = gallery.querySelector('.thumbnail-list, slider-component .thumbnail-list');
    var activeMediaId = null;

    function activeSlide() {
      return gallery.querySelector('.product__media-item.is-active[data-media-id]') ||
        slides.find(function (slide) { return !slide.classList.contains('hidden'); }) ||
        slides[0];
    }

    function setLoadingState(slide) {
      if (!slide) return;
      var container = slide.querySelector('.product-media-container');
      var img = slide.querySelector('img');
      if (!container || !img || img.complete) return;
      container.classList.add('is-coiriva-loading');
      var done = function () { container.classList.remove('is-coiriva-loading'); };
      img.addEventListener('load', done, { once: true });
      img.addEventListener('error', done, { once: true });
      if (img.decode) img.decode().then(done).catch(done);
    }

    function animateSlide(slide) {
      if (!slide) return;
      slide.classList.remove('is-coiriva-entering');
      // Force reflow intentionally for a short, scoped animation.
      void slide.offsetWidth;
      slide.classList.add('is-coiriva-entering');
      window.setTimeout(function () {
        slide.classList.remove('is-coiriva-entering');
      }, 280);
      setLoadingState(slide);
    }

    function activeIndex() {
      var slide = activeSlide();
      var index = slides.indexOf(slide);
      return index < 0 ? 0 : index;
    }

    function updateCounterMotion() {
      if (!counter) return;
      counter.classList.add('is-coiriva-ticking');
      window.setTimeout(function () { counter.classList.remove('is-coiriva-ticking'); }, 190);
    }

    function syncThumbnail() {
      var current = activeSlide();
      if (!current) return;
      var mediaId = current.dataset.mediaId;
      var thumb = gallery.querySelector('[data-target="#' + current.id + '"], [data-target="' + current.id + '"]');
      if (!thumb && mediaId) {
        thumb = gallery.querySelector('[data-media-id="' + mediaId + '"] .thumbnail, [data-target*="' + mediaId + '"]');
      }
      var el = thumb && (thumb.classList && thumb.classList.contains('thumbnail') ? thumb : thumb.querySelector && thumb.querySelector('.thumbnail'));
      if (el && el.scrollIntoView) {
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }

    function onChange() {
      var current = activeSlide();
      var mediaId = current && current.dataset.mediaId;
      if (mediaId && mediaId !== activeMediaId) {
        activeMediaId = mediaId;
        animateSlide(current);
        updateCounterMotion();
        window.setTimeout(syncThumbnail, 80);
      }
    }

    slides.forEach(setLoadingState);

    var observer = new MutationObserver(onChange);
    slides.forEach(function (slide) {
      observer.observe(slide, { attributes: true, attributeFilter: ['class'] });
    });

    gallery.addEventListener('slideChanged', onChange);
    gallery.addEventListener('click', function (event) {
      if (event.target.closest('[data-target], .thumbnail, .slider-button')) {
        window.setTimeout(onChange, 90);
      }
    });

    gallery.addEventListener('keyup', function (event) {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key === 'Enter' || event.key === ' ') {
        window.setTimeout(onChange, 90);
      }
    });

    // Lightweight swipe feedback on mobile.
    var startX = 0;
    gallery.addEventListener('touchstart', function (event) {
      if (!event.touches || !event.touches.length) return;
      startX = event.touches[0].clientX;
    }, { passive: true });
    gallery.addEventListener('touchend', function (event) {
      if (!startX || !event.changedTouches || !event.changedTouches.length) return;
      var dx = Math.abs(event.changedTouches[0].clientX - startX);
      if (dx > 24) window.setTimeout(onChange, 140);
      startX = 0;
    }, { passive: true });

    onChange();
  }

  function boot() {
    var galleries = document.querySelectorAll('media-gallery.coiriva-gallery-pro');
    if (!('IntersectionObserver' in window)) {
      galleries.forEach(initMotion);
      return;
    }
    var io = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        initMotion(entry.target);
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '200px 0px' });
    galleries.forEach(function (gallery) { io.observe(gallery); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
  document.addEventListener('shopify:section:load', boot);
})();
