const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 55, window.innerWidth/window.innerHeight, 0.1, 1000);



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

camera.position.set(0,0,100);





var loader = new THREE.GLTFLoader();
loader.load('scene.gltf', handle_load);

let mesh;

function handle_load(gltf){
     mesh = gltf.scene.children[0];
     mesh.material = new THREE.MeshLambertMaterial();
     mesh.position.set(0,-85,-25);
     mesh.rotation.z = -1.5;
     mesh.traverse(n => {
          if (n.isMesh){
               n.castShadow = true;
               n.receiveShadow = true;
               if(n.material.map) n.material.map.anisotropy = 16;
          }
     })
     scene.add(mesh);
     mesh.scale.set(0.5,0.5,0.5);
     mesh.position.z = -10;
     animate();
}

let counter = 0;

const animate = function () {
     requestAnimationFrame( animate );
     light.position.set(
       camera.position.x +10,
       camera.position.y +10,
       camera.position.z +10
     );
     if (counter <=500){
          mesh.rotation.z += 0.002;
          counter++;
     }
     if (counter > 500){
          mesh.rotation.z -= 0.002;
          counter++;
     }

     if (counter > 1000){
          counter = 0;
     }
     renderer.render( scene, camera );

};

