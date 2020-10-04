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
/*! no static exports found */
/***/ (function(module, exports) {

eval("const config = {\n  wavespeed: 1,\n  wavesToBlend: 4,\n  curvesNum: 40,\n  framesToMove: 120\n};\n\nclass waveNoice {\n  constructor() {\n    this.vaweSet = [];\n  }\n\n  addWaves(requiredWaves) {\n    for (let i = 0; i < requiredWaves; ++i) {\n      let randomAngle = Math.random() * 360;\n      this.vaweSet.push(randomAngle);\n    }\n  }\n\n  getWave() {\n    let blendedWave = 0;\n\n    for (let e of this.vaweSet) {\n      blendedWave += Math.sin(e / 180 * Math.PI);\n    }\n\n    return (blendedWave / this.vaweSet.length + 1) / 2;\n  }\n\n  update() {\n    this.vaweSet.forEach((e, i) => {\n      let r = Math.random() * (i + 1) * config.wavespeed;\n      this.vaweSet[i] = (e + r) % 360;\n    });\n  }\n\n}\n\nclass Animation {\n  constructor() {\n    this.canvas = null;\n    this.size = {\n      w: 0,\n      h: 0,\n      cx: 0,\n      cy: 0\n    };\n    this.controls = [];\n    this.controlsNum = 3;\n    this.frameCounter = 0;\n    this.type4Start = 0;\n    this.type4End = 0;\n  }\n\n  init() {\n    this.createCanvas();\n    this.createControls();\n    this.updateAnimation();\n  }\n\n  createCanvas() {\n    this.cnv = document.createElement(\"canvas\");\n    this.ctx = this.cnv.getContext('2d');\n    this.setCanvasSize();\n    let doc = document.querySelector('.main');\n    this.cnv.classList.add('template-canvas');\n    doc.appendChild(this.cnv);\n    window.addEventListener(`resize`, () => this.setCanvasSize());\n  }\n\n  createControls() {\n    for (let i = 0; i < this.controlsNum + config.curvesNum; i++) {\n      let control = new waveNoice();\n      control.addWaves(config.wavesToBlend);\n      this.controls.push(control);\n    }\n  }\n\n  setCanvasSize() {\n    this.size.w = this.cnv.width = window.innerWidth;\n    this.size.h = this.cnv.height = window.innerHeight;\n    this.size.cx = this.size.w / 2;\n    this.size.cy = this.size.h / 2;\n  }\n\n  updateCurves() {\n    let c = this.controls;\n\n    let _controlX1 = c[0].getWave() * this.size.w;\n\n    let _controlY1 = c[1].getWave() * this.size.h;\n\n    let _controlX2 = c[2].getWave() * this.size.w;\n\n    for (let i = 0; i < config.curvesNum; i++) {\n      let _controlY2 = c[3 + i].getWave();\n\n      let curveParam = {\n        startX: 0,\n        startY: this.getYPlacementTime(this.type4Start, i),\n        controlX1: _controlX1,\n        controlY1: _controlY1,\n        controlX2: _controlX2,\n        controlY2: _controlY2 * this.size.w,\n        endX: this.size.w,\n        endY: this.getYPlacementTime(this.type4End, i),\n        alpha: _controlY2\n      };\n      this.drawCurve(curveParam);\n    }\n  }\n\n  drawCurve({\n    startX,\n    startY,\n    controlX1,\n    controlY1,\n    controlX2,\n    controlY2,\n    endX,\n    endY,\n    alpha\n  }) {\n    this.ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;\n    this.ctx.beginPath();\n    this.ctx.moveTo(startX, startY);\n    this.ctx.bezierCurveTo(controlX1, controlY1, controlX2, controlY2, endX, endY);\n    this.ctx.stroke();\n  }\n\n  updateCanvas() {\n    // this.ctx.fillStyle = 'red';\n    this.ctx.fillRect(0, 0, this.size.w, this.size.h);\n  }\n\n  updateControls() {\n    this.controls.forEach(e => e.update());\n  }\n\n  updateFrameCounter() {\n    this.frameCounter = (this.frameCounter + 1) % config.framesToMove;\n\n    if (this.frameCounter === 0) {\n      this.type4Start = Math.random();\n      this.type4End = Math.random();\n    }\n  }\n\n  getYPlacementTime(type, i) {\n    if (type > .6) {\n      return this.size.h / config.curvesNum * i;\n    } else if (type > .4) {\n      return this.size.h;\n    } else if (type > .2) {\n      return this.size.cy;\n    } else {\n      return 0;\n    }\n  }\n\n  updateAnimation() {\n    this.updateFrameCounter();\n    this.updateCanvas();\n    this.updateCurves();\n    this.updateControls();\n    window.requestAnimationFrame(() => this.updateAnimation());\n  }\n\n}\n\nfunction draw() {}\n\nlet time = 0;\n\nfunction render() {\n  draw();\n  time++;\n  window.requestAnimationFrame(render);\n}\n\nrender();\n\nwindow.onload = () => {\n  new Animation().init();\n};\n\n//# sourceURL=webpack:///./assets/js/canvas.js?");

/***/ })

/******/ });