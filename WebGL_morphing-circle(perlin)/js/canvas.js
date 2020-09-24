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

     ctx.save();
     ctx.translate(window.innerWidth/2, window.innerHeight/2);
     ctx.fillStyle = "rgba(67,179,206,0.64)";
     ctx.strokeStyle = '#3498DB';
     ctx.beginPath();
     for (let i = 0; i <number ; i++) {
          let angle = i*2*Math.PI/number;
          x = radius*Math.sin(angle)+ 80*Perlin(Math.sin(angle) ,time/100,0);
          y = radius*Math.cos(angle)+ 80*Perlin(Math.sin(angle) ,time/100,0);
          // ctx.fillRect(x,y,10,10);
          ctx.lineTo(x,y);

     }
     ctx.fill();
     ctx.closePath();
     ctx.stroke();


     ctx.fillStyle = "rgba(138,44,143,0.6)";
     ctx.strokeStyle = 'rgb(138,44,143)';
     ctx.beginPath();
     for (let i = 0; i <number ; i++) {
          let angle = i*2*Math.PI/number;
          x = radius*Math.sin(angle)+ 80*Perlin(Math.sin(angle) + time /70,time/100,0);
          y = radius*Math.cos(angle)+ 80*Perlin(Math.sin(angle) + time /70 ,time/100,0);
          // ctx.fillRect(x,y,10,10);
          ctx.lineTo(x,y);

     }
     ctx.fill();
     ctx.closePath();
     ctx.stroke();



     ctx.beginPath();
     ctx.fillStyle = "rgba(246,169,84,0.6)";
     ctx.strokeStyle = 'rgb(246,169,84)';
     for (let i = 0; i <number ; i++) {
          let angle = i*2*Math.PI/number;
          x = radius*Math.sin(angle)+ 80*Perlin(Math.sin(angle)+ time /50,time/100,0);
          y = radius*Math.cos(angle)+ 80*Perlin(Math.cos(angle)+ time/50 ,time/100,0);
          // ctx.fillRect(x,y,10,10);
          ctx.lineTo(x,y);

     }
     ctx.fill();
     ctx.closePath();
     ctx.stroke();

     ctx.restore();

}

let time = 0;
function render(){
     draw();
     time++;
     window.requestAnimationFrame(render);
}

render();