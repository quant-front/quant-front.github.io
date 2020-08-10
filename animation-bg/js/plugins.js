
const color = ['#1F53BB','#6FBB1F','#9F1FBB','#BB3E1F'];
createSquare = () => {
     const  section = document.querySelector('section');
     const  square = document.createElement('span');

     var  size  = Math.random() * 50;
     square.style.width = 20 + size + 'px';
     square.style.height = 20 + size + 'px';

     square.style.left =  Math.random() * innerWidth + 'px';
     square.style.top =  Math.random() * innerHeight + 'px';

     square.style.background = color[Math.floor(Math.random() * color.length)];

     section.appendChild(square);

     setTimeout(() => {
          square.remove();
     },5000);
}

 setInterval(createSquare, 150);
