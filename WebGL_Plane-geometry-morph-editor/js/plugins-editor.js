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


let controls = new  OrbitControls(camera,renderer.domElement);

const textureLoader = new THREE.TextureLoader();

const soilBaseColor = textureLoader.load("img/rock/Rock_Moss_001_basecolor.jpg");
const soilNormalMap = textureLoader.load("img/rock/Rock_Moss_001_normal.jpg");
const soilHeightMap = textureLoader.load("img/rock/Rock_Moss_001_height.png");
const soilRoughness = textureLoader.load("img/rock/Rock_Moss_001_roughness.jpg");
const soilAmbientOcclusion = textureLoader.load("img/rock/Rock_Moss_001_ambientOcclusion.jpg");

// PLANE
const WIDTH = 100;
const HEIGHT = 100;
const geometry = new THREE.PlaneBufferGeometry(WIDTH, HEIGHT, 300, 300);
const plane = new THREE.Mesh(geometry,
     new THREE.MeshStandardMaterial({
          map: soilBaseColor,
          normalMap: soilNormalMap,
          displacementMap: soilHeightMap, displacementScale: 2,
          roughnessMap: soilRoughness, roughness: 0,
          aoMap: soilAmbientOcclusion
     }));
plane.receiveShadow = true;
plane.castShadow = true;
plane.rotation.x = Math.PI * 1.7;
plane.position.y = -3;
scene.add(plane);

// CLICK EVENT
const raycaster = new THREE.Raycaster(); // create once
const clickMouse = new THREE.Vector2();  // create once
const vector3 = new THREE.Vector3();   // create once
const MAX_CLICK_DISTANCE = 10
window.addEventListener('click', event => {

     // THREE RAYCASTER
     clickMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
     clickMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

     raycaster.setFromCamera(clickMouse, camera);
     const found = raycaster.intersectObjects(scene.children);
     if (found.length > 0 && (found[0].object).geometry) {
          const mesh = found[0].object
          const geometry = mesh.geometry
          const point = found[0].point

          for (let i = 0; i  < geometry.attributes.position.count; i++) {
               vector3.setX(geometry.attributes.position.getX(i))
               vector3.setY(geometry.attributes.position.getY(i))
               vector3.setZ(geometry.attributes.position.getZ(i))
               const toWorld = mesh.localToWorld(vector3)

               const distance = point.distanceTo(toWorld)
               if (distance < MAX_CLICK_DISTANCE) {
                    geometry.attributes.position.setZ(i, geometry.attributes.position.getZ(i) + (MAX_CLICK_DISTANCE - distance) / 2)
               }
          }
          geometry.computeVertexNormals()
          geometry.attributes.position.needsUpdate = true
     }
})




camera.position.z = 140;
const clock = new THREE.Clock();

const animate = function () {

     renderer.render( scene, camera );
     requestAnimationFrame( animate );
};

animate();
