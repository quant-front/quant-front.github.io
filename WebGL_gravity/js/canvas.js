let canvas = document.createElement('canvas');
let ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let doc = document.querySelector('.main');
canvas.classList.add('template-canvas');
doc.appendChild(canvas);



function randomIntFromRange(min,max) {
     return Math.floor(Math.random() * (max - min + 1) + min);
}

let y =  Math.random() * innerHeight;
let x =  Math.random()* innerWidth;
let radius = 80;
let dy = 4;
let dx = 4;
let gravity = 1;

function draw() {
     ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
     ctx.beginPath();
     ctx.fillStyle = "#aa50ea";
     ctx.arc(x,y,radius,0, Math.PI *2, true );
     ctx.fill();
     ctx.closePath();
     ctx.restore();

     if (y + radius  >  canvas.height || y - radius < 0) {
          dy = -dy;
     }
     if (x + radius > canvas.width || x - radius < 0) {
          // dy+= gravity;
          dx = -dx;
     }
     y = (y+= dy);
     x+= dx;
     y+= dy;
}

let time = 0;

function render(){
     draw();
     time++;
     window.requestAnimationFrame(render);
}

render();