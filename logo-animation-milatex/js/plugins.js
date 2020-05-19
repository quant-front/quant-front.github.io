function animation () {
     anime({
          targets:'#last',
          translateY:[60+'%',0],
          duration:2600,
          easing:'easeOutExpo',
          opacity:[0,1],
     })
     setTimeout(function () {

          anime({
               targets:'#mask1',
               translateX:[-80+'%',0],
               duration:2500,
               easing:'easeOutExpo',
          })
     },1700);
}



setTimeout(animation,1000);

//
// function animation () {
//      anime({
//           targets:'#mask1',
//           translateX:[-80+'%',0],
//           duration:2500,
//           easing:'easeOutExpo',
//      })
//      setTimeout(function () {
//           anime({
//                targets:'#mask2',
//                translateX:[-80+'%',0],
//                duration:1200,
//                easing:'linear',
//                begin: function(anim) {
//                     setTimeout(function () {
//                          anime({
//                               targets:'#mask3',
//                               translateX:[-80+'%',0],
//                               duration:1200,
//                               easing:'linear',
//                          })
//                     },1200)
//
//                }
//           })
//      },1000);
// }
//
//
//
// setTimeout(animation,1000);