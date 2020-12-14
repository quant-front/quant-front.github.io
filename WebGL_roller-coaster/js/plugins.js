const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );
let   clock = new THREE.Clock();

const normal = new THREE.Vector3();
const position = new THREE.Vector3();
const lookAt = new THREE.Vector3();

hlight = new THREE.AmbientLight (0x404040,30);
scene.add(hlight);

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





let controls = new  THREE.OrbitControls(camera,renderer.domElement);


const  curve = new THREE.Curves.GrannyKnot();
const geometry = new THREE.TubeBufferGeometry( curve, 100, 1.9, 2, true );
const  material = new  THREE.MeshBasicMaterial({
     color:0xB242C6,
     side:THREE.DoubleSide,
     wireframe:true
})

const geometry1 = new THREE.BoxBufferGeometry( 1, 1, 1 );
const  material1 = new  THREE.MeshBasicMaterial({
     color:0xC6A042,
     side:THREE.DoubleSide,
})


const  tube = new THREE.Mesh(geometry,material);
scene.add(tube);

const cameraTarget = new THREE.Object3D;
const lookTarget = new THREE.Object3D;
// const cameraTargetlook = new THREE.Mesh(geometry1,material1);

// scene.add(cameraTargetlook);
// const cameraTargetlook;
let loader = new THREE.GLTFLoader();
loader.load('img/abandonded_roller_cart/scene.gltf', handle_load);

let cameraTargetlook;

function handle_load(gltf){
     cameraTargetlook = gltf.scene;
     cameraTargetlook.material = new THREE.MeshLambertMaterial();
     cameraTargetlook.rotation.y = 5;
     scene.add(cameraTargetlook);
}



function updateCamera() {
  const time = clock.getElapsedTime();
     const  looptime = 15;
     const t = (time % looptime)/ looptime;
     const  t2 = ((time +0.1)% looptime) / looptime;
     const  t3 = ((time +0.101)% looptime) / looptime;
     const  pos = tube.geometry.parameters.path.getPointAt(t);
     const  pos2 =   tube.geometry.parameters.path.getPointAt(t2);
     const  pos3 =   tube.geometry.parameters.path.getPointAt(t3);
     camera.position.set(pos.x, pos.y +4, pos.z);
     cameraTarget.position.set(pos2.x, pos2.y +4, pos2.z);
     cameraTargetlook.position.set(pos2.x, pos2.y +3, pos2.z);
     lookTarget.position.set(pos3.x, pos3.y +3, pos3.z);
     camera.lookAt(cameraTarget.position);
     cameraTargetlook.lookAt(lookTarget.position);

}

const animate = function () {
     requestAnimationFrame( animate );
     updateCamera();

     renderer.render( scene, camera );
};

animate();
