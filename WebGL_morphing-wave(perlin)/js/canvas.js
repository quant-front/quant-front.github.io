import Perlin from './perlin'

let canvas = document.createElement('canvas');
let ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let doc = document.querySelector('.main');
canvas.classList.add('template-canvas');
doc.appendChild(canvas);



     // let size = 600;
     // let canvas = document.createElement('canvas');
     // let ctx = canvas.getContext('2d');
     // canvas.width = size;
     // canvas.height = size;
     // let doc = document.querySelector('.main');
     // canvas.classList.add('sample-canvas');
     // doc.appendChild(canvas);




function draw(){
     // ctx.clearRect(0,0,size,size);
     ctx.clearRect(0,0,window.innerWidth,window.innerHeight);


     for (var i = 0; i < window.innerWidth; i++) {
          // ctx.fillRect(i,0,1,200*Perlin(i/100,time/100,0))
          ctx.fillStyle = "#3498DB";
          ctx.fillRect(i,window.innerHeight,1,-200*Perlin(i/250,time/100,0));
          ctx.fillRect(i,0,1,500*Perlin(i/150,time/100,0));

     }

     ctx.restore()
}

let time = 0;
function render(){
     draw();
     time--;
     window.requestAnimationFrame(render);
}

render();