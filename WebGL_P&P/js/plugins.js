import * as THREE from 'three';
// import * as THREE from 'three/build/three.module.js';
import {ObjectControls} from 'threejs-object-controls';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
// import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry.js';
// import {VideoTexture} from 'three/src/textures/';
// import {FontLoader} from 'three/examples/jsm/loaders/FontLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import { InteractionManager } from "three.interactive";
import LANGUAGEJSON from '../js/LanguageEng-1.json';
import DATAJSON from '../js/Data-1.json';
// import * as  Stats  from "stats.js/build/stats.min";





const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.layers.enable(1);
let renderer = new THREE.WebGLRenderer({antialias: true,powerPreference: 'high-performance', });
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0x160035 );
renderer.autoClear = false;
let doc = document.querySelector('.main');
doc.appendChild( renderer.domElement );

let loaderScreen = document.querySelector('.main');


const interactionManager = new InteractionManager(
     renderer,
     camera,
     renderer.domElement
);



window.addEventListener('resize', function () {
     let width = window.innerWidth;
     let height = window.innerHeight;
     renderer.setSize(width,height);
     camera.aspect = width / height;
     renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
     camera.updateProjectionMatrix();
});


const FontLoad = new THREE.FontLoader();
const manager = new THREE.LoadingManager();
const loader = new GLTFLoader(manager);

const dracoLoader = new DRACOLoader(manager);
dracoLoader.setDecoderPath( './decoder/');
dracoLoader.preload();
dracoLoader.setDecoderConfig({type: 'js'});
loader.setDRACOLoader( dracoLoader );

loader.load('./models/model3.glb', handle_load1);
loader.load('./models/model3.glb', handle_load);

// loader.setDecoderPath( '/examples/jsm/libs/draco/' );

let x = 1; let y = 1; let width = 9; let height = 6; let radius = 1;
let shape = new THREE.Shape();
shape.moveTo( x, y + radius );
shape.lineTo( x, y + height - radius );
shape.quadraticCurveTo( x, y + height, x + radius, y + height );
shape.lineTo( x + width - radius, y + height );
shape.quadraticCurveTo( x + width, y + height, x + width, y + height - radius );
shape.lineTo( x + width, y + radius );
shape.quadraticCurveTo( x + width, y, x + width - radius, y );
shape.lineTo( x + radius, y );
shape.quadraticCurveTo( x, y, x, y + radius );

let ScreenGeometry = new THREE.ShapeBufferGeometry( shape );

const PlaneGeometry = new THREE.PlaneGeometry( 80, 80 );
const PlaneMaterial = new THREE.MeshStandardMaterial( {color: 0x25004D, side: THREE.DoubleSide, opacity:1,transparent:true} );
const plane = new THREE.Mesh( PlaneGeometry, PlaneMaterial );
plane.rotation.x = Math.PI * -.5;
plane.position.y = -5;
plane.position.z = -30;
plane.receiveShadow = false;
plane.layers.set(1);
scene.add( plane );


const PlaneScene2 = new THREE.Mesh( PlaneGeometry, PlaneMaterial );
PlaneScene2.rotation.x = Math.PI * -.5;
PlaneScene2.position.y = -5;
PlaneScene2.position.z = -110;
PlaneScene2.layers.set(1);


const PlaneScene3 = new THREE.Mesh( PlaneGeometry, PlaneMaterial );
PlaneScene3.rotation.x = Math.PI * -.5;
PlaneScene3.position.y = -5;
PlaneScene3.position.z = -190;
PlaneScene3.layers.set(1);

const PlaneScene4 = new THREE.Mesh( PlaneGeometry, PlaneMaterial );
PlaneScene4.rotation.x = Math.PI * -.5;
PlaneScene4.position.y = -5;
PlaneScene4.position.z = -270;
PlaneScene4.layers.set(1);



const SceneStarGeometry = new THREE.SphereGeometry( 0.8, 32, 16 );
const SceneStarMaterial = new THREE.MeshBasicMaterial( { color: 'white' } );

const StarsMesh = new THREE.InstancedMesh(SceneStarGeometry, SceneStarMaterial, 300)
StarsMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
StarsMesh.layers.set(1);
StarsMesh.position.z = -270;


for(let i = 0; i < 300; i++)
{
     const position = new THREE.Vector3(
          Math.random()* 300 -150,
          Math.random()* 300 -150,
          Math.random()* 300 -150
     )

     const quaternion = new THREE.Quaternion()
     quaternion.setFromEuler(new THREE.Euler(
          (Math.random() - 0.5) * Math.PI * 2,
          (Math.random() - 0.5) * Math.PI * 2,
          0
     ))

     const matrix = new THREE.Matrix4()
     matrix.makeRotationFromQuaternion(quaternion)
     matrix.setPosition(position)
     StarsMesh.setMatrixAt(i, matrix)
}


let FogGroup = new THREE.Object3D();
let TextureLoader = new  THREE.TextureLoader();
TextureLoader.load("img/light-color.png", function (texture) {
     let HazyGeo = new THREE.PlaneBufferGeometry(80, 30);
     let HazyMaterial = new THREE.MeshLambertMaterial({
          map: texture,
          transparent: true,
          opacity:0.70,
          color:'#E500E7',
          side:THREE.DoubleSide
     })
     const HazyLight = new THREE.Mesh(HazyGeo , HazyMaterial );
     scene.add(HazyLight);
     HazyLight.position.z = - 79;
     HazyLight.position.y = 10;
     HazyLight.layers.set(1);
     FogGroup.add(HazyLight);
})
scene.add(FogGroup)

const FullRoad = new THREE.Object3D();
const Line = new THREE.Object3D();
const RoadGeometry = new THREE.BoxGeometry( 0.2, 10, 0.5 ,1,1);
const RoadMaterial = new THREE.MeshBasicMaterial( {color:0xFFFCFA} );
const RoadRight = new THREE.Mesh( RoadGeometry, RoadMaterial );
RoadRight.rotation.x = Math.PI * -.5;
RoadRight.rotation.z = -2.35;
RoadRight.position.y  = -5.1;
RoadRight.position.x  = 3.60;
RoadRight.layers.set(1);

const RoadLeft = new THREE.Mesh( RoadGeometry, RoadMaterial );
RoadLeft.rotation.x = Math.PI * -.5;
RoadLeft.rotation.z = 2.45;
RoadLeft.position.y  = -5.1;
RoadLeft.position.x  = -3.15;
RoadLeft.position.z  = 0.21;
RoadLeft.layers.set(1);

Line.add(RoadLeft,RoadRight);
Line.layers.set(1);
scene.add(Line);
Line.scale.set(2,1,2);
Line.position.z = 5;
Line.rotation.x = -3.14;
Line.position.y = -10.2;

const Line2 = Line.clone();
Line2.layers.set(1);
Line2.position.z = -5;
scene.add(Line2);

const Line3 = Line.clone();
Line3.position.z = -15;
scene.add(Line3);

const Line4 = Line.clone();
Line4.position.z = -25;
scene.add(Line4);

const Line5 = Line.clone();
Line5.position.z = -35;
scene.add(Line5);

const Line6 = Line.clone();
Line6.position.z = -45;
scene.add(Line6);

const Line7 = Line.clone();
Line7.position.z = -55;
scene.add(Line7);

const Line8 = Line.clone();
Line8.position.z = -65;
scene.add(Line8);

FullRoad.add(Line,Line2,Line3,Line4,Line5,Line6,Line7,Line8);
scene.add(FullRoad);


const FullRoadScene2 = FullRoad.clone();
FullRoadScene2.position.z = -70;

const FullRoadScene3 = FullRoad.clone();
FullRoadScene3.position.z = -140;

const FullRoadScene4 = FullRoad.clone();
FullRoadScene4.position.z = -190;



let CatMesh;
let CatLeftMesh;

let  myMaterial = new THREE.MeshPhongMaterial({
     color:"white",
     specular: 0x000000,
     shininess:0.9,
     flatShading:false,
     clipShadows: true,
     side: THREE.DoubleSide
});
let  myMaterial1 = new THREE.MeshPhongMaterial({
     color:"white",
     specular: 0x000000,
     shininess:30,
     flatShading:false,
     clipShadows: true,
     side: THREE.DoubleSide
});


function handle_load(gltf){
     CatMesh = gltf.scene;
     CatMesh.castShadow = true;
     CatMesh.receiveShadow = true;
     CatMesh.position.z = 10;
     CatMesh.position.y = -2.7;
     CatMesh.position.x = -18;
     CatMesh.rotation.y = 6.6;
     CatMesh.scale.multiplyScalar(0.30);
     CatMesh.castShadow = true;
     CatMesh.receiveShadow = true;
     CatMesh.traverse( function ( child ) {
          if ( child.isMesh ) {
               child.castShadow = true;
               child.receiveShadow = true;
               child.material = myMaterial;
          }
     } );
     scene.add(CatMesh);
}

function handle_load1(gltf){

     CatLeftMesh = gltf.scene;
     CatLeftMesh.castShadow = true;
     CatLeftMesh.receiveShadow = true;
     CatLeftMesh.position.z = 1.3;
     CatLeftMesh.position.y = -2.7;
     CatLeftMesh.position.x = 17;
     CatLeftMesh.rotation.y = 10;
     CatLeftMesh.scale.multiplyScalar(0.30)
     CatLeftMesh.castShadow = true;
     CatLeftMesh.receiveShadow = true;
     CatLeftMesh.traverse( function ( child ) {
          if ( child.isMesh ) {
               child.castShadow = true;
               child.receiveShadow = true;
               child.material = myMaterial;
          }
     } );
     scene.add(CatLeftMesh);
}

function ready() {
     // TunnelLoad();
     loader.load('./models/model8.glb', handle_load2);
}
window.addEventListener("load", ready);

let GirlMesh;
let GirlGroup = new THREE.Group();
let VideoGroup = new THREE.Group();
const TriggerGeometry = new THREE.SphereGeometry( 0.3, 32, 16 );
const TriggerMaterial = new THREE.MeshBasicMaterial( {color:0xFFFCFA,opacity:0.7,transparent:true});
const PointSphere = new THREE.Mesh( TriggerGeometry, TriggerMaterial );
PointSphere.position.set(1.5,3.1,2.83);
const PointSphere1 = PointSphere.clone();
PointSphere1.position.set(-1.5,2.4,-1.43);
const PointSphere2 = PointSphere.clone();
PointSphere2.position.set(0.1,4.8,-3.4);
const PointSphere3 = PointSphere.clone();
PointSphere3.position.set(3.5,6.6,-2.1);
const PointSphere4 = PointSphere.clone();
PointSphere4.position.set(2.5,3.8,-2.9);
const PointSphere5 = PointSphere.clone();
PointSphere5.position.set(0.5,4.3,1.93);
const PointSphere6 = PointSphere.clone();
PointSphere6.position.set(2.2,8.3,-2.93);
const PointSphere7 = PointSphere.clone();
PointSphere7.position.set(-0.2,6.3,-3.0);


let GirlDataImageArray = [];
let GirlDataVideoArray = [];
let GirlPlayArray = [];


let GirlImagePathValue = Object.values(DATAJSON.SCENE_GIRL.LINKS);
//Image texture
for (let i = 0; i < GirlImagePathValue.length; i++) {
     let VideoImage = new THREE.TextureLoader().load(GirlImagePathValue[i].image);
     GirlDataImageArray.push(VideoImage);

}


let GirlVideoArr = [];
let GirlTextureArr = [];

for (let data in GirlDataImageArray) {
     // let GirlVideo = document.getElementById(`video-${+data}`);
     // GirlVideoArr.push(GirlVideo);
     // const GirlTexture = new THREE.VideoTexture( GirlVideoArr[data] );
     // GirlTextureArr.push(GirlTexture);
     // GirlDataVideoArray.push(GirlTextureArr[data]);
     // GirlPlayArray.push(GirlVideoArr[data]);
     // console.log(data);
}

let materialArr = [];
let pointsArrAll = [];

let GirlVideoPathValue = Object.values(DATAJSON.SCENE_GIRL.LINKS);
for (let i = 0; i < GirlVideoPathValue.length; i++) {
     let VideoPointsMaterial999 = new THREE.MeshBasicMaterial({wireframe: false, side: THREE.DoubleSide, transparent:true,opacity:1});
     materialArr.push(VideoPointsMaterial999);
     let VideoPoints9999 = new THREE.Mesh(ScreenGeometry, materialArr[i]);
     pointsArrAll.push(VideoPoints9999);
     if (!GirlVideoPathValue[i].video){
          pointsArrAll[i].material.map = GirlDataImageArray[i];
     }

     else if (GirlVideoPathValue[i].video){
          pointsArrAll[i].material.map = GirlDataVideoArray[i];
     }
     pointsArrAll[i].scale.multiplyScalar(0.50);
     pointsArrAll[i].position.set(-11.4,-0.95,-274);

}


const DeepGeometry = new THREE.SphereGeometry( 0.3, 32, 16 );
const DeepMaterial = new THREE.MeshBasicMaterial( { color: '#884e7f'} );
const DeepPlane = new THREE.Mesh( DeepGeometry, DeepMaterial );
DeepPlane.position.y = 1;
DeepPlane.position.x = -0.3;
DeepPlane.position.z = 1.5;


const rectLight = new THREE.RectAreaLight( 0xff4627, 8,  10, 10 );
rectLight.rotation.x = THREE.MathUtils.degToRad(-330);
rectLight.position.set( 0, 3, -278 );
rectLight.lookAt( 0, 0, -278 );
rectLight.layers.set(1);
scene.add(rectLight);

let shapeButton = new THREE.Shape();
shapeButton.autoClose = true;
let angleStep = Math.PI * 0.5;
let w = 90, h = 40, r = 20;
shapeButton.absarc(w - r, h - r, r, 0, angleStep);
shapeButton.absarc(r, h - r, r, angleStep, angleStep * 2);
shapeButton.absarc(r, r, r, angleStep * 2, angleStep * 3);
shapeButton.absarc(w - r, r, r, angleStep * 3, angleStep * 4);


let ButtonGeometry = new THREE.BufferGeometry().setFromPoints(shapeButton.getPoints());
const materialShape = new THREE.LineBasicMaterial({
     color: 0xffffff,
     linewidth: 5,
     linecap: 'round', //ignored by WebGLRenderer
     linejoin:  'round'
});

const line = new THREE.Line( ButtonGeometry, materialShape );
line.scale.multiplyScalar(0.015);
line.position.set(-2.0,0.6,2);
line.rotation.y = -1.0;

let FakeButtonGeometry = new THREE.ShapeBufferGeometry( shapeButton );
const FakeButtonMaterial = new  THREE.ShadowMaterial({color:'black',opacity:0,transparent:true,side:THREE.DoubleSide,depthWrite: false,
     depthTest: true});
let FakeButton = new THREE.Mesh(FakeButtonGeometry, FakeButtonMaterial);
FakeButton.scale.multiplyScalar(0.015);
FakeButton.position.set(-2.0,0.6,2)
FakeButton.rotation.y = -1.0;

FontLoad.load('font/bold.json', fontDeep_load);
const FontDeepGroup = new THREE.Object3D();
let DeepText;
function fontDeep_load(font){
     const Link1Geometry = new THREE.TextGeometry( LANGUAGEJSON.GIRL.description , {
          font: font,
          size: 0.35,
          height: 0.00,
     } );

     const FontMaterial = new   THREE.MeshBasicMaterial( {color: 'white',opacity:1,transparent:true});
     DeepText = new THREE.Mesh(Link1Geometry,FontMaterial);
     Link1Geometry.center();
     FontDeepGroup.add(DeepText)
}
FontDeepGroup.position.set(-1.5,1.7,2.7);
FontDeepGroup.rotation.y = -1.0;

const FontDeepGroup1 = new THREE.Object3D();
let EnterText;
FontLoad.load('font/bold.json', EnterText_load);
function EnterText_load(font){
     const Link1Geometry = new THREE.TextGeometry( LANGUAGEJSON.GIRL.button , {
          font: font,
          size: 0.35,
          height: 0.00,
     } );

     const FontMaterial = new   THREE.MeshBasicMaterial( {color: 'white',opacity:1,transparent:true});
     EnterText = new THREE.Mesh(Link1Geometry,FontMaterial);
     Link1Geometry.center();
     FontDeepGroup1.add(EnterText)
}
FontDeepGroup1.position.set(-1.5,0.9,2.5);
FontDeepGroup1.rotation.y = -1.0;



function handle_load2(gltf){
     GirlMesh = gltf.scene;
     GirlMesh.castShadow = true;
     GirlMesh.receiveShadow = true;


     GirlMesh.rotation.y = 10;
     GirlMesh.scale.multiplyScalar(0.60);

     GirlMesh.castShadow = true;
     GirlMesh.receiveShadow = true;
     GirlMesh.layers.set(1);
     GirlMesh.traverse( function ( child ) {
          if ( child.isMesh ) {
               child.castShadow = true;
               child.receiveShadow = true;
               child.material = myMaterial1;
          }
     } );

     GirlGroup.add(GirlMesh,PointSphere,PointSphere1,PointSphere2,PointSphere3,PointSphere4,PointSphere5,PointSphere6,PointSphere7,DeepPlane,FontDeepGroup,line,FontDeepGroup1,FakeButton);
}

GirlGroup.layers.set(1);
GirlGroup.position.z = -275;
GirlGroup.position.y = -4;


VideoGroup.layers.set(1);
VideoGroup.position.z = -275;
VideoGroup.position.y = -4;

FontLoad.load('font/bold.json', fontLinksScene2_load);
const LinksGroupScene2 = new THREE.Object3D();
const LinksGroupScene3 = new THREE.Object3D();
const cursorObjLockScreen = [];

let ScreenTextLinkValue1 = Object.values(DATAJSON.SCENE_SCREEN_1.LINKS.link1.name);
let ScreenTextLinkValue2 = Object.values(DATAJSON.SCENE_SCREEN_2.LINKS.link1.name);
function fontLinksScene2_load(font){
     const Link1Geometry = new THREE.TextGeometry( ScreenTextLinkValue1, {
          font: font,
          size: 0.35,
          height: 0.00,
     } );
     const Link2Geometry = new THREE.TextGeometry( ScreenTextLinkValue2 , {
          font: font,
          size: 0.35,
          height: 0.00,
     } );

     const FontMaterial = new   THREE.MeshBasicMaterial( {color: 'white',opacity:1,transparent:true});
     let FontLinks = new THREE.Mesh(Link1Geometry,FontMaterial);
     FontLinks.position.set(-6.5,-0.5,-69.5);

     const planeGeo = new THREE.PlaneBufferGeometry(3.3, 0.4);
     const planeGeo1 = new THREE.PlaneBufferGeometry(3.1, 0.4);
     const planeMat = new THREE.MeshPhongMaterial({
          color: 0x25004D,
          side: THREE.DoubleSide,
          transparent:true,
          opacity:0,
     });

     const PlaneLink2 = new THREE.Mesh(planeGeo, planeMat);
     PlaneLink2.position.set(-4.95,-0.32,-69);
     scene.add(PlaneLink2);
     LinksGroupScene2.add(FontLinks,PlaneLink2);
     interactionManager.add(PlaneLink2);

     let FontLinks2 = new THREE.Mesh(Link2Geometry,FontMaterial);
     FontLinks2.position.set(2.8,-0.5,-140);
     const PlaneLink3 =  new THREE.Mesh(planeGeo1, planeMat);
     PlaneLink3.position.set(4.3,-0.3,-140);
     LinksGroupScene3.add(FontLinks2, PlaneLink3);

     cursorObjLockScreen.push(PlaneLink2,PlaneLink3);
}
interactionManager.add(LinksGroupScene2);
interactionManager.add(LinksGroupScene3);


LinksGroupScene2.addEventListener('click', () => {
     window.open(DATAJSON.SCENE_SCREEN_1.LINKS.link1.href, '_blank');
})
LinksGroupScene3.addEventListener('click', () => {
     window.open(DATAJSON.SCENE_SCREEN_2.LINKS.link1.href, '_blank');
})

LinksGroupScene2.addEventListener('mouseover', () => {
     document.body.style.cursor = "pointer";
})
LinksGroupScene2.addEventListener('mouseout', () => {
     document.body.style.cursor = "default";
})
LinksGroupScene3.addEventListener('mouseover', () => {
     document.body.style.cursor = "pointer";
})
LinksGroupScene3.addEventListener('mouseout', () => {
     document.body.style.cursor = "default";
})


let hoverArray = [];

let PointsArray = [];
PointsArray.push(PointSphere,PointSphere1,PointSphere2,PointSphere3,PointSphere4,PointSphere5,PointSphere6,PointSphere7);

let PlaneArray = [];
PlaneArray.push(pointsArrAll[0],pointsArrAll[1],pointsArrAll[2],pointsArrAll[3],pointsArrAll[4],pointsArrAll[5],pointsArrAll[6],pointsArrAll[7]);

let LinkArray = [];

let HrefArray = []


let GirlLinkValue = Object.values(DATAJSON.SCENE_GIRL.LINKS);
for (let i = 0; i < GirlLinkValue.length ; i++) {
     HrefArray.push(GirlLinkValue[i].href)

}

for (let i = 0; i < PointsArray.length; i++) {
     PointsArray[i].addEventListener('click', () => {
          window.open(HrefArray[i], '_blank')
     })
}

let SubstrateArray = [];

FontLoad.load('font/bold.json', fontLinks_load);
let FontLinks;

let LinkPlugGeo = new THREE.PlaneBufferGeometry(3.9, 2.65);

let LinkPlugMat = new THREE.MeshPhongMaterial({
     color: 0x25004D,
     side: THREE.DoubleSide,
     transparent:true,
     opacity:0,
});


function fontLinks_load(font){

     const FontMaterial = new   THREE.MeshBasicMaterial( {color: 'white',opacity:1,transparent:true});
     let LinkGeometryValue = Object.values(DATAJSON.SCENE_GIRL.LINKS);
     for (let i = 0; i < LinkGeometryValue.length; i++) {
          const LinkGeometryAll = new THREE.TextGeometry( LinkGeometryValue[i].name , {
               font: font,
               size: 0.35,
               height: 0.00,
          } );
          FontLinks = new THREE.Mesh(LinkGeometryAll,FontMaterial);
          FontLinks.position.set(-9.5,-0.24,-271.67);
          LinkArray.push( FontLinks);
     }

     for (let i = 0; i <LinkArray.length ; i++) {
          interactionManager.add(LinkArray[i]);
          const PlaneLink = new THREE.Mesh(LinkPlugGeo, LinkPlugMat);

          PlaneLink.position.set(-7.65,0.89,-271.67);
          SubstrateArray.push(PlaneLink);
          interactionManager.add(PlaneLink);

          hoverArray.push(PointSphere,PointSphere1,PointSphere2,PointSphere3,PointSphere4,PointSphere5,PointSphere6,PointSphere7,DeepPlane,FakeButton,SubstrateArray[i]);
          interactionManager.add(PointsArray[i]);
          interactionManager.add(pointsArrAll[i]);
     }

}

interactionManager.add(DeepPlane);
interactionManager.add(FakeButton);


let PlugOpacity = 0;
const myGroup = new THREE.Object3D();
const planeGeoGirlPlug = new THREE.PlaneBufferGeometry(30, 30);
const planeMatGirlPlug = new THREE.MeshBasicMaterial({
     color: 0x160035,
     side: THREE.DoubleSide,
     transparent:true,
     opacity:0,
});
const PlaneGirlPlug = new THREE.Mesh(planeGeoGirlPlug, planeMatGirlPlug);
myGroup.add(PlaneGirlPlug);
PlaneGirlPlug.position.z = -268;
function setOpacity( obj, opacity ) {
     obj.children.forEach((child)=>{
          setOpacity( child, opacity );
     })
     if ( obj.material ) {
          obj.material.opacity = opacity ;
     }
}
scene.add(myGroup);

const  TunnelLoad = () => {
     const TunnelGeometry = new THREE.CylinderGeometry( 5, 5, 180, 12,2,true );
     const TunnelMaterial = new THREE.MeshBasicMaterial( {
          side: THREE.DoubleSide,
          map:new  THREE.TextureLoader().load('img/tunnel2.jpg')
     } );
     TunnelMaterial.map.wrapT = THREE.RepeatWrapping;
     TunnelMaterial.map.wrapS =  THREE.RepeatWrapping;
     const TunnelCylinder = new THREE.Mesh( TunnelGeometry, TunnelMaterial );
     TunnelCylinder.rotation.x = Math.PI * -.5;
     TunnelCylinder.position.z = 140;
     TunnelCylinder.position.y = -30;
     scene.add( TunnelCylinder );

     const planeGeoPlug = new THREE.PlaneBufferGeometry(30, 30);
     const planeMatPlug = new THREE.MeshBasicMaterial({
          color: 0x160035,
          side: THREE.DoubleSide,
     });
     const PlanePlug = new THREE.Mesh(planeGeoPlug, planeMatPlug);
     PlanePlug.position.z = 38;
     PlanePlug.position.y = -30;
     scene.add( PlanePlug);
}


{
     const GirlLight = new THREE.PointLight(0xFFFFFF, 0.2);
     GirlLight.position.set(0, 10, -210);
     scene.add(GirlLight);
}


const StarGroup = new THREE.Object3D();
const StarMaterial = new THREE.MeshPhongMaterial( {color:  0x362092} );
const StarGeometry = new THREE.SphereGeometry( 1.8, 32, 32 );
const Star = new THREE.Mesh(StarGeometry,StarMaterial);
Star.scale.multiplyScalar(0.15);
Star.position.set(-30,8.7,-80);
Star.layers.set(1);
scene.add(Star);

const Star1 = Star.clone();
Star1.position.set(-30,31.7,-80);
Star1.layers.set(1);
scene.add(Star1);

const Star2 = Star.clone();
Star2.position.set(0,34.7,-80);
Star2.layers.set(1);
scene.add(Star2);

const Star3 = Star.clone();
Star3.position.set(28,14.7,-80);
Star3.layers.set(1);
scene.add(Star3);

const Star4 = Star.clone();
Star4.position.set(53,38.7,-80);
Star4.layers.set(1);
scene.add(Star4);
StarGroup.add(Star,Star1,Star2,Star3,Star4)
scene.add(StarGroup);


const BallGroup = new THREE.Object3D();
const BallGeometry = new THREE.SphereGeometry( 2.3, 32, 32 );
const BallMaterial = new  THREE.MeshLambertMaterial({ color:'#CE00D2'});
const BallMesh = new THREE.Mesh(BallGeometry,BallMaterial);
BallMesh.position.set(7.9,-2.2,0);
scene.add(BallMesh);


const BallGeometry1 = new THREE.SphereGeometry( 1.8, 32, 32 );
const BallMesh1 = new THREE.Mesh(BallGeometry1,BallMaterial);
BallMesh1.position.set(-8,-2.2,-18);
scene.add(BallMesh1);
BallGroup.add(BallMesh,BallMesh1)
scene.add(BallGroup);

const BallMesh3 = new THREE.Mesh(BallGeometry,BallMaterial);
BallMesh3.position.set(-8,-3.2,0);
BallMesh3.scale.multiplyScalar(0.5);
const BallMesh4 = new THREE.Mesh(BallGeometry,BallMaterial);
BallMesh4.position.set(7.9,-2.2,-18);

const BallMeshScene2 = BallMesh.clone();
BallMeshScene2.scale.multiplyScalar(1.4);
const BallMeshScene21 = BallMesh1.clone();

const BallGroupScene2 = new THREE.Object3D();
BallGroupScene2.add(BallMeshScene2,BallMeshScene21);
BallGroupScene2.position.z  = -70;

const BallGroupScene3 = new THREE.Object3D();
BallGroupScene3.add(BallMesh3,BallMesh4);
BallGroupScene3.position.z  = -140;

const BallMeshScene4 = BallMesh.clone();

BallMeshScene4.scale.multiplyScalar(1);
BallMeshScene4.position.y = -3.4;
const BallMeshScene41 = BallMesh1.clone();

BallMeshScene41.scale.multiplyScalar(0.9);
BallMeshScene41.position.y = -4.4;

const BallGroupScene4 = new THREE.Object3D();
BallGroupScene4.add(BallMeshScene4,BallMeshScene41);
BallGroupScene4.position.z  = -210;


const BallDecoGeometry = new THREE.SphereGeometry( 0.15, 32, 32 );
const BallDecoMaterial = new  THREE.MeshBasicMaterial({ color: 0xFFFCFA, wireframe: false});
const BallDeco = new THREE.Mesh(BallDecoGeometry,BallDecoMaterial);
BallDeco.position.set(-4.49,-4.68,1);
BallDeco.layers.set(1);
scene.add(BallDeco);

const BallDeco1 = BallDeco.clone();
BallDeco1.position.set(4.5,-4.7,-4);
BallDeco1.layers.set(1);
scene.add(BallDeco1);

const PlanetGroup = new THREE.Object3D();
const PlanetGeometry = new THREE.SphereGeometry( 1.8, 32, 32 );
const PlanetMesh = new THREE.Mesh(PlanetGeometry,BallMaterial);
PlanetMesh.position.set(0,2,-80);
PlanetMesh.layers.set(1);
scene.add(PlanetMesh);

const PlanetMesh1 = PlanetMesh.clone();
PlanetMesh1.scale.multiplyScalar(0.5);
PlanetMesh1.position.set(6,-2,-80);
PlanetMesh1.layers.set(1);
scene.add(PlanetMesh1);

const PlanetMesh2 = PlanetMesh.clone();
PlanetMesh2.scale.multiplyScalar(0.15);
PlanetMesh2.position.set(10,2,-80);
PlanetMesh2.layers.set(1);
scene.add(PlanetMesh2);

const PlanetMesh3 = PlanetMesh.clone();
PlanetMesh3.scale.multiplyScalar(0.5);
PlanetMesh3.position.set(18,2,-80);
PlanetMesh3.layers.set(1);
scene.add(PlanetMesh3);

const PlanetMesh4 = PlanetMesh.clone();
PlanetMesh4.scale.multiplyScalar(0.2);
PlanetMesh4.position.set(-6,-2.7,-80);
PlanetMesh4.layers.set(1);
scene.add(PlanetMesh4);

const PlanetMesh5 = PlanetMesh.clone();
PlanetMesh5.scale.multiplyScalar(0.3);
PlanetMesh5.position.set(-7,2.7,-80);
PlanetMesh5.layers.set(1);
scene.add(PlanetMesh5);

const PlanetMesh6 = PlanetMesh.clone();
PlanetMesh6.scale.multiplyScalar(0.25);
PlanetMesh6.position.set(-14,1.7,-80);
PlanetMesh6.layers.set(1);
scene.add(PlanetMesh6);
PlanetGroup.add(PlanetMesh,PlanetMesh1,PlanetMesh2,PlanetMesh3,PlanetMesh4,PlanetMesh5,PlanetMesh6);
scene.add(PlanetGroup);

const hlight = new THREE.AmbientLight( 0xffffff, 0.7 );
hlight.layers.set(1);
scene.add( hlight );

const color = 0xFFFFFF;
const light = new THREE.PointLight(color, 0.65);
light.position.set(0, -2.5, 4);
scene.add(light);

//Cat Lights
let CatColorLight = new THREE.SpotLight(0x56006E);
CatColorLight.position.set(0,5,65);
CatColorLight.angle = Math.PI/5;
CatColorLight.intensity = 0.4;
CatColorLight.castShadow = true;
scene.add(CatColorLight);

const CatMiddleLight = new THREE.PointLight(color, 1.0);
CatMiddleLight.position.set(-0.4, 4, 10.5);
CatMiddleLight.distance = 15;
scene.add(CatMiddleLight);
//CatMiddleBack
const CatMiddleBackLight = new THREE.PointLight(0xBAC1C1, 0.2);
CatMiddleBackLight.position.set(-5.4, -2, 15.5);
CatMiddleBackLight.distance = 14;
scene.add(CatMiddleBackLight);

// CatLeftLight
const CatLeftLight = new THREE.PointLight(color, 1.5);
CatLeftLight.position.set(-10, 4, 12);
CatLeftLight.distance = 12;
scene.add(CatLeftLight);
//CatRightLight
const CatRightLight = new THREE.PointLight(color, 1.5);
CatRightLight.position.set(10, 4, 12);
CatRightLight.distance = 12;
scene.add(CatRightLight);

const SceneLightGroup = new THREE.Object3D();
const intensityS = 1;
const MagentaLight = new THREE.PointLight(0xff4627, intensityS);
MagentaLight.position.set(0, 0, -12);
MagentaLight.intensity = 5;
MagentaLight.decay = 1.7;
MagentaLight.distance = 15;
MagentaLight.shadow.dispose();
MagentaLight.layers.set(1);
scene.add(MagentaLight);

const MagentaLight1 = MagentaLight.clone();
MagentaLight1.decay = 1.2;
MagentaLight1.distance = 7;
MagentaLight1.intensity = 6;
MagentaLight1.position.set(5, 0, -3);
scene.add(MagentaLight1);
const  MagentaLight2 = MagentaLight1.clone();
MagentaLight2.position.set(-7, 0, -23);
scene.add(MagentaLight2);

const  MagentaLight3 = MagentaLight.clone();
MagentaLight3.position.set(-7, 0, 3);
scene.add(MagentaLight3);

const  MagentaLight4 = MagentaLight.clone();
MagentaLight4.decay = 1.7;
MagentaLight4.distance = 16;
MagentaLight4.position.set(0, 0, -44);
scene.add(MagentaLight4);

const  MagentaLight5 = MagentaLight4.clone();
MagentaLight5.position.set(5, 0, -30);
scene.add(MagentaLight5);


SceneLightGroup.add(MagentaLight,MagentaLight1,MagentaLight2,MagentaLight3,MagentaLight4,MagentaLight5)
scene.add(SceneLightGroup);

const Scene2LightGroup = SceneLightGroup.clone();
Scene2LightGroup.position.z = -70;
scene.add(Scene2LightGroup);

const Scene3LightGroup = SceneLightGroup.clone();
Scene3LightGroup.position.z = -140;
scene.add(Scene3LightGroup);

const Scene4LightGroup = SceneLightGroup.clone();
Scene4LightGroup.position.z = -210;
scene.add(Scene4LightGroup);

const color1 = 0xFF00FF;
const intensity1 = 0.5;
const light5 = new THREE.DirectionalLight(color1, intensity1);
light5.position.set(0, 10, 0);
light5.target.position.set(-5, 0, 0);
scene.add(light5);

//Screen locker

let screenTexture = new THREE.TextureLoader().load('img/blur2.png');
let uvAttribute = ScreenGeometry.attributes.uv;


let min = Infinity, max = 0
//find min max
for (let i = 0; i < uvAttribute.count; i++) {
     let u = uvAttribute.getX(i);
     let v = uvAttribute.getY(i);
     min = Math.min(min, u, v)
     max = Math.max(max, u, v)
}

//map min map to 1 to 1 range
for (let i = 0; i < uvAttribute.count; i++) {
     let u = uvAttribute.getX(i);
     let v = uvAttribute.getY(i);

     // do something with uv
     u = THREE.MathUtils.mapLinear(u, min, max, 0, 1)
     v = THREE.MathUtils.mapLinear(v, min, max, 0, 1)

     // write values back to attribute
     uvAttribute.setXY(i, u, v);

}

const ScreenTableMaterial = new  THREE.MeshBasicMaterial({wireframe: false,side: THREE.DoubleSide,color:'white',map:screenTexture,opacity:0.35,transparent:true});
let ScreenTable = new THREE.Mesh(ScreenGeometry, ScreenTableMaterial);
ScreenTable.scale.multiplyScalar(0.70);
ScreenTable.position.set(-3.82,-1.83,8.5);

let Screen1Data;
let Screen2Data;
let Screen1DataImageArray = [];
let Screen2DataImageArray = [];
let ScreenDataVideoArray = [];
let ScreenPlayArray = [];


if (!DATAJSON.SCENE_SCREEN_1.LINKS.link1.video){
     Screen1Data = Screen1DataImageArray;
}
else if (DATAJSON.SCENE_SCREEN_1.LINKS.link1.video){
     Screen1Data = ScreenDataVideoArray;
}
if (!DATAJSON.SCENE_SCREEN_2.LINKS.link1.video){
     Screen2Data = Screen2DataImageArray;
}
else if (DATAJSON.SCENE_SCREEN_2.LINKS.link1.video){
     Screen2Data = ScreenDataVideoArray;
}

//Image texture
let VideoImage = new THREE.TextureLoader().load(DATAJSON.SCENE_SCREEN_1.LINKS.link1.image);
let VideoImage1 = new THREE.TextureLoader().load(DATAJSON.SCENE_SCREEN_2.LINKS.link1.image);
Screen1DataImageArray.push(VideoImage);
Screen2DataImageArray.push(VideoImage1);



//Video Texture
let videoScreenTexture = document.getElementById('video-screen');
let videoScreenTexture1 = document.getElementById('video-screen-1');
const VideoTexture = new THREE.VideoTexture(videoScreenTexture);
const VideoTexture1 = new THREE.VideoTexture(videoScreenTexture1);
ScreenDataVideoArray.push(VideoTexture, VideoTexture1);
ScreenPlayArray.push(videoScreenTexture,videoScreenTexture1);


const VideoMaterial = new THREE.MeshBasicMaterial({wireframe: false, side: THREE.DoubleSide, map: Screen1Data[0]});

let VideoScreen = new THREE.Mesh(ScreenGeometry, VideoMaterial);
// VideoScreen.scale.multiplyScalar(0.1);
VideoScreen.position.set(-8.09,-1.9,-70);

const VideoMaterial2 = new THREE.MeshBasicMaterial({wireframe: false, side: THREE.DoubleSide, map: Screen2Data[0]});
let VideoScreen2 = new THREE.Mesh(ScreenGeometry, VideoMaterial2);
// VideoScreen2.scale.multiplyScalar(1);
VideoScreen2.position.set(1.3,-1.9,-140);


document.addEventListener('DOMContentLoaded', function () {
     for (let i = 0; i < ScreenPlayArray.length; i++) {
          ScreenPlayArray[i].play();
     }
     for (let i = 0; i < GirlPlayArray.length; i++) {
          GirlPlayArray[i].play();
     }
});

// Effect Composer
const  renderScene = new RenderPass(scene, camera);

// Bloom pass
const  bloomPass = new UnrealBloomPass(
     new THREE.Vector2(window.innerWidth, window.innerHeight),
     0.7,
     0.4,
     0.85
);
bloomPass.threshold = 0.21;
bloomPass.strength = 0.6;
bloomPass.radius = 0.1;
bloomPass.renderToScreen = true;

// Outline pass
let outlinePass = new OutlinePass(
     new THREE.Vector2(window.innerWidth, window.innerHeight),
     scene,
     camera,
);
outlinePass.edgeStrength = 3.0
outlinePass.edgeGlow  = 0.5
outlinePass.edgeThickness = 1.0;
outlinePass.visibleEdgeColor.set('#AE25B4');
outlinePass.hiddenEdgeColor.set('#ffffff');

// Important! This pass only works on selected objects

const  composer = new EffectComposer(renderer);
composer.setSize(window.innerWidth, window.innerHeight);

composer.addPass(renderScene);
composer.addPass(bloomPass);
composer.addPass(outlinePass);

FontLoad.load('font/bold.json', font_load);
const TableScreen = new THREE.Object3D();
const MeshScrollGroup = new THREE.Object3D();
let FontMesh;
function font_load(font){
     const FontGeometry = new THREE.TextGeometry( LANGUAGEJSON.FIRST_SCREEN.p1 , {
          font: font,
          size: 0.35,
          height: 0.00,
     } );
     const FontGeometryBottom = new THREE.TextGeometry( LANGUAGEJSON.FIRST_SCREEN.p2 , {
          font: font,
          size: 0.18,
          height: 0.0,
     } );
     const FontGeometryBottom1 = new THREE.TextGeometry( LANGUAGEJSON.FIRST_SCREEN.p3, {
          font: font,
          size: 0.18,
          height: 0.0,
     } );
     const EnterGeometry = new THREE.TextGeometry( LANGUAGEJSON.FIRST_SCREEN.button1 , {
          font: font,
          size: 0.35,
          height: 0.0,
     } );
     const CloseGeometry = new THREE.TextGeometry( LANGUAGEJSON.FIRST_SCREEN.button2 , {
          font: font,
          size: 0.35,
          height: 0.0,
     } );

     const ScrollGeometry = new THREE.TextGeometry( LANGUAGEJSON.FIRST_SCREEN.p4, {
          font: font,
          size: 1.15,
          height: 0.0,
     } );

     const FontMaterial = new   THREE.MeshBasicMaterial( {color: 'white'});
     FontMesh = new THREE.Mesh(FontGeometry,FontMaterial);
     FontGeometry.center();
     FontMesh.position.set(0,2,8.5)
     scene.add(FontMesh);
     // FontMesh.layers.set(1);

     const FontMeshBottom = new THREE.Mesh(FontGeometryBottom,FontMaterial);
     FontGeometryBottom.center();
     FontMeshBottom.position.set(0,0.6,8.5);;
     // FontMeshBottom.layers.set(1);
     scene.add(FontMeshBottom);

     const FontMeshBottom1 = new THREE.Mesh(FontGeometryBottom1,FontMaterial);
     FontGeometryBottom1.center();
     FontMeshBottom1.position.set(0,0.2,8.5);
     // FontMeshBottom1.layers.set(1);
     scene.add(FontMeshBottom1);

     const MeshEnter = new THREE.Mesh(EnterGeometry,FontMaterial);
     EnterGeometry.center();
     MeshEnter.position.set(-1,1.3,8.5);
     // MeshEnter.layers.set(1);
     scene.add( MeshEnter);

     const MeshClose = new THREE.Mesh(CloseGeometry,FontMaterial);
     CloseGeometry.center();
     MeshClose.position.set(0.9,1.3,8.5);
     // MeshClose.layers.set(1);
     scene.add( MeshClose);

     const MeshScroll = new THREE.Mesh(ScrollGeometry,FontMaterial);
     ScrollGeometry.center();
     MeshScroll.position.set(0.9,3.0,-8.5);
     // MeshScroll.layers.set(1);
     MeshScrollGroup.add(MeshScroll);

     outlinePass.selectedObjects = [FontMesh,FontMeshBottom,FontMeshBottom1,MeshEnter,MeshClose,MeshScroll];
     TableScreen.add(FontMesh,FontMeshBottom,FontMeshBottom1,MeshEnter,MeshClose)
}



MeshScrollGroup.position.z = -1;
MeshScrollGroup.position.y = 1;


const MeshEnterFakeGeometry = new THREE.PlaneGeometry(0.88,0.5,10);
const MeshEnterFakeMaterial = new THREE.MeshBasicMaterial({color:'white',opacity:0,transparent:true});
const MeshEnterFake = new THREE.Mesh( MeshEnterFakeGeometry,MeshEnterFakeMaterial);
MeshEnterFake.position.set(-1,1.3,8.5);


const MeshCloseFake = new THREE.Mesh( MeshEnterFakeGeometry,MeshEnterFakeMaterial);
MeshCloseFake.position.set(0.9,1.3,8.5);


manager.onLoad = function ( ) {
     scene.add(TableScreen);
     scene.add(ScreenTable);
     scene.add(MeshCloseFake);
     scene.add(MeshEnterFake);
     loaderScreen.style.display = 'block';
};


cursorObjLockScreen.push(MeshEnterFake,MeshCloseFake);


//Animation Variable;
let scrollFirstScene;
let scrollSecondScene;
let scrollThirdScene;
let scrollFourScene;
let FirstSceneMove;
let SecondSceneMove;
let ThirdSceneMove;
let FourSceneMove;
let ScrollExploreTrigger;
let tunnelMotion;
let PlugFlag;

let screenHover = true;

MeshEnterFake.addEventListener("click", () => {
     scene.remove(ScreenTable,TableScreen, CatMesh,CatLeftMesh);
     scene.add(MeshScrollGroup);
     scrollFirstScene = true;
     ScrollExploreTrigger = true;
     screenHover = false;
     ScreenTable.visible = false;
     TableScreen.visible = false;
});

interactionManager.add(MeshEnterFake);
interactionManager.add(MeshCloseFake);

//delete cursor observer
let removeObserver = true;

//Scene Speed
let speed = 0.5;
let speedSecond = 0.5;
let speedThird = 0.5;
let speedFour = 0.5;

let  exploreSpeed = 0.04;
let TunnelSpeed = 0.95;
let opacitySpeed = 0.0100;

//Scroll counter
let ScrollFirstSceneStopper = 0;
let ScrollSecondSceneStopper = 0;
let ScrollThirdSceneStopper = 0;
let ScrollFourSceneStopper = 0;

//Stop function
let FirstSceneStopper = 0;
let SecondSceneStopper = 0;
let ThirdSceneStopper = 0;
let FourSceneStopper = 0;
let TunnelStopper = 0;
let TunnelRedirect = 0;
let scrollStopper = 0;

camera.position.z = 20;

const HoverFunction = (array) => {
     for (let i = 0; i < array.length ; i++) {
          array[i].addEventListener('mouseover', () => {
               document.body.style.cursor = "pointer";
          })
          array[i].addEventListener('mouseout', () => {
               document.body.style.cursor = "default";
          })
     }
}

HoverFunction(cursorObjLockScreen);
// const stats = new Stats();
// stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
// document.body.appendChild( stats.dom );

const animate = function () {
     // stats.begin();

     if (ScrollExploreTrigger) {
          MeshScrollGroup.position.z += exploreSpeed;
          MeshScrollGroup.position.y -= exploreSpeed;
          scrollStopper++;
          if (scrollStopper === 50) {
               if (MeshScrollGroup.position.z >= 0){
                    exploreSpeed = 0;
                    ScrollExploreTrigger = false;
               }
          }

     }

     if (scrollFirstScene) {
          document.addEventListener('wheel', () => {
               ScrollFirstSceneStopper++;
               if (ScrollFirstSceneStopper === 1) {
                    FirstSceneMove = true;
               }
          })
     }
     if (FirstSceneMove) {
          camera.position.z -= speed;
          if (camera.position.z <= -60 ) {
               speed = Math.max( 0, speed - 0.005 );
               setTimeout(() => {
                    FirstSceneMove = false;
               },10)
          }
          PlanetGroup.position.z -= speed;
          if (PlanetGroup.position.z <= -60 ) {
               speed = Math.max( 0, speed - 0.005 );
          }
          StarGroup.position.z -= speed;
          if (StarGroup.position.z <= -60 ) {
               speed = Math.max( 0, speed - 0.005 );
          }
          FogGroup.position.z -= speed;
          if (FogGroup.position.z <= -70 ) {
               speed = Math.max( 0, speed - 0.005 );
          }
          if (camera.position.z <= -2 ) {
               FirstSceneStopper++;
               if (FirstSceneStopper === 1) {
                    screenHover = true;
                    scene.add( PlaneScene2 );
                    scene.add(FullRoadScene2);
                    scene.add(BallGroupScene2);
                    scene.add(VideoScreen);
                    scene.add(LinksGroupScene2);
               }
          }
          if (camera.position.z <= -51 ) {
               setTimeout(() => {
                    scrollSecondScene = true;
               },1500)
          }

     }
     if (scrollSecondScene) {
          document.addEventListener('wheel', () => {
               ScrollSecondSceneStopper++;
               if (ScrollSecondSceneStopper === 1) {
                    SecondSceneMove = true;
               }
          })

     }
     if (SecondSceneMove) {
          FirstSceneMove = false;
          camera.position.z -= speedSecond;

          if (camera.position.z <= -130 ) {
               speedSecond = Math.max( 0, speedSecond - 0.005 );
          }
          PlanetGroup.position.z -= speedSecond;
          if (PlanetGroup.position.z <= -130) {

               speedSecond = Math.max(0, speedSecond - 0.005);
          }

          StarGroup.position.z -= speedSecond;
          if (StarGroup.position.z <= -130 ) {
               speedSecond = Math.max( 0, speedSecond - 0.005 );
          }
          FogGroup.position.z -= speedSecond;
          if (FogGroup.position.z <= -140 ) {
               speedSecond = Math.max( 0, speedSecond - 0.005 );
          }
          if (camera.position.z <= -72.5 ) {
               SecondSceneStopper++;
               if (SecondSceneStopper === 1) {
                    screenHover = true;
                    scene.add( PlaneScene3 );
                    scene.add(FullRoadScene3);
                    scene.add(BallGroupScene3);
                    scene.add(VideoScreen2);
                    scene.add(LinksGroupScene3);
               }
          }
          if (camera.position.z <= -121 ) {
               setTimeout(() => {
                    scrollThirdScene = true;
               },1500)
          }
     }
     if (scrollThirdScene) {
          document.addEventListener('wheel', () => {
               ScrollThirdSceneStopper++;
               if ( ScrollThirdSceneStopper === 1) {
                    ThirdSceneMove = true;
               }
          })

     }
     if (ThirdSceneMove) {
          removeObserver = false;
          screenHover = true;
          SecondSceneMove = false;
          camera.position.z -= speedThird;
          if (camera.position.z <= -205 ) {
               speedThird = Math.max( 0, speedThird - 0.005 );
          }
          PlanetGroup.position.z -= speedThird;
          if (PlanetGroup.position.z <= -205 ) {
               speedThird = Math.max( 0, speedThird - 0.005 );
          }
          StarGroup.position.z -= speedThird;
          if (StarGroup.position.z <= -205 ) {
               speedThird = Math.max( 0, speedThird - 0.005 );
          }
          FogGroup.position.z -= speedThird;
          if (FogGroup.position.z <= -215 ) {
               speedThird = Math.max( 0, speedThird - 0.005 );
          }
          if (camera.position.z <= -147 ) {
               ThirdSceneStopper++;
               if (ThirdSceneStopper === 1) {
                    TunnelLoad();
                    scene.add( PlaneScene4 );
                    scene.add(FullRoadScene4);
                    scene.add(BallGroupScene4);
                    scene.add(GirlGroup);
                    scene.add(VideoGroup);
               }
          }
          if (camera.position.z <= -181 ) {
               setTimeout(() => {
                    scrollFourScene = true;
               },1500)
          }

     }
     if (scrollFourScene) {
          document.addEventListener('wheel', () => {
               ScrollFourSceneStopper++;
               if (  ScrollFourSceneStopper === 1) {
                    FourSceneMove = true;
               }
          })

     }
     if (FourSceneMove) {
          ThirdSceneMove = false;
          camera.position.z -= speedFour;
          if (camera.position.z <= -230 ) {
               speedFour = Math.max( 0, speedFour - 0.005 );
               setTimeout(() => {

                    StarsMesh.rotation.y += 0.0005;

                    FourSceneStopper++;
                    if (FourSceneStopper === 1) {
                         removeObserver = false;

                         scene.add(StarsMesh);
                         let controls = new ObjectControls(camera, renderer.domElement, GirlGroup);
                         controls.setDistance(20, 20);
                         controls.disableZoom();
                         controls.setRotationSpeed(0.05515);

                         for (let i = 0; i <  SubstrateArray.length; i++ ) {
                              SubstrateArray[i].addEventListener('click', function (idx)  {
                                   window.open(HrefArray[idx], '_blank')
                              }.bind(null,i))
                         }
                         for (let i = 0; i < PointsArray.length; i++ ) {
                              PointsArray[i].addEventListener('mouseover', function (idx)  {
                                   scene.remove(PlaneArray[i])
                                   scene.add( PlaneArray[idx]);
                                   scene.add(SubstrateArray[idx]);
                                   scene.add(LinkArray[idx]);

                                   for (let j = 0; j <SubstrateArray.length ; j++) {
                                        SubstrateArray[j].geometry = new THREE.PlaneBufferGeometry(3.9, 2.65);
                                        SubstrateArray[j].material = new THREE.MeshPhongMaterial({
                                             color: 0x25004D,
                                             side: THREE.DoubleSide,
                                             transparent:true,
                                             opacity:0,
                                        });
                                   }
                              }.bind(null,i))
                         }
                         for (let i = 0; i < PointsArray.length; i++ ) {
                              PointsArray[i].addEventListener('mouseout', function (idx)  {
                                   setTimeout( function (){
                                        if (PlaneArray[i].name !== 'active'){
                                             scene.remove( PlaneArray[i]);
                                             scene.remove(LinkArray[idx]);
                                             scene.remove(SubstrateArray[idx]);
                                        }
                                   },1000)
                              }.bind(null,i))
                         }

                         for (let i = 0; i <  PlaneArray.length; i++ ) {
                              PlaneArray[i].addEventListener('mouseover', function (idx)  {
                                   PlaneArray[i].name = 'active';
                              }.bind(null,i))
                         }
                         for (let i = 0; i <  PlaneArray.length; i++ ) {
                              PlaneArray[i].addEventListener('mouseout', function (idx)  {
                                   PlaneArray[i].name = '';
                                   scene.remove(PlaneArray);
                                   scene.remove( PlaneArray[i]);
                                   scene.remove(LinkArray[idx]);
                                   scene.remove(SubstrateArray[idx]);
                                   for (let j = 0; j <SubstrateArray.length ; j++) {
                                        SubstrateArray[j].geometry = undefined;
                                        SubstrateArray[j].material = undefined;
                                   }
                              }.bind(null,i))

                         }
                         HoverFunction(hoverArray);
                         HoverFunction(SubstrateArray);
                    }

                    FakeButton.addEventListener('click', () => {
                         PlugFlag = true;
                    })
               },1500)
          }
     }
     if (PlugFlag) {
          setOpacity( myGroup, PlugOpacity );
          PlugOpacity += opacitySpeed;
          if (PlugOpacity >= 1) {
               opacitySpeed = 0;
               tunnelMotion = true;
          }
     }
     if (tunnelMotion) {
          TunnelStopper++;
          if (TunnelStopper === 1) {
               camera.position.z = 220;
               camera.position.y = -30;
               camera.updateProjectionMatrix();
          }
          setTimeout(() => {
               camera.position.z -= TunnelSpeed;
               if (camera.position.z <= 130) {
                    TunnelSpeed = Math.max( 0, TunnelSpeed - 0.0005 );
                    TunnelRedirect++;
                    if (TunnelRedirect === 1) {
                         window.location.href = DATAJSON.TUNNEL.href;
                    }
               }
          },800)
     }
     // stats.end();
     interactionManager.update();
     renderer.clear();
     camera.layers.set(1);
     composer.render();
     renderer.clearDepth();
     camera.layers.set(0);
     renderer.render(scene, camera);

     requestAnimationFrame( animate );
};

animate();

