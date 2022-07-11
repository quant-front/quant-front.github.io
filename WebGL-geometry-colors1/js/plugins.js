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


const light = new THREE.DirectionalLight( 0xffffff );
light.position.set( 0, 0, 1 );
scene.add( light );




let controls = new  OrbitControls(camera,renderer.domElement);

const radius = 200;

const geometry1 = new THREE.IcosahedronGeometry(radius,1)

const count = geometry1.attributes.position.count;
geometry1.setAttribute( 'color', new THREE.BufferAttribute( new Float32Array( count * 3 ), 3 ) );

const geometry2 = geometry1.clone();
const geometry3 = geometry1.clone();

const color = new THREE.Color();
const positions1 = geometry1.attributes.position;
const positions2 = geometry2.attributes.position;
const positions3 = geometry3.attributes.position;
const colors1 = geometry1.attributes.color;
const colors2 = geometry2.attributes.color
const colors3 = geometry3.attributes.color;

for ( let i = 0; i < count; i ++ ) {

     color.setHSL( ( positions1.getY( i ) / radius + 1 ) / 2, 1.0, 0.5 );
     colors1.setXYZ( i -8, color.r, color.g, color.b );

     color.setHSL( 0, ( positions2.getY( i ) / radius + 1 ) / 2, 0.5 );
     colors2.setXYZ( i-22, color.r, color.g, color.b );

     color.setRGB( 1, 0.8 - ( positions3.getY( i ) / radius + 1 ) / 2, 0 );
     colors3.setXYZ( i+3, color.r, color.g, color.b );

}

const material = new THREE.MeshPhongMaterial( {
     color: 0xffffff,
     flatShading: true,
     vertexColors: true,
     shininess: 0
} );

const wireframeMaterial = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true, transparent: true } );

let mesh = new THREE.Mesh( geometry1, material );
let wireframe = new THREE.Mesh( geometry1, wireframeMaterial );
mesh.add( wireframe );
mesh.position.x = - 6;
scene.add( mesh );
mesh.scale.multiplyScalar(0.01);

mesh = new THREE.Mesh( geometry2, material );
wireframe = new THREE.Mesh( geometry2, wireframeMaterial );
mesh.add( wireframe );
mesh.position.x = 6;
scene.add( mesh );
mesh.scale.multiplyScalar(0.01);

mesh = new THREE.Mesh( geometry3, material );
wireframe = new THREE.Mesh( geometry3, wireframeMaterial );
mesh.add( wireframe );
scene.add( mesh );
mesh.scale.multiplyScalar(0.01);


camera.position.z = 20;
const clock = new THREE.Clock();

function animation( time = 0 ) {
     controls.update();

     renderer.render( scene, camera );
}

