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
/******/ 	return __webpack_require__(__webpack_require__.s = "./assets/js/canvas.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/js/canvas.js":
/*!*****************************!*\
  !*** ./assets/js/canvas.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _perlin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./perlin */ \"./assets/js/perlin.js\");\n\nlet canvas = document.createElement('canvas');\nlet ctx = canvas.getContext('2d');\ncanvas.width = window.innerWidth;\ncanvas.height = window.innerHeight;\nlet doc = document.querySelector('.main');\ncanvas.classList.add('template-canvas');\ndoc.appendChild(canvas); // let size = 600;\n// let canvas = document.createElement('canvas');\n// let ctx = canvas.getContext('2d');\n// canvas.width = size;\n// canvas.height = size;\n// let doc = document.querySelector('.main');\n// canvas.classList.add('sample-canvas');\n// doc.appendChild(canvas);\n\nfunction draw() {\n  // ctx.clearRect(0,0,size,size);\n  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);\n\n  for (var i = 0; i < window.innerWidth; i++) {\n    // ctx.fillRect(i,0,1,200*Perlin(i/100,time/100,0))\n    ctx.fillStyle = \"#3498DB\";\n    ctx.fillRect(i, window.innerHeight, 1, -200 * Object(_perlin__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(i / 250, time / 100, 0));\n    ctx.fillRect(i, 0, 1, 500 * Object(_perlin__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(i / 150, time / 100, 0));\n  }\n\n  ctx.restore();\n}\n\nlet time = 0;\n\nfunction render() {\n  draw();\n  time--;\n  window.requestAnimationFrame(render);\n}\n\nrender();\n\n//# sourceURL=webpack:///./assets/js/canvas.js?");

/***/ }),

/***/ "./assets/js/perlin.js":
/*!*****************************!*\
  !*** ./assets/js/perlin.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return noise; });\nfunction noise(x, y, z) {\n  var p = new Array(512);\n  var permutation = [151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180];\n\n  for (var i = 0; i < 256; i++) p[256 + i] = p[i] = permutation[i];\n\n  var X = Math.floor(x) & 255,\n      // FIND UNIT CUBE THAT\n  Y = Math.floor(y) & 255,\n      // CONTAINS POINT.\n  Z = Math.floor(z) & 255;\n  x -= Math.floor(x); // FIND RELATIVE X,Y,Z\n\n  y -= Math.floor(y); // OF POINT IN CUBE.\n\n  z -= Math.floor(z);\n  var u = fade(x),\n      // COMPUTE FADE CURVES\n  v = fade(y),\n      // FOR EACH OF X,Y,Z.\n  w = fade(z);\n  var A = p[X] + Y,\n      AA = p[A] + Z,\n      AB = p[A + 1] + Z,\n      // HASH COORDINATES OF\n  B = p[X + 1] + Y,\n      BA = p[B] + Z,\n      BB = p[B + 1] + Z; // THE 8 CUBE CORNERS,\n\n  return scale(lerp(w, lerp(v, lerp(u, grad(p[AA], x, y, z), // AND ADD\n  grad(p[BA], x - 1, y, z)), // BLENDED\n  lerp(u, grad(p[AB], x, y - 1, z), // RESULTS\n  grad(p[BB], x - 1, y - 1, z))), // FROM  8\n  lerp(v, lerp(u, grad(p[AA + 1], x, y, z - 1), // CORNERS\n  grad(p[BA + 1], x - 1, y, z - 1)), // OF CUBE\n  lerp(u, grad(p[AB + 1], x, y - 1, z - 1), grad(p[BB + 1], x - 1, y - 1, z - 1)))));\n}\n\nfunction fade(t) {\n  return t * t * t * (t * (t * 6 - 15) + 10);\n}\n\nfunction lerp(t, a, b) {\n  return a + t * (b - a);\n}\n\nfunction grad(hash, x, y, z) {\n  var h = hash & 15; // CONVERT LO 4 BITS OF HASH CODE\n\n  var u = h < 8 ? x : y,\n      // INTO 12 GRADIENT DIRECTIONS.\n  v = h < 4 ? y : h == 12 || h == 14 ? x : z;\n  return ((h & 1) == 0 ? u : -u) + ((h & 2) == 0 ? v : -v);\n}\n\nfunction scale(n) {\n  return (1 + n) / 2;\n}\n\n//# sourceURL=webpack:///./assets/js/perlin.js?");

/***/ })

/******/ });