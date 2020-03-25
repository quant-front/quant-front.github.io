

const btn = document.querySelector('.btn');
const bg = document.querySelector('.bg-layer');
var fps = 15;
 const animationForward = (AnimationName,z) => {
      setTimeout(function() {
      bg.style.animation =  `${AnimationName}  1.0s steps(24)`;
      bg.style.animationFillMode = 'forwards';
      btn.style.zIndex = `${z}`;
      }, 1000 / fps);
 };


let k = 0;
btn.addEventListener('click', function () {
     k++;
     if (k === 1) {
          animationForward('cd-sequence',5);
     } else if (k === 2) {
          animationForward('cd-sequence-reverse',3);
          k=0;
     }
});
