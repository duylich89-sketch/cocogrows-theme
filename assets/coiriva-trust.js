/* Coiriva v2.5.4 Final – Trust Psychology PRO */
(function(){
  function reveal(root){
    var scope=root||document;
    var nodes=scope.querySelectorAll?scope.querySelectorAll('[data-coiriva-trust]'):[];
    if(!nodes.length)return;
    var show=function(n){n.classList.add('is-visible');};
    if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches){nodes.forEach(show);return;}
    if(!('IntersectionObserver' in window)){nodes.forEach(show);return;}
    var io=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){show(e.target);io.unobserve(e.target);}});},{rootMargin:'80px 0px',threshold:.05});
    nodes.forEach(function(n){if(n.classList.contains('is-visible'))return;io.observe(n);});
  }
  if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',function(){reveal(document);});}else{reveal(document);}
  document.addEventListener('shopify:section:load',function(e){reveal(e.target);});
})();
