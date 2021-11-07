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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _shaders_fragment_glsl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shaders/fragment.glsl */ \"./assets/shaders/fragment.glsl\");\n/* harmony import */ var _shaders_vertex_glsl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shaders/vertex.glsl */ \"./assets/shaders/vertex.glsl\");\nconst scene = new THREE.Scene(); // const camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );\n\nconst camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100);\nlet renderer = new THREE.WebGLRenderer({\n  antialias: true\n});\nrenderer.setSize(window.innerWidth, window.innerHeight);\nrenderer.setClearColor(0xFFFCFF);\nlet doc = document.querySelector('.main');\ndoc.appendChild(renderer.domElement);\nwindow.addEventListener('resize', function () {\n  let width = window.innerWidth;\n  let height = window.innerHeight;\n  renderer.setSize(width, height);\n  camera.aspect = width / height;\n  camera.updateProjectionMatrix();\n});\n\n // let controls = new  THREE.OrbitControls(camera,renderer.domElement);\n\nvar delta = 0;\nconst uniforms = {\n  u_color_a: {\n    value: new THREE.Color(0xff0000)\n  },\n  u_color_b: {\n    value: new THREE.Color(0x00ffff)\n  },\n  u_time: {\n    value: 0.0\n  },\n  u_mouse: {\n    value: {\n      x: 0.0,\n      y: 0.0\n    }\n  },\n  u_resolution: {\n    value: {\n      x: innerWidth,\n      y: window.innerHeight\n    }\n  }\n};\nconst geometry = new THREE.PlaneGeometry(2, 2);\nconst material = new THREE.ShaderMaterial({\n  fragmentShader: _shaders_fragment_glsl__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  vertexShader: _shaders_vertex_glsl__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  uniforms: uniforms\n});\nconst mesh = new THREE.Mesh(geometry, material);\nscene.add(mesh);\ncamera.position.z = 20;\n\nconst animate = function () {\n  requestAnimationFrame(animate);\n  uniforms.u_time.value += 0.01;\n  renderer.render(scene, camera);\n};\n\nanimate();\n\n//# sourceURL=webpack:///./assets/js/shader.js?");

/***/ }),

/***/ "./assets/shaders/fragment.glsl":
/*!**************************************!*\
  !*** ./assets/shaders/fragment.glsl ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (\"\\n#ifdef GL_ES\\nprecision mediump float;\\n#define GLSLIFY 1\\n#endif\\n\\nvarying vec2 v_uv;\\nuniform vec2 u_resolution;\\nuniform vec2 u_mouse;\\nuniform float u_time;\\n\\nfloat random (vec2 st, float seed) {\\n    const float a = 12.9898;\\n    const float b = 105.233;\\n    const float c = 43758.543123;\\n    return fract(sin(dot(st, vec2(a, b))+ seed) * c );\\n}\\n\\nvoid main(){\\n\\n    vec3 color = random(v_uv,u_time*0.2)*vec3(1.0);\\n    gl_FragColor  = vec4(color, 1.0);\\n}\\n\");\n\n//# sourceURL=webpack:///./assets/shaders/fragment.glsl?");

/***/ }),

/***/ "./assets/shaders/vertex.glsl":
/*!************************************!*\
  !*** ./assets/shaders/vertex.glsl ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (\"#define GLSLIFY 1\\nvarying vec2 v_uv;\\nvoid main() {\\n v_uv = uv;;\\n gl_Position = projectionMatrix * modelViewMatrix * vec4(position , 1.0);\\n}\\n\");\n\n//# sourceURL=webpack:///./assets/shaders/vertex.glsl?");

/***/ })

/******/ });