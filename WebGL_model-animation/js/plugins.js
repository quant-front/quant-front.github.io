const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 55, window.innerWidth/window.innerHeight, 0.1, 1000);
let  clock = new THREE.Clock();

scene.background = new THREE.Color(0xdddddd);

let renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setClearColor( 0x000000, 0 );
renderer.shadowMap.enabled = true;
renderer.setSize( window.innerWidth, window.innerHeight );

let doc = document.querySelector('.main');
doc.appendChild( renderer.domElement );

let hemilight  = new THREE.HemisphereLight(0xffeeb1, 0x080820,4);
scene.add(hemilight);

let light = new THREE.SpotLight(0xffa95c,0.5);
light.position.set(-50,50,50);
light.castShadow = true;
light.shadow.bias = -0.0001;
light.shadow.mapSize.width = 1024*4;
light.shadow.mapSize.height = 1024*4;
scene.add( light );

window.addEventListener('resize', function () {
     let width = window.innerWidth;
     let height = window.innerHeight;
     renderer.setSize(width,height);
     camera.aspect = width / height;
     camera.updateProjectionMatrix();
});

// camera.position.set(0,0,100);


var loader = new THREE.GLTFLoader();
loader.load('img/rabbit.gltf', handle_load);

let mesh;
var mixers;

function handle_load(gltf){
     mixers = [];
     mesh = gltf.scene.children[0];
     mesh.material = new THREE.MeshLambertMaterial();
     mesh.position.set(0,-3,0);
     mesh.traverse(n => {
          if (n.isMesh){
               n.castShadow = true;
               n.receiveShadow = true;
               if(n.material.map) n.material.map.anisotropy = 16;
          }
     })

     const mixer = new THREE.AnimationMixer( mesh );
     // const clips = mesh.animations;

     const action = mixer.clipAction( gltf.animations[0] );
     action.play();
     mixers.push(mixer);

     scene.add(mesh);
     mesh.scale.set(2.5,2.5,2.5);
     animate();
}
camera.position.z = 20;

const animate = function () {
     requestAnimationFrame( animate );
     renderer.render( scene, camera );
     const dt = clock.getDelta();
     mixers.forEach(mixer => mixer.update(dt));

};
