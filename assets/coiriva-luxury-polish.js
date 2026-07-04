/* Coiriva v2.5.5 – Luxury Polish PRO
   Tiny progressive enhancement. No dependencies. */
(function(){
  var root=document.documentElement;
  root.classList.add('coiriva-luxury-ready');

  function markReveal(){
    var nodes=document.querySelectorAll('.product__info-container > .coiriva-buybox-pro, .product__info-container > .coiriva-trust, .product__info-container > [data-coiriva-smart-bundle]');
    if(!nodes.length) return;
    nodes.forEach(function(node){ node.classList.add('coiriva-lux-reveal'); });
    if(!('IntersectionObserver' in window)){
      nodes.forEach(function(node){ node.classList.add('is-visible'); });
      return;
    }
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },{threshold:.08,rootMargin:'0px 0px -5% 0px'});
    nodes.forEach(function(node){ io.observe(node); });
  }

  function enhanceButtons(){
    document.addEventListener('click',function(event){
      var btn=event.target.closest && event.target.closest('.product-form__submit, .coiriva-premium-atc');
      if(!btn || btn.disabled || btn.getAttribute('aria-disabled')==='true') return;
      btn.classList.add('coiriva-lux-clicked');
      window.setTimeout(function(){ btn.classList.remove('coiriva-lux-clicked'); },900);
    },{passive:true});
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',function(){ markReveal(); enhanceButtons(); },{once:true});
  }else{
    markReveal(); enhanceButtons();
  }
})();
