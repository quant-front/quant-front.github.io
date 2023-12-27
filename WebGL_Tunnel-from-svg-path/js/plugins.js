import * as THREE from 'three/build/three.module.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );


let renderer = new THREE.WebGLRenderer();
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


//Array of points
const points = [
     [68.5,185.5],
     [1,262.5],
     [270.9,281.9],
     [345.5,212.8],
     [178,155.7],
     [240.3,72.3],
     [153.4,0.6],
     [52.6,53.3],
     [68.5,185.5]
];

//Convert the array of points into vertices
for (let i = 0; i < points.length; i++) {
     let x = points[i][0];
     let y = 0;
     let z = points[i][1];
     points[i] = new THREE.Vector3(x, y, z);
}
//Create a path from the points
const path = new THREE.CatmullRomCurve3(points);

//Create the tube geometry from the path
const geometry = new THREE.TubeGeometry( path, 300, 2, 20, true );
//Basic material
var frontMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, side: THREE.FrontSide } );
var backMaterial = new THREE.MeshBasicMaterial( { color: 'black', side: THREE.BackSide } );

var group = new THREE.Group();
group.add( new THREE.Mesh( geometry, frontMaterial ) );
group.add( new THREE.Mesh( geometry, backMaterial ) );
scene.add( group );


camera.position.z = 190;

const animate = function () {
     requestAnimationFrame( animate );

     renderer.render( scene, camera );
};

animate();

https://codepen.io/Lighty/pen/rNwJELz
