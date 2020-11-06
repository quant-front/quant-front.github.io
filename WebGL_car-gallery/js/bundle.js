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

eval("function main() {\n  let mainSection = document.querySelector('.button__panels');\n  setTimeout(function () {\n    mainSection.style.visibility = 'visible';\n  }, 300);\n}\n\nwindow.addEventListener(\"load\", main);\nconst scene = new THREE.Scene();\nconst camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);\nscene.background = new THREE.Color(0xa0a0a0); // scene.fog = new THREE.Fog( 0xa0a0a0, 10, 50 );\n\ncamera.position.set(7, 3, 7);\nlet renderer = new THREE.WebGLRenderer();\nrenderer.setSize(window.innerWidth, window.innerHeight);\nrenderer.setClearColor(0xFFFCFF);\nlet doc = document.querySelector('.main');\ndoc.appendChild(renderer.domElement).classList.add('canv-class');\nrenderer.toneMapping = THREE.ACESFilmicToneMapping;\nrenderer.outputEncoding = THREE.sRGBEncoding;\nrenderer.shadowMap.enabled = true;\nrenderer.shadowMap.type = THREE.PCFSoftShadowMap;\nconst pmremGenerator = new THREE.PMREMGenerator(renderer);\npmremGenerator.compileEquirectangularShader();\nwindow.addEventListener('resize', function () {\n  let width = window.innerWidth;\n  let height = window.innerHeight;\n  renderer.setSize(width, height);\n  camera.aspect = width / height;\n  camera.updateProjectionMatrix();\n});\ncontrols = new THREE.OrbitControls(camera, renderer.domElement);\ncontrols.minDistance = 15;\ncontrols.maxDistance = 20;\ncontrols.enableDamping = true;\ncontrols.dampingFactor = 0.5;\ncontrols.maxPolarAngle = Math.PI / 2.3; //низ\n\ncontrols.minPolarAngle = Math.PI / 3.1; //верх\n\ncontrols.rotateSpeed = 0.25;\ncontrols.panSpeed = 0.1;\nconst hlight = new THREE.AmbientLight(0x404040, 1);\nscene.add(hlight);\nconst directionalLight = new THREE.DirectionalLight(0xffffff, 1);\ndirectionalLight.castShadow = true;\ndirectionalLight.shadow.camera.top = 4;\ndirectionalLight.shadow.camera.bottom = -4;\ndirectionalLight.shadow.camera.left = -4;\ndirectionalLight.shadow.camera.right = 4;\ndirectionalLight.shadow.camera.near = 0.1;\ndirectionalLight.shadow.camera.far = 10;\ndirectionalLight.shadow.camera.far = 30;\ndirectionalLight.shadow.bias = -0.002;\ndirectionalLight.position.set(0, 20, 20);\nscene.add(directionalLight);\nconst group = new THREE.Object3D(); // Ground\n\nconst planeGeo = new THREE.PlaneGeometry(45, 45, 32);\nconst planeMat = new THREE.MeshPhongMaterial({\n  color: 0xa0adaf,\n  shininess: 150\n});\nconst ground = new THREE.Mesh(planeGeo, planeMat);\nground.rotation.x = Math.PI * -.5;\nground.receiveShadow = true;\nscene.add(ground);\nvar USE_WIREFRAME = false; // Stand\n\nconst standGeo = new THREE.CylinderGeometry(7, 7, 1.5, 40);\nconst standMat = new THREE.MeshPhongMaterial({\n  color: 0xffffff,\n  wireframe: USE_WIREFRAME,\n  depthWrite: false\n});\nconst stand = new THREE.Mesh(standGeo, standMat);\nstand.receiveShadow = true;\nscene.add(stand); // car\n\nnew THREE.RGBELoader().setDataType(THREE.UnsignedByteType).setPath('img/').load('pedestrian_overpass_1k.hdr', function (texture) {\n  const envMap = pmremGenerator.fromEquirectangular(texture).texture;\n  scene.environment = envMap;\n  texture.dispose();\n  pmremGenerator.dispose();\n});\nlet gallery = ['img/nissan/scene.gltf', 'img/nissan_gt-r/scene.gltf'];\nlet current = 0;\nlet btn2 = document.querySelector('.btn--right');\nbtn2.addEventListener('click', function () {\n  current++;\n  current = current % gallery.length;\n  console.log(gallery[current]);\n});\nvar loader = new THREE.GLTFLoader();\nloader.load(gallery[current], handle_load);\nlet car;\n\nfunction handle_load(gltf) {\n  car = gltf.scene;\n  car.material = new THREE.MeshPhongMaterial({\n    flatShading: false\n  });\n  car.position.y = 2.9;\n  car.position.z = 0.2;\n  car.scale.set(1.9, 1.9, 1.9);\n  car.castShadow = true;\n  car.receiveShadow = true;\n  car.traverse(function (child) {\n    if (child.isMesh) {\n      child.castShadow = true;\n      child.receiveShadow = true;\n    }\n  });\n  scene.add(car);\n  animate();\n}\n\ngroup.add(ground);\ngroup.add(car);\nscene.add(group);\nlet shouldRotate = false;\nlet shouldRotate1 = false;\nlet shouldRotate2 = false;\nlet groundRotate = false;\nlet btn = document.querySelector('.btn--left');\nlet btn1 = document.querySelector('.btn--right');\nlet btnR = document.querySelector('.btn--rightR');\nlet btnL = document.querySelector('.btn--leftR');\nlet btnArea = document.querySelector('.btn--area');\nlet btnGroundL = document.querySelector('.btn--ground-left');\nbtn.addEventListener('click', function (event) {\n  shouldRotate = true;\n  shouldRotate1 = false;\n});\nbtn1.addEventListener('click', function (event) {\n  shouldRotate1 = true;\n  shouldRotate = false;\n});\nlet ADD = 0;\nlet k = 0;\nbtnArea.addEventListener('click', function () {\n  k++;\n\n  if (k === 1) {\n    btnArea.style.pointerEvents = 'none';\n    btnArea.style.opacity = '0.5';\n    ADD = 0.005;\n    setTimeout(function () {\n      btnArea.style.pointerEvents = 'auto';\n      btnArea.style.opacity = '1';\n    }, 2500);\n  } else if (k === 2) {\n    btnArea.style.pointerEvents = 'none';\n    btnArea.style.opacity = '0.5';\n    setTimeout(function () {\n      btnArea.style.pointerEvents = 'auto';\n      btnArea.style.opacity = '1';\n    }, 2500);\n    ADD = -0.005;\n    k = 0;\n  }\n});\nlet canvt = document.querySelector('.canv-class');\ncanvt.addEventListener('mousedown', function () {\n  shouldRotate1 = false;\n  shouldRotate = false;\n  shouldRotate2 = false;\n  groundRotate = false;\n});\nbtnL.addEventListener('mousedown', function () {\n  shouldRotate = true;\n  shouldRotate1 = false;\n});\nbtnL.addEventListener('mouseup', function () {\n  shouldRotate = false;\n  shouldRotate1 = false;\n});\nbtnR.addEventListener('mousedown', function () {\n  shouldRotate1 = true;\n  shouldRotate = false;\n});\nbtnR.addEventListener('mouseup', function () {\n  shouldRotate1 = false;\n  shouldRotate = false;\n});\nbtnGroundL.addEventListener('mouseup', function () {\n  groundRotate = true;\n});\ncamera.position.set(17, 0, 20);\nconst stats = new Stats();\nstats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom\n\ndocument.body.appendChild(stats.dom);\nlet angle = 0;\n\nconst animate = function () {\n  requestAnimationFrame(animate);\n  stats.begin();\n  stats.end();\n  group.position.y += ADD;\n\n  if (group.position.y > 0.77) {\n    ADD = 0;\n  }\n\n  if (group.position.y < 0) {\n    ADD = 0;\n  }\n\n  if (groundRotate) {\n    car.rotation.y += 0.01;\n  }\n\n  renderer.clear();\n\n  if (shouldRotate) {\n    angle -= Math.PI / 180 * 2;\n    camera.position.x += 3 * Math.sin(angle / 6);\n    camera.position.z += 3 * Math.cos(angle / 6);\n  }\n\n  if (shouldRotate1) {\n    angle += Math.PI / 180 * 2;\n    camera.position.x += 3 * Math.sin(angle / 6);\n    camera.position.z += 3 * Math.cos(angle / 6);\n  }\n\n  if (shouldRotate2) {\n    angle += Math.PI / 180 * 2;\n    camera.position.x += 3 * Math.sin(angle / 6);\n    camera.position.z += 3 * Math.cos(angle / 6);\n  }\n\n  controls.update();\n  camera.updateProjectionMatrix();\n  renderer.render(scene, camera);\n};\n\n//# sourceURL=webpack:///./assets/js/plugins.js?");

/***/ })

/******/ });