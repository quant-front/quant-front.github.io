 anime({
     targets: '.transform-group',
     rotate: '540',
     duration:15000,
     easing:'linear',
});
let layer = document.querySelector('.layer-complete');
 anime({
     targets: '.animation-line',
     strokeDashoffset: [0, anime.setDashoffset],
     easing:'linear',
     duration: 10000,
     direction: 'normal',
     complete:function () {
          var animation = anime({
               targets: '.animation-line',
               strokeDashoffset: [0, anime.setDashoffset],
               easing:'linear',
               duration: 10000,
               direction: 'normal',
               begin:function () {
                    setTimeout(function () {
                         animation.pause();
                    },5000)
               }
          });
     }

});


