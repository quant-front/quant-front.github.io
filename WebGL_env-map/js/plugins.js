const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );

const ambient = new THREE.HemisphereLight(0xffffbb, 0x080820);
scene.add(ambient);

const light = new THREE.DirectionalLight(0xFFFFFF, 1);
light.position.set( 1, 10, 6);
scene.add(light);



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


const assetPath = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/2666677/';

// const alpha = new THREE.TextureLoader().load(`${assetPath}dots.jpg`);
// const tex = new THREE.TextureLoader().load(`${assetPath}bricks-diffuse3.png`);

const cubemap = new THREE.CubeTextureLoader()
     .setPath( `${assetPath}skybox1_` )
     .load( [
          'px.jpg',
          'nx.jpg',
          'py.jpg',
          'ny.jpg',
          'pz.jpg',
          'nz.jpg'
     ] );

scene.background = cubemap;


let controls = new  THREE.OrbitControls(camera,renderer.domElement);

let sprite = new THREE.CubeTextureLoader().load('../assets/img/skybox.jpg');


const geometry = new THREE.TorusKnotGeometry(7,6.3,34,8,8,3);
const material = new  THREE.MeshStandardMaterial({
     color:0xffff00,
     metalness:0.95,
     roughness:0.01,
     emissive: 0x222222,
     envMap: sprite,
});

const mesh = new THREE.Mesh(geometry,material);
mesh.position.set(0,0,0);
scene.add(mesh);



camera.position.z = 60;


const animate = function () {
     requestAnimationFrame( animate );
     // mesh.rotation.x += 0.01;
     // mesh.rotation.y += 0.01;
     mesh.rotation.x += 0.01;
     mesh.rotation.z -= 0.01;
     camera.lookAt(mesh.position);
     renderer.render( scene, camera );
};

animate();
