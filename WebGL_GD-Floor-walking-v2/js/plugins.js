import * as THREE from 'three/build/three.module.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import anime from "animejs";
import {Raycaster} from "three/build/three.module.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );
// camera.position.setScalar(25);

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
let controls = new  OrbitControls(camera,renderer.domElement);


controls.enableDamping = true;
controls.dampingFactor = 0.5;
controls.addEventListener('end', () => {
     updateCameraOrbit();
});
updateCameraOrbit();

let light = new THREE.DirectionalLight(0xffffff, 1);
light.position.setScalar(1);
scene.add(light, new THREE.AmbientLight(0xffffff, 0.5));

let planeGeometry = new THREE.PlaneGeometry(100, 100, 50, 50);
let material = new THREE.MeshBasicMaterial({
     color: 0xffffff,
     wireframe: true
});
const plane = new THREE.Mesh(planeGeometry, material);
plane.rotateX(-Math.PI / 2);
scene.add(plane);
plane.name = '101'

let cubes = [];
let mat, geo;
for (let i = 0; i < 30; i++) {
     geo = new THREE.BoxGeometry(
          Math.random() * 4,
          Math.random() * 4,
          Math.random() * 4
     );
     mat = new THREE.MeshBasicMaterial({ wireframe: false });
     // switch (i % 3) {
     //      case 0:
     //           mat.color = new THREE.Color(0xff0000);
     //           break;
     //      case 1:
     //           mat.color = new THREE.Color(0xffff00);
     //           break;
     //      case 2:
     //           mat.color = new THREE.Color(0x0000ff);
     //           break;
     // }
     const cube = new THREE.Mesh(geo, mat);
     // cubes.push(cube);
}
cubes.forEach((c) => {
     c.position.x = Math.random() * 100 - 50;
     c.position.z = Math.random() * 100 - 50;
     c.geometry.computeBoundingBox();
     c.position.y =
          (c.geometry.boundingBox.max.y - c.geometry.boundingBox.min.y) / 2;
     scene.add(c);
});

let spots = [];
for (let i = 0; i < 30; i++) {
     geo = new THREE.BoxGeometry(4, 0.4, 4);
     mat = new THREE.MeshBasicMaterial({ wireframe: false });

     mat.color = new THREE.Color(0xffffff);

     let spot = new THREE.Mesh(geo, mat);
     spots.push(spot);
}
spots.forEach((c) => {
     c.position.x = Math.random() * 100 - 50;
     c.position.z = Math.random() * 100 - 50;
     c.geometry.computeBoundingBox();
     c.position.y = 0.2;
     scene.add(c);
});

function updateCameraOrbit() {
     var forward = new THREE.Vector3();
     camera.getWorldDirection(forward);
     controls.target.copy(camera.position).add(forward);
}


document.addEventListener( 'mousemove', onDocumentMouseMovePointsGirl, false );

function onDocumentMouseMovePointsGirl(event) {

     const mouse = new THREE.Vector2();
     mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
     mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
     const raycaster = new Raycaster();
     raycaster.setFromCamera( mouse, camera );
     const intersects = raycaster.intersectObjects( spots  );
     if(intersects.length > 0) {
          document.body.style.cursor = "pointer";
     } else {
          document.body.style.cursor = "grab";
     }
}


let k = 0;
window.addEventListener('click', (event) => {
     var selectedObject;
     const raycaster = new THREE.Raycaster();
     const mouse = new THREE.Vector2();
     mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
     mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
     raycaster.setFromCamera(mouse, camera);
     var intersects = raycaster.intersectObjects(spots, true);
     const found = raycaster.intersectObjects(scene.children);

     if (intersects.length > 0 ) {
          k++;
          if (k === 1) {
               selectedObject = intersects[0];
               var newPos = selectedObject.object.position.clone();
               newPos.y = camera.position.y;
               anime({
                    targets:camera.position,
                    x:newPos.x,
                    y:newPos.y,
                    z: newPos.z,
                    easing:'easeOutCubic',
                    loop:1,
                    duration:found[0].distance * 70,
                    update:function(anim){
                         updateCameraOrbit();
                         // camera.lookAt( scene.position );
                    },
                    complete:function(anim){
                         updateCameraOrbit();
                         k=0;
                    },

               });
          }



     }
})


camera.position.z = 10;
camera.position.y = 3;

const animate = function () {
     requestAnimationFrame( animate );
     updateCameraOrbit();
     renderer.render( scene, camera );
     controls.update();
};

animate();
