
//Model-loader/////////////////////////////////////////////////////////
let hlight = new THREE.AmbientLight (0x404040,100);
scene.add(hlight);
{
     const loader = new THREE.GLTFLoader();

//standart
     loader.load(
          'scene.gltf',
          function ( object ) {
               // called when the resource is loaded
               scene.add( object.scene );
          },

     );

}


//---------------------------

//React load gltf
import modelUrl from './model3.glb';
loader.load(modelUrl, handle_load);
const MainFont = '/bold.json'; // если public/bold.json и с img тоже самое

//---------------------------


//Model-loader-V2//////////////////////////////////////////////////////////
let loader = new THREE.GLTFLoader();
loader.load('scene.gltf', handle_load);

let mesh;

function handle_load(gltf){
     mesh = gltf.scene.children[0];
     mesh.material = new THREE.MeshLambertMaterial();
     scene.add(mesh);
     mesh.position.z = -10;
     animate();
}

//---------------------------
// Model loader with Draco
const loader = new GLTFLoader();

const dracoLoader = new DRACOLoader();
// dracoLoader.setDecoderPath( 'three/examples/js/libs/draco/' );
 dracoLoader.preload();
// dracoLoader.setDecoderPath( 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/js/libs/draco/');
loader.setDRACOLoader( dracoLoader );
// закинуть в папку паблик папку draco
dracoLoader.setDecoderPath( '/draco/' );

loader.load('./img/model.glb', handle_load);

let mesh;

function handle_load(gltf){
     mesh = gltf.scene;
     mesh.material = new THREE.MeshStandardMaterial( { color: 0x606060 } );
     mesh.castShadow = true;
     mesh.receiveShadow = true;
     scene.add(mesh);
     mesh.position.z = -10;
     mesh.position.y = -80;
     scene.add(new THREE.AxesHelper(500,500));
     animate();
}
//

//Model loader STL
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
const loader = new STLLoader();
loader.load( './img/pose.stl', function ( geometry ) {

     const material = new THREE.MeshPhongMaterial( { color: 0x606060, specular: 0x111111, shininess: 200 } );
     const mesh = new THREE.Mesh( geometry, material );

     mesh.position.z = -10;
     mesh.position.y = -70;

     mesh.rotation.z = 50;
     mesh.rotation.y = 50;
     mesh.rotation.x = 250;

     mesh.castShadow = true;
     mesh.receiveShadow = true;

     scene.add( mesh );

} );

//public folder
const image = new Image();
let texture = new THREE.Texture(image)
image.onload = () => {
     texture.needsUpdate = true;
}
image.src = '../dist/1.jpg';

//TextureLoader////////////////////////////////////////////////////////
let sprite = new THREE.TextureLoader().load('../assets/img/starts.png');

const material = new  THREE.PointsMaterial({
     color:0xaaaaaa,
     size:0.7,
     map:sprite 
})
//TextureLoaderV2/////////////////////////////////////////////////////////////

{
     const material = new  THREE.PointsMaterial({
          color:0xaaaaaa,
          size:0.7,
          map:new  THREE.TextureLoader().load('../assets/img/1.jpg')
     })
}
// TextureLoader preload
let sprite = new THREE.TextureLoader();
sprite.load('../assets/img/1.jpg', function(materials){
     sprite.preload();
}

//TextureLoader V3///////////////////////

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

const material = new  THREE.MeshStandardMaterial({
     envMap: sprite,
});


//font-loader////////////////////////////////////////////////////////////

{
     let loader = new THREE.FontLoader();

     loader.load( '../assets/js/font.json', function ( font ) {

          var geometry = new THREE.TextGeometry( 'Hello three.js!', {
               font: font,
               size: 4.05,
               height: 0.01,
          } );
          const material = new   THREE.MeshBasicMaterial( {color: 0xff0000});
          const mesh = new THREE.Mesh(geometry,material);
          // mesh.position.x = 2 / window.innerWidth;
          geometry.center();
          // mesh.position.y = window.innerHeight / 4;
          scene.add(mesh);
          scene.add(new THREE.AxesHelper(500,500));
     } );
}


//font-loader with mesh Accessing
import MainFont from '../../assets/fonts/bold.json';

const font = new THREE.Font( MainFont );
let Link1Geometry = new THREE.TextGeometry( 'Hello three.js!', {
     font:font,
     size: 4.05,
     height: 0.01,
} );
const FontMaterial = new   THREE.MeshBasicMaterial( {color: 'white',opacity:1,transparent:true});
let DeepText = new THREE.Mesh(Link1Geometry,FontMaterial);
scene.add(DeepText)
