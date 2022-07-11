import * as THREE from 'three/build/three.module.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory';
import {BoxLineGeometry} from "three/examples/jsm/geometries/BoxLineGeometry";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 50, window.innerWidth/window.innerHeight, 0.1, 100 );
camera.position.set( 0, 1.6, 10 );


let renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.xr.enabled = true;
renderer.setClearColor(0x202020);
let doc = document.querySelector('.main');
doc.appendChild( renderer.domElement );
document.body.appendChild( VRButton.createButton( renderer ) );

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

scene.add(new THREE.GridHelper(20, 20));



let controls = new  OrbitControls(camera,renderer.domElement);


const geometry = new THREE.IcosahedronBufferGeometry( 0.08, 2 );

let room = new THREE.LineSegments(
     new BoxLineGeometry( 6, 6, 6, 10, 10, 10 ),
     new THREE.LineBasicMaterial( { color: 0x808080 } )
);
room.geometry.translate( 0, 3, 0 );
scene.add( room );

for ( let i = 0; i < 200; i ++ ) {

     const object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } ) );

     object.position.x = Math.random()*2-2;
     object.position.y = Math.random()*2;
     object.position.z = Math.random( )*2-2;

     room.add( object );
}


//add Controllers
const raycaster = new THREE.Raycaster();
const workingMatrix = new THREE.Matrix4();
const workingVector = new THREE.Vector3();


const  buildControllers = () => {
  const  controllerModelFactory = new XRControllerModelFactory();

  const geometry = new THREE.BufferGeometry().setFromPoints([
       new THREE.Vector3(0,0,0),
       new THREE.Vector3(0,0,-1),
  ])

  const  line = new THREE.Line(geometry);
  line.name = 'line';
  line.scale.z = 10;

  let  controllers = [];
     for (let i = 0; i <= 1; i++) {
          const controller = renderer.xr.getController(i);
          controller.add(line.clone());
          controller.userData.selectPressed = false;
          scene.add(controller);
          controllers.push(controller);

          const  grip = renderer.xr.getControllerGrip(i);
          grip.add(controllerModelFactory.createControllerModel(grip));
          scene.add(grip);
     }

  return controllers;
}

const  controllers = buildControllers();

// end controllers
//add button press event to controller

function  handleController( controller ){

}



const clock = new THREE.Clock();

const animate = function () {
     renderer.setAnimationLoop( animate );
     controls.update();
     if (controllers ){
          controllers.forEach( ( controller) => {
               handleController( controller )
          });
     }

     renderer.render( scene, camera );
};

animate();
