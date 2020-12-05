
function startAnimation () {

setTimeout(function () {
     gsap.to("#house-1", {duration: 3, morphSVG: "#house-2"});
     anime({
          targets: '#house-1',
          fill:['#BF65E5','#D82B7A'],
          duration:3000,
          easing: 'linear',
     });
},1000)

setTimeout(function () {
     gsap.to("#house-1", {duration: 3, morphSVG: "#house-3"});
     anime({
          targets: '#house-1',
          fill:['#D82B7A','#C6642E'],
          duration:3000,
          easing: 'linear',
     });
},5000)

setTimeout(function () {
     gsap.to("#house-1", {duration: 3, morphSVG: "#house-4"});
     anime({
          targets: '#house-1',
          fill:['#C6642E','#BF65E5'],
          duration:3000,
          easing: 'linear',
     });
},9000)

}

startAnimation();

setInterval(function () {
     startAnimation();
},12000)

