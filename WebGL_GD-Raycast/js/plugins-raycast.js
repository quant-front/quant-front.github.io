import * as THREE from 'three/build/three.module.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.setScalar(25);


let renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0x202020);
let doc = document.querySelector('.main');
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



let controls = new  OrbitControls(camera,renderer.domElement);

let draggable;

const planeGeo = new THREE.PlaneBufferGeometry(30, 30);
const planeMat = new THREE.MeshPhongMaterial({
     color: 0x25004D,
     side: THREE.DoubleSide,
});
const Plane = new THREE.Mesh(planeGeo, planeMat);
Plane.rotation.x = Math.PI * -.5;
scene.add(Plane);
Plane.userData.ground = true

const geometry = new THREE.SphereGeometry( 1, 32, 32 );
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const sphere = new THREE.Mesh( geometry, material );
scene.add( sphere );
sphere.position.y = 1;
sphere.userData.draggable = true
sphere.userData.name = 'SPHERE'



const geometry1 = new THREE.BoxGeometry( 2, 2, 2 );
const material1 = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
const cube = new THREE.Mesh( geometry1, material1 );
scene.add( cube );
cube.position.y = 1;
cube.position.x = 8;
cube.userData.draggable = true
cube.userData.name = 'BOX'



const geometry7 = new THREE.CylinderGeometry( 1, 1, 2, 32 );
const material7 = new THREE.MeshBasicMaterial( {color: "#35B9B9"} );
const cylinder = new THREE.Mesh( geometry7, material7 );
scene.add( cylinder );
cylinder.position.x = -2;
cylinder.position.y = 1;
cylinder.position.z = 7;
cylinder.userData.draggable = true
cylinder.userData.name = 'CYLINDER'


const raycaster = new THREE.Raycaster(); // create once
const clickMouse = new THREE.Vector2();  // create once
const moveMouse = new THREE.Vector2();

function intersect(pos) {
     raycaster.setFromCamera(pos, camera);
     return raycaster.intersectObjects(scene.children);
}

window.addEventListener('click', event => {
     if (draggable != null) {
          console.log(`dropping draggable ${draggable.userData.name}`)
          draggable = null
          return;
     }

     // THREE RAYCASTER
     clickMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
     clickMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

     const found = intersect(clickMouse);
     console.log(found );
     if (found.length > 0) {
          if (found[0].object.userData.draggable) {
               draggable = found[0].object
               console.log(`found draggable ${draggable.userData.name}`)
          }
     }
})

window.addEventListener('mousemove', event => {
     moveMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
     moveMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

function dragObject() {
     if (draggable != null) {
          const found = intersect(moveMouse);
          if (found.length > 0) {
               for (let i = 0; i < found.length; i++) {
                    if (!found[i].object.userData.ground)
                         continue

                    let target = found[i].point;
                    draggable.position.x = target.x
                    draggable.position.z = target.z
               }
          }
     }
}



const clock = new THREE.Clock();

const animate = function () {
     dragObject();
     renderer.render( scene, camera );
     requestAnimationFrame( animate );
};

animate();
