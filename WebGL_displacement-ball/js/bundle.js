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

eval("const scene = new THREE.Scene();\nconst camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);\nlet renderer = new THREE.WebGLRenderer();\nrenderer.setSize(window.innerWidth, window.innerHeight);\nrenderer.setClearColor(0xFFFCFF);\nlet doc = document.querySelector('.main');\ndoc.appendChild(renderer.domElement);\nwindow.addEventListener('resize', function () {\n  let width = window.innerWidth;\n  let height = window.innerHeight;\n  renderer.setSize(width, height);\n  camera.aspect = width / height;\n  camera.updateProjectionMatrix();\n});\nvar light = new THREE.AmbientLight(0x404040, 3); // soft white light\n\nscene.add(light);\nvar directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);\nscene.add(directionalLight);\nvar time = 0;\nlet controls = new THREE.OrbitControls(camera, renderer.domElement);\nconst geometry = new THREE.SphereGeometry(4, 32, 32);\nconst material = new THREE.MeshPhongMaterial({\n  displacementMap: new THREE.TextureLoader().load('../assets/img/6.jpg'),\n  displacementScale: 0,\n  map: new THREE.TextureLoader().load('../assets/img/6.jpg')\n});\nconst mesh = new THREE.Mesh(geometry, material);\nscene.add(mesh);\ncamera.position.z = 30;\n\nconst animate = function () {\n  requestAnimationFrame(animate);\n  time += 0.01;\n\n  if (time <= 1.5) {\n    material.displacementScale += 0.02;\n    time += 0.01;\n  }\n\n  if (time > 1.5) {\n    material.displacementScale -= 0.02;\n    time += 0.01;\n  }\n\n  if (time > 3) {\n    material.displacementScale = 0; // time = 0;\n  }\n\n  if (time > 6) {\n    time = 0;\n  }\n\n  renderer.render(scene, camera);\n};\n\nanimate();\n\n//# sourceURL=webpack:///./assets/js/plugins.js?");

/***/ })

/******/ });