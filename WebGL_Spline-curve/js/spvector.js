import * as THREE from 'three/build/three.module.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );




let renderer = new THREE.WebGLRenderer({});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0xECF0F1);
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

const curve = new THREE.SplineCurve( [
     new THREE.Vector2( -10, 0 ),
     new THREE.Vector2( -5, 5 ),
     new THREE.Vector2( 0, 0 ),
     new THREE.Vector2( 5, -5 ),
     new THREE.Vector2( 10, 0 )
] );

const points = curve.getPoints( 50 );
const geometry = new THREE.BufferGeometry().setFromPoints( points );

const material = new THREE.LineBasicMaterial( { color : 0xff0000 } );

// Create the final object to add to the scene
const splineObject = new THREE.Line( geometry, material );
scene.add(splineObject)


camera.position.z = 20;





const animate = function () {
     requestAnimationFrame( animate );


     renderer.render( scene, camera );
};

animate();
