import Perlin from './perlin'

let canvas = document.createElement('canvas');
let ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let doc = document.querySelector('.main');
canvas.classList.add('template-canvas');
doc.appendChild(canvas);

let number = 200;
let radius = 200;
let x,y;



     // let size = 600;
     // let canvas = document.createElement('canvas');
     // let ctx = canvas.getContext('2d');
     // canvas.width = size;
     // canvas.height = size;
     // let doc = document.querySelector('.main');
     // canvas.classList.add('sample-canvas');
     // doc.appendChild(canvas);


// ctx.clearRect(0,0,size,size);
// ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
//
//
// for (var i = 0; i < window.innerWidth; i++) {
//      // ctx.fillRect(i,0,1,200*Perlin(i/100,time/100,0))
//      ctx.fillStyle = "#3498DB";
//      ctx.fillRect(i,window.innerHeight,1,-200*Perlin(i/250,time/100,0));
//      ctx.fillRect(i,0,1,500*Perlin(i/150,time/100,0));
//
// }

function draw(){
     ctx.clearRect(0,0,innerWidth,innerHeight);



     for (let j = 0; j <80 ; j++) {
          ctx.beginPath();
          if (window.innerWidth >= 500) {
               for (let i = 0; i < 60; i++) {
                    ctx.fillStyle = "#3498DB";
                    ctx.lineTo(i*60,j*10+ 100*Perlin(400*i/innerWidth,j/10,time/100));
               }
          }

          if (window.innerWidth <= 500) {
               for (let i = 0; i < 30; i++) {
                    ctx.fillStyle = "#3498DB";
                    ctx.lineTo(i*30,j*10+ 100*Perlin(60*i/innerWidth,j/10,time/100));
               }
          }
          ctx.stroke();
     }

//      for (var i = 0; i < window.innerWidth; i++) {
//      // ctx.fillRect(i,0,1,200*Perlin(i/100,time/100,0))
//      ctx.fillStyle = "#3498DB";
//      ctx.fillRect(i,window.innerHeight,1,-200*Perlin(i/250,time/100,0));
//      ctx.fillRect(i,0,1,500*Perlin(i/150,time/100,0));
//
// }

}


let time = 0;
function render(){
     draw();
     time--;
     window.requestAnimationFrame(render);
}

render();