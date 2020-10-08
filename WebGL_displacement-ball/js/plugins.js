const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );




let renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0xFFFCFF);
let doc = document.querySelector('.main');
doc.appendChild( renderer.domElement );


window.addEventListener('resize', function () {
     let width = window.innerWidth;
     let height = window.innerHeight;
     renderer.setSize(width,height);
     camera.aspect = width / height;
     camera.updateProjectionMatrix();
});
var light = new THREE.AmbientLight( 0x404040,3 ); // soft white light
scene.add( light );

var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
scene.add( directionalLight );




var time = 0;

let controls = new  THREE.OrbitControls(camera,renderer.domElement);


const geometry = new THREE.SphereGeometry( 4, 32, 32 )
const material = new  THREE.MeshPhongMaterial({
     displacementMap:new THREE.TextureLoader().load('../assets/img/6.jpg'),
     displacementScale:0,
     map:new THREE.TextureLoader().load('../assets/img/6.jpg'),
})


const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);



camera.position.z = 30;

const animate = function () {
     requestAnimationFrame( animate );
          time +=0.01;
          if (time <=1.5){
               material.displacementScale +=0.02;
               time+=0.01;
          }
          if (time > 1.5){
               material.displacementScale -=0.02;
               time+=0.01;
          }
          if (time > 3){
               material.displacementScale = 0;
               // time = 0;
          }
          if (time > 6){
               time = 0;
          }



     renderer.render( scene, camera );
};

animate();
