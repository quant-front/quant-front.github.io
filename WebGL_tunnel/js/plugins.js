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

let tubeGeometry;
let texts = [];




let controls = new  THREE.OrbitControls(camera,renderer.domElement);

function CustomSinCurve( scale ) {

     THREE.Curve.call( this );

     this.scale = ( scale === undefined ) ? 1 : scale;

}

CustomSinCurve.prototype = Object.create( THREE.Curve.prototype );
CustomSinCurve.prototype.constructor = CustomSinCurve;

CustomSinCurve.prototype.getPoint = function ( t ) {

     var tx = Math.cos( 2 * Math.PI * t );
     var ty = Math.sin( 2 * Math.PI * t );
     var tz = 0.1*Math.sin( 8 * Math.PI * t );

     return new THREE.Vector3( tx, ty, tz ).multiplyScalar( this.scale );

};

var path = new CustomSinCurve( 10 );
tubeGeometry = new THREE.TubeGeometry( path, 200, 0.3, 8, false );
var material = new THREE.MeshBasicMaterial( {
     side: THREE.DoubleSide,
     map:new  THREE.TextureLoader().load('../assets/img/map.png')
} );
material.map.wrapT = THREE.RepeatWrapping;
material.map.wrapS =  THREE.RepeatWrapping;
material.map.repeat.set(10,1);
var mesh = new THREE.Mesh( tubeGeometry, material );
scene.add( mesh );




//fonts

let loader = new THREE.FontLoader();
let font = loader.load(
     '../assets/js/font.json',

     function ( font ) {
          let textArray = [
               'Trigger 1111',
               'Trigger 2222',
               'Trigger 3333',
               'Trigger 4444',
               'Trigger 5555',
          ];
          textArray.forEach((v,i) => {
               let geometry = new THREE.TextGeometry( v, {
                    font: font,
                    size: 0.05,
                    height: 0.01,
               } );

               let textmaterial = new THREE.MeshBasicMaterial( {color: 0xff0000});

               geometry.center();
               let textmesh = new THREE.Mesh(geometry,textmaterial);
               texts.push(textmesh);
               scene.add(textmesh);
               textmesh.position.copy(
                    tubeGeometry.parameters.path.getPointAt( 0.2+i*0.15 )
               );
          });
     },
);

camera.position.z = 20;
let position = 0;
let time = 0;
let normal = new THREE.Vector3();
let binormal = new THREE.Vector3();

const animate = function () {
    // animation camera on path
     time = Date.now();
     var looptime = 20 * 1000;
     var t = ( time % looptime ) / looptime;
     var pos = tubeGeometry.parameters.path.getPointAt( t );
     // interpolation
     var segments = tubeGeometry.tangents.length;
     var pickt = t * segments;
     var pick = Math.floor( pickt );
     var pickNext = ( pick + 1 ) % segments;
     binormal.subVectors( tubeGeometry.binormals[ pickNext ], tubeGeometry.binormals[ pick ] );
     binormal.multiplyScalar( pickt - pick ).add( tubeGeometry.binormals[ pick ] );
     var dir = tubeGeometry.parameters.path.getTangentAt( t );
     var offset = 0;
     normal.copy( binormal ).cross( dir );
     // we move on a offset on its binormal
     pos.add( normal.clone().multiplyScalar( offset ) );
     camera.position.copy( pos );
     // using arclength for stablization in look ahead
     var lookAt = tubeGeometry.parameters.path.getPointAt( ( t + 1 / tubeGeometry.parameters.path.getLength() ) % 1 );
     // camera orientation 2 - up orientation via normal
     camera.matrix.lookAt( camera.position, lookAt, normal );
     camera.rotation.setFromRotationMatrix( camera.matrix, camera.rotation.order );

     texts.forEach(t => {
          t.quaternion.copy(camera.quaternion);
     })
     requestAnimationFrame( animate );

     renderer.render( scene, camera );
};

animate();
