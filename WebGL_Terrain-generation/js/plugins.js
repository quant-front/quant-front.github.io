import * as THREE from 'three/build/three.module.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
const Colors = require('./colors.js').Colors;
const Perlin = require('./perlin.js').Perlin;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 1, 3000 );


camera.position.y = 70;
camera.position.z = 1000;
camera.rotation.x = -15 * Math.PI / 180;

let renderer = new THREE.WebGLRenderer();
renderer.setClearColor(Colors.BackgroundColor);
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0xf19c98);
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




var light = new THREE.DirectionalLight(Colors.LightColor, 1.3);
light.position.set(camera.position.x, camera.position.y+500, camera.position.z+500).normalize();
scene.add(light);

// Setup the terrain
var geometry = new THREE.PlaneBufferGeometry( 2000, 2000, 256, 256 );
var material = new THREE.MeshLambertMaterial({color: Colors.TerrainColor});
var terrain = new THREE.Mesh( geometry, material );
terrain.rotation.x = -Math.PI / 2;
scene.add( terrain );

var perlin = new Perlin();
var peak = 60;
var smoothing = 300;
function refreshVertices() {
     var vertices = terrain.geometry.attributes.position.array;
     for (var i = 0; i <= vertices.length; i += 3) {
          vertices[i+2] = peak * perlin.noise(
               (terrain.position.x + vertices[i])/smoothing,
               (terrain.position.z + vertices[i+1])/smoothing
          );
     }
     terrain.geometry.attributes.position.needsUpdate = true;
     terrain.geometry.computeVertexNormals();
}
console.log(terrain.geometry.attributes.position.array);
var clock = new THREE.Clock();
var movementSpeed = 60;




camera.position.z = 20;

const animate = function () {
     requestAnimationFrame( animate );
     var delta = clock.getDelta();
     terrain.position.z += movementSpeed * delta;
     camera.position.z += movementSpeed * delta;
     refreshVertices();
     renderer.render( scene, camera );
};

animate();
