const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );

scene.background = new THREE.Color(0xdddddd);


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


let light = new THREE.SpotLight(0xffffff);
light.position.set(-300,300,0);
light.castShadow = true;
light.shadow.mapSize.width = 2024;
light.shadow.mapSize.height = 5024;
light.shadow.camera.near = 400;
light.shadow.camera.far = 2000;
light.shadow.camera.fov = 0;
scene.add(light);

import fragmentShader from '../shaders/fragment.glsl';
import  vertexShader from '../shaders/vertex.glsl';



let controls = new  THREE.OrbitControls(camera,renderer.domElement);



// const geometry = new THREE.BoxGeometry( 5,5,5 );
// function CustomSinCurve( scale ) {
//
//      THREE.Curve.call( this );
//
//      this.scale = ( scale === undefined ) ? 1 : scale;
//
// }
//
// CustomSinCurve.prototype = Object.create( THREE.Curve.prototype );
// CustomSinCurve.prototype.constructor = CustomSinCurve;
//
// CustomSinCurve.prototype.getPoint = function( t ) {
//
//      t = (Math.PI * 2) * t;
//      var s = Math.sin(t);
//      var c = Math.cos(t);
//      var r = 2 + 6 * c;
//      var ty = 1 + (-r * c) * 0.205 - 0.25;
//      var tx = (-r * s) * 0.205;
//      var tz = s * 0.65;
//
//      return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
//
// };
//
// const path = new CustomSinCurve( 10 );
// const geometry = new THREE.TubeGeometry( path, 100, 2, 100, true );

var geometry = new THREE.TorusKnotGeometry( 10, 3, 200, 100  );
const material = new  THREE.ShaderMaterial({
     // wireframe: true,
     flatShading:true,
     opacity:0.6,transparent:true,
          fragmentShader,
          vertexShader,
          uniforms: {
            time: { type:'f', value: 0}
          },
     });
const mesh = new THREE.Mesh(geometry,material);
mesh.castShadow = true;
mesh.receiveShadow = true;
scene.add(mesh);
mesh.rotation.y = 2.5;


camera.position.z = 70;
// const stats = new Stats();
// stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
// document.body.appendChild( stats.dom );

let time = 0;
const animate = function () {
     time = time+0.05;
     material.uniforms.time.value = time;
     requestAnimationFrame( animate );
     // stats.begin();
     // stats.end();
     // mesh.rotation.z += 0.001;
     renderer.render( scene, camera );
};

animate();
