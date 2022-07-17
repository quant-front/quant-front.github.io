import * as THREE from 'three/build/three.module.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );
// camera.position.setScalar(25);

let renderer = new THREE.WebGLRenderer({
antialias: true,
powerPreference: 'high-performance', 
});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0x202020);
let doc = document.querySelector('.main');
renderer.setAnimationLoop( animation );
doc.appendChild( renderer.domElement );


window.addEventListener('resize', function () {
     let width = window.innerWidth;
     let height = window.innerHeight;
     renderer.setSize(width,height);
     renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
     camera.aspect = width / height;
     camera.updateProjectionMatrix();
});


let light = new THREE.DirectionalLight(0xffffff, 1);
light.position.setScalar(1);
scene.add(light, new THREE.AmbientLight(0xffffff, 0.5));




// let controls = new  OrbitControls(camera,renderer.domElement);
const planeGeo = new THREE.PlaneBufferGeometry(30, 30);
const planeMat = new THREE.MeshPhongMaterial({
     color: 0x25004D,
     side: THREE.DoubleSide,
});
const Plane = new THREE.Mesh(planeGeo, planeMat);
Plane.rotation.x = Math.PI * -.5;
scene.add(Plane);
Plane.position.y = -1;


// const geometry1 = new THREE.SphereGeometry( 0.5, 32, 16 );
// const material1 = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
// const sphere = new THREE.Mesh( geometry1, material1 );
// scene.add( sphere );


var geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
geometry.translate( 0, 0.5, 0 );

{
     const geometry = new THREE.CircleGeometry( 1, 32 );
     const material = new THREE.MeshPhongMaterial({
          color: 0x25004D,
          side: THREE.DoubleSide,
     });
     const circle = new THREE.Mesh( geometry, material );
     scene.add( circle );
     circle.position.z = 15;
     circle.position.y = 1;
     const materialMini = new THREE.MeshPhongMaterial({
          color: 'red',
          side: THREE.DoubleSide,
     });
     const geometry1 = new THREE.CircleGeometry( 0.5, 32 );
     const circle1 = new THREE.Mesh( geometry1, materialMini);
     circle1.position.z = 15;
     circle1.position.y = 1;
     scene.add( circle1 );
}

for ( var i = 0; i < 500; i ++ ) {
     var material = new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true } );
     var mesh = new THREE.Mesh( geometry, material );
     mesh.position.x = Math.random() * 1600 - 800;
     mesh.position.y = 0;
     mesh.position.z = Math.random() * 1600 - 800;
     mesh.scale.x = 20;
     mesh.scale.y = Math.random() * 80 + 10;
     mesh.scale.z = 20;
     mesh.updateMatrix();
     mesh.matrixAutoUpdate = false;
     scene.add( mesh );
     mesh.material.color.set( Math.random() *'0x00ffff');
}

const manager = new THREE.LoadingManager();

let loader = new GLTFLoader(manager);
loader.load('img/untitled.glb', handle_load);

let Model;
let MeshModel = [];

function handle_load(gltf){
     Model = gltf.scene;
     Model.material = new THREE.MeshLambertMaterial();
     scene.add( Model);
     Model.scale.multiplyScalar(2.0);
     Model.rotation.y = 1.8;
     MeshModel.push(Model);
}


let  player = { height:1.8, speed:0.2, turnSpeed:Math.PI*0.02,canShoot:0 };
let  keyboard = {};
let bullets = [];

camera.position.set(0, player.height, -5);
camera.lookAt(new THREE.Vector3(0,player.height,0));

const clock = new THREE.Clock();

let speed = 0.05;
function animation( time = 0 ) {

     for(var index=0; index<bullets.length; index+=1){
          if( bullets[index] === undefined ) continue;
          if( bullets[index].alive == false ){
               bullets.splice(index,1);
               continue;
          }

          bullets[index].position.add(bullets[index].velocity);
     }

// controls.update();
     if(keyboard[87]){ // W key
          camera.position.x -= Math.sin(camera.rotation.y) * player.speed;
          camera.position.z -= -Math.cos(camera.rotation.y) * player.speed;
     }
     if(keyboard[83]){ // S key
          camera.position.x += Math.sin(camera.rotation.y) * player.speed;
          camera.position.z += -Math.cos(camera.rotation.y) * player.speed;
     }
     if(keyboard[65]){ // A key
          camera.position.x += Math.sin(camera.rotation.y + Math.PI/2) * player.speed;
          camera.position.z += -Math.cos(camera.rotation.y + Math.PI/2) * player.speed;
     }
     if(keyboard[68]){ // D key
          camera.position.x += Math.sin(camera.rotation.y - Math.PI/2) * player.speed;
          camera.position.z += -Math.cos(camera.rotation.y - Math.PI/2) * player.speed;
     }

     if(keyboard[37]){ // left arrow key
          camera.rotation.y -= player.turnSpeed;
     }
     if(keyboard[39]){ // right arrow key
          camera.rotation.y += player.turnSpeed;
     }
     // if(keyboard[32]){ // right arrow key
     //      camera.position.y += speed;
     //      speed = Math.max( 0, speed - 0.0005 );
     // }
     if(keyboard[32] && player.canShoot <= 0){ // spacebar key
          // creates a bullet as a Mesh object
          console.log("123");
          var bullet = new THREE.Mesh(
               new THREE.SphereGeometry(0.05,8,8),
               new THREE.MeshBasicMaterial({color:0xffffff})
          );
          // this is silly.
          // var bullet = models.pirateship.mesh.clone();

          // position the bullet to come from the player's weapon
          bullet.position.set(
               MeshModel[0].position.x - 1 * Math.sin(camera.rotation.y-0.005),
               MeshModel[0].position.y + -0.20 ,
               MeshModel[0].position.z + 1 * Math.cos(camera.rotation.y)
          );

          // set the velocity of the bullet
          bullet.velocity = new THREE.Vector3(
               -Math.sin(camera.rotation.y),
               0,
               Math.cos(camera.rotation.y)
          );

          // after 1000ms, set alive to false and remove from scene
          // setting alive to false flags our update code to remove
          // the bullet from the bullets array
          bullet.alive = true;
          setTimeout(function(){
               bullet.alive = false;
               scene.remove(bullet);
          }, 1000);

          // add to scene, array, and set the delay to 10 frames
          bullets.push(bullet);
          scene.add(bullet);
          player.canShoot = 10;
     }
     if(player.canShoot > 0) player.canShoot -= 1;
     if (MeshModel[0]) {
          MeshModel[0].position.set(
               // camera.position.x - 9.85 * Math.sin(camera.rotation.y+0.025),
               // camera.position.y - 0.7 ,
               // camera.position.z + 1.85 * Math.cos(camera.rotation.y)
               camera.position.x - 1 * Math.sin(camera.rotation.y+0.055),
               camera.position.y - 0.5 ,
               camera.position.z + 1 * Math.cos(camera.rotation.y)
          );
          MeshModel[0].rotation.set(
               camera.rotation.x,
               camera.rotation.y +1.55 ,
               camera.rotation.z,
          );

     }
          // sphere.position.set(
          //      camera.position.x - 1.85 * Math.sin(camera.rotation.y),
          //      camera.position.y - 0.7 ,
          //      camera.position.z + 1.85 * Math.cos(camera.rotation.y)
          // );
          // sphere.rotation.set(
          //      camera.rotation.x,
          //      camera.rotation.y +1.35 ,
          //      camera.rotation.z,
          // );






     renderer.render( scene, camera );
}

function keyDown(event){
     keyboard[event.keyCode] = true;
}

function keyUp(event){
     keyboard[event.keyCode] = false;
}

window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);
