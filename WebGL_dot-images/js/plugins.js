let size = 200;
let canvas = document.createElement('canvas');
let ctx = canvas.getContext('2d');
canvas.width = size;
canvas.height = size;
canvas.classList.add('tempcanvas');
document.body.appendChild(canvas);
let imageCoords = [];


let img  = new Image();
img.onload = function () {
  ctx.drawImage(img,0,0,size,size);
  let data = ctx.getImageData(0,0,size,size);
  data = data.data;
     for(var y = 0; y < size; y++) {
          for(var x = 0; x < size; x++) {
               var red = data[((size * y) + x) * 4];
               var green = data[((size * y) + x) * 4 + 1];
               var blue = data[((size * y) + x) * 4 + 2];
               var alpha = data[((size * y) + x) * 4 + 3];
               if(alpha>0){
                    imageCoords.push([10*(x - size/2),10*(size/2 - y)]);
               }
          }
     }


const scene = new THREE.Scene();
   const  camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 3000 );
     camera.position.z = 1300;





let renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0xFFFCFF);
let doc = document.querySelector('.main');
doc.appendChild( renderer.domElement );


window.addEventListener('resize', function () {
     let width = window.innerWidth;
     let height = window.innerHeight;
     renderer.setSize(width,height);
     camera.aspect = width / height;
     camera.updateProjectionMatrix();
});



let texture;


let controls = new  THREE.OrbitControls(camera,renderer.domElement);

geometry = new THREE.Geometry();
let sprite = new THREE.TextureLoader().load('../assets/img/starts.png');


 imageCoords.forEach((el, index) => {
      geometry.vertices.push(new THREE.Vector3(el[0],el[1], Math.random()*200));
      geometry.colors.push(new THREE.Color(Math.random(),Math.random(),Math.random()));
     })
material = new THREE.PointsMaterial({
     vertexColors: THREE.VertexColors,
     size: 15,
     alphaTest:0.5,
     map:sprite
});
mesh = new THREE.Points(geometry,material);
scene.add(mesh);



     var i = 0;
const animate = function () {
     i++;
     requestAnimationFrame( animate );
     geometry.vertices.forEach( function(particle, index){
          var dX, dY, dZ;
          dX = Math.sin(i/50 + index)/2;
          dY = 0;
          dZ = 0;
          particle.add(new THREE.Vector3(dX, dY, dZ));
     });
     geometry.verticesNeedUpdate = true;
     renderer.render( scene, camera );
};

animate();

}

img.src = '../assets/img/phone.svg'