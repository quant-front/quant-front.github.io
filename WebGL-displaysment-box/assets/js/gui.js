const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );
const fov = 45;
const aspect = 2;  // the canvas default
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 10, 20);

let renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0x000000);
let doc = document.querySelector('.main');
doc.appendChild( renderer.domElement );


window.addEventListener('resize', function () {
     let width = window.innerWidth;
     let height = window.innerHeight;
     renderer.setSize(width,height);
     camera.aspect = width / height;
     camera.updateProjectionMatrix();
});
// const color = 0xFFFFFF;
// const intensity = 1;
// const light = new THREE.DirectionalLight(color, intensity);
// light.position.set(0, 10, 0);
// light.target.position.set(-5, 0, 0);
// scene.add(light);
// scene.add(light.target);
//---
const color = 0xFFFFFF;
const intensity = 1;
const light = new THREE.PointLight(color, intensity);
light.position.set(0, 10, 0);
scene.add(light);
const helper = new THREE.PointLightHelper(light);
scene.add(helper);

function updateLight() {
     helper.update();
}

//color
class ColorGUIHelper {
     constructor(object, prop) {
          this.object = object;
          this.prop = prop;
     }
     get value() {
          return `#${this.object[this.prop].getHexString()}`;
     }
     set value(hexString) {
          this.object[this.prop].set(hexString);
     }
}



//gui
class MinMaxGUIHelper {
     constructor(obj, minProp, maxProp, minDif) {
          this.obj = obj;
          this.minProp = minProp;
          this.maxProp = maxProp;
          this.minDif = minDif;
     }
     get min() {
          return this.obj[this.minProp];
     }
     set min(v) {
          this.obj[this.minProp] = v;
          this.obj[this.maxProp] = Math.max(this.obj[this.maxProp], v + this.minDif);
     }
     get max() {
          return this.obj[this.maxProp];
     }
     set max(v) {
          this.obj[this.maxProp] = v;
          this.min = this.min;  // this will call the min setter
     }
}



const gui = new dat.GUI();
gui.add(camera, 'fov', 1, 180).onChange(updateCamera);
const minMaxGUIHelper = new MinMaxGUIHelper(camera, 'near', 'far', 0.1);
gui.add(minMaxGUIHelper, 'min', 0.1, 50, 0.1).name('near').onChange(updateCamera);
gui.add(minMaxGUIHelper, 'max', 0.1, 50, 0.1).name('far').onChange(updateCamera);
//light gui
//directionlightGui
// gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
// gui.add(light, 'intensity', 0, 2, 0.01);
// gui.add(light.target.position, 'x', -10, 10);
// gui.add(light.target.position, 'z', -10, 10);
// gui.add(light.target.position, 'y', 0, 10);
//
function updateCamera() {
     camera.updateProjectionMatrix();
}

function makeXYZGUI(gui, vector3, name, onChangeFn) {
     const folder = gui.addFolder(name);
     folder.add(vector3, 'x', -10, 10).onChange(onChangeFn);
     folder.add(vector3, 'y', 0, 10).onChange(onChangeFn);
     folder.add(vector3, 'z', -10, 10).onChange(onChangeFn);
     folder.open();
}

gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
gui.add(light, 'intensity', 0, 2, 0.01);
gui.add(light, 'distance', 0, 40).onChange(updateLight);
makeXYZGUI(gui, light.position, 'position', updateLight);



let controls = new  THREE.OrbitControls(camera,renderer.domElement);
controls.target.set(0, 5, 0);
controls.update();


const planeSize = 40;
const loader = new THREE.TextureLoader();
const texture = loader.load('../assets/img/checker.png');
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.magFilter = THREE.NearestFilter;
const repeats = planeSize / 2;
texture.repeat.set(repeats, repeats);
const planeGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize);
const planeMat = new THREE.MeshPhongMaterial({
     map: texture,
     side: THREE.DoubleSide,
});
const mesh = new THREE.Mesh(planeGeo, planeMat);
mesh.rotation.x = Math.PI * -.5;
scene.add(mesh);


{
     const sphereRadius = 3;
     const sphereWidthDivisions = 32;
     const sphereHeightDivisions = 16;
     const sphereGeo = new THREE.SphereBufferGeometry(sphereRadius, sphereWidthDivisions, sphereHeightDivisions);
     const sphereMat = new THREE.MeshPhongMaterial({color: '#CA8'});
     const mesh = new THREE.Mesh(sphereGeo, sphereMat);
     mesh.position.y = 4;
     scene.add(mesh);
}



camera.position.z = 20;

const stats = new Stats();
stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );

const animate = function () {
     requestAnimationFrame( animate );
     stats.begin();
     stats.end();
     renderer.render( scene, camera );
};

animate();
