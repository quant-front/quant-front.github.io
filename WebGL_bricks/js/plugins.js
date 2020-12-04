const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );

// const color = 0xFFFFFF;
// const intensity = 1;
// const light = new THREE.DirectionalLight(color, intensity);
// light.position.set(0, 10, 5);
// // light.target.position.set(0, 0, 20);
// scene.add(light);




hlight = new THREE.AmbientLight (0x404040,0.5);
scene.add(hlight);


//
directionalLight = new THREE.DirectionalLight(0xffffff,0.5);
directionalLight.position.set(0,1,0);
let light = new THREE.PointLight(0xc4c4c4,0.5);
light.position.set(0,300,500);
scene.add(light);


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


let controls = new  THREE.OrbitControls(camera,renderer.domElement);

const  height = 0.4
const geometry = new THREE.BoxGeometry( 3,height,0.9 );
const material = new  THREE.MeshLambertMaterial({
     color:0xFF5733,
});
const mesh = new THREE.Mesh(geometry,material);
// scene.add(mesh);
var  group = new THREE.Object3D();
for (let row = 0; row <20 ; row++) {
     let yPos = row * (height+0.05);
     let offset = -1;
     for (let count = 0; count < 3; count++) {
          const block = mesh.clone();
          if (row % 2){
               block.rotation.y = Math.PI/2;
               block.position.set(offset,yPos,0)
          }
          else {
               block.position.set(0,yPos,offset);
          }
          // scene.add(block);
          offset++;
          group.add(block);

     }
}
scene.add(group);



camera.position.set(0,5,15);
controls.target.set(0,4,0);
controls.update();

let time = 0;

const animate = function () {
     requestAnimationFrame( animate );
     group.rotation.y += 0.01;

     renderer.render( scene, camera );
};

animate();
