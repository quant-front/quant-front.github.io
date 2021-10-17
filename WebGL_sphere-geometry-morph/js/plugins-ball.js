import * as THREE from 'three/build/three.module.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );
// camera.position.setScalar(25);

let renderer = new THREE.WebGLRenderer();
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
const helper = new THREE.GridHelper(20, 20);
helper.rotation.x = Math.PI * .072;
scene.add(helper);



let controls = new  OrbitControls(camera,renderer.domElement);

const textureLoader = new THREE.TextureLoader();

const waterBaseColor = textureLoader.load("img/Water_002_COLOR.jpg");
const waterNormalMap = textureLoader.load("img/Water_002_NORM.jpg");
const waterHeightMap = textureLoader.load("img/Water_002_DISP.png");
const waterRoughness = textureLoader.load("img/Water_002_ROUGH.jpg");
const waterAmbientOcclusion = textureLoader.load("img/Water_002_OCC.jpg");

// PLANE
const geometry = new THREE.SphereBufferGeometry(3, 128, 128);
const sphere = new THREE.Mesh(geometry,
     new THREE.MeshStandardMaterial({
          map: waterBaseColor,
          normalMap: waterNormalMap,
          displacementMap: waterHeightMap, displacementScale: 0.01,
          roughnessMap: waterRoughness, roughness: 0,
          aoMap: waterAmbientOcclusion
     }));
sphere.receiveShadow = true;
sphere.castShadow = true;
sphere.rotation.x = - Math.PI / 4;
scene.add(sphere);
sphere.position.y = 5;
sphere.position.z = 0;

const count  = geometry.attributes.position.count;

const position_clone = JSON.parse(JSON.stringify(geometry.attributes.position.array));
const normals_clone = JSON.parse(JSON.stringify(geometry.attributes.normal.array));
const damping = 0.2;



camera.position.z = 25;
const clock = new THREE.Clock();

const animate = function () {

     const now = Date.now() / 200;

     // iterate all vertices
     for (let i = 0; i < count; i++) {
          // indices
          const ix = i * 3
          const iy = i * 3 + 1
          const iz = i * 3 + 2

          // use uvs to calculate wave
          const uX = geometry.attributes.uv.getX(i) * Math.PI * 16
          const uY = geometry.attributes.uv.getY(i) * Math.PI * 16

          // calculate current vertex wave height
          const xangle = (uX + now)
          const xsin = Math.sin(xangle) * damping
          const yangle = (uY + now)
          const ycos = Math.cos(yangle) * damping

          // set new position
          geometry.attributes.position.setX(i, position_clone[ix] + normals_clone[ix] * (xsin + ycos))
          geometry.attributes.position.setY(i, position_clone[iy] + normals_clone[iy] * (xsin + ycos))
          geometry.attributes.position.setZ(i, position_clone[iz] + normals_clone[iz] * (xsin + ycos))
     }
     geometry.computeVertexNormals();
     geometry.attributes.position.needsUpdate = true;

     renderer.render( scene, camera );
     requestAnimationFrame( animate );
};

animate();
