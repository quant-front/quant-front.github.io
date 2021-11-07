const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );
const camera = new THREE.OrthographicCamera( -1, 1 , 1, -1, 0.1, 100 );


let renderer = new THREE.WebGLRenderer({antialias:true});
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




import fragmentShader from '../shaders/fragment.glsl';
import  vertexShader from '../shaders/vertex.glsl';


// let controls = new  THREE.OrbitControls(camera,renderer.domElement);

var  delta = 0;
const  uniforms = {
     u_color_a: { value: new THREE.Color(0xff0000) },
     u_color_b: { value: new THREE.Color(0x00ffff) },
     u_time: { value: 0.0 },
     u_mouse: { value:{ x:0.0, y:0.0 }},
     u_resolution: { value:{ x:innerWidth, y:window.innerHeight }}
};
const geometry = new THREE.PlaneGeometry( 2,2 );
const material = new  THREE.ShaderMaterial({
          fragmentShader,
          vertexShader,
          uniforms: uniforms,
     });
const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);



camera.position.z = 20;


const animate = function () {
     requestAnimationFrame( animate );
     uniforms.u_time.value += 0.01;
     renderer.render( scene, camera );
};

animate();
