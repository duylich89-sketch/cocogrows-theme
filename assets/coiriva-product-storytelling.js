(function(){
  function init(){
    document.querySelectorAll('[data-coiriva-scroll-buybox]').forEach(function(btn){
      btn.addEventListener('click',function(e){
        var target=document.querySelector('product-info, .product__info-container, .product-form, form[action*="/cart/add"]');
        if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth',block:'center'});}
      });
    });
    document.querySelectorAll('[data-coiriva-faq] details').forEach(function(item){
      item.addEventListener('toggle',function(){
        if(item.open){
          item.parentElement.querySelectorAll('details').forEach(function(other){if(other!==item) other.open=false;});
        }
      });
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
