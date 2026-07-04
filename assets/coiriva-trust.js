/* Coiriva v2.5.4 – Trust Psychology PRO */
(function(){
  var nodes=document.querySelectorAll('[data-coiriva-trust]');
  if(!nodes.length)return;
  if(!('IntersectionObserver' in window)){nodes.forEach(function(n){n.classList.add('is-visible')});return;}
  var io=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target);}})},{threshold:.08});
  nodes.forEach(function(n){io.observe(n);});
})();
