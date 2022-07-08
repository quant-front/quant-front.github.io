import * as THREE from 'three/build/three.module.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as Curves from 'three/examples/jsm/curves/CurveExtras.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );

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

const normal = new THREE.Vector3();
const position = new THREE.Vector3();
const lookAt = new THREE.Vector3();

let light = new THREE.DirectionalLight(0xffffff, 1);
light.position.setScalar(1);
scene.add(light, new THREE.AmbientLight(0xffffff, 0.5));



// let controls = new  OrbitControls(camera,renderer.domElement);

const  curve = new Curves.GrannyKnot()
const geometry = new THREE.TubeBufferGeometry( curve, 100, 2, 8, true );
const  material = new  THREE.MeshBasicMaterial({
     color:0xB242C6,
     side:THREE.DoubleSide,
     wireframe:true
})
const  tube = new THREE.Mesh(geometry,material);
scene.add(tube);

camera.position.z = 20;
const clock = new THREE.Clock();

let speed = 0;
let position7 = 0;
document.addEventListener('wheel',(event) => {
     speed += event.deltaY*0.0001;
})


function animation( ) {
     // controls.update();
     let time = position7;
     // const time = clock.getElapsedTime();
     const  looptime = 15;
     const t = (time % looptime)/ looptime;
     const  t2 = ((time +0.1)% looptime) / looptime;
     const  pos = tube.geometry.parameters.path.getPointAt(t);
     const  pos2 = tube.geometry.parameters.path.getPointAt(t2);
     camera.position.copy(pos);
     camera.lookAt(pos2);

     position7 += speed;
     speed *= 0.7;
     renderer.render( scene, camera );
}
