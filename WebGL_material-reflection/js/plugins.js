import * as THREE from 'three/build/three.module.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader';
import { FlakesTexture } from 'three/examples/jsm/textures/FlakesTexture.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );


let renderer = new THREE.WebGLRenderer({alpha:true,antialias:true});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0x202020);
let doc = document.querySelector('.main');
doc.appendChild( renderer.domElement );

renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.25;


window.addEventListener('resize', function () {
     let width = window.innerWidth;
     let height = window.innerHeight;
     renderer.setSize(width,height);
     renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
     camera.aspect = width / height;
     camera.updateProjectionMatrix();
});


let pointlight = new THREE.PointLight(0xffffff,1);
pointlight.position.set(200,200,200);
scene.add(pointlight);


// let controls = new  OrbitControls(camera,renderer.domElement);

let controls = new OrbitControls(camera, renderer.domElement);

controls.autoRotate = true;
controls.autoRotateSpeed = 0.8;
controls.enableDamping = true;

let envmaploader = new THREE.PMREMGenerator(renderer);
let ballMesh;
new RGBELoader().load('img/cayley_interior_4k.hdr', function(hdrmap) {

     let envmap = envmaploader.fromCubemap(hdrmap);
     let texture = new THREE.CanvasTexture(new FlakesTexture());
     texture.wrapS = THREE.RepeatWrapping;
     texture.wrapT = THREE.RepeatWrapping;
     texture.repeat.x = 10;
     texture.repeat.y = 6;

     const ballMaterial = {
          clearcoat: 1.0,
          cleacoatRoughness:0.1,
          metalness: 0.9,
          roughness:0.5,
          color: 0x8418ca,
          normalMap: texture,
          normalScale: new THREE.Vector2(0.15,0.15),
          envMap: envmap.texture
     };

     let ballGeo = new THREE.SphereGeometry(100,64,64);
     let ballMat = new THREE.MeshPhysicalMaterial(ballMaterial);
      ballMesh = new THREE.Mesh(ballGeo,ballMat);
     scene.add(ballMesh);


});


camera.position.z = 620;

const animate = function () {
     requestAnimationFrame( animate );

     controls.update();
     renderer.render( scene, camera );
};

animate();
