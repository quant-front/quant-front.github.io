import * as THREE from 'three/build/three.module.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import anime from "animejs";
import { Raycaster } from "three/src/core/Raycaster";

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

// let controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.5;
controls.addEventListener('end', () => {
     updateCameraOrbit();
});
updateCameraOrbit();
document.addEventListener('dragend', function () {
     console.log("drag! end");
})


let light = new THREE.DirectionalLight(0xffffff, 1);
light.position.setScalar(1);
scene.add(light, new THREE.AmbientLight(0xffffff, 0.5));

let planeGeometry = new THREE.PlaneGeometry(100, 100, 50, 50);
// let material = new THREE.MeshBasicMaterial({
//      color: 0xffffff,
//      wireframe: true
// });
let material = new THREE.MeshNormalMaterial({
     // color: 0xffffff,
     wireframe: true
});
const plane = new THREE.Mesh(planeGeometry, material);
plane.rotateX(-Math.PI / 2);
scene.add(plane);
plane.name = '101'
plane.userData.ground = true;
let onj = [];
onj.push(plane);

document.addEventListener( 'mousemove', onDocumentMouseMovePointsGirl, false );

function onDocumentMouseMovePointsGirl(event) {

     const mouse = new THREE.Vector2();
     mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
     mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
     const raycaster = new Raycaster();
     raycaster.setFromCamera( mouse, camera );
     const intersects = raycaster.intersectObjects( onj  );
     if(intersects.length > 0) {
          document.body.style.cursor = "pointer";
     } else {
          document.body.style.cursor = "grab";
     }
}

// walking
function updateCameraOrbit() {
     var forward = new THREE.Vector3();
     camera.getWorldDirection(forward);
     controls.target.copy(camera.position).add(forward);
}

let k = 0;
window.addEventListener('click', (event) => {
     const raycaster = new THREE.Raycaster();
     const mouse = new THREE.Vector2();
     mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
     mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
     raycaster.setFromCamera(mouse, camera);
     // var intersects = raycaster.intersectObjects(spots, true);
     const found = raycaster.intersectObjects(scene.children);
     // console.log(found[0].object.name);
     if (found.length > 0 ) {
          k++;
          if (k === 1) {
               const point = found[0].point;
               point.y = camera.position.y;

               if (found[0].object.name === '101') {

               }
               else {
                    console.log("false");
               }
               anime({
                    targets:camera.position,
                    x: found[0].point.x,
                    y: point.y,
                    z: found[0].point.z,
                    easing:'easeOutCubic',
                    loop:1,
                    delay:100,
                    duration:found[0].distance * 70,
                    update:function(anim){
                         updateCameraOrbit();
                    },
                    complete:function(anim){
                         updateCameraOrbit();
                    },
                    begin: function(anim) {
                         setTimeout(() => {
                              k=0;
                         }, found[0].distance * 70)
                    },

               });
          }



     }
});

// mouse cursor

let draggable;

const geometry = new THREE.SphereGeometry( 1, 32, 16 );
const material1 = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const sphere = new THREE.Mesh( geometry, material1 );
// scene.add( sphere );
// sphere.userData.draggable = true;
// sphere.userData.name = 'SPHERE'


const geometry8 = new THREE.RingBufferGeometry(0.45, 0.5, 32).rotateX(
     -Math.PI / 2
);
const material8 = new THREE.MeshBasicMaterial();

var meshcircle = new THREE.Mesh(geometry8, material8);
scene.add(meshcircle);
draggable = meshcircle;


const raycaster = new THREE.Raycaster(); // create once
const moveMouse = new THREE.Vector2();

function intersect(pos) {
     raycaster.setFromCamera(pos, camera);
     return raycaster.intersectObjects(scene.children);
}


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

// Change visible

const cursorObj = [];
cursorObj.push(plane);
function onDocumentMouseMove(event) {

     const mouse = new THREE.Vector2();
     mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
     mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
     // const raycaster = new Raycaster();
     raycaster.setFromCamera( mouse, camera );
     const intersects = raycaster.intersectObjects( cursorObj );

     meshcircle.visible = intersects.length > 0;

}

document.addEventListener( 'mousemove', onDocumentMouseMove, false );


camera.position.z = 10;
camera.position.y = 3;

const animate = function () {
     requestAnimationFrame( animate );
     dragObject();
     updateCameraOrbit();
     renderer.render( scene, camera );
     controls.update();
};

animate();
