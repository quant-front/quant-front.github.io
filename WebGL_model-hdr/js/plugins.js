import * as THREE from 'three/build/three.module.js';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );
// camera.position.setScalar(25);

let renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
scene.background = new THREE.Color( 0xa0a0a0 );
scene.fog = new THREE.Fog( 0xa0a0a0, 10, 50 );
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

renderer.toneMapping = THREE.ACESFilmicToneMapping;
const pmremGenerator = new THREE.PMREMGenerator( renderer );
pmremGenerator.compileEquirectangularShader();
renderer.shadowMap.type = THREE.PCFSoftShadowMap;


let footLoader = new RGBELoader();
footLoader.setDataType( THREE.UnsignedByteType )
footLoader.setPath( 'img/' )
footLoader.load( 'footprint_court_2k.hdr', function ( texture ) {

     scene.environment = pmremGenerator.fromEquirectangular(texture).texture;

     texture.dispose();
     pmremGenerator.dispose();

} );


let venice = new RGBELoader();
venice.setDataType( THREE.UnsignedByteType )
venice.setPath( 'img/' )
venice.load( 'venice_sunset_1k.hdr', function ( texture ) {

     scene.environment = pmremGenerator.fromEquirectangular(texture).texture;

     texture.dispose();
     pmremGenerator.dispose();

} );

let hlight = new THREE.AmbientLight (0x404040,20);
scene.add(hlight);



let light = new THREE.PointLight(0xc4c4c4,10);
light.position.set(0,300,50);
scene.add(light);


let controls = new  OrbitControls(camera,renderer.domElement);


const loader = new GLTFLoader();

// Optional: Provide a DRACOLoader instance to decode compressed mesh data
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/js/libs/draco/' );
loader.setDRACOLoader( dracoLoader );

loader.load('./img/cool-design.glb', handle_load);

let mesh;

function handle_load(gltf){
     mesh = gltf.scene;
     mesh.material = new THREE.MeshPhongMaterial();
     mesh.castShadow = true;
     scene.add(mesh);
}



camera.position.z = 9;
camera.position.y = 3;
const clock = new THREE.Clock();

const animate = function () {
     requestAnimationFrame( animate );
     controls.update()
     renderer.render( scene, camera );
};

animate();
