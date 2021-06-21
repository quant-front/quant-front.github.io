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

eval("const scene = new THREE.Scene();\nconst camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);\nlet clock = new THREE.Clock();\nscene.background = new THREE.Color(0xdddddd);\nlet renderer = new THREE.WebGLRenderer({\n  alpha: true\n});\nrenderer.setClearColor(0x000000, 0);\nrenderer.shadowMap.enabled = true;\nrenderer.setSize(window.innerWidth, window.innerHeight);\nlet doc = document.querySelector('.main');\ndoc.appendChild(renderer.domElement);\nlet hemilight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 4);\nscene.add(hemilight);\nlet light = new THREE.SpotLight(0xffa95c, 0.5);\nlight.position.set(-50, 50, 50);\nlight.castShadow = true;\nlight.shadow.bias = -0.0001;\nlight.shadow.mapSize.width = 1024 * 4;\nlight.shadow.mapSize.height = 1024 * 4;\nscene.add(light);\nwindow.addEventListener('resize', function () {\n  let width = window.innerWidth;\n  let height = window.innerHeight;\n  renderer.setSize(width, height);\n  camera.aspect = width / height;\n  camera.updateProjectionMatrix();\n}); // camera.position.set(0,0,100);\n\nvar loader = new THREE.GLTFLoader();\nloader.load('img/rabbit.gltf', handle_load);\nlet mesh;\nvar mixers;\n\nfunction handle_load(gltf) {\n  mixers = [];\n  mesh = gltf.scene.children[0];\n  mesh.material = new THREE.MeshLambertMaterial();\n  mesh.position.set(0, -3, 0);\n  mesh.traverse(n => {\n    if (n.isMesh) {\n      n.castShadow = true;\n      n.receiveShadow = true;\n      if (n.material.map) n.material.map.anisotropy = 16;\n    }\n  });\n  const mixer = new THREE.AnimationMixer(mesh); // const clips = mesh.animations;\n\n  const action = mixer.clipAction(gltf.animations[0]);\n  action.play();\n  mixers.push(mixer);\n  scene.add(mesh);\n  mesh.scale.set(2.5, 2.5, 2.5);\n  animate();\n}\n\ncamera.position.z = 20;\n\nconst animate = function () {\n  requestAnimationFrame(animate);\n  renderer.render(scene, camera);\n  const dt = clock.getDelta();\n  mixers.forEach(mixer => mixer.update(dt));\n};\n\n//# sourceURL=webpack:///./assets/js/plugins.js?");

/***/ })

/******/ });