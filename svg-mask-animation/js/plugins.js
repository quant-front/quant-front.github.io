

function animation () {
     anime({
          targets:'.maskrect',
          translateY:[400,0],
          duration:3000,
          easing:'easeOutExpo',
     })
     setTimeout(function () {
          anime({
               targets:'.maskrectall',
               translateX:[-471,0],
               duration:2000,
               easing:'easeOutExpo',
          })
     },1500);
}



setTimeout(animation,1500);

