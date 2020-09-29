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
/******/ 	return __webpack_require__(__webpack_require__.s = "./assets/js/shader.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/js/shader.js":
/*!*****************************!*\
  !*** ./assets/js/shader.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _shaders_fragment_glsl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shaders/fragment.glsl */ \"./assets/shaders/fragment.glsl\");\n/* harmony import */ var _shaders_vertex_glsl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shaders/vertex.glsl */ \"./assets/shaders/vertex.glsl\");\nconst scene = new THREE.Scene();\nconst camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);\nscene.background = new THREE.Color(0xdddddd);\nlet renderer = new THREE.WebGLRenderer();\nrenderer.setSize(window.innerWidth, window.innerHeight);\nrenderer.setClearColor(0xFFFCFF);\nlet doc = document.querySelector('.main');\ndoc.appendChild(renderer.domElement);\nwindow.addEventListener('resize', function () {\n  let width = window.innerWidth;\n  let height = window.innerHeight;\n  renderer.setSize(width, height);\n  camera.aspect = width / height;\n  camera.updateProjectionMatrix();\n});\nlet light = new THREE.SpotLight(0xffffff);\nlight.position.set(-300, 300, 0);\nlight.castShadow = true;\nlight.shadow.mapSize.width = 2024;\nlight.shadow.mapSize.height = 5024;\nlight.shadow.camera.near = 400;\nlight.shadow.camera.far = 2000;\nlight.shadow.camera.fov = 0;\nscene.add(light);\n\n\nlet controls = new THREE.OrbitControls(camera, renderer.domElement); // const geometry = new THREE.BoxGeometry( 5,5,5 );\n// function CustomSinCurve( scale ) {\n//\n//      THREE.Curve.call( this );\n//\n//      this.scale = ( scale === undefined ) ? 1 : scale;\n//\n// }\n//\n// CustomSinCurve.prototype = Object.create( THREE.Curve.prototype );\n// CustomSinCurve.prototype.constructor = CustomSinCurve;\n//\n// CustomSinCurve.prototype.getPoint = function( t ) {\n//\n//      t = (Math.PI * 2) * t;\n//      var s = Math.sin(t);\n//      var c = Math.cos(t);\n//      var r = 2 + 6 * c;\n//      var ty = 1 + (-r * c) * 0.205 - 0.25;\n//      var tx = (-r * s) * 0.205;\n//      var tz = s * 0.65;\n//\n//      return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);\n//\n// };\n//\n// const path = new CustomSinCurve( 10 );\n// const geometry = new THREE.TubeGeometry( path, 100, 2, 100, true );\n\nvar geometry = new THREE.TorusKnotGeometry(10, 3, 200, 100);\nconst material = new THREE.ShaderMaterial({\n  // wireframe: true,\n  flatShading: true,\n  opacity: 0.6,\n  transparent: true,\n  fragmentShader: _shaders_fragment_glsl__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  vertexShader: _shaders_vertex_glsl__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  uniforms: {\n    time: {\n      type: 'f',\n      value: 0\n    }\n  }\n});\nconst mesh = new THREE.Mesh(geometry, material);\nmesh.castShadow = true;\nmesh.receiveShadow = true;\nscene.add(mesh);\nmesh.rotation.y = 2.5;\ncamera.position.z = 70;\nconst stats = new Stats();\nstats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom\n\ndocument.body.appendChild(stats.dom);\nlet time = 0;\n\nconst animate = function () {\n  time = time + 0.05;\n  material.uniforms.time.value = time;\n  requestAnimationFrame(animate);\n  stats.begin();\n  stats.end(); // mesh.rotation.z += 0.001;\n\n  renderer.render(scene, camera);\n};\n\nanimate();\n\n//# sourceURL=webpack:///./assets/js/shader.js?");

/***/ }),

/***/ "./assets/shaders/fragment.glsl":
/*!**************************************!*\
  !*** ./assets/shaders/fragment.glsl ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (\"#define GLSLIFY 1\\n//#pragma glslify: hsl2rgb = require(glsl-hsl2rgb);\\nuniform float time;\\nvarying vec2 vUv;\\nvarying vec4 vPosition;\\n\\nvoid main() {\\n// vec3 color1 = vec3(hsl2rgb(290.0/360.0, 0.74, 0.34));\\n// vec3 color2 = vec3(hsl2rgb(185.0/360.0, 0.83, 0.54));\\n vec3 color1 = vec3(0.533, 0.847, 0.745);\\n vec3 color2 = vec3(0.192, 0.216, 0.576);\\n float threshold = 0.05;\\n\\n float pi = 3.1415926;\\n float f_line = sin(pi*200. * (vUv.x - vUv.y*0.05) - time*4.);\\n// sin(pi*200.*(vUv.x - 0.08*vUv.y) - time*4.);\\n float k = 0.;\\n float sk = 0.;\\n\\n if(f_line<0.){\\n  k = -1.;\\n } else{\\n  k = 1.;\\n }\\n float f_line_a = abs(f_line);\\n\\n if (f_line_a < threshold) {\\n   sk = (threshold - f_line_a) / threshold;\\n  k =  f_line* sk + (1. - sk)*k;\\n }\\n\\n k = (k+1.)/2.;\\n\\n vec3 resultcolor = color1*k + color2*(1.-k);\\n gl_FragColor = vec4(resultcolor,1.0);\\n// gl_FragColor = vec4(rgb, 1.0);\\n}\\n\\n// void main() {\\n// vec3 color = vec3(1.0);\\n// gl_FragColor = vec4(vec3(vUv.x ),1.0);\\n//\\n// }\\n\");\n\n//# sourceURL=webpack:///./assets/shaders/fragment.glsl?");

/***/ }),

/***/ "./assets/shaders/vertex.glsl":
/*!************************************!*\
  !*** ./assets/shaders/vertex.glsl ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (\"#define GLSLIFY 1\\n varying vec2 vUv;\\n uniform float time;\\n void main() {\\n vUv = uv;\\n vec3 pos = position.xyz * sin(time);\\n gl_Position = projectionMatrix * modelViewMatrix * vec4(position.xyz, 1.0);\\n }\");\n\n//# sourceURL=webpack:///./assets/shaders/vertex.glsl?");

/***/ })

/******/ });