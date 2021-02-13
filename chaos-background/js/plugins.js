

let container = document.querySelector('.container');
for (let i = 0; i <=100 ; i++) {
     const  blocks = document.createElement('div');
     blocks.classList.add('block');
     container.appendChild(blocks);
}

function AnimationBlock() {
 anime({
      targets:'.block',
      translateX: function () {
           return anime.random(-1200,1200);
      },
      translateY: function () {
           return anime.random(-800,800);
      },
      scale: function () {
           return anime.random(1,1.5);
      },
      easing:'linear',
      duration:3000,
      delay: anime.stagger(10),
      complete:AnimationBlock,
 })
}
AnimationBlock();
