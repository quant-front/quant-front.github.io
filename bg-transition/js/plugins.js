
function start() {
     anime({
          targets: '.item',
          scaleY:['0','1'],
          duration: 1000,
          delay: function() {
               return anime.random(0, 270);
          },
          easing: 'easeInOutQuad',
          loop: false,
          complete: function(anim) {
               let bg = document.querySelector('.main');
               bg.style.backgroundImage = 'linear-gradient(19deg, #21D4FD 0%, #B721FF 100%)';
               end();
          }
     });
}
start();

function end() {
    let items = document.querySelectorAll('.item');
     for (let i = 0; i < items.length; i++){
       items[i].style.transformOrigin = '0% 100%';
          anime({
               targets: '.item',
               scaleX:['1','0'],
               duration: 1000,
               easing: 'easeInOutQuad',
          });
    }

}

