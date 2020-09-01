const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );

let renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0xFFFCFF);
let doc = document.querySelector('.main');
doc.appendChild( renderer.domElement );


window.addEventListener('resize', function () {
     let width = window.innerWidth;
     let height = window.innerHeight;
     renderer.setSize(width,height);
     camera.aspect = width / height ;
     camera.updateProjectionMatrix();
});





let controls = new  THREE.OrbitControls(camera,renderer.domElement);

let dots = 50;
let lines = 50;
let radius = 100;


let canvas = document.createElement('canvas');
let ctx = canvas.getContext('2d');
let size1 = 200;
canvas.width = size1;
canvas.height = size1;
let size = 200;

var img = new Image();
img.crossOrigin = 'anonymous';
var group = new THREE.Group();
img.addEventListener('load', function() {
     ctx.drawImage(img,0,0,200,200);


canvas.classList.add('tempcanvas');
document.body.appendChild(canvas);

let data = ctx.getImageData(0, 0, size, size);
data = data.data;
const material = new  THREE.LineBasicMaterial({color:0x000000});

for (var y = 0; y < size; y++) {
     let geometry = new THREE.Geometry();
     const mesh = new THREE.Line(geometry,material);


     for (var x = 0; x < size; x++) {
          var bright = data[(size * y + x) * 4];
          let vector = new THREE.Vector3(x - 100, y - 100, bright/5 - 50);

          geometry.vertices.push(vector);
     }

     mesh.rotation.x = Math.PI * 0.99;
     group.add(mesh);
     scene.add(group);
}




// for (let i = 0; i < lines; i++){
//      const geometry = new THREE.Geometry();
//      const group = new THREE.Group();
//      const material = new  THREE.LineBasicMaterial({color:0x000000});
//      for(let j = 0; j < dots; j++){
//           let coord = (j/dots)* radius*2 - radius;
//           let vector = new THREE.Vector3(coord,Math.random()*30,0);
//           geometry.vertices.push(vector);
//      }
//
//
//      const mesh = new THREE.Line(geometry,material);
//      mesh.rotation.z = Math.random()*Math.PI;
//      mesh.rotation.x = Math.random()*Math.PI;
//      group.add(mesh);
//      scene.add(group);
// }



},false)
// controls.minDistance = 300;
// controls.maxDistance = 500;

camera.position.z = 320;

const animate = function () {
     requestAnimationFrame( animate );
     renderer.render( scene, camera );
};



animate();

img.src = 'img/5.jpg'; //