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
     camera.aspect = width / height;
     camera.updateProjectionMatrix();
});

hlight = new THREE.AmbientLight (0x404040,1);
scene.add(hlight);


//
directionalLight = new THREE.DirectionalLight(0xffffff,1);
directionalLight.position.set(0,1,0);
let light = new THREE.PointLight(0xc4c4c4,1);
light.position.set(0,300,500);
scene.add(light);

controls = new  THREE.OrbitControls(camera,renderer.domElement);
let myMaterial;
let gallery = [0x61EC12,0xEC12E5,0x12C8EC,0xEC125B,0x124DEC,0xEC5E12];
let current = 0;
let btn2 = document.querySelector('.btn--color');
btn2.addEventListener('click', function () {
     current++
     current = current % gallery.length;
     myMaterial = new THREE.MeshPhongMaterial({
          flatShading:false,
          color:gallery[current],
          clipShadows: true,
          side: THREE.DoubleSide
     });
     loader.load('../assets/img/nissan/scene.gltf', handle_load);
});

let loader = new THREE.GLTFLoader();
loader.load('../assets/img/nissan/scene.gltf', handle_load);

let car;

myMaterial = new THREE.MeshPhongMaterial({
     flatShading:false,
     color:0xFF001B,
     clipShadows: true,
     side: THREE.DoubleSide
});

function handle_load( object) {
     car = object.scene;

     car.castShadow = true;
     car.receiveShadow = true;
     car.traverse( function ( child ) {
          if ( child.isMesh ) {
               child.castShadow = true;
               child.receiveShadow = true;
               child.material = myMaterial;
          }
     } );
     scene.add(car);
}

camera.position.set(0,4,10)

const animate = function () {
     requestAnimationFrame( animate );
     // mesh.rotation.x += 0.01;
     // mesh.rotation.y += 0.01;
     controls.update();
     renderer.render( scene, camera );
};

animate();
