function main() {
     let mainSection = document.querySelector('.button__panels');
     setTimeout(function () {
          mainSection.style.visibility = 'visible';
     },300);
}
window.addEventListener("load", main);



const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );

scene.background = new THREE.Color( 0xa0a0a0 );
// scene.fog = new THREE.Fog( 0xa0a0a0, 10, 50 );
camera.position.set( 7, 3, 7 );


let renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0xFFFCFF);
let doc = document.querySelector('.main');
doc.appendChild( renderer.domElement ).classList.add('canv-class');

renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const pmremGenerator = new THREE.PMREMGenerator( renderer );
pmremGenerator.compileEquirectangularShader();

window.addEventListener('resize', function () {
     let width = window.innerWidth;
     let height = window.innerHeight;
     renderer.setSize(width,height);
     camera.aspect = width / height;
     camera.updateProjectionMatrix();
});
controls = new  THREE.OrbitControls(camera,renderer.domElement);
controls.minDistance = 15;
controls.maxDistance = 20;
controls.enableDamping = true;
controls.dampingFactor = 0.5;
controls.maxPolarAngle = Math.PI / 2.3;   //низ
controls.minPolarAngle = Math.PI / 3.1;   //верх
controls.rotateSpeed = 0.25;
controls.panSpeed = 0.1;



const hlight = new THREE.AmbientLight( 0x404040, 1 );
scene.add( hlight );

const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
directionalLight.castShadow = true;
directionalLight.shadow.camera.top = 4;
directionalLight.shadow.camera.bottom = - 4;
directionalLight.shadow.camera.left = - 4;
directionalLight.shadow.camera.right = 4;
directionalLight.shadow.camera.near = 0.1;
directionalLight.shadow.camera.far = 10;
directionalLight.shadow.camera.far = 30;
directionalLight.shadow.bias = - 0.002;
directionalLight.position.set( 0, 20, 20 );
scene.add( directionalLight );

 const group = new THREE.Object3D();


// Ground
const planeGeo = new THREE.PlaneGeometry( 45, 45, 32 );
const planeMat = new THREE.MeshPhongMaterial( {
     color: 0xa0adaf,
     shininess: 150,
} )
const ground = new THREE.Mesh(planeGeo, planeMat);
ground.rotation.x = Math.PI * -.5;
ground.receiveShadow = true;
scene.add(ground);
var USE_WIREFRAME = false;
// Stand
const standGeo = new THREE.CylinderGeometry(7,7,1.5,40);
const standMat = new THREE.MeshPhongMaterial( { color:0xffffff, wireframe:USE_WIREFRAME,depthWrite: false } );
const stand = new THREE.Mesh(standGeo,standMat);
stand.receiveShadow = true;
scene.add(stand);


// car

new THREE.RGBELoader()
     .setDataType( THREE.UnsignedByteType )
     .setPath( 'img/' )
     .load( 'pedestrian_overpass_1k.hdr', function ( texture ) {

          const envMap = pmremGenerator.fromEquirectangular( texture ).texture;

          scene.environment = envMap;

          texture.dispose();
          pmremGenerator.dispose();


     } );

let localPlane = new THREE.Plane( new THREE.Vector3(  0.4, 0, 0 ), 1 );
renderer.localClippingEnabled = false;


let gallery = ['img/honda_nsx_1990/scene.gltf','img/ferrari_testarossa/scene.gltf'];
let current = 0;
let btn2 = document.querySelector('.btn--next-car');
btn2.addEventListener('click', function () {
     current++
     current = current % gallery.length;
     scene.remove(car);
     loader.load( gallery[current], handle_load );
});

// sd
var loader = new THREE.GLTFLoader();
loader.load( gallery[current], handle_load );
let car;


function handle_load( object) {
     car = object.scene;
     car.material = new THREE.MeshLambertMaterial();
     car.position.y = -1.1;
     car.position.z = -3;
     car.scale.set(3.7,3.7,3.7);
     car.castShadow = true;
     car.receiveShadow = true;
     car.traverse( function ( child ) {
          if ( child.isMesh ) {

               child.castShadow = true;
               child.receiveShadow = true;
               child.material.clippingPlanes = [ localPlane ];
               child.material.clipShadows = true;
               child.material.side = THREE.DoubleSide;
          }
     } );
      scene.add(car);
}
let jk = 0;
let btnclip = document.querySelector('.btn--clip');
btnclip.addEventListener('click', function () {
     jk++;
     if (jk === 1) {
          renderer.localClippingEnabled = true;
     } else if (jk === 2) {
          renderer.localClippingEnabled = false;
          jk=0;
     }
});

//wall

const  wallGroup = new THREE.Object3D();
const geometry = new THREE.PlaneGeometry( 46,20,5 );
const material = new  THREE.MeshBasicMaterial({
     side: THREE.DoubleSide,
     color:0xffffff,
});


const wall = new THREE.Mesh(geometry,material);
wall.position.x = 0;
wall.position.z = -22;
wall.position.y = 10;
scene.add(wall);
const wall1 = wall.clone();
wall1.position.z = 22;
scene.add(wall1);
const wall2 = wall.clone();
wall2.position.z = 0;
wall2.position.x = 22;
wall2.rotation.y = 7.86;
scene.add(wall2);
const wall3 = wall2.clone();
wall2.position.x = -22;
scene.add(wall3);


//bricks

const  height = 0.4
const geometryBricks = new THREE.BoxGeometry( 3,height,0.9 );
const materialBricks = new  THREE.MeshLambertMaterial({
     color:0xFF5733,
});
const bricks = new THREE.Mesh(geometryBricks,materialBricks);
var  group1 = new THREE.Object3D();
for (let row = 0; row <30 ; row++) {
     let yPos = row * (height+0.05);
     let offset = -1;
     for (let count = 0; count < 3; count++) {
          const block = bricks.clone();
          if (row % 2){
               block.rotation.y = Math.PI/2;
               block.position.set(offset,yPos,0)
          }
          else {
               block.position.set(0,yPos,offset);
          }
          offset++;
          group1.add(block);

     }
}

group1.position.x = 20.2;
group1.position.z = -20.2;
group1.position.y = 0.2;
scene.add(group1);

let bricksGroup = group1.clone();
bricksGroup.position.x = -20;
bricksGroup.position.z = -20.3;
scene.add(bricksGroup);

let bricksGroup1 = group1.clone();
bricksGroup1.position.z = 20.2;
bricksGroup1.position.x = 20.25;
scene.add(bricksGroup1);

let bricksGroup2 = group1.clone();
bricksGroup2.position.z = 20.25;
bricksGroup2.position.x = -20.25;
scene.add(bricksGroup2);
wallGroup.add(wall,wall1,wall2,wall3,group1,bricksGroup,bricksGroup1,bricksGroup2);
scene.add(wallGroup);
wallGroup.position.y = 16;

let ADDs= 0;

let j = 0;
let btnWall = document.querySelector('.btn--wall');
btnWall.addEventListener('click',function(event) {
     j++;
     if (j === 1) {
          ADDs = -0.07;
     } else if (j === 2) {
          ADDs = 0.07;
          j= 0;
     }
});





group.add(ground);
scene.add(group);
let shouldRotate = false;
let shouldRotate1 = false;
let shouldRotate2 = false;
let groundRotate = false;
let btn = document.querySelector('.btn--left');
let btn1 = document.querySelector('.btn--right');
let btnR = document.querySelector('.btn--rightR');
let btnL = document.querySelector('.btn--leftR');
let btnArea = document.querySelector('.btn--area');
let btnGroundL = document.querySelector('.btn--ground-left');
btn.addEventListener('click',function(event) {
     shouldRotate = true;
     shouldRotate1 = false;
});
btn1.addEventListener('click',function(event) {
     shouldRotate1 = true;
     shouldRotate = false;
});


let ADD= 0;

let k = 0;
btnArea.addEventListener('click', function () {
     k++;
     if (k === 1) {
          btnArea.style.pointerEvents = 'none';
          btnArea.style.opacity = '0.5';
          ADD = 0.005;
          setTimeout(function () {
               btnArea.style.pointerEvents = 'auto';
               btnArea.style.opacity = '1';

          },2500)
     } else if (k === 2) {
          btnArea.style.pointerEvents = 'none';
          btnArea.style.opacity = '0.5';
          setTimeout(function () {
               btnArea.style.pointerEvents = 'auto';
               btnArea.style.opacity = '1';
          },2500)
          ADD = -0.005;
          k= 0;
     }
});
let canvt = document.querySelector('.canv-class');
canvt.addEventListener('mousedown', function () {
     shouldRotate1 = false;
     shouldRotate = false;
     shouldRotate2 = false;
     groundRotate =false;
});

btnL.addEventListener('mousedown', function () {
     shouldRotate = true;
     shouldRotate1 = false;
})
btnL.addEventListener('mouseup', function () {
     shouldRotate = false;
     shouldRotate1 = false;
})

btnR.addEventListener('mousedown', function () {
     shouldRotate1 = true;
     shouldRotate = false;
})
btnR.addEventListener('mouseup', function () {
     shouldRotate1 = false;
     shouldRotate = false;
})
// btnGroundL.addEventListener('mouseup', function () {
//      groundRotate = true;
// })
//
//



camera.position.set( 17, 0, 20 );
const stats = new Stats();
stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );


let angle = 0;


const animate = function () {
     requestAnimationFrame( animate );
     stats.begin();
     stats.end();

     wallGroup.position.y += ADDs;
     if (wallGroup.position.y > 16) {
          ADDs = 0;
     }
     if (wallGroup.position.y < 0) {
          ADDs = 0;
     }

     group.position.y += ADD;
     if (group.position.y > 0.77) {
          ADD = 0;
     }
     if (group.position.y < 0) {
          ADD = 0;
     }
     if (groundRotate){
         car.rotation.y += 0.01;
     }

     if (shouldRotate) {
          angle -= Math.PI/180*2;
          camera.position.x+=(3*Math.sin(angle/6));
          camera.position.z+=(3*Math.cos(angle/6));
     }
     if (shouldRotate1) {
          angle += Math.PI/180*2;
          camera.position.x+=(3*Math.sin(angle/6));
          camera.position.z+=(3*Math.cos(angle/6));
     }
     if (shouldRotate2) {
          angle += Math.PI/180*2;
          camera.position.x+=(3*Math.sin(angle/6));
          camera.position.z+=(3*Math.cos(angle/6));
     }
     renderer.clear();

     controls.update();
     camera.updateProjectionMatrix();
     renderer.render( scene, camera );

};

animate();
