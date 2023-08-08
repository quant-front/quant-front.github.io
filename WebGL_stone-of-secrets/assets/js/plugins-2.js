import * as THREE from 'three/build/three.module.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader.js';
import { LuminosityHighPassShader } from 'three/examples/jsm/shaders/LuminosityHighPassShader.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import BloomVetex from '../shaders/vertex-bloom.glsl';
import BloomFragment from '../shaders/fragment-bloom.glsl';
import {Color} from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const container = document.createElement("div");
container.id = "container";
document.body.appendChild(container);

const scene = new THREE.Scene();
const scene1 = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );
let  layer1, layer2;

layer1 = new THREE.WebGLRenderer({antialias: true});
container.appendChild(layer1.domElement);

layer2 = new THREE.WebGLRenderer({ antialias: true, alpha: true });
layer2.setClearColor(0, 0);
container.appendChild(layer2.domElement);

(window.onresize = function (event) {
     camera.aspect = window.innerWidth / window.innerHeight;
     camera.updateProjectionMatrix();
     layer1.setSize(window.innerWidth, window.innerHeight);
     layer2.setSize(window.innerWidth, window.innerHeight);
})();

import fragmentShader from '../shaders/fragment.glsl';
import  vertexShader from '../shaders/vertex.glsl';

let controls = new  OrbitControls(camera,layer2.domElement);



let color1 = new Color(239,35,15);
const light = new THREE.SpotLight(color1, 0.05);
light.position.set( 5, 5, 0 );
light.angle = 0.6;
light.penumbra = 0.5;
light.shadow.bias = -0.0001;
light.castShadow = true;
scene.add(light);
scene.add(light.target);

let color2 = new Color(0.14,0.5,1.0);
const light1 = new THREE.SpotLight(color2, 2);
light1.angle = 0.6;
light1.penumbra = 0.5;
light.position.set( -5, 5, 0 );
light1.shadow.bias = -0.0001;
light1.castShadow = true;
scene.add(light1);
scene.add(light1.target);
//left light

{

}
const lightAhead = new THREE.SpotLight(color2, 10.05);
lightAhead .position.set( 5, 5, 0 );
lightAhead.angle = 0.6;
lightAhead.penumbra = 0.5;
lightAhead.shadow.bias = -0.0001;
lightAhead.castShadow = true;
scene.add(lightAhead );
scene.add(lightAhead.target);
// const spotLightHelper = new THREE.SpotLightHelper( lightAhead );
// scene.add( spotLightHelper );



const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
directionalLight.position.x += 20
directionalLight.position.y += 20
directionalLight.position.z += 20
scene.add(directionalLight);


let color3 = new Color(0.015,0.015,0.015);
const planeGeo = new THREE.PlaneBufferGeometry(30, 30);
const planeMat = new THREE.MeshStandardMaterial({
     color:color3,
     side: THREE.DoubleSide,
     envMapIntensity:0,
     roughnessMap:new  THREE.TextureLoader().load('../assets/img/scene-3/lava-and-rock_roughness.png'),
     roughness:0.7,
     normalMap: new  THREE.TextureLoader().load('../assets/img/scene-3/lava-and-rock_normal-ogl.png'),
     map:new  THREE.TextureLoader().load('../assets/img/scene-3/lava-and-rock_albedo.png'),
     aoMap:new  THREE.TextureLoader().load('../assets/img/scene-3/lava-and-rock_ao.png'),
     emissiveMap:new  THREE.TextureLoader().load('../assets/img/scene-3/lava-and-rock_emissive.png'),
     metalnessMap:new  THREE.TextureLoader().load('../assets/img/scene-3/lava-and-rock_metallic.png'),
});
planeMat.normalMap.wrapT = THREE.RepeatWrapping;
planeMat.normalMap.wrapS =  THREE.RepeatWrapping;
planeMat.normalMap.repeat.set(5,5);
const Plane = new THREE.Mesh(planeGeo, planeMat);
Plane.rotation.x = Math.PI * -.5;
scene.add(Plane);
Plane.castShadow = true;
Plane.receiveShadow = true;





//bloom
const params = {
     exposure: 1,
     bloomStrength: 0.8,
     bloomThreshold:0.21,
     bloomRadius: 2.8
};

const darkMaterial = new THREE.MeshBasicMaterial({
     color: "black"
});
const materials = {};

const renderScene = new RenderPass(scene, camera);

const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.7, 0.8, 0.85);
bloomPass.threshold = params.bloomThreshold;
bloomPass.strength = params.bloomStrength;
bloomPass.radius = params.bloomRadius;

const bloomComposer = new EffectComposer(layer1);
bloomComposer.renderToScreen = false;
bloomComposer.addPass(renderScene);
bloomComposer.addPass(bloomPass);

const finalPass = new ShaderPass(
     new THREE.ShaderMaterial({
          uniforms: {
               baseTexture: {
                    value: null
               },
               bloomTexture: {
                    value: bloomComposer.renderTarget2.texture
               }
          },
          fragmentShader:BloomFragment,
          vertexShader:BloomVetex,
          defines: {}
     }), "baseTexture"
);
finalPass.needsSwap = true;

var outlinePass = new OutlinePass(
     new THREE.Vector2(window.innerWidth, window.innerHeight),
     scene,
     camera,
);
outlinePass.edgeStrength = 30.0
outlinePass.edgeGlow  = 0.5
outlinePass.edgeThickness = 1.0;
outlinePass.visibleEdgeColor.set('#AE25B4');
outlinePass.hiddenEdgeColor.set('#AE25B4');


const finalComposer = new EffectComposer(layer1);
finalComposer.setSize(window.innerWidth, window.innerHeight);
finalComposer.addPass(renderScene);
finalComposer.addPass(finalPass);
finalComposer.addPass(outlinePass);


// outlinePass.selectedObjects = [mesh];
const manager = new THREE.LoadingManager();
let loader = new GLTFLoader(manager);
loader.load('img/rock.glb', handle_loadRock);
let ModelRock;

let  myMaterialRock = new THREE.MeshBasicMaterial({
     color:'red',
});
let visionFlame = false;
function handle_loadRock( object) {
     ModelRock = object.scene;
     ModelRock.traverse( function ( child ) {
          if ( child.isMesh ) {
               child.castShadow = true;
               child.receiveShadow = true;
               // child.material = myMaterialRock;

          }
     } );
     manager.onLoad = function ( ) {
          scene.add(ModelRock);
          setTimeout(() => {
               visionFlame = true;
          },2600);
     };

     ModelRock.position.y = 0.74;
     ModelRock.scale.multiplyScalar(0.6)
}

loader.load('img/untitled.glb', handle_load);
let Model;

let  myMaterial = new THREE.MeshPhongMaterial({
     color:'black',
     specular:'black',
     shininess:0.9,
     flatShading:false,
     clipShadows: true,
     side: THREE.DoubleSide
});
let mixer = null;
function handle_load( object) {

     Model = object.scene;
     Model.traverse( function ( child ) {
          if ( child.isMesh ) {
               child.castShadow = true;
               child.receiveShadow = true;
               child.material = myMaterial;

          }
     } );

     mixer = new THREE.AnimationMixer(object.scene);
     const action = mixer.clipAction(object.animations[0]);
     action.clampWhenFinished = true;
     action.setLoop(THREE.LoopOnce);
     action.play();
     scene.add(Model);
     Model.rotation.y = 1.7;
     Model.scale.multiplyScalar(0.6);
}

let globalUniforms = {
     time: {value: 0},
     aspect: {value: innerWidth / innerHeight},
     resolution: {value: new THREE.Vector2(innerWidth, innerHeight)}
}

const geometry = new THREE.PlaneGeometry( 2.5,4 );
const material = new  THREE.ShaderMaterial({
     fragmentShader,
     vertexShader,
     transparent: true,
     uniforms: {
          time: globalUniforms.time,
          aspect: globalUniforms.aspect,
          resolution: globalUniforms.resolution
     },
});
const mesh = new THREE.Mesh(geometry,material);

mesh.rotation.y = 1.1;
mesh.position.y = 2.7;
// mesh.position.z = -2;
// mesh.position.x = -3;



// scene1.add(Model);
light1.position.x =-19.555867167754048;
light1.position.z = 6.753437764804387;

camera.position.z = 20;
const clock = new THREE.Clock();
camera.position.set(5.971076987476761,1.9626171298120065,3.912526978100047);
camera.rotation.y = 0.9382224751108402;
camera.rotation.z = 0.3844346044105473;
camera.rotation.x = -0.46494590297417704;
const animate = function () {
     requestAnimationFrame( animate );
     controls.update();
     // mesh.rotation.y += 0.01;
     layer1.render(scene, camera);
     layer2.render(scene1, camera);

     const dt = clock.getDelta();
     if(mixer)
     {

          mixer.update( dt );
     }
     if (visionFlame) {
          scene.add(mesh);
          material.uniforms.time.value += 0.02;
     }
     // myMaterial.uniforms.time.value += 0.07;
     // renderBloom(true);
     finalComposer.render();


};

animate();

function renderBloom() {

     scene.traverse(darkenNonBloomed);
     bloomComposer.render();
     scene.traverse(restoreMaterial);

}

function darkenNonBloomed(obj) {
     Plane.material.color.set(0x000000);
     //использовать для шейдера.
     light1.color = '0x000000';
     light.color = '0x000000';
}

function restoreMaterial(obj) {
      Plane.material.color.set(color3);
     light1.color = color2;
     light.color = color1;
}
