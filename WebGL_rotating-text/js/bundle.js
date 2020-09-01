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

/***/ "./assets/js/canv.js":
/*!***************************!*\
  !*** ./assets/js/canv.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return MyText; });\nclass MyText {\n  constructor() {\n    this.canvas = document.createElement('canvas');\n    this.canvas.classList.add('tempcanvas');\n    this.size = 1024;\n    document.body.appendChild(this.canvas);\n    this.ctx = this.canvas.getContext('2d');\n    this.canvas.width = this.size;\n    this.canvas.height = this.size;\n    this.text = 'Its new day!';\n    this.ctx.font = \"130px Arial\";\n    this.fontface = \"Arial\";\n  }\n\n  draw() {\n    this.ctx.fillStyle = '#000000';\n    this.ctx.fillRect(0, 0, this.size, this.size);\n    this.ctx.fillStyle = '#ffffff';\n    this.ctx.clearRect(0, 0, this.size, this.size);\n    this.ctx.textAlign = 'center';\n    this.ctx.textBaseline = 'middle';\n    this.fitText(this.text, this.fontface, 0, 300, this.size);\n    this.ctx.fillText(this.text, this.size / 2, this.size / 2); // this.ctx.fillRect(100, 100, 250, 250);\n    // this.ctx.fillRect(600, 600, 250, 250);\n  }\n\n  fitText(text, fontface, min, max, size) {\n    if (max - min < 1) {\n      return min;\n    }\n\n    let found;\n    let test = min + (max - min) / 2;\n    this.ctx.font = test + 'px ' + this.fontface;\n    this.measureText = this.ctx.measureText(text).width;\n\n    if (this.measureText > size) {\n      found = this.fitText(text, fontface, min, test, size);\n    } else {\n      found = this.fitText(text, fontface, test, max, size);\n    }\n\n    return found;\n  }\n\n}\n\n//# sourceURL=webpack:///./assets/js/canv.js?");

/***/ }),

/***/ "./assets/js/plugins.js":
/*!******************************!*\
  !*** ./assets/js/plugins.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _js_canv_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../js/canv.js */ \"./assets/js/canv.js\");\nconst scene = new THREE.Scene();\nconst camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);\n\nlet renderer = new THREE.WebGLRenderer();\nrenderer.setSize(window.innerWidth, window.innerHeight);\nrenderer.setClearColor(0x000000);\nlet doc = document.querySelector('.main');\ndoc.appendChild(renderer.domElement);\nrenderer.sortObjects = true;\nwindow.addEventListener('resize', function () {\n  let width = window.innerWidth;\n  let height = window.innerHeight;\n  renderer.setSize(width, height);\n  camera.aspect = width / height;\n  camera.updateProjectionMatrix();\n});\nlet light = new THREE.SpotLight();\nlight.position.set(-900, 500, 0);\nlight.castShadow = true;\nscene.add(light);\nlet controls = new THREE.OrbitControls(camera, renderer.domElement);\nlet TextCanvas = new _js_canv_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\nTextCanvas.draw();\nlet cavasTexture = new THREE.Texture(TextCanvas.canvas);\ncavasTexture.needsUpdate = true;\nconst geometry = new THREE.SphereGeometry(3, 25, 25);\nconst material = new THREE.MeshBasicMaterial({\n  // map:new  THREE.TextureLoader().load('../assets/img/1.jpg')\n  transparent: true,\n  side: THREE.FrontSide,\n  flatShading: true,\n  map: cavasTexture,\n  cavasTexture\n});\nconst material1 = new THREE.MeshBasicMaterial({\n  // map:new  THREE.TextureLoader().load('../assets/img/1.jpg')\n  transparent: true,\n  side: THREE.BackSide,\n  color: 0xFFFFFFF,\n  flatShading: true,\n  map: cavasTexture,\n  alphaMap: cavasTexture\n});\nconst mesh = new THREE.Mesh(geometry, material);\nconst mesh1 = new THREE.Mesh(geometry, material1);\nmesh.position.z = -0.01;\nmesh.renderOrder = 2;\nmesh1.renderOrder = 1;\nscene.add(mesh);\nscene.add(mesh1);\nconst geometry1 = new THREE.SphereGeometry(3, 25, 25);\nconst material2 = new THREE.MeshLambertMaterial({\n  map: new THREE.TextureLoader().load('img/2.jpg')\n});\nconst mesh2 = new THREE.Mesh(geometry1, material2);\nmesh2.scale.set(0.9, 0.9, 0.9);\nscene.add(mesh2);\ncamera.position.z = 20;\n\nconst animate = function () {\n  requestAnimationFrame(animate);\n  mesh.rotation.y -= 0.01;\n  mesh1.rotation.y -= 0.01;\n  mesh2.rotation.y += 0.005;\n  renderer.render(scene, camera);\n};\n\nanimate();\n\n//# sourceURL=webpack:///./assets/js/plugins.js?");

/***/ })

/******/ });