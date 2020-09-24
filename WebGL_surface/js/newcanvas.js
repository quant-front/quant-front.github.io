
import Perlin from './perlin';

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
     camera.position.z = 800;
     camera.position.y = -1800;





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

     var geometry = new THREE.Geometry();
     var sprite = new THREE.TextureLoader().load('img/starts.png');


     imageCoords.forEach((el, index) => {
          geometry.vertices.push(new THREE.Vector3(el[0],el[1], Math.random()*200));
          geometry.colors.push(new THREE.Color(Math.random(),Math.random(),Math.random()));
     })
    var material = new THREE.PointsMaterial({
          vertexColors: THREE.VertexColors,
          size: 15,
          alphaTest:0.5,
          map:sprite
     });
    var  mesh = new THREE.Points(geometry,material);
     mesh.position.set(0,-185,-25);
     scene.add(mesh);

     // camera.position.set(0,0,100);
     camera.lookAt( 400, 3200, -5500 );
     // camera.rotation.y = 0;
     // camera.near = 400;
     // camera.far = 2000;
     // camera.fov = 1300;
     // camera.up.set( 100, 0, 1 );
     var i = 0;
     var time = 0;
     const animate = function () {
          i++;
          time++;
          requestAnimationFrame( animate );
          geometry.vertices.forEach( function(particle, index){
               var dX, dY, dZ;
               dX = Math.sin(i/50 + index)/2;
               dY = 0;
               dZ = 0;
               // particle.add(new THREE.Vector3(dX, dY, dZ));
               //
               var x = Math.floor(index/150);
               var y = index%150;
               particle.x = x * 20 -600;
               particle.y = y * 20 - 1500;
               particle.z = 600*Perlin(x/50,time/100+y/50,time/100) -600;
          });
          geometry.verticesNeedUpdate = true;
          renderer.render( scene, camera );
     };

     animate();


}

img.src = 'img/phone.svg';

