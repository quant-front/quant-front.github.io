


(function () {
     let mySwiper = new Swiper('.swiper-container',{
     slidesPerView: 3,
     spaceBetween: 35,
     slidesPerGroup: 1,
     loop: true,
     loopFillGroupWithBlank: true,
     pagination: {
          el: '.swiper-pagination',
          clickable: true,
     },

     });
     let prev = document.querySelector('.swiper-button-prev');
     let next = document.querySelector('.swiper-button-next');

     prev.addEventListener('click', function (e) {
          e.preventDefault();
          setTimeout(function () {
               mySwiper.slidePrev(500);
               anime({
                    targets: '.swiper-slide-active img',
                    scaleY:['0','1'],
                    duration:300,
                    delay:150,
                    easing:'linear'
               });
          },10);

     });


     next.addEventListener('click', function (e) {
          let image = document.querySelector('.swiper-slide-active img');
          e.preventDefault();
          anime({
               targets: '.swiper-slide-active img',
               scaleY:['1','0'],
               duration:300,
               easing:'linear'
          });
          setTimeout(function () {
               setTimeout(function () {
                    image.style.transform = 'scaleY(1)';
               },600);

          mySwiper.slideNext(500);
          },500);

     });


     const link = document.querySelectorAll('.swiper-slide');

     const animateit = function (e) {
          const  span = this.querySelector('img');
          const { offsetX:x, offsetY:y } = e,
               {offsetWidth:width, offsetHeight: height } = this,
               move = 25,
               xMove = x / width * (move * 2 ) - move,
               yMove = y / height * (move * 2 ) - move;

          span.style.transform = `translate(${xMove}px,${yMove}px)`;

          if( e.type === 'mouseleave') span.style.transform = '';

     };

     link.forEach(b => b.addEventListener('mousemove', animateit));
     link.forEach(b => b.addEventListener('mouseleave', animateit));

})();




