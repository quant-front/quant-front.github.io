/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./assets/js/plugins.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/js/plugins.js":
/*!******************************!*\
  !*** ./assets/js/plugins.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const scene = new THREE.Scene();\nconst camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);\nlet renderer = new THREE.WebGLRenderer();\nrenderer.setSize(window.innerWidth, window.innerHeight);\nrenderer.setClearColor(0xFFFCFF);\nlet doc = document.querySelector('.main');\ndoc.appendChild(renderer.domElement);\nwindow.addEventListener('resize', function () {\n  let width = window.innerWidth;\n  let height = window.innerHeight;\n  renderer.setSize(width, height);\n  camera.aspect = width / height;\n  camera.updateProjectionMatrix();\n});\nlet tubeGeometry;\nlet texts = [];\nlet controls = new THREE.OrbitControls(camera, renderer.domElement);\n\nfunction CustomSinCurve(scale) {\n  THREE.Curve.call(this);\n  this.scale = scale === undefined ? 1 : scale;\n}\n\nCustomSinCurve.prototype = Object.create(THREE.Curve.prototype);\nCustomSinCurve.prototype.constructor = CustomSinCurve;\n\nCustomSinCurve.prototype.getPoint = function (t) {\n  var tx = Math.cos(2 * Math.PI * t);\n  var ty = Math.sin(2 * Math.PI * t);\n  var tz = 0.1 * Math.sin(8 * Math.PI * t);\n  return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);\n};\n\nvar path = new CustomSinCurve(10);\ntubeGeometry = new THREE.TubeGeometry(path, 200, 0.3, 8, false);\nvar material = new THREE.MeshBasicMaterial({\n  side: THREE.DoubleSide,\n  map: new THREE.TextureLoader().load('img/map.png')\n});\nmaterial.map.wrapT = THREE.RepeatWrapping;\nmaterial.map.wrapS = THREE.RepeatWrapping;\nmaterial.map.repeat.set(10, 1);\nvar mesh = new THREE.Mesh(tubeGeometry, material);\nscene.add(mesh); //fonts\n\nlet loader = new THREE.FontLoader();\nlet font = loader.load('js/font.json', function (font) {\n  let textArray = ['Trigger 1111', 'Trigger 2222', 'Trigger 3333', 'Trigger 4444', 'Trigger 5555'];\n  textArray.forEach((v, i) => {\n    let geometry = new THREE.TextGeometry(v, {\n      font: font,\n      size: 0.05,\n      height: 0.01\n    });\n    let textmaterial = new THREE.MeshBasicMaterial({\n      color: 0xff0000\n    });\n    geometry.center();\n    let textmesh = new THREE.Mesh(geometry, textmaterial);\n    texts.push(textmesh);\n    scene.add(textmesh);\n    textmesh.position.copy(tubeGeometry.parameters.path.getPointAt(0.2 + i * 0.15));\n  });\n});\ncamera.position.z = 20;\nlet position = 0;\nlet time = 0;\nlet normal = new THREE.Vector3();\nlet binormal = new THREE.Vector3();\n\nconst animate = function () {\n  // animation camera on path\n  time = Date.now();\n  var looptime = 20 * 1000;\n  var t = time % looptime / looptime;\n  var pos = tubeGeometry.parameters.path.getPointAt(t); // interpolation\n\n  var segments = tubeGeometry.tangents.length;\n  var pickt = t * segments;\n  var pick = Math.floor(pickt);\n  var pickNext = (pick + 1) % segments;\n  binormal.subVectors(tubeGeometry.binormals[pickNext], tubeGeometry.binormals[pick]);\n  binormal.multiplyScalar(pickt - pick).add(tubeGeometry.binormals[pick]);\n  var dir = tubeGeometry.parameters.path.getTangentAt(t);\n  var offset = 0;\n  normal.copy(binormal).cross(dir); // we move on a offset on its binormal\n\n  pos.add(normal.clone().multiplyScalar(offset));\n  camera.position.copy(pos); // using arclength for stablization in look ahead\n\n  var lookAt = tubeGeometry.parameters.path.getPointAt((t + 1 / tubeGeometry.parameters.path.getLength()) % 1); // camera orientation 2 - up orientation via normal\n\n  camera.matrix.lookAt(camera.position, lookAt, normal);\n  camera.rotation.setFromRotationMatrix(camera.matrix, camera.rotation.order);\n  texts.forEach(t => {\n    t.quaternion.copy(camera.quaternion);\n  });\n  requestAnimationFrame(animate);\n  renderer.render(scene, camera);\n};\n\nanimate();\n\n//# sourceURL=webpack:///./assets/js/plugins.js?");

/***/ })

/******/ });