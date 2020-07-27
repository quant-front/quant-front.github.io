(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var  glsl = require('glslify');
const  canvasSketch = require('canvas-sketch');
const  shader = require('canvas-sketch-util/shader');


const  settings = {
     context: 'webgl',
     animate: true,
}


const  frag = glsl(["\nprecision highp float;\n#define GLSLIFY 1\n\nuniform float time;\nuniform float aspect;\nvarying vec2 vUv;\n\n//\n// Description : Array and textureless GLSL 2D/3D/4D simplex\n//               noise functions.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289(vec4 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute(vec4 x) {\n     return mod289(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nfloat snoise(vec3 v)\n  {\n  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);\n\n// First corner\n  vec3 i  = floor(v + dot(v, C.yyy) );\n  vec3 x0 =   v - i + dot(i, C.xxx) ;\n\n// Other corners\n  vec3 g = step(x0.yzx, x0.xyz);\n  vec3 l = 1.0 - g;\n  vec3 i1 = min( g.xyz, l.zxy );\n  vec3 i2 = max( g.xyz, l.zxy );\n\n  //   x0 = x0 - 0.0 + 0.0 * C.xxx;\n  //   x1 = x0 - i1  + 1.0 * C.xxx;\n  //   x2 = x0 - i2  + 2.0 * C.xxx;\n  //   x3 = x0 - 1.0 + 3.0 * C.xxx;\n  vec3 x1 = x0 - i1 + C.xxx;\n  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y\n  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y\n\n// Permutations\n  i = mod289(i);\n  vec4 p = permute( permute( permute(\n             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\n           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))\n           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n\n// Gradients: 7x7 points over a square, mapped onto an octahedron.\n// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)\n  float n_ = 0.142857142857; // 1.0/7.0\n  vec3  ns = n_ * D.wyz - D.xzx;\n\n  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)\n\n  vec4 x_ = floor(j * ns.z);\n  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\n\n  vec4 x = x_ *ns.x + ns.yyyy;\n  vec4 y = y_ *ns.x + ns.yyyy;\n  vec4 h = 1.0 - abs(x) - abs(y);\n\n  vec4 b0 = vec4( x.xy, y.xy );\n  vec4 b1 = vec4( x.zw, y.zw );\n\n  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;\n  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;\n  vec4 s0 = floor(b0)*2.0 + 1.0;\n  vec4 s1 = floor(b1)*2.0 + 1.0;\n  vec4 sh = -step(h, vec4(0.0));\n\n  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;\n\n  vec3 p0 = vec3(a0.xy,h.x);\n  vec3 p1 = vec3(a0.zw,h.y);\n  vec3 p2 = vec3(a1.xy,h.z);\n  vec3 p3 = vec3(a1.zw,h.w);\n\n//Normalise gradients\n  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n  p0 *= norm.x;\n  p1 *= norm.y;\n  p2 *= norm.z;\n  p3 *= norm.w;\n\n// Mix final noise value\n  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n  m = m * m;\n  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),\n                                dot(p2,x2), dot(p3,x3) ) );\n  }\n\nvoid main () {\n  // vec3 colorA = vec3(1.0,0.0,0.0);\n  // vec3 colorB = vec3(0.0,0.5,0.0);\n  // vec3 color = mix(colorA,colorB,vUv.x);\n  // gl_FragColor = vec4(color, 1.0);\n\n  float n = snoise(vec3(vUv.xy, time));\n\n  gl_FragColor = vec4(vec3(n),1.0);\n}\n"]);




const  sketch = ({ gl}) => {
     return shader({
          gl,
          frag,
          uniforms:{
               time:({time}) => time
          }
     })
}

canvasSketch(sketch,settings)

},{"canvas-sketch":3,"canvas-sketch-util/shader":2,"glslify":7}],2:[function(require,module,exports){
var createRegl = require('regl');
var createQuad = require('primitive-quad');
var parseColor = require('parse-color');
var defined = require('defined');

module.exports = createShader;

function createShader (opt) {
  opt = opt || {};
  if (!opt.gl) {
    throw new Error('Must specify { context: "webgl" } in sketch settings, or a WebGL-enabled canvas');
  }

  var gl = opt.gl;
  var reglOpts = { gl: gl };

  // regl is strict on what options you pass in
  if (typeof opt.extensions !== 'undefined') reglOpts.extensions = opt.extensions;
  if (typeof opt.optionalExtensions !== 'undefined') reglOpts.optionalExtensions = opt.optionalExtensions;
  if (typeof opt.profile !== 'undefined') reglOpts.profile = opt.profile;
  if (typeof opt.onDone !== 'undefined') reglOpts.onDone = opt.onDone;

  // Create regl for handling GL stuff
  var regl = createRegl(reglOpts);

  // A mesh for a flat plane
  var quad = createQuad();

  var textureMap = new Map();

  // Wire up user uniforms nicely
  var uniformsMap = opt.uniforms || {};
  var uniforms = Object.assign({}, uniformsMap);
  Object.keys(uniformsMap).forEach(function (key) {
    var value = uniformsMap[key];
    if (typeof value === 'function') {
      uniforms[key] = function (state, props, batchID) {
        var result = value.call(uniformsMap, props, batchID);
        // If user is using a function to wrap an image,
        // then we need to make sure we re-upload to same GL texture
        if (isTextureLike(result)) {
          if (textureMap.has(value)) {
            // Texture is already created, re-upload
            var prevTex = textureMap.get(value);
            prevTex(result);

            // Return the texture
            result = prevTex;
          } else {
            // Creating the texture for the first time
            var texture = regl.texture(result);
            textureMap.set(value, texture);

            // Return the texture, not the image
            result = texture;
          }
        }
        return result;
      };
    } else if (isTextureLike(value)) {
      uniforms[key] = regl.texture(value);
    } else {
      uniforms[key] = value;
    }
  });

  // Get the drawing command
  var drawQuadCommand;
  try {
    drawQuadCommand = createDrawQuad();
  } catch (err) {
    handleError(err);
  }

  // Nicely get a clear color for the canvas
  var clearColor = defined(opt.clearColor, 'black');
  if (typeof clearColor === 'string') {
    var parsed = parseColor(clearColor);
    if (!parsed.rgb) {
      throw new Error('Error parsing { clearColor } color string "' + clearColor + '"');
    }
    clearColor = parsed.rgb.slice(0, 3).map(function (n) {
      return n / 255;
    });
  } else if (clearColor && (!Array.isArray(clearColor) || clearColor.length < 3)) {
    throw new Error('Error with { clearColor } option, must be a string or [ r, g, b ] float array');
  }

  var clearAlpha = defined(opt.clearAlpha, 1);
  var clear = clearColor ? clearColor.concat([ clearAlpha || 0 ]) : false;

  // Return a renderer object
  return {
    render: function (props) {
      // On each tick, update regl timers and sizes
      regl.poll();

      // Clear backbuffer with color
      if (clear) {
        regl.clear({
          color: clear,
          depth: 1,
          stencil: 0
        });
      }

      // Submit draw command
      drawQuad(props);

      // Flush pending GL calls for this frame
      gl.flush();
    },
    regl: regl,
    drawQuad: drawQuad,
    unload: function () {
      // Remove GL texture mappings
      textureMap.clear();
      // Unload the current regl instance
      // TODO: We should probably also destroy textures created from this module!
      regl.destroy();
    }
  };

  // A user-friendly draw command that spits out errors
  function drawQuad (props) {
    props = props || {};
    // Draw generative / shader art
    if (drawQuadCommand) {
      try {
        drawQuadCommand(props);
      } catch (err) {
        if (handleError(err)) {
          if (props == null) {
            console.warn('Warning: shader.render() is not called with any "props" parameter');
          }
        }
      }
    }
  }

  // Draw command
  function createDrawQuad () {
    return regl({
      scissor: opt.scissor ? {
        enable: true,
        box: {
          x: regl.prop('scissorX'),
          y: regl.prop('scissorY'),
          width: regl.prop('scissorWidth'),
          height: regl.prop('scissorHeight')
        }
      } : false,
      // Pass down props from javascript
      uniforms: uniforms,
      // Fall back to a simple fragment shader
      frag: opt.frag || [
        'precision highp float;',
        '',
        'void main () {',
        '  gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);',
        '}'
      ].join('\n'),
      // Fall back to a simple vertex shader
      vert: opt.vert || [
        'precision highp float;',
        'attribute vec3 position;',
        'varying vec2 vUv;',
        '',
        'void main () {',
        '  gl_Position = vec4(position.xyz, 1.0);',
        '  vUv = gl_Position.xy * 0.5 + 0.5;',
        '}'
      ].join('\n'),
      // Setup transparency blending
      blend: opt.blend !== false ? {
        enable: true,
        func: {
          srcRGB: 'src alpha',
          srcAlpha: 1,
          dstRGB: 'one minus src alpha',
          dstAlpha: 1
        }
      } : undefined,
      // Send mesh vertex attributes to shader
      attributes: {
        position: quad.positions
      },
      // The indices for the quad mesh
      elements: quad.cells
    });
  }

  function handleError (err) {
    if (/^\(regl\)/.test(err.message)) {
      // Regl already logs a message to the console :\
      // so let's just avoid re-printing the same thing
      return true;
    } else {
      throw err;
    }
  }
}

function isTextureLike (data) {
  return data && !Array.isArray(data) && typeof data === 'object';
}

},{"defined":6,"parse-color":8,"primitive-quad":9,"regl":10}],3:[function(require,module,exports){
(function (global){
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.canvasSketch = factory());
}(this, (function () {

	/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/
	/* eslint-disable no-unused-vars */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (err) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var browser =
	  commonjsGlobal.performance &&
	  commonjsGlobal.performance.now ? function now() {
	    return performance.now()
	  } : Date.now || function now() {
	    return +new Date
	  };

	var isPromise_1 = isPromise;

	function isPromise(obj) {
	  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
	}

	var isDom = isNode;

	function isNode (val) {
	  return (!val || typeof val !== 'object')
	    ? false
	    : (typeof window === 'object' && typeof window.Node === 'object')
	      ? (val instanceof window.Node)
	      : (typeof val.nodeType === 'number') &&
	        (typeof val.nodeName === 'string')
	}

	function getClientAPI() {
	    return typeof window !== 'undefined' && window['canvas-sketch-cli'];
	}

	function defined() {
	    var arguments$1 = arguments;

	    for (var i = 0;i < arguments.length; i++) {
	        if (arguments$1[i] != null) {
	            return arguments$1[i];
	        }
	    }
	    return undefined;
	}

	function isBrowser() {
	    return typeof document !== 'undefined';
	}

	function isWebGLContext(ctx) {
	    return typeof ctx.clear === 'function' && typeof ctx.clearColor === 'function' && typeof ctx.bufferData === 'function';
	}

	function isCanvas(element) {
	    return isDom(element) && /canvas/i.test(element.nodeName) && typeof element.getContext === 'function';
	}

	var keys = createCommonjsModule(function (module, exports) {
	exports = module.exports = typeof Object.keys === 'function'
	  ? Object.keys : shim;

	exports.shim = shim;
	function shim (obj) {
	  var keys = [];
	  for (var key in obj) keys.push(key);
	  return keys;
	}
	});
	var keys_1 = keys.shim;

	var is_arguments = createCommonjsModule(function (module, exports) {
	var supportsArgumentsClass = (function(){
	  return Object.prototype.toString.call(arguments)
	})() == '[object Arguments]';

	exports = module.exports = supportsArgumentsClass ? supported : unsupported;

	exports.supported = supported;
	function supported(object) {
	  return Object.prototype.toString.call(object) == '[object Arguments]';
	}
	exports.unsupported = unsupported;
	function unsupported(object){
	  return object &&
	    typeof object == 'object' &&
	    typeof object.length == 'number' &&
	    Object.prototype.hasOwnProperty.call(object, 'callee') &&
	    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
	    false;
	}});
	var is_arguments_1 = is_arguments.supported;
	var is_arguments_2 = is_arguments.unsupported;

	var deepEqual_1 = createCommonjsModule(function (module) {
	var pSlice = Array.prototype.slice;



	var deepEqual = module.exports = function (actual, expected, opts) {
	  if (!opts) opts = {};
	  // 7.1. All identical values are equivalent, as determined by ===.
	  if (actual === expected) {
	    return true;

	  } else if (actual instanceof Date && expected instanceof Date) {
	    return actual.getTime() === expected.getTime();

	  // 7.3. Other pairs that do not both pass typeof value == 'object',
	  // equivalence is determined by ==.
	  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
	    return opts.strict ? actual === expected : actual == expected;

	  // 7.4. For all other Object pairs, including Array objects, equivalence is
	  // determined by having the same number of owned properties (as verified
	  // with Object.prototype.hasOwnProperty.call), the same set of keys
	  // (although not necessarily the same order), equivalent values for every
	  // corresponding key, and an identical 'prototype' property. Note: this
	  // accounts for both named and indexed properties on Arrays.
	  } else {
	    return objEquiv(actual, expected, opts);
	  }
	};

	function isUndefinedOrNull(value) {
	  return value === null || value === undefined;
	}

	function isBuffer (x) {
	  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
	  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
	    return false;
	  }
	  if (x.length > 0 && typeof x[0] !== 'number') return false;
	  return true;
	}

	function objEquiv(a, b, opts) {
	  var i, key;
	  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
	    return false;
	  // an identical 'prototype' property.
	  if (a.prototype !== b.prototype) return false;
	  //~~~I've managed to break Object.keys through screwy arguments passing.
	  //   Converting to array solves the problem.
	  if (is_arguments(a)) {
	    if (!is_arguments(b)) {
	      return false;
	    }
	    a = pSlice.call(a);
	    b = pSlice.call(b);
	    return deepEqual(a, b, opts);
	  }
	  if (isBuffer(a)) {
	    if (!isBuffer(b)) {
	      return false;
	    }
	    if (a.length !== b.length) return false;
	    for (i = 0; i < a.length; i++) {
	      if (a[i] !== b[i]) return false;
	    }
	    return true;
	  }
	  try {
	    var ka = keys(a),
	        kb = keys(b);
	  } catch (e) {//happens when one is a string literal and the other isn't
	    return false;
	  }
	  // having the same number of owned properties (keys incorporates
	  // hasOwnProperty)
	  if (ka.length != kb.length)
	    return false;
	  //the same set of keys (although not necessarily the same order),
	  ka.sort();
	  kb.sort();
	  //~~~cheap key test
	  for (i = ka.length - 1; i >= 0; i--) {
	    if (ka[i] != kb[i])
	      return false;
	  }
	  //equivalent values for every corresponding key, and
	  //~~~possibly expensive deep test
	  for (i = ka.length - 1; i >= 0; i--) {
	    key = ka[i];
	    if (!deepEqual(a[key], b[key], opts)) return false;
	  }
	  return typeof a === typeof b;
	}
	});

	var dateformat = createCommonjsModule(function (module, exports) {
	/*
	 * Date Format 1.2.3
	 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
	 * MIT license
	 *
	 * Includes enhancements by Scott Trenda <scott.trenda.net>
	 * and Kris Kowal <cixar.com/~kris.kowal/>
	 *
	 * Accepts a date, a mask, or a date and a mask.
	 * Returns a formatted version of the given date.
	 * The date defaults to the current date/time.
	 * The mask defaults to dateFormat.masks.default.
	 */

	(function(global) {

	  var dateFormat = (function() {
	      var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZWN]|"[^"]*"|'[^']*'/g;
	      var timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g;
	      var timezoneClip = /[^-+\dA-Z]/g;
	  
	      // Regexes and supporting functions are cached through closure
	      return function (date, mask, utc, gmt) {
	  
	        // You can't provide utc if you skip other args (use the 'UTC:' mask prefix)
	        if (arguments.length === 1 && kindOf(date) === 'string' && !/\d/.test(date)) {
	          mask = date;
	          date = undefined;
	        }
	  
	        date = date || new Date;
	  
	        if(!(date instanceof Date)) {
	          date = new Date(date);
	        }
	  
	        if (isNaN(date)) {
	          throw TypeError('Invalid date');
	        }
	  
	        mask = String(dateFormat.masks[mask] || mask || dateFormat.masks['default']);
	  
	        // Allow setting the utc/gmt argument via the mask
	        var maskSlice = mask.slice(0, 4);
	        if (maskSlice === 'UTC:' || maskSlice === 'GMT:') {
	          mask = mask.slice(4);
	          utc = true;
	          if (maskSlice === 'GMT:') {
	            gmt = true;
	          }
	        }
	  
	        var _ = utc ? 'getUTC' : 'get';
	        var d = date[_ + 'Date']();
	        var D = date[_ + 'Day']();
	        var m = date[_ + 'Month']();
	        var y = date[_ + 'FullYear']();
	        var H = date[_ + 'Hours']();
	        var M = date[_ + 'Minutes']();
	        var s = date[_ + 'Seconds']();
	        var L = date[_ + 'Milliseconds']();
	        var o = utc ? 0 : date.getTimezoneOffset();
	        var W = getWeek(date);
	        var N = getDayOfWeek(date);
	        var flags = {
	          d:    d,
	          dd:   pad(d),
	          ddd:  dateFormat.i18n.dayNames[D],
	          dddd: dateFormat.i18n.dayNames[D + 7],
	          m:    m + 1,
	          mm:   pad(m + 1),
	          mmm:  dateFormat.i18n.monthNames[m],
	          mmmm: dateFormat.i18n.monthNames[m + 12],
	          yy:   String(y).slice(2),
	          yyyy: y,
	          h:    H % 12 || 12,
	          hh:   pad(H % 12 || 12),
	          H:    H,
	          HH:   pad(H),
	          M:    M,
	          MM:   pad(M),
	          s:    s,
	          ss:   pad(s),
	          l:    pad(L, 3),
	          L:    pad(Math.round(L / 10)),
	          t:    H < 12 ? dateFormat.i18n.timeNames[0] : dateFormat.i18n.timeNames[1],
	          tt:   H < 12 ? dateFormat.i18n.timeNames[2] : dateFormat.i18n.timeNames[3],
	          T:    H < 12 ? dateFormat.i18n.timeNames[4] : dateFormat.i18n.timeNames[5],
	          TT:   H < 12 ? dateFormat.i18n.timeNames[6] : dateFormat.i18n.timeNames[7],
	          Z:    gmt ? 'GMT' : utc ? 'UTC' : (String(date).match(timezone) || ['']).pop().replace(timezoneClip, ''),
	          o:    (o > 0 ? '-' : '+') + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
	          S:    ['th', 'st', 'nd', 'rd'][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10],
	          W:    W,
	          N:    N
	        };
	  
	        return mask.replace(token, function (match) {
	          if (match in flags) {
	            return flags[match];
	          }
	          return match.slice(1, match.length - 1);
	        });
	      };
	    })();

	  dateFormat.masks = {
	    'default':               'ddd mmm dd yyyy HH:MM:ss',
	    'shortDate':             'm/d/yy',
	    'mediumDate':            'mmm d, yyyy',
	    'longDate':              'mmmm d, yyyy',
	    'fullDate':              'dddd, mmmm d, yyyy',
	    'shortTime':             'h:MM TT',
	    'mediumTime':            'h:MM:ss TT',
	    'longTime':              'h:MM:ss TT Z',
	    'isoDate':               'yyyy-mm-dd',
	    'isoTime':               'HH:MM:ss',
	    'isoDateTime':           'yyyy-mm-dd\'T\'HH:MM:sso',
	    'isoUtcDateTime':        'UTC:yyyy-mm-dd\'T\'HH:MM:ss\'Z\'',
	    'expiresHeaderFormat':   'ddd, dd mmm yyyy HH:MM:ss Z'
	  };

	  // Internationalization strings
	  dateFormat.i18n = {
	    dayNames: [
	      'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',
	      'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
	    ],
	    monthNames: [
	      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
	      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
	    ],
	    timeNames: [
	      'a', 'p', 'am', 'pm', 'A', 'P', 'AM', 'PM'
	    ]
	  };

	function pad(val, len) {
	  val = String(val);
	  len = len || 2;
	  while (val.length < len) {
	    val = '0' + val;
	  }
	  return val;
	}

	/**
	 * Get the ISO 8601 week number
	 * Based on comments from
	 * http://techblog.procurios.nl/k/n618/news/view/33796/14863/Calculate-ISO-8601-week-and-year-in-javascript.html
	 *
	 * @param  {Object} `date`
	 * @return {Number}
	 */
	function getWeek(date) {
	  // Remove time components of date
	  var targetThursday = new Date(date.getFullYear(), date.getMonth(), date.getDate());

	  // Change date to Thursday same week
	  targetThursday.setDate(targetThursday.getDate() - ((targetThursday.getDay() + 6) % 7) + 3);

	  // Take January 4th as it is always in week 1 (see ISO 8601)
	  var firstThursday = new Date(targetThursday.getFullYear(), 0, 4);

	  // Change date to Thursday same week
	  firstThursday.setDate(firstThursday.getDate() - ((firstThursday.getDay() + 6) % 7) + 3);

	  // Check if daylight-saving-time-switch occurred and correct for it
	  var ds = targetThursday.getTimezoneOffset() - firstThursday.getTimezoneOffset();
	  targetThursday.setHours(targetThursday.getHours() - ds);

	  // Number of weeks between target Thursday and first Thursday
	  var weekDiff = (targetThursday - firstThursday) / (86400000*7);
	  return 1 + Math.floor(weekDiff);
	}

	/**
	 * Get ISO-8601 numeric representation of the day of the week
	 * 1 (for Monday) through 7 (for Sunday)
	 * 
	 * @param  {Object} `date`
	 * @return {Number}
	 */
	function getDayOfWeek(date) {
	  var dow = date.getDay();
	  if(dow === 0) {
	    dow = 7;
	  }
	  return dow;
	}

	/**
	 * kind-of shortcut
	 * @param  {*} val
	 * @return {String}
	 */
	function kindOf(val) {
	  if (val === null) {
	    return 'null';
	  }

	  if (val === undefined) {
	    return 'undefined';
	  }

	  if (typeof val !== 'object') {
	    return typeof val;
	  }

	  if (Array.isArray(val)) {
	    return 'array';
	  }

	  return {}.toString.call(val)
	    .slice(8, -1).toLowerCase();
	}


	  if (typeof undefined === 'function' && undefined.amd) {
	    undefined(function () {
	      return dateFormat;
	    });
	  } else {
	    module.exports = dateFormat;
	  }
	})(commonjsGlobal);
	});

	/*!
	 * repeat-string <https://github.com/jonschlinkert/repeat-string>
	 *
	 * Copyright (c) 2014-2015, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */

	/**
	 * Results cache
	 */

	var res = '';
	var cache;

	/**
	 * Expose `repeat`
	 */

	var repeatString = repeat;

	/**
	 * Repeat the given `string` the specified `number`
	 * of times.
	 *
	 * **Example:**
	 *
	 * ```js
	 * var repeat = require('repeat-string');
	 * repeat('A', 5);
	 * //=> AAAAA
	 * ```
	 *
	 * @param {String} `string` The string to repeat
	 * @param {Number} `number` The number of times to repeat the string
	 * @return {String} Repeated string
	 * @api public
	 */

	function repeat(str, num) {
	  if (typeof str !== 'string') {
	    throw new TypeError('expected a string');
	  }

	  // cover common, quick use cases
	  if (num === 1) return str;
	  if (num === 2) return str + str;

	  var max = str.length * num;
	  if (cache !== str || typeof cache === 'undefined') {
	    cache = str;
	    res = '';
	  } else if (res.length >= max) {
	    return res.substr(0, max);
	  }

	  while (max > res.length && num > 1) {
	    if (num & 1) {
	      res += str;
	    }

	    num >>= 1;
	    str += str;
	  }

	  res += str;
	  res = res.substr(0, max);
	  return res;
	}

	var padLeft = function padLeft(str, num, ch) {
	  str = str.toString();

	  if (typeof num === 'undefined') {
	    return str;
	  }

	  if (ch === 0) {
	    ch = '0';
	  } else if (ch) {
	    ch = ch.toString();
	  } else {
	    ch = ' ';
	  }

	  return repeatString(ch, num - str.length) + str;
	};

	var noop = function () {};
	var link;
	var defaultExts = {
	    extension: '',
	    prefix: '',
	    suffix: ''
	};
	var supportedEncodings = ['image/png','image/jpeg','image/webp'];
	function stream(isStart, opts) {
	    if ( opts === void 0 ) opts = {};

	    return new Promise(function (resolve, reject) {
	        opts = objectAssign({}, defaultExts, opts);
	        var filename = resolveFilename(Object.assign({}, opts, {
	            extension: '',
	            frame: undefined
	        }));
	        var func = isStart ? 'streamStart' : 'streamEnd';
	        var client = getClientAPI();
	        if (client && client.output && typeof client[func] === 'function') {
	            return client[func](objectAssign({}, opts, {
	                filename: filename
	            })).then(function (ev) { return resolve(ev); });
	        } else {
	            return resolve({
	                filename: filename,
	                client: false
	            });
	        }
	    });
	}

	function streamStart(opts) {
	    if ( opts === void 0 ) opts = {};

	    return stream(true, opts);
	}

	function streamEnd(opts) {
	    if ( opts === void 0 ) opts = {};

	    return stream(false, opts);
	}

	function exportCanvas(canvas, opt) {
	    if ( opt === void 0 ) opt = {};

	    var encoding = opt.encoding || 'image/png';
	    if (!supportedEncodings.includes(encoding)) 
	        { throw new Error(("Invalid canvas encoding " + encoding)); }
	    var extension = (encoding.split('/')[1] || '').replace(/jpeg/i, 'jpg');
	    if (extension) 
	        { extension = ("." + extension).toLowerCase(); }
	    return {
	        extension: extension,
	        type: encoding,
	        dataURL: canvas.toDataURL(encoding, opt.encodingQuality)
	    };
	}

	function createBlobFromDataURL(dataURL) {
	    return new Promise(function (resolve) {
	        var splitIndex = dataURL.indexOf(',');
	        if (splitIndex === -1) {
	            resolve(new window.Blob());
	            return;
	        }
	        var base64 = dataURL.slice(splitIndex + 1);
	        var byteString = window.atob(base64);
	        var type = dataURL.slice(0, splitIndex);
	        var mimeMatch = /data:([^;]+)/.exec(type);
	        var mime = (mimeMatch ? mimeMatch[1] : '') || undefined;
	        var ab = new ArrayBuffer(byteString.length);
	        var ia = new Uint8Array(ab);
	        for (var i = 0;i < byteString.length; i++) {
	            ia[i] = byteString.charCodeAt(i);
	        }
	        resolve(new window.Blob([ab], {
	            type: mime
	        }));
	    });
	}

	function saveDataURL(dataURL, opts) {
	    if ( opts === void 0 ) opts = {};

	    return createBlobFromDataURL(dataURL).then(function (blob) { return saveBlob(blob, opts); });
	}

	function saveBlob(blob, opts) {
	    if ( opts === void 0 ) opts = {};

	    return new Promise(function (resolve) {
	        opts = objectAssign({}, defaultExts, opts);
	        var filename = opts.filename;
	        var client = getClientAPI();
	        if (client && typeof client.saveBlob === 'function' && client.output) {
	            return client.saveBlob(blob, objectAssign({}, opts, {
	                filename: filename
	            })).then(function (ev) { return resolve(ev); });
	        } else {
	            if (!link) {
	                link = document.createElement('a');
	                link.style.visibility = 'hidden';
	                link.target = '_blank';
	            }
	            link.download = filename;
	            link.href = window.URL.createObjectURL(blob);
	            document.body.appendChild(link);
	            link.onclick = (function () {
	                link.onclick = noop;
	                setTimeout(function () {
	                    window.URL.revokeObjectURL(blob);
	                    if (link.parentElement) 
	                        { link.parentElement.removeChild(link); }
	                    link.removeAttribute('href');
	                    resolve({
	                        filename: filename,
	                        client: false
	                    });
	                });
	            });
	            link.click();
	        }
	    });
	}

	function saveFile(data, opts) {
	    if ( opts === void 0 ) opts = {};

	    var parts = Array.isArray(data) ? data : [data];
	    var blob = new window.Blob(parts, {
	        type: opts.type || ''
	    });
	    return saveBlob(blob, opts);
	}

	function getTimeStamp() {
	    var dateFormatStr = "yyyy.mm.dd-HH.MM.ss";
	    return dateformat(new Date(), dateFormatStr);
	}

	function resolveFilename(opt) {
	    if ( opt === void 0 ) opt = {};

	    opt = objectAssign({}, opt);
	    if (typeof opt.file === 'function') {
	        return opt.file(opt);
	    } else if (opt.file) {
	        return opt.file;
	    }
	    var frame = null;
	    var extension = '';
	    if (typeof opt.extension === 'string') 
	        { extension = opt.extension; }
	    if (typeof opt.frame === 'number') {
	        var totalFrames;
	        if (typeof opt.totalFrames === 'number') {
	            totalFrames = opt.totalFrames;
	        } else {
	            totalFrames = Math.max(1000, opt.frame);
	        }
	        frame = padLeft(String(opt.frame), String(totalFrames).length, '0');
	    }
	    var layerStr = isFinite(opt.totalLayers) && isFinite(opt.layer) && opt.totalLayers > 1 ? ("" + (opt.layer)) : '';
	    if (frame != null) {
	        return [layerStr,frame].filter(Boolean).join('-') + extension;
	    } else {
	        var defaultFileName = opt.timeStamp;
	        return [opt.prefix,opt.name || defaultFileName,layerStr,opt.hash,opt.suffix].filter(Boolean).join('-') + extension;
	    }
	}

	var commonTypos = {
	    dimension: 'dimensions',
	    animated: 'animate',
	    animating: 'animate',
	    unit: 'units',
	    P5: 'p5',
	    pixellated: 'pixelated',
	    looping: 'loop',
	    pixelPerInch: 'pixels'
	};
	var allKeys = ['dimensions','units','pixelsPerInch','orientation','scaleToFit',
	    'scaleToView','bleed','pixelRatio','exportPixelRatio','maxPixelRatio','scaleContext',
	    'resizeCanvas','styleCanvas','canvas','context','attributes','parent','file',
	    'name','prefix','suffix','animate','playing','loop','duration','totalFrames',
	    'fps','playbackRate','timeScale','frame','time','flush','pixelated','hotkeys',
	    'p5','id','scaleToFitPadding','data','params','encoding','encodingQuality'];
	var checkSettings = function (settings) {
	    var keys = Object.keys(settings);
	    keys.forEach(function (key) {
	        if (key in commonTypos) {
	            var actual = commonTypos[key];
	            console.warn(("[canvas-sketch] Could not recognize the setting \"" + key + "\", did you mean \"" + actual + "\"?"));
	        } else if (!allKeys.includes(key)) {
	            console.warn(("[canvas-sketch] Could not recognize the setting \"" + key + "\""));
	        }
	    });
	};

	function keyboardShortcuts (opt) {
	    if ( opt === void 0 ) opt = {};

	    var handler = function (ev) {
	        if (!opt.enabled()) 
	            { return; }
	        var client = getClientAPI();
	        if (ev.keyCode === 83 && !ev.altKey && (ev.metaKey || ev.ctrlKey)) {
	            ev.preventDefault();
	            opt.save(ev);
	        } else if (ev.keyCode === 32) {
	            opt.togglePlay(ev);
	        } else if (client && !ev.altKey && ev.keyCode === 75 && (ev.metaKey || ev.ctrlKey)) {
	            ev.preventDefault();
	            opt.commit(ev);
	        }
	    };
	    var attach = function () {
	        window.addEventListener('keydown', handler);
	    };
	    var detach = function () {
	        window.removeEventListener('keydown', handler);
	    };
	    return {
	        attach: attach,
	        detach: detach
	    };
	}

	var defaultUnits = 'mm';
	var data = [['postcard',101.6,152.4],['poster-small',280,430],['poster',460,610],
	    ['poster-large',610,910],['business-card',50.8,88.9],['2r',64,89],['3r',89,127],
	    ['4r',102,152],['5r',127,178],['6r',152,203],['8r',203,254],['10r',254,305],['11r',
	    279,356],['12r',305,381],['a0',841,1189],['a1',594,841],['a2',420,594],['a3',
	    297,420],['a4',210,297],['a5',148,210],['a6',105,148],['a7',74,105],['a8',52,
	    74],['a9',37,52],['a10',26,37],['2a0',1189,1682],['4a0',1682,2378],['b0',1000,
	    1414],['b1',707,1000],['b1+',720,1020],['b2',500,707],['b2+',520,720],['b3',353,
	    500],['b4',250,353],['b5',176,250],['b6',125,176],['b7',88,125],['b8',62,88],
	    ['b9',44,62],['b10',31,44],['b11',22,32],['b12',16,22],['c0',917,1297],['c1',
	    648,917],['c2',458,648],['c3',324,458],['c4',229,324],['c5',162,229],['c6',114,
	    162],['c7',81,114],['c8',57,81],['c9',40,57],['c10',28,40],['c11',22,32],['c12',
	    16,22],['half-letter',5.5,8.5,'in'],['letter',8.5,11,'in'],['legal',8.5,14,'in'],
	    ['junior-legal',5,8,'in'],['ledger',11,17,'in'],['tabloid',11,17,'in'],['ansi-a',
	    8.5,11.0,'in'],['ansi-b',11.0,17.0,'in'],['ansi-c',17.0,22.0,'in'],['ansi-d',
	    22.0,34.0,'in'],['ansi-e',34.0,44.0,'in'],['arch-a',9,12,'in'],['arch-b',12,18,
	    'in'],['arch-c',18,24,'in'],['arch-d',24,36,'in'],['arch-e',36,48,'in'],['arch-e1',
	    30,42,'in'],['arch-e2',26,38,'in'],['arch-e3',27,39,'in']];
	var paperSizes = data.reduce(function (dict, preset) {
	    var item = {
	        units: preset[3] || defaultUnits,
	        dimensions: [preset[1],preset[2]]
	    };
	    dict[preset[0]] = item;
	    dict[preset[0].replace(/-/g, ' ')] = item;
	    return dict;
	}, {})

	var defined$1 = function () {
	    for (var i = 0; i < arguments.length; i++) {
	        if (arguments[i] !== undefined) return arguments[i];
	    }
	};

	var units = [ 'mm', 'cm', 'm', 'pc', 'pt', 'in', 'ft', 'px' ];

	var conversions = {
	  // metric
	  m: {
	    system: 'metric',
	    factor: 1
	  },
	  cm: {
	    system: 'metric',
	    factor: 1 / 100
	  },
	  mm: {
	    system: 'metric',
	    factor: 1 / 1000
	  },
	  // imperial
	  pt: {
	    system: 'imperial',
	    factor: 1 / 72
	  },
	  pc: {
	    system: 'imperial',
	    factor: 1 / 6
	  },
	  in: {
	    system: 'imperial',
	    factor: 1
	  },
	  ft: {
	    system: 'imperial',
	    factor: 12
	  }
	};

	const anchors = {
	  metric: {
	    unit: 'm',
	    ratio: 1 / 0.0254
	  },
	  imperial: {
	    unit: 'in',
	    ratio: 0.0254
	  }
	};

	function round (value, decimals) {
	  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
	}

	function convertDistance (value, fromUnit, toUnit, opts) {
	  if (typeof value !== 'number' || !isFinite(value)) throw new Error('Value must be a finite number');
	  if (!fromUnit || !toUnit) throw new Error('Must specify from and to units');

	  opts = opts || {};
	  var pixelsPerInch = defined$1(opts.pixelsPerInch, 96);
	  var precision = opts.precision;
	  var roundPixel = opts.roundPixel !== false;

	  fromUnit = fromUnit.toLowerCase();
	  toUnit = toUnit.toLowerCase();

	  if (units.indexOf(fromUnit) === -1) throw new Error('Invalid from unit "' + fromUnit + '", must be one of: ' + units.join(', '));
	  if (units.indexOf(toUnit) === -1) throw new Error('Invalid from unit "' + toUnit + '", must be one of: ' + units.join(', '));

	  if (fromUnit === toUnit) {
	    // We don't need to convert from A to B since they are the same already
	    return value;
	  }

	  var toFactor = 1;
	  var fromFactor = 1;
	  var isToPixel = false;

	  if (fromUnit === 'px') {
	    fromFactor = 1 / pixelsPerInch;
	    fromUnit = 'in';
	  }
	  if (toUnit === 'px') {
	    isToPixel = true;
	    toFactor = pixelsPerInch;
	    toUnit = 'in';
	  }

	  var fromUnitData = conversions[fromUnit];
	  var toUnitData = conversions[toUnit];

	  // source to anchor inside source's system
	  var anchor = value * fromUnitData.factor * fromFactor;

	  // if systems differ, convert one to another
	  if (fromUnitData.system !== toUnitData.system) {
	    // regular 'm' to 'in' and so forth
	    anchor *= anchors[fromUnitData.system].ratio;
	  }

	  var result = anchor / toUnitData.factor * toFactor;
	  if (isToPixel && roundPixel) {
	    result = Math.round(result);
	  } else if (typeof precision === 'number' && isFinite(precision)) {
	    result = round(result, precision);
	  }
	  return result;
	}

	var convertLength = convertDistance;
	var units_1 = units;
	convertLength.units = units_1;

	function getDimensionsFromPreset(dimensions, unitsTo, pixelsPerInch) {
	    if ( unitsTo === void 0 ) unitsTo = 'px';
	    if ( pixelsPerInch === void 0 ) pixelsPerInch = 72;

	    if (typeof dimensions === 'string') {
	        var key = dimensions.toLowerCase();
	        if (!(key in paperSizes)) {
	            throw new Error(("The dimension preset \"" + dimensions + "\" is not supported or could not be found; try using a4, a3, postcard, letter, etc."));
	        }
	        var preset = paperSizes[key];
	        return preset.dimensions.map(function (d) { return convertDistance$1(d, preset.units, unitsTo, pixelsPerInch); });
	    } else {
	        return dimensions;
	    }
	}

	function convertDistance$1(dimension, unitsFrom, unitsTo, pixelsPerInch) {
	    if ( unitsFrom === void 0 ) unitsFrom = 'px';
	    if ( unitsTo === void 0 ) unitsTo = 'px';
	    if ( pixelsPerInch === void 0 ) pixelsPerInch = 72;

	    return convertLength(dimension, unitsFrom, unitsTo, {
	        pixelsPerInch: pixelsPerInch,
	        precision: 4,
	        roundPixel: true
	    });
	}

	function checkIfHasDimensions(settings) {
	    if (!settings.dimensions) 
	        { return false; }
	    if (typeof settings.dimensions === 'string') 
	        { return true; }
	    if (Array.isArray(settings.dimensions) && settings.dimensions.length >= 2) 
	        { return true; }
	    return false;
	}

	function getParentSize(props, settings) {
	    if (!isBrowser()) {
	        return [300,150];
	    }
	    var element = settings.parent || window;
	    if (element === window || element === document || element === document.body) {
	        return [window.innerWidth,window.innerHeight];
	    } else {
	        var ref = element.getBoundingClientRect();
	        var width = ref.width;
	        var height = ref.height;
	        return [width,height];
	    }
	}

	function resizeCanvas(props, settings) {
	    var width, height;
	    var styleWidth, styleHeight;
	    var canvasWidth, canvasHeight;
	    var browser = isBrowser();
	    var dimensions = settings.dimensions;
	    var hasDimensions = checkIfHasDimensions(settings);
	    var exporting = props.exporting;
	    var scaleToFit = hasDimensions ? settings.scaleToFit !== false : false;
	    var scaleToView = !exporting && hasDimensions ? settings.scaleToView : true;
	    if (!browser) 
	        { scaleToFit = (scaleToView = false); }
	    var units = settings.units;
	    var pixelsPerInch = typeof settings.pixelsPerInch === 'number' && isFinite(settings.pixelsPerInch) ? settings.pixelsPerInch : 72;
	    var bleed = defined(settings.bleed, 0);
	    var devicePixelRatio = browser ? window.devicePixelRatio : 1;
	    var basePixelRatio = scaleToView ? devicePixelRatio : 1;
	    var pixelRatio, exportPixelRatio;
	    if (typeof settings.pixelRatio === 'number' && isFinite(settings.pixelRatio)) {
	        pixelRatio = settings.pixelRatio;
	        exportPixelRatio = defined(settings.exportPixelRatio, pixelRatio);
	    } else {
	        if (hasDimensions) {
	            pixelRatio = basePixelRatio;
	            exportPixelRatio = defined(settings.exportPixelRatio, 1);
	        } else {
	            pixelRatio = devicePixelRatio;
	            exportPixelRatio = defined(settings.exportPixelRatio, pixelRatio);
	        }
	    }
	    if (typeof settings.maxPixelRatio === 'number' && isFinite(settings.maxPixelRatio)) {
	        pixelRatio = Math.min(settings.maxPixelRatio, pixelRatio);
	    }
	    if (exporting) {
	        pixelRatio = exportPixelRatio;
	    }
	    var ref = getParentSize(props, settings);
	    var parentWidth = ref[0];
	    var parentHeight = ref[1];
	    var trimWidth, trimHeight;
	    if (hasDimensions) {
	        var result = getDimensionsFromPreset(dimensions, units, pixelsPerInch);
	        var highest = Math.max(result[0], result[1]);
	        var lowest = Math.min(result[0], result[1]);
	        if (settings.orientation) {
	            var landscape = settings.orientation === 'landscape';
	            width = landscape ? highest : lowest;
	            height = landscape ? lowest : highest;
	        } else {
	            width = result[0];
	            height = result[1];
	        }
	        trimWidth = width;
	        trimHeight = height;
	        width += bleed * 2;
	        height += bleed * 2;
	    } else {
	        width = parentWidth;
	        height = parentHeight;
	        trimWidth = width;
	        trimHeight = height;
	    }
	    var realWidth = width;
	    var realHeight = height;
	    if (hasDimensions && units) {
	        realWidth = convertDistance$1(width, units, 'px', pixelsPerInch);
	        realHeight = convertDistance$1(height, units, 'px', pixelsPerInch);
	    }
	    styleWidth = Math.round(realWidth);
	    styleHeight = Math.round(realHeight);
	    if (scaleToFit && !exporting && hasDimensions) {
	        var aspect = width / height;
	        var windowAspect = parentWidth / parentHeight;
	        var scaleToFitPadding = defined(settings.scaleToFitPadding, 40);
	        var maxWidth = Math.round(parentWidth - scaleToFitPadding * 2);
	        var maxHeight = Math.round(parentHeight - scaleToFitPadding * 2);
	        if (styleWidth > maxWidth || styleHeight > maxHeight) {
	            if (windowAspect > aspect) {
	                styleHeight = maxHeight;
	                styleWidth = Math.round(styleHeight * aspect);
	            } else {
	                styleWidth = maxWidth;
	                styleHeight = Math.round(styleWidth / aspect);
	            }
	        }
	    }
	    canvasWidth = scaleToView ? Math.round(pixelRatio * styleWidth) : Math.round(pixelRatio * realWidth);
	    canvasHeight = scaleToView ? Math.round(pixelRatio * styleHeight) : Math.round(pixelRatio * realHeight);
	    var viewportWidth = scaleToView ? Math.round(styleWidth) : Math.round(realWidth);
	    var viewportHeight = scaleToView ? Math.round(styleHeight) : Math.round(realHeight);
	    var scaleX = canvasWidth / width;
	    var scaleY = canvasHeight / height;
	    return {
	        bleed: bleed,
	        pixelRatio: pixelRatio,
	        width: width,
	        height: height,
	        dimensions: [width,height],
	        units: units || 'px',
	        scaleX: scaleX,
	        scaleY: scaleY,
	        pixelsPerInch: pixelsPerInch,
	        viewportWidth: viewportWidth,
	        viewportHeight: viewportHeight,
	        canvasWidth: canvasWidth,
	        canvasHeight: canvasHeight,
	        trimWidth: trimWidth,
	        trimHeight: trimHeight,
	        styleWidth: styleWidth,
	        styleHeight: styleHeight
	    };
	}

	var getCanvasContext_1 = getCanvasContext;
	function getCanvasContext (type, opts) {
	  if (typeof type !== 'string') {
	    throw new TypeError('must specify type string')
	  }

	  opts = opts || {};

	  if (typeof document === 'undefined' && !opts.canvas) {
	    return null // check for Node
	  }

	  var canvas = opts.canvas || document.createElement('canvas');
	  if (typeof opts.width === 'number') {
	    canvas.width = opts.width;
	  }
	  if (typeof opts.height === 'number') {
	    canvas.height = opts.height;
	  }

	  var attribs = opts;
	  var gl;
	  try {
	    var names = [ type ];
	    // prefix GL contexts
	    if (type.indexOf('webgl') === 0) {
	      names.push('experimental-' + type);
	    }

	    for (var i = 0; i < names.length; i++) {
	      gl = canvas.getContext(names[i], attribs);
	      if (gl) return gl
	    }
	  } catch (e) {
	    gl = null;
	  }
	  return (gl || null) // ensure null on fail
	}

	function createCanvasElement() {
	    if (!isBrowser()) {
	        throw new Error('It appears you are runing from Node.js or a non-browser environment. Try passing in an existing { canvas } interface instead.');
	    }
	    return document.createElement('canvas');
	}

	function createCanvas(settings) {
	    if ( settings === void 0 ) settings = {};

	    var context, canvas;
	    var ownsCanvas = false;
	    if (settings.canvas !== false) {
	        context = settings.context;
	        if (!context || typeof context === 'string') {
	            var newCanvas = settings.canvas;
	            if (!newCanvas) {
	                newCanvas = createCanvasElement();
	                ownsCanvas = true;
	            }
	            var type = context || '2d';
	            if (typeof newCanvas.getContext !== 'function') {
	                throw new Error("The specified { canvas } element does not have a getContext() function, maybe it is not a <canvas> tag?");
	            }
	            context = getCanvasContext_1(type, objectAssign({}, settings.attributes, {
	                canvas: newCanvas
	            }));
	            if (!context) {
	                throw new Error(("Failed at canvas.getContext('" + type + "') - the browser may not support this context, or a different context may already be in use with this canvas."));
	            }
	        }
	        canvas = context.canvas;
	        if (settings.canvas && canvas !== settings.canvas) {
	            throw new Error('The { canvas } and { context } settings must point to the same underlying canvas element');
	        }
	        if (settings.pixelated) {
	            context.imageSmoothingEnabled = false;
	            context.mozImageSmoothingEnabled = false;
	            context.oImageSmoothingEnabled = false;
	            context.webkitImageSmoothingEnabled = false;
	            context.msImageSmoothingEnabled = false;
	            canvas.style['image-rendering'] = 'pixelated';
	        }
	    }
	    return {
	        canvas: canvas,
	        context: context,
	        ownsCanvas: ownsCanvas
	    };
	}

	var SketchManager = function SketchManager() {
	    var this$1 = this;

	    this._settings = {};
	    this._props = {};
	    this._sketch = undefined;
	    this._raf = null;
	    this._recordTimeout = null;
	    this._lastRedrawResult = undefined;
	    this._isP5Resizing = false;
	    this._keyboardShortcuts = keyboardShortcuts({
	        enabled: function () { return this$1.settings.hotkeys !== false; },
	        save: function (ev) {
	            if (ev.shiftKey) {
	                if (this$1.props.recording) {
	                    this$1.endRecord();
	                    this$1.run();
	                } else 
	                    { this$1.record(); }
	            } else if (!this$1.props.recording) {
	                this$1.exportFrame();
	            }
	        },
	        togglePlay: function () {
	            if (this$1.props.playing) 
	                { this$1.pause(); }
	             else 
	                { this$1.play(); }
	        },
	        commit: function (ev) {
	            this$1.exportFrame({
	                commit: true
	            });
	        }
	    });
	    this._animateHandler = (function () { return this$1.animate(); });
	    this._resizeHandler = (function () {
	        var changed = this$1.resize();
	        if (changed) {
	            this$1.render();
	        }
	    });
	};

	var prototypeAccessors = { sketch: { configurable: true },settings: { configurable: true },props: { configurable: true } };
	prototypeAccessors.sketch.get = function () {
	    return this._sketch;
	};
	prototypeAccessors.settings.get = function () {
	    return this._settings;
	};
	prototypeAccessors.props.get = function () {
	    return this._props;
	};
	SketchManager.prototype._computePlayhead = function _computePlayhead (currentTime, duration) {
	    var hasDuration = typeof duration === 'number' && isFinite(duration);
	    return hasDuration ? currentTime / duration : 0;
	};
	SketchManager.prototype._computeFrame = function _computeFrame (playhead, time, totalFrames, fps) {
	    return isFinite(totalFrames) && totalFrames > 1 ? Math.floor(playhead * (totalFrames - 1)) : Math.floor(fps * time);
	};
	SketchManager.prototype._computeCurrentFrame = function _computeCurrentFrame () {
	    return this._computeFrame(this.props.playhead, this.props.time, this.props.totalFrames, this.props.fps);
	};
	SketchManager.prototype._getSizeProps = function _getSizeProps () {
	    var props = this.props;
	    return {
	        width: props.width,
	        height: props.height,
	        pixelRatio: props.pixelRatio,
	        canvasWidth: props.canvasWidth,
	        canvasHeight: props.canvasHeight,
	        viewportWidth: props.viewportWidth,
	        viewportHeight: props.viewportHeight
	    };
	};
	SketchManager.prototype.run = function run () {
	    if (!this.sketch) 
	        { throw new Error('should wait until sketch is loaded before trying to play()'); }
	    if (this.settings.playing !== false) {
	        this.play();
	    }
	    if (typeof this.sketch.dispose === 'function') {
	        console.warn('In canvas-sketch@0.0.23 the dispose() event has been renamed to unload()');
	    }
	    if (!this.props.started) {
	        this._signalBegin();
	        this.props.started = true;
	    }
	    this.tick();
	    this.render();
	    return this;
	};
	SketchManager.prototype._cancelTimeouts = function _cancelTimeouts () {
	    if (this._raf != null && typeof window !== 'undefined' && typeof window.cancelAnimationFrame === 'function') {
	        window.cancelAnimationFrame(this._raf);
	        this._raf = null;
	    }
	    if (this._recordTimeout != null) {
	        clearTimeout(this._recordTimeout);
	        this._recordTimeout = null;
	    }
	};
	SketchManager.prototype.play = function play () {
	    var animate = this.settings.animate;
	    if ('animation' in this.settings) {
	        animate = true;
	        console.warn('[canvas-sketch] { animation } has been renamed to { animate }');
	    }
	    if (!animate) 
	        { return; }
	    if (!isBrowser()) {
	        console.error('[canvas-sketch] WARN: Using { animate } in Node.js is not yet supported');
	        return;
	    }
	    if (this.props.playing) 
	        { return; }
	    if (!this.props.started) {
	        this._signalBegin();
	        this.props.started = true;
	    }
	    this.props.playing = true;
	    this._cancelTimeouts();
	    this._lastTime = browser();
	    this._raf = window.requestAnimationFrame(this._animateHandler);
	};
	SketchManager.prototype.pause = function pause () {
	    if (this.props.recording) 
	        { this.endRecord(); }
	    this.props.playing = false;
	    this._cancelTimeouts();
	};
	SketchManager.prototype.togglePlay = function togglePlay () {
	    if (this.props.playing) 
	        { this.pause(); }
	     else 
	        { this.play(); }
	};
	SketchManager.prototype.stop = function stop () {
	    this.pause();
	    this.props.frame = 0;
	    this.props.playhead = 0;
	    this.props.time = 0;
	    this.props.deltaTime = 0;
	    this.props.started = false;
	    this.render();
	};
	SketchManager.prototype.record = function record () {
	        var this$1 = this;

	    if (this.props.recording) 
	        { return; }
	    if (!isBrowser()) {
	        console.error('[canvas-sketch] WARN: Recording from Node.js is not yet supported');
	        return;
	    }
	    this.stop();
	    this.props.playing = true;
	    this.props.recording = true;
	    var exportOpts = this._createExportOptions({
	        sequence: true
	    });
	    var frameInterval = 1 / this.props.fps;
	    this._cancelTimeouts();
	    var tick = function () {
	        if (!this$1.props.recording) 
	            { return Promise.resolve(); }
	        this$1.props.deltaTime = frameInterval;
	        this$1.tick();
	        return this$1.exportFrame(exportOpts).then(function () {
	            if (!this$1.props.recording) 
	                { return; }
	            this$1.props.deltaTime = 0;
	            this$1.props.frame++;
	            if (this$1.props.frame < this$1.props.totalFrames) {
	                this$1.props.time += frameInterval;
	                this$1.props.playhead = this$1._computePlayhead(this$1.props.time, this$1.props.duration);
	                this$1._recordTimeout = setTimeout(tick, 0);
	            } else {
	                console.log('Finished recording');
	                this$1._signalEnd();
	                this$1.endRecord();
	                this$1.stop();
	                this$1.run();
	            }
	        });
	    };
	    if (!this.props.started) {
	        this._signalBegin();
	        this.props.started = true;
	    }
	    if (this.sketch && typeof this.sketch.beginRecord === 'function') {
	        this._wrapContextScale(function (props) { return this$1.sketch.beginRecord(props); });
	    }
	    streamStart(exportOpts).catch(function (err) {
	        console.error(err);
	    }).then(function (response) {
	        this$1._raf = window.requestAnimationFrame(tick);
	    });
	};
	SketchManager.prototype._signalBegin = function _signalBegin () {
	        var this$1 = this;

	    if (this.sketch && typeof this.sketch.begin === 'function') {
	        this._wrapContextScale(function (props) { return this$1.sketch.begin(props); });
	    }
	};
	SketchManager.prototype._signalEnd = function _signalEnd () {
	        var this$1 = this;

	    if (this.sketch && typeof this.sketch.end === 'function') {
	        this._wrapContextScale(function (props) { return this$1.sketch.end(props); });
	    }
	};
	SketchManager.prototype.endRecord = function endRecord () {
	        var this$1 = this;

	    var wasRecording = this.props.recording;
	    this._cancelTimeouts();
	    this.props.recording = false;
	    this.props.deltaTime = 0;
	    this.props.playing = false;
	    return streamEnd().catch(function (err) {
	        console.error(err);
	    }).then(function () {
	        if (wasRecording && this$1.sketch && typeof this$1.sketch.endRecord === 'function') {
	            this$1._wrapContextScale(function (props) { return this$1.sketch.endRecord(props); });
	        }
	    });
	};
	SketchManager.prototype._createExportOptions = function _createExportOptions (opt) {
	        if ( opt === void 0 ) opt = {};

	    return {
	        sequence: opt.sequence,
	        save: opt.save,
	        fps: this.props.fps,
	        frame: opt.sequence ? this.props.frame : undefined,
	        file: this.settings.file,
	        name: this.settings.name,
	        prefix: this.settings.prefix,
	        suffix: this.settings.suffix,
	        encoding: this.settings.encoding,
	        encodingQuality: this.settings.encodingQuality,
	        timeStamp: opt.timeStamp || getTimeStamp(),
	        totalFrames: isFinite(this.props.totalFrames) ? Math.max(0, this.props.totalFrames) : 1000
	    };
	};
	SketchManager.prototype.exportFrame = function exportFrame (opt) {
	        var this$1 = this;
	        if ( opt === void 0 ) opt = {};

	    if (!this.sketch) 
	        { return Promise.all([]); }
	    if (typeof this.sketch.preExport === 'function') {
	        this.sketch.preExport();
	    }
	    var exportOpts = this._createExportOptions(opt);
	    var client = getClientAPI();
	    var p = Promise.resolve();
	    if (client && opt.commit && typeof client.commit === 'function') {
	        var commitOpts = objectAssign({}, exportOpts);
	        var hash = client.commit(commitOpts);
	        if (isPromise_1(hash)) 
	            { p = hash; }
	         else 
	            { p = Promise.resolve(hash); }
	    }
	    return p.then(function (hash) { return this$1._doExportFrame(objectAssign({}, exportOpts, {
	        hash: hash || ''
	    })); }).then(function (result) {
	        if (result.length === 1) 
	            { return result[0]; }
	         else 
	            { return result; }
	    });
	};
	SketchManager.prototype._doExportFrame = function _doExportFrame (exportOpts) {
	        var this$1 = this;
	        if ( exportOpts === void 0 ) exportOpts = {};

	    this._props.exporting = true;
	    this.resize();
	    var drawResult = this.render();
	    var canvas = this.props.canvas;
	    if (typeof drawResult === 'undefined') {
	        drawResult = [canvas];
	    }
	    drawResult = [].concat(drawResult).filter(Boolean);
	    drawResult = drawResult.map(function (result) {
	        var hasDataObject = typeof result === 'object' && result && ('data' in result || 'dataURL' in result);
	        var data = hasDataObject ? result.data : result;
	        var opts = hasDataObject ? objectAssign({}, result, {
	            data: data
	        }) : {
	            data: data
	        };
	        if (isCanvas(data)) {
	            var encoding = opts.encoding || exportOpts.encoding;
	            var encodingQuality = defined(opts.encodingQuality, exportOpts.encodingQuality, 0.95);
	            var ref = exportCanvas(data, {
	                encoding: encoding,
	                encodingQuality: encodingQuality
	            });
	                var dataURL = ref.dataURL;
	                var extension = ref.extension;
	                var type = ref.type;
	            return Object.assign(opts, {
	                dataURL: dataURL,
	                extension: extension,
	                type: type
	            });
	        } else {
	            return opts;
	        }
	    });
	    this._props.exporting = false;
	    this.resize();
	    this.render();
	    return Promise.all(drawResult.map(function (result, i, layerList) {
	        var curOpt = objectAssign({
	            extension: '',
	            prefix: '',
	            suffix: ''
	        }, exportOpts, result, {
	            layer: i,
	            totalLayers: layerList.length
	        });
	        var saveParam = exportOpts.save === false ? false : result.save;
	        curOpt.save = saveParam !== false;
	        curOpt.filename = resolveFilename(curOpt);
	        delete curOpt.encoding;
	        delete curOpt.encodingQuality;
	        for (var k in curOpt) {
	            if (typeof curOpt[k] === 'undefined') 
	                { delete curOpt[k]; }
	        }
	        var savePromise = Promise.resolve({});
	        if (curOpt.save) {
	            var data = curOpt.data;
	            if (curOpt.dataURL) {
	                var dataURL = curOpt.dataURL;
	                savePromise = saveDataURL(dataURL, curOpt);
	            } else {
	                savePromise = saveFile(data, curOpt);
	            }
	        }
	        return savePromise.then(function (saveResult) { return Object.assign({}, curOpt, saveResult); });
	    })).then(function (ev) {
	        var savedEvents = ev.filter(function (e) { return e.save; });
	        if (savedEvents.length > 0) {
	            var eventWithOutput = savedEvents.find(function (e) { return e.outputName; });
	            var isClient = savedEvents.some(function (e) { return e.client; });
	            var isStreaming = savedEvents.some(function (e) { return e.stream; });
	            var item;
	            if (savedEvents.length > 1) 
	                { item = savedEvents.length; }
	             else if (eventWithOutput) 
	                { item = (eventWithOutput.outputName) + "/" + (savedEvents[0].filename); }
	             else 
	                { item = "" + (savedEvents[0].filename); }
	            var ofSeq = '';
	            if (exportOpts.sequence) {
	                var hasTotalFrames = isFinite(this$1.props.totalFrames);
	                ofSeq = hasTotalFrames ? (" (frame " + (exportOpts.frame + 1) + " / " + (this$1.props.totalFrames) + ")") : (" (frame " + (exportOpts.frame) + ")");
	            } else if (savedEvents.length > 1) {
	                ofSeq = " files";
	            }
	            var client = isClient ? 'canvas-sketch-cli' : 'canvas-sketch';
	            var action = isStreaming ? 'Streaming into' : 'Exported';
	            console.log(("%c[" + client + "]%c " + action + " %c" + item + "%c" + ofSeq), 'color: #8e8e8e;', 'color: initial;', 'font-weight: bold;', 'font-weight: initial;');
	        }
	        if (typeof this$1.sketch.postExport === 'function') {
	            this$1.sketch.postExport();
	        }
	        return ev;
	    });
	};
	SketchManager.prototype._wrapContextScale = function _wrapContextScale (cb) {
	    this._preRender();
	    cb(this.props);
	    this._postRender();
	};
	SketchManager.prototype._preRender = function _preRender () {
	    var props = this.props;
	    if (!this.props.gl && props.context && !props.p5) {
	        props.context.save();
	        if (this.settings.scaleContext !== false) {
	            props.context.scale(props.scaleX, props.scaleY);
	        }
	    } else if (props.p5) {
	        props.p5.scale(props.scaleX / props.pixelRatio, props.scaleY / props.pixelRatio);
	    }
	};
	SketchManager.prototype._postRender = function _postRender () {
	    var props = this.props;
	    if (!this.props.gl && props.context && !props.p5) {
	        props.context.restore();
	    }
	    if (props.gl && this.settings.flush !== false && !props.p5) {
	        props.gl.flush();
	    }
	};
	SketchManager.prototype.tick = function tick () {
	    if (this.sketch && typeof this.sketch.tick === 'function') {
	        this._preRender();
	        this.sketch.tick(this.props);
	        this._postRender();
	    }
	};
	SketchManager.prototype.render = function render () {
	    if (this.props.p5) {
	        this._lastRedrawResult = undefined;
	        this.props.p5.redraw();
	        return this._lastRedrawResult;
	    } else {
	        return this.submitDrawCall();
	    }
	};
	SketchManager.prototype.submitDrawCall = function submitDrawCall () {
	    if (!this.sketch) 
	        { return; }
	    var props = this.props;
	    this._preRender();
	    var drawResult;
	    if (typeof this.sketch === 'function') {
	        drawResult = this.sketch(props);
	    } else if (typeof this.sketch.render === 'function') {
	        drawResult = this.sketch.render(props);
	    }
	    this._postRender();
	    return drawResult;
	};
	SketchManager.prototype.update = function update (opt) {
	        var this$1 = this;
	        if ( opt === void 0 ) opt = {};

	    var notYetSupported = ['animate'];
	    Object.keys(opt).forEach(function (key) {
	        if (notYetSupported.indexOf(key) >= 0) {
	            throw new Error(("Sorry, the { " + key + " } option is not yet supported with update()."));
	        }
	    });
	    var oldCanvas = this._settings.canvas;
	    var oldContext = this._settings.context;
	    for (var key in opt) {
	        var value = opt[key];
	        if (typeof value !== 'undefined') {
	            this$1._settings[key] = value;
	        }
	    }
	    var timeOpts = Object.assign({}, this._settings, opt);
	    if ('time' in opt && 'frame' in opt) 
	        { throw new Error('You should specify { time } or { frame } but not both'); }
	     else if ('time' in opt) 
	        { delete timeOpts.frame; }
	     else if ('frame' in opt) 
	        { delete timeOpts.time; }
	    if ('duration' in opt && 'totalFrames' in opt) 
	        { throw new Error('You should specify { duration } or { totalFrames } but not both'); }
	     else if ('duration' in opt) 
	        { delete timeOpts.totalFrames; }
	     else if ('totalFrames' in opt) 
	        { delete timeOpts.duration; }
	    if ('data' in opt) 
	        { this._props.data = opt.data; }
	    var timeProps = this.getTimeProps(timeOpts);
	    Object.assign(this._props, timeProps);
	    if (oldCanvas !== this._settings.canvas || oldContext !== this._settings.context) {
	        var ref = createCanvas(this._settings);
	            var canvas = ref.canvas;
	            var context = ref.context;
	        this.props.canvas = canvas;
	        this.props.context = context;
	        this._setupGLKey();
	        this._appendCanvasIfNeeded();
	    }
	    if (opt.p5 && typeof opt.p5 !== 'function') {
	        this.props.p5 = opt.p5;
	        this.props.p5.draw = (function () {
	            if (this$1._isP5Resizing) 
	                { return; }
	            this$1._lastRedrawResult = this$1.submitDrawCall();
	        });
	    }
	    if ('playing' in opt) {
	        if (opt.playing) 
	            { this.play(); }
	         else 
	            { this.pause(); }
	    }
	    checkSettings(this._settings);
	    this.resize();
	    this.render();
	    return this.props;
	};
	SketchManager.prototype.resize = function resize () {
	    var oldSizes = this._getSizeProps();
	    var settings = this.settings;
	    var props = this.props;
	    var newProps = resizeCanvas(props, settings);
	    Object.assign(this._props, newProps);
	    var ref = this.props;
	        var pixelRatio = ref.pixelRatio;
	        var canvasWidth = ref.canvasWidth;
	        var canvasHeight = ref.canvasHeight;
	        var styleWidth = ref.styleWidth;
	        var styleHeight = ref.styleHeight;
	    var canvas = this.props.canvas;
	    if (canvas && settings.resizeCanvas !== false) {
	        if (props.p5) {
	            if (canvas.width !== canvasWidth || canvas.height !== canvasHeight) {
	                this._isP5Resizing = true;
	                props.p5.pixelDensity(pixelRatio);
	                props.p5.resizeCanvas(canvasWidth / pixelRatio, canvasHeight / pixelRatio, false);
	                this._isP5Resizing = false;
	            }
	        } else {
	            if (canvas.width !== canvasWidth) 
	                { canvas.width = canvasWidth; }
	            if (canvas.height !== canvasHeight) 
	                { canvas.height = canvasHeight; }
	        }
	        if (isBrowser() && settings.styleCanvas !== false) {
	            canvas.style.width = styleWidth + "px";
	            canvas.style.height = styleHeight + "px";
	        }
	    }
	    var newSizes = this._getSizeProps();
	    var changed = !deepEqual_1(oldSizes, newSizes);
	    if (changed) {
	        this._sizeChanged();
	    }
	    return changed;
	};
	SketchManager.prototype._sizeChanged = function _sizeChanged () {
	    if (this.sketch && typeof this.sketch.resize === 'function') {
	        this.sketch.resize(this.props);
	    }
	};
	SketchManager.prototype.animate = function animate () {
	    if (!this.props.playing) 
	        { return; }
	    if (!isBrowser()) {
	        console.error('[canvas-sketch] WARN: Animation in Node.js is not yet supported');
	        return;
	    }
	    this._raf = window.requestAnimationFrame(this._animateHandler);
	    var now = browser();
	    var fps = this.props.fps;
	    var frameIntervalMS = 1000 / fps;
	    var deltaTimeMS = now - this._lastTime;
	    var duration = this.props.duration;
	    var hasDuration = typeof duration === 'number' && isFinite(duration);
	    var isNewFrame = true;
	    var playbackRate = this.settings.playbackRate;
	    if (playbackRate === 'fixed') {
	        deltaTimeMS = frameIntervalMS;
	    } else if (playbackRate === 'throttle') {
	        if (deltaTimeMS > frameIntervalMS) {
	            now = now - deltaTimeMS % frameIntervalMS;
	            this._lastTime = now;
	        } else {
	            isNewFrame = false;
	        }
	    } else {
	        this._lastTime = now;
	    }
	    var deltaTime = deltaTimeMS / 1000;
	    var newTime = this.props.time + deltaTime * this.props.timeScale;
	    if (newTime < 0 && hasDuration) {
	        newTime = duration + newTime;
	    }
	    var isFinished = false;
	    var isLoopStart = false;
	    var looping = this.settings.loop !== false;
	    if (hasDuration && newTime >= duration) {
	        if (looping) {
	            isNewFrame = true;
	            newTime = newTime % duration;
	            isLoopStart = true;
	        } else {
	            isNewFrame = false;
	            newTime = duration;
	            isFinished = true;
	        }
	        this._signalEnd();
	    }
	    if (isNewFrame) {
	        this.props.deltaTime = deltaTime;
	        this.props.time = newTime;
	        this.props.playhead = this._computePlayhead(newTime, duration);
	        var lastFrame = this.props.frame;
	        this.props.frame = this._computeCurrentFrame();
	        if (isLoopStart) 
	            { this._signalBegin(); }
	        if (lastFrame !== this.props.frame) 
	            { this.tick(); }
	        this.render();
	        this.props.deltaTime = 0;
	    }
	    if (isFinished) {
	        this.pause();
	    }
	};
	SketchManager.prototype.dispatch = function dispatch (cb) {
	    if (typeof cb !== 'function') 
	        { throw new Error('must pass function into dispatch()'); }
	    cb(this.props);
	    this.render();
	};
	SketchManager.prototype.mount = function mount () {
	    this._appendCanvasIfNeeded();
	};
	SketchManager.prototype.unmount = function unmount () {
	    if (isBrowser()) {
	        window.removeEventListener('resize', this._resizeHandler);
	        this._keyboardShortcuts.detach();
	    }
	    if (this.props.canvas.parentElement) {
	        this.props.canvas.parentElement.removeChild(this.props.canvas);
	    }
	};
	SketchManager.prototype._appendCanvasIfNeeded = function _appendCanvasIfNeeded () {
	    if (!isBrowser()) 
	        { return; }
	    if (this.settings.parent !== false && (this.props.canvas && !this.props.canvas.parentElement)) {
	        var defaultParent = this.settings.parent || document.body;
	        defaultParent.appendChild(this.props.canvas);
	    }
	};
	SketchManager.prototype._setupGLKey = function _setupGLKey () {
	    if (this.props.context) {
	        if (isWebGLContext(this.props.context)) {
	            this._props.gl = this.props.context;
	        } else {
	            delete this._props.gl;
	        }
	    }
	};
	SketchManager.prototype.getTimeProps = function getTimeProps (settings) {
	        if ( settings === void 0 ) settings = {};

	    var duration = settings.duration;
	    var totalFrames = settings.totalFrames;
	    var timeScale = defined(settings.timeScale, 1);
	    var fps = defined(settings.fps, 24);
	    var hasDuration = typeof duration === 'number' && isFinite(duration);
	    var hasTotalFrames = typeof totalFrames === 'number' && isFinite(totalFrames);
	    var totalFramesFromDuration = hasDuration ? Math.floor(fps * duration) : undefined;
	    var durationFromTotalFrames = hasTotalFrames ? totalFrames / fps : undefined;
	    if (hasDuration && hasTotalFrames && totalFramesFromDuration !== totalFrames) {
	        throw new Error('You should specify either duration or totalFrames, but not both. Or, they must match exactly.');
	    }
	    if (typeof settings.dimensions === 'undefined' && typeof settings.units !== 'undefined') {
	        console.warn("You've specified a { units } setting but no { dimension }, so the units will be ignored.");
	    }
	    totalFrames = defined(totalFrames, totalFramesFromDuration, Infinity);
	    duration = defined(duration, durationFromTotalFrames, Infinity);
	    var startTime = settings.time;
	    var startFrame = settings.frame;
	    var hasStartTime = typeof startTime === 'number' && isFinite(startTime);
	    var hasStartFrame = typeof startFrame === 'number' && isFinite(startFrame);
	    var time = 0;
	    var frame = 0;
	    var playhead = 0;
	    if (hasStartTime && hasStartFrame) {
	        throw new Error('You should specify either start frame or time, but not both.');
	    } else if (hasStartTime) {
	        time = startTime;
	        playhead = this._computePlayhead(time, duration);
	        frame = this._computeFrame(playhead, time, totalFrames, fps);
	    } else if (hasStartFrame) {
	        frame = startFrame;
	        time = frame / fps;
	        playhead = this._computePlayhead(time, duration);
	    }
	    return {
	        playhead: playhead,
	        time: time,
	        frame: frame,
	        duration: duration,
	        totalFrames: totalFrames,
	        fps: fps,
	        timeScale: timeScale
	    };
	};
	SketchManager.prototype.setup = function setup (settings) {
	        var this$1 = this;
	        if ( settings === void 0 ) settings = {};

	    if (this.sketch) 
	        { throw new Error('Multiple setup() calls not yet supported.'); }
	    this._settings = Object.assign({}, settings, this._settings);
	    checkSettings(this._settings);
	    var ref = createCanvas(this._settings);
	        var context = ref.context;
	        var canvas = ref.canvas;
	    var timeProps = this.getTimeProps(this._settings);
	    this._props = Object.assign({}, timeProps,
	        {canvas: canvas,
	        context: context,
	        deltaTime: 0,
	        started: false,
	        exporting: false,
	        playing: false,
	        recording: false,
	        settings: this.settings,
	        data: this.settings.data,
	        render: function () { return this$1.render(); },
	        togglePlay: function () { return this$1.togglePlay(); },
	        dispatch: function (cb) { return this$1.dispatch(cb); },
	        tick: function () { return this$1.tick(); },
	        resize: function () { return this$1.resize(); },
	        update: function (opt) { return this$1.update(opt); },
	        exportFrame: function (opt) { return this$1.exportFrame(opt); },
	        record: function () { return this$1.record(); },
	        play: function () { return this$1.play(); },
	        pause: function () { return this$1.pause(); },
	        stop: function () { return this$1.stop(); }});
	    this._setupGLKey();
	    this.resize();
	};
	SketchManager.prototype.loadAndRun = function loadAndRun (canvasSketch, newSettings) {
	        var this$1 = this;

	    return this.load(canvasSketch, newSettings).then(function () {
	        this$1.run();
	        return this$1;
	    });
	};
	SketchManager.prototype.unload = function unload () {
	        var this$1 = this;

	    this.pause();
	    if (!this.sketch) 
	        { return; }
	    if (typeof this.sketch.unload === 'function') {
	        this._wrapContextScale(function (props) { return this$1.sketch.unload(props); });
	    }
	    this._sketch = null;
	};
	SketchManager.prototype.destroy = function destroy () {
	    this.unload();
	    this.unmount();
	};
	SketchManager.prototype.load = function load (createSketch, newSettings) {
	        var this$1 = this;

	    if (typeof createSketch !== 'function') {
	        throw new Error('The function must take in a function as the first parameter. Example:\n  canvasSketcher(() => { ... }, settings)');
	    }
	    if (this.sketch) {
	        this.unload();
	    }
	    if (typeof newSettings !== 'undefined') {
	        this.update(newSettings);
	    }
	    this._preRender();
	    var preload = Promise.resolve();
	    if (this.settings.p5) {
	        if (!isBrowser()) {
	            throw new Error('[canvas-sketch] ERROR: Using p5.js in Node.js is not supported');
	        }
	        preload = new Promise(function (resolve) {
	            var P5Constructor = this$1.settings.p5;
	            var preload;
	            if (P5Constructor.p5) {
	                preload = P5Constructor.preload;
	                P5Constructor = P5Constructor.p5;
	            }
	            var p5Sketch = function (p5) {
	                if (preload) 
	                    { p5.preload = (function () { return preload(p5); }); }
	                p5.setup = (function () {
	                    var props = this$1.props;
	                    var isGL = this$1.settings.context === 'webgl';
	                    var renderer = isGL ? p5.WEBGL : p5.P2D;
	                    p5.noLoop();
	                    p5.pixelDensity(props.pixelRatio);
	                    p5.createCanvas(props.viewportWidth, props.viewportHeight, renderer);
	                    if (isGL && this$1.settings.attributes) {
	                        p5.setAttributes(this$1.settings.attributes);
	                    }
	                    this$1.update({
	                        p5: p5,
	                        canvas: p5.canvas,
	                        context: p5._renderer.drawingContext
	                    });
	                    resolve();
	                });
	            };
	            if (typeof P5Constructor === 'function') {
	                new P5Constructor(p5Sketch);
	            } else {
	                if (typeof window.createCanvas !== 'function') {
	                    throw new Error("{ p5 } setting is passed but can't find p5.js in global (window) scope. Maybe you did not create it globally?\nnew p5(); // <-- attaches to global scope");
	                }
	                p5Sketch(window);
	            }
	        });
	    }
	    return preload.then(function () {
	        var loader = createSketch(this$1.props);
	        if (!isPromise_1(loader)) {
	            loader = Promise.resolve(loader);
	        }
	        return loader;
	    }).then(function (sketch) {
	        if (!sketch) 
	            { sketch = {}; }
	        this$1._sketch = sketch;
	        if (isBrowser()) {
	            this$1._keyboardShortcuts.attach();
	            window.addEventListener('resize', this$1._resizeHandler);
	        }
	        this$1._postRender();
	        this$1._sizeChanged();
	        return this$1;
	    }).catch(function (err) {
	        console.warn('Could not start sketch, the async loading function rejected with an error:\n    Error: ' + err.message);
	        throw err;
	    });
	};

	Object.defineProperties( SketchManager.prototype, prototypeAccessors );

	var CACHE = 'hot-id-cache';
	var runtimeCollisions = [];
	function isHotReload() {
	    var client = getClientAPI();
	    return client && client.hot;
	}

	function cacheGet(id) {
	    var client = getClientAPI();
	    if (!client) 
	        { return undefined; }
	    client[CACHE] = client[CACHE] || {};
	    return client[CACHE][id];
	}

	function cachePut(id, data) {
	    var client = getClientAPI();
	    if (!client) 
	        { return undefined; }
	    client[CACHE] = client[CACHE] || {};
	    client[CACHE][id] = data;
	}

	function getTimeProp(oldManager, newSettings) {
	    return newSettings.animate ? {
	        time: oldManager.props.time
	    } : undefined;
	}

	function canvasSketch(sketch, settings) {
	    if ( settings === void 0 ) settings = {};

	    if (settings.p5) {
	        if (settings.canvas || settings.context && typeof settings.context !== 'string') {
	            throw new Error("In { p5 } mode, you can't pass your own canvas or context, unless the context is a \"webgl\" or \"2d\" string");
	        }
	        var context = typeof settings.context === 'string' ? settings.context : false;
	        settings = Object.assign({}, settings, {
	            canvas: false,
	            context: context
	        });
	    }
	    var isHot = isHotReload();
	    var hotID;
	    if (isHot) {
	        hotID = defined(settings.id, '$__DEFAULT_CANVAS_SKETCH_ID__$');
	    }
	    var isInjecting = isHot && typeof hotID === 'string';
	    if (isInjecting && runtimeCollisions.includes(hotID)) {
	        console.warn("Warning: You have multiple calls to canvasSketch() in --hot mode. You must pass unique { id } strings in settings to enable hot reload across multiple sketches. ", hotID);
	        isInjecting = false;
	    }
	    var preload = Promise.resolve();
	    if (isInjecting) {
	        runtimeCollisions.push(hotID);
	        var previousData = cacheGet(hotID);
	        if (previousData) {
	            var next = function () {
	                var newProps = getTimeProp(previousData.manager, settings);
	                previousData.manager.destroy();
	                return newProps;
	            };
	            preload = previousData.load.then(next).catch(next);
	        }
	    }
	    return preload.then(function (newProps) {
	        var manager = new SketchManager();
	        var result;
	        if (sketch) {
	            settings = Object.assign({}, settings, newProps);
	            manager.setup(settings);
	            manager.mount();
	            result = manager.loadAndRun(sketch);
	        } else {
	            result = Promise.resolve(manager);
	        }
	        if (isInjecting) {
	            cachePut(hotID, {
	                load: result,
	                manager: manager
	            });
	        }
	        return result;
	    });
	}

	canvasSketch.canvasSketch = canvasSketch;
	canvasSketch.PaperSizes = paperSizes;

	return canvasSketch;

})));


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],4:[function(require,module,exports){
/* MIT license */

module.exports = {
  rgb2hsl: rgb2hsl,
  rgb2hsv: rgb2hsv,
  rgb2hwb: rgb2hwb,
  rgb2cmyk: rgb2cmyk,
  rgb2keyword: rgb2keyword,
  rgb2xyz: rgb2xyz,
  rgb2lab: rgb2lab,
  rgb2lch: rgb2lch,

  hsl2rgb: hsl2rgb,
  hsl2hsv: hsl2hsv,
  hsl2hwb: hsl2hwb,
  hsl2cmyk: hsl2cmyk,
  hsl2keyword: hsl2keyword,

  hsv2rgb: hsv2rgb,
  hsv2hsl: hsv2hsl,
  hsv2hwb: hsv2hwb,
  hsv2cmyk: hsv2cmyk,
  hsv2keyword: hsv2keyword,

  hwb2rgb: hwb2rgb,
  hwb2hsl: hwb2hsl,
  hwb2hsv: hwb2hsv,
  hwb2cmyk: hwb2cmyk,
  hwb2keyword: hwb2keyword,

  cmyk2rgb: cmyk2rgb,
  cmyk2hsl: cmyk2hsl,
  cmyk2hsv: cmyk2hsv,
  cmyk2hwb: cmyk2hwb,
  cmyk2keyword: cmyk2keyword,

  keyword2rgb: keyword2rgb,
  keyword2hsl: keyword2hsl,
  keyword2hsv: keyword2hsv,
  keyword2hwb: keyword2hwb,
  keyword2cmyk: keyword2cmyk,
  keyword2lab: keyword2lab,
  keyword2xyz: keyword2xyz,

  xyz2rgb: xyz2rgb,
  xyz2lab: xyz2lab,
  xyz2lch: xyz2lch,

  lab2xyz: lab2xyz,
  lab2rgb: lab2rgb,
  lab2lch: lab2lch,

  lch2lab: lch2lab,
  lch2xyz: lch2xyz,
  lch2rgb: lch2rgb
}


function rgb2hsl(rgb) {
  var r = rgb[0]/255,
      g = rgb[1]/255,
      b = rgb[2]/255,
      min = Math.min(r, g, b),
      max = Math.max(r, g, b),
      delta = max - min,
      h, s, l;

  if (max == min)
    h = 0;
  else if (r == max)
    h = (g - b) / delta;
  else if (g == max)
    h = 2 + (b - r) / delta;
  else if (b == max)
    h = 4 + (r - g)/ delta;

  h = Math.min(h * 60, 360);

  if (h < 0)
    h += 360;

  l = (min + max) / 2;

  if (max == min)
    s = 0;
  else if (l <= 0.5)
    s = delta / (max + min);
  else
    s = delta / (2 - max - min);

  return [h, s * 100, l * 100];
}

function rgb2hsv(rgb) {
  var r = rgb[0],
      g = rgb[1],
      b = rgb[2],
      min = Math.min(r, g, b),
      max = Math.max(r, g, b),
      delta = max - min,
      h, s, v;

  if (max == 0)
    s = 0;
  else
    s = (delta/max * 1000)/10;

  if (max == min)
    h = 0;
  else if (r == max)
    h = (g - b) / delta;
  else if (g == max)
    h = 2 + (b - r) / delta;
  else if (b == max)
    h = 4 + (r - g) / delta;

  h = Math.min(h * 60, 360);

  if (h < 0)
    h += 360;

  v = ((max / 255) * 1000) / 10;

  return [h, s, v];
}

function rgb2hwb(rgb) {
  var r = rgb[0],
      g = rgb[1],
      b = rgb[2],
      h = rgb2hsl(rgb)[0],
      w = 1/255 * Math.min(r, Math.min(g, b)),
      b = 1 - 1/255 * Math.max(r, Math.max(g, b));

  return [h, w * 100, b * 100];
}

function rgb2cmyk(rgb) {
  var r = rgb[0] / 255,
      g = rgb[1] / 255,
      b = rgb[2] / 255,
      c, m, y, k;

  k = Math.min(1 - r, 1 - g, 1 - b);
  c = (1 - r - k) / (1 - k) || 0;
  m = (1 - g - k) / (1 - k) || 0;
  y = (1 - b - k) / (1 - k) || 0;
  return [c * 100, m * 100, y * 100, k * 100];
}

function rgb2keyword(rgb) {
  return reverseKeywords[JSON.stringify(rgb)];
}

function rgb2xyz(rgb) {
  var r = rgb[0] / 255,
      g = rgb[1] / 255,
      b = rgb[2] / 255;

  // assume sRGB
  r = r > 0.04045 ? Math.pow(((r + 0.055) / 1.055), 2.4) : (r / 12.92);
  g = g > 0.04045 ? Math.pow(((g + 0.055) / 1.055), 2.4) : (g / 12.92);
  b = b > 0.04045 ? Math.pow(((b + 0.055) / 1.055), 2.4) : (b / 12.92);

  var x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);
  var y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
  var z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);

  return [x * 100, y *100, z * 100];
}

function rgb2lab(rgb) {
  var xyz = rgb2xyz(rgb),
        x = xyz[0],
        y = xyz[1],
        z = xyz[2],
        l, a, b;

  x /= 95.047;
  y /= 100;
  z /= 108.883;

  x = x > 0.008856 ? Math.pow(x, 1/3) : (7.787 * x) + (16 / 116);
  y = y > 0.008856 ? Math.pow(y, 1/3) : (7.787 * y) + (16 / 116);
  z = z > 0.008856 ? Math.pow(z, 1/3) : (7.787 * z) + (16 / 116);

  l = (116 * y) - 16;
  a = 500 * (x - y);
  b = 200 * (y - z);

  return [l, a, b];
}

function rgb2lch(args) {
  return lab2lch(rgb2lab(args));
}

function hsl2rgb(hsl) {
  var h = hsl[0] / 360,
      s = hsl[1] / 100,
      l = hsl[2] / 100,
      t1, t2, t3, rgb, val;

  if (s == 0) {
    val = l * 255;
    return [val, val, val];
  }

  if (l < 0.5)
    t2 = l * (1 + s);
  else
    t2 = l + s - l * s;
  t1 = 2 * l - t2;

  rgb = [0, 0, 0];
  for (var i = 0; i < 3; i++) {
    t3 = h + 1 / 3 * - (i - 1);
    t3 < 0 && t3++;
    t3 > 1 && t3--;

    if (6 * t3 < 1)
      val = t1 + (t2 - t1) * 6 * t3;
    else if (2 * t3 < 1)
      val = t2;
    else if (3 * t3 < 2)
      val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
    else
      val = t1;

    rgb[i] = val * 255;
  }

  return rgb;
}

function hsl2hsv(hsl) {
  var h = hsl[0],
      s = hsl[1] / 100,
      l = hsl[2] / 100,
      sv, v;

  if(l === 0) {
      // no need to do calc on black
      // also avoids divide by 0 error
      return [0, 0, 0];
  }

  l *= 2;
  s *= (l <= 1) ? l : 2 - l;
  v = (l + s) / 2;
  sv = (2 * s) / (l + s);
  return [h, sv * 100, v * 100];
}

function hsl2hwb(args) {
  return rgb2hwb(hsl2rgb(args));
}

function hsl2cmyk(args) {
  return rgb2cmyk(hsl2rgb(args));
}

function hsl2keyword(args) {
  return rgb2keyword(hsl2rgb(args));
}


function hsv2rgb(hsv) {
  var h = hsv[0] / 60,
      s = hsv[1] / 100,
      v = hsv[2] / 100,
      hi = Math.floor(h) % 6;

  var f = h - Math.floor(h),
      p = 255 * v * (1 - s),
      q = 255 * v * (1 - (s * f)),
      t = 255 * v * (1 - (s * (1 - f))),
      v = 255 * v;

  switch(hi) {
    case 0:
      return [v, t, p];
    case 1:
      return [q, v, p];
    case 2:
      return [p, v, t];
    case 3:
      return [p, q, v];
    case 4:
      return [t, p, v];
    case 5:
      return [v, p, q];
  }
}

function hsv2hsl(hsv) {
  var h = hsv[0],
      s = hsv[1] / 100,
      v = hsv[2] / 100,
      sl, l;

  l = (2 - s) * v;
  sl = s * v;
  sl /= (l <= 1) ? l : 2 - l;
  sl = sl || 0;
  l /= 2;
  return [h, sl * 100, l * 100];
}

function hsv2hwb(args) {
  return rgb2hwb(hsv2rgb(args))
}

function hsv2cmyk(args) {
  return rgb2cmyk(hsv2rgb(args));
}

function hsv2keyword(args) {
  return rgb2keyword(hsv2rgb(args));
}

// http://dev.w3.org/csswg/css-color/#hwb-to-rgb
function hwb2rgb(hwb) {
  var h = hwb[0] / 360,
      wh = hwb[1] / 100,
      bl = hwb[2] / 100,
      ratio = wh + bl,
      i, v, f, n;

  // wh + bl cant be > 1
  if (ratio > 1) {
    wh /= ratio;
    bl /= ratio;
  }

  i = Math.floor(6 * h);
  v = 1 - bl;
  f = 6 * h - i;
  if ((i & 0x01) != 0) {
    f = 1 - f;
  }
  n = wh + f * (v - wh);  // linear interpolation

  switch (i) {
    default:
    case 6:
    case 0: r = v; g = n; b = wh; break;
    case 1: r = n; g = v; b = wh; break;
    case 2: r = wh; g = v; b = n; break;
    case 3: r = wh; g = n; b = v; break;
    case 4: r = n; g = wh; b = v; break;
    case 5: r = v; g = wh; b = n; break;
  }

  return [r * 255, g * 255, b * 255];
}

function hwb2hsl(args) {
  return rgb2hsl(hwb2rgb(args));
}

function hwb2hsv(args) {
  return rgb2hsv(hwb2rgb(args));
}

function hwb2cmyk(args) {
  return rgb2cmyk(hwb2rgb(args));
}

function hwb2keyword(args) {
  return rgb2keyword(hwb2rgb(args));
}

function cmyk2rgb(cmyk) {
  var c = cmyk[0] / 100,
      m = cmyk[1] / 100,
      y = cmyk[2] / 100,
      k = cmyk[3] / 100,
      r, g, b;

  r = 1 - Math.min(1, c * (1 - k) + k);
  g = 1 - Math.min(1, m * (1 - k) + k);
  b = 1 - Math.min(1, y * (1 - k) + k);
  return [r * 255, g * 255, b * 255];
}

function cmyk2hsl(args) {
  return rgb2hsl(cmyk2rgb(args));
}

function cmyk2hsv(args) {
  return rgb2hsv(cmyk2rgb(args));
}

function cmyk2hwb(args) {
  return rgb2hwb(cmyk2rgb(args));
}

function cmyk2keyword(args) {
  return rgb2keyword(cmyk2rgb(args));
}


function xyz2rgb(xyz) {
  var x = xyz[0] / 100,
      y = xyz[1] / 100,
      z = xyz[2] / 100,
      r, g, b;

  r = (x * 3.2406) + (y * -1.5372) + (z * -0.4986);
  g = (x * -0.9689) + (y * 1.8758) + (z * 0.0415);
  b = (x * 0.0557) + (y * -0.2040) + (z * 1.0570);

  // assume sRGB
  r = r > 0.0031308 ? ((1.055 * Math.pow(r, 1.0 / 2.4)) - 0.055)
    : r = (r * 12.92);

  g = g > 0.0031308 ? ((1.055 * Math.pow(g, 1.0 / 2.4)) - 0.055)
    : g = (g * 12.92);

  b = b > 0.0031308 ? ((1.055 * Math.pow(b, 1.0 / 2.4)) - 0.055)
    : b = (b * 12.92);

  r = Math.min(Math.max(0, r), 1);
  g = Math.min(Math.max(0, g), 1);
  b = Math.min(Math.max(0, b), 1);

  return [r * 255, g * 255, b * 255];
}

function xyz2lab(xyz) {
  var x = xyz[0],
      y = xyz[1],
      z = xyz[2],
      l, a, b;

  x /= 95.047;
  y /= 100;
  z /= 108.883;

  x = x > 0.008856 ? Math.pow(x, 1/3) : (7.787 * x) + (16 / 116);
  y = y > 0.008856 ? Math.pow(y, 1/3) : (7.787 * y) + (16 / 116);
  z = z > 0.008856 ? Math.pow(z, 1/3) : (7.787 * z) + (16 / 116);

  l = (116 * y) - 16;
  a = 500 * (x - y);
  b = 200 * (y - z);

  return [l, a, b];
}

function xyz2lch(args) {
  return lab2lch(xyz2lab(args));
}

function lab2xyz(lab) {
  var l = lab[0],
      a = lab[1],
      b = lab[2],
      x, y, z, y2;

  if (l <= 8) {
    y = (l * 100) / 903.3;
    y2 = (7.787 * (y / 100)) + (16 / 116);
  } else {
    y = 100 * Math.pow((l + 16) / 116, 3);
    y2 = Math.pow(y / 100, 1/3);
  }

  x = x / 95.047 <= 0.008856 ? x = (95.047 * ((a / 500) + y2 - (16 / 116))) / 7.787 : 95.047 * Math.pow((a / 500) + y2, 3);

  z = z / 108.883 <= 0.008859 ? z = (108.883 * (y2 - (b / 200) - (16 / 116))) / 7.787 : 108.883 * Math.pow(y2 - (b / 200), 3);

  return [x, y, z];
}

function lab2lch(lab) {
  var l = lab[0],
      a = lab[1],
      b = lab[2],
      hr, h, c;

  hr = Math.atan2(b, a);
  h = hr * 360 / 2 / Math.PI;
  if (h < 0) {
    h += 360;
  }
  c = Math.sqrt(a * a + b * b);
  return [l, c, h];
}

function lab2rgb(args) {
  return xyz2rgb(lab2xyz(args));
}

function lch2lab(lch) {
  var l = lch[0],
      c = lch[1],
      h = lch[2],
      a, b, hr;

  hr = h / 360 * 2 * Math.PI;
  a = c * Math.cos(hr);
  b = c * Math.sin(hr);
  return [l, a, b];
}

function lch2xyz(args) {
  return lab2xyz(lch2lab(args));
}

function lch2rgb(args) {
  return lab2rgb(lch2lab(args));
}

function keyword2rgb(keyword) {
  return cssKeywords[keyword];
}

function keyword2hsl(args) {
  return rgb2hsl(keyword2rgb(args));
}

function keyword2hsv(args) {
  return rgb2hsv(keyword2rgb(args));
}

function keyword2hwb(args) {
  return rgb2hwb(keyword2rgb(args));
}

function keyword2cmyk(args) {
  return rgb2cmyk(keyword2rgb(args));
}

function keyword2lab(args) {
  return rgb2lab(keyword2rgb(args));
}

function keyword2xyz(args) {
  return rgb2xyz(keyword2rgb(args));
}

var cssKeywords = {
  aliceblue:  [240,248,255],
  antiquewhite: [250,235,215],
  aqua: [0,255,255],
  aquamarine: [127,255,212],
  azure:  [240,255,255],
  beige:  [245,245,220],
  bisque: [255,228,196],
  black:  [0,0,0],
  blanchedalmond: [255,235,205],
  blue: [0,0,255],
  blueviolet: [138,43,226],
  brown:  [165,42,42],
  burlywood:  [222,184,135],
  cadetblue:  [95,158,160],
  chartreuse: [127,255,0],
  chocolate:  [210,105,30],
  coral:  [255,127,80],
  cornflowerblue: [100,149,237],
  cornsilk: [255,248,220],
  crimson:  [220,20,60],
  cyan: [0,255,255],
  darkblue: [0,0,139],
  darkcyan: [0,139,139],
  darkgoldenrod:  [184,134,11],
  darkgray: [169,169,169],
  darkgreen:  [0,100,0],
  darkgrey: [169,169,169],
  darkkhaki:  [189,183,107],
  darkmagenta:  [139,0,139],
  darkolivegreen: [85,107,47],
  darkorange: [255,140,0],
  darkorchid: [153,50,204],
  darkred:  [139,0,0],
  darksalmon: [233,150,122],
  darkseagreen: [143,188,143],
  darkslateblue:  [72,61,139],
  darkslategray:  [47,79,79],
  darkslategrey:  [47,79,79],
  darkturquoise:  [0,206,209],
  darkviolet: [148,0,211],
  deeppink: [255,20,147],
  deepskyblue:  [0,191,255],
  dimgray:  [105,105,105],
  dimgrey:  [105,105,105],
  dodgerblue: [30,144,255],
  firebrick:  [178,34,34],
  floralwhite:  [255,250,240],
  forestgreen:  [34,139,34],
  fuchsia:  [255,0,255],
  gainsboro:  [220,220,220],
  ghostwhite: [248,248,255],
  gold: [255,215,0],
  goldenrod:  [218,165,32],
  gray: [128,128,128],
  green:  [0,128,0],
  greenyellow:  [173,255,47],
  grey: [128,128,128],
  honeydew: [240,255,240],
  hotpink:  [255,105,180],
  indianred:  [205,92,92],
  indigo: [75,0,130],
  ivory:  [255,255,240],
  khaki:  [240,230,140],
  lavender: [230,230,250],
  lavenderblush:  [255,240,245],
  lawngreen:  [124,252,0],
  lemonchiffon: [255,250,205],
  lightblue:  [173,216,230],
  lightcoral: [240,128,128],
  lightcyan:  [224,255,255],
  lightgoldenrodyellow: [250,250,210],
  lightgray:  [211,211,211],
  lightgreen: [144,238,144],
  lightgrey:  [211,211,211],
  lightpink:  [255,182,193],
  lightsalmon:  [255,160,122],
  lightseagreen:  [32,178,170],
  lightskyblue: [135,206,250],
  lightslategray: [119,136,153],
  lightslategrey: [119,136,153],
  lightsteelblue: [176,196,222],
  lightyellow:  [255,255,224],
  lime: [0,255,0],
  limegreen:  [50,205,50],
  linen:  [250,240,230],
  magenta:  [255,0,255],
  maroon: [128,0,0],
  mediumaquamarine: [102,205,170],
  mediumblue: [0,0,205],
  mediumorchid: [186,85,211],
  mediumpurple: [147,112,219],
  mediumseagreen: [60,179,113],
  mediumslateblue:  [123,104,238],
  mediumspringgreen:  [0,250,154],
  mediumturquoise:  [72,209,204],
  mediumvioletred:  [199,21,133],
  midnightblue: [25,25,112],
  mintcream:  [245,255,250],
  mistyrose:  [255,228,225],
  moccasin: [255,228,181],
  navajowhite:  [255,222,173],
  navy: [0,0,128],
  oldlace:  [253,245,230],
  olive:  [128,128,0],
  olivedrab:  [107,142,35],
  orange: [255,165,0],
  orangered:  [255,69,0],
  orchid: [218,112,214],
  palegoldenrod:  [238,232,170],
  palegreen:  [152,251,152],
  paleturquoise:  [175,238,238],
  palevioletred:  [219,112,147],
  papayawhip: [255,239,213],
  peachpuff:  [255,218,185],
  peru: [205,133,63],
  pink: [255,192,203],
  plum: [221,160,221],
  powderblue: [176,224,230],
  purple: [128,0,128],
  rebeccapurple: [102, 51, 153],
  red:  [255,0,0],
  rosybrown:  [188,143,143],
  royalblue:  [65,105,225],
  saddlebrown:  [139,69,19],
  salmon: [250,128,114],
  sandybrown: [244,164,96],
  seagreen: [46,139,87],
  seashell: [255,245,238],
  sienna: [160,82,45],
  silver: [192,192,192],
  skyblue:  [135,206,235],
  slateblue:  [106,90,205],
  slategray:  [112,128,144],
  slategrey:  [112,128,144],
  snow: [255,250,250],
  springgreen:  [0,255,127],
  steelblue:  [70,130,180],
  tan:  [210,180,140],
  teal: [0,128,128],
  thistle:  [216,191,216],
  tomato: [255,99,71],
  turquoise:  [64,224,208],
  violet: [238,130,238],
  wheat:  [245,222,179],
  white:  [255,255,255],
  whitesmoke: [245,245,245],
  yellow: [255,255,0],
  yellowgreen:  [154,205,50]
};

var reverseKeywords = {};
for (var key in cssKeywords) {
  reverseKeywords[JSON.stringify(cssKeywords[key])] = key;
}

},{}],5:[function(require,module,exports){
var conversions = require("./conversions");

var convert = function() {
   return new Converter();
}

for (var func in conversions) {
  // export Raw versions
  convert[func + "Raw"] =  (function(func) {
    // accept array or plain args
    return function(arg) {
      if (typeof arg == "number")
        arg = Array.prototype.slice.call(arguments);
      return conversions[func](arg);
    }
  })(func);

  var pair = /(\w+)2(\w+)/.exec(func),
      from = pair[1],
      to = pair[2];

  // export rgb2hsl and ["rgb"]["hsl"]
  convert[from] = convert[from] || {};

  convert[from][to] = convert[func] = (function(func) { 
    return function(arg) {
      if (typeof arg == "number")
        arg = Array.prototype.slice.call(arguments);
      
      var val = conversions[func](arg);
      if (typeof val == "string" || val === undefined)
        return val; // keyword

      for (var i = 0; i < val.length; i++)
        val[i] = Math.round(val[i]);
      return val;
    }
  })(func);
}


/* Converter does lazy conversion and caching */
var Converter = function() {
   this.convs = {};
};

/* Either get the values for a space or
  set the values for a space, depending on args */
Converter.prototype.routeSpace = function(space, args) {
   var values = args[0];
   if (values === undefined) {
      // color.rgb()
      return this.getValues(space);
   }
   // color.rgb(10, 10, 10)
   if (typeof values == "number") {
      values = Array.prototype.slice.call(args);        
   }

   return this.setValues(space, values);
};
  
/* Set the values for a space, invalidating cache */
Converter.prototype.setValues = function(space, values) {
   this.space = space;
   this.convs = {};
   this.convs[space] = values;
   return this;
};

/* Get the values for a space. If there's already
  a conversion for the space, fetch it, otherwise
  compute it */
Converter.prototype.getValues = function(space) {
   var vals = this.convs[space];
   if (!vals) {
      var fspace = this.space,
          from = this.convs[fspace];
      vals = convert[fspace][space](from);

      this.convs[space] = vals;
   }
  return vals;
};

["rgb", "hsl", "hsv", "cmyk", "keyword"].forEach(function(space) {
   Converter.prototype[space] = function(vals) {
      return this.routeSpace(space, arguments);
   }
});

module.exports = convert;
},{"./conversions":4}],6:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],7:[function(require,module,exports){
module.exports = function(strings) {
  if (typeof strings === 'string') strings = [strings]
  var exprs = [].slice.call(arguments,1)
  var parts = []
  for (var i = 0; i < strings.length-1; i++) {
    parts.push(strings[i], exprs[i] || '')
  }
  parts.push(strings[i])
  return parts.join('')
}

},{}],8:[function(require,module,exports){
var convert = require('color-convert');

module.exports = function (cstr) {
    var m, conv, parts, alpha;
    if (m = /^((?:rgb|hs[lv]|cmyk|xyz|lab)a?)\s*\(([^\)]*)\)/.exec(cstr)) {
        var name = m[1];
        var base = name.replace(/a$/, '');
        var size = base === 'cmyk' ? 4 : 3;
        conv = convert[base];
        
        parts = m[2].replace(/^\s+|\s+$/g, '')
            .split(/\s*,\s*/)
            .map(function (x, i) {
                if (/%$/.test(x) && i === size) {
                    return parseFloat(x) / 100;
                }
                else if (/%$/.test(x)) {
                    return parseFloat(x);
                }
                return parseFloat(x);
            })
        ;
        if (name === base) parts.push(1);
        alpha = parts[size] === undefined ? 1 : parts[size];
        parts = parts.slice(0, size);
        
        conv[base] = function () { return parts };
    }
    else if (/^#[A-Fa-f0-9]+$/.test(cstr)) {
        var base = cstr.replace(/^#/,'');
        var size = base.length;
        conv = convert.rgb;
        parts = base.split(size === 3 ? /(.)/ : /(..)/);
        parts = parts.filter(Boolean)
            .map(function (x) {
                if (size === 3) {
                    return parseInt(x + x, 16);
                }
                else {
                    return parseInt(x, 16)
                }
            })
        ;
        alpha = 1;
        conv.rgb = function () { return parts };
        if (!parts[0]) parts[0] = 0;
        if (!parts[1]) parts[1] = 0;
        if (!parts[2]) parts[2] = 0;
    }
    else {
        conv = convert.keyword;
        conv.keyword = function () { return cstr };
        parts = cstr;
        alpha = 1;
    }
    
    var res = {
        rgb: undefined,
        hsl: undefined,
        hsv: undefined,
        cmyk: undefined,
        keyword: undefined,
        hex: undefined
    };
    try { res.rgb = conv.rgb(parts) } catch (e) {}
    try { res.hsl = conv.hsl(parts) } catch (e) {}
    try { res.hsv = conv.hsv(parts) } catch (e) {}
    try { res.cmyk = conv.cmyk(parts) } catch (e) {}
    try { res.keyword = conv.keyword(parts) } catch (e) {}
    
    if (res.rgb) res.hex = '#' + res.rgb.map(function (x) {
        var s = x.toString(16);
        if (s.length === 1) return '0' + s;
        return s;
    }).join('');
    
    if (res.rgb) res.rgba = res.rgb.concat(alpha);
    if (res.hsl) res.hsla = res.hsl.concat(alpha);
    if (res.hsv) res.hsva = res.hsv.concat(alpha);
    if (res.cmyk) res.cmyka = res.cmyk.concat(alpha);
    
    return res;
};

},{"color-convert":5}],9:[function(require,module,exports){
module.exports = primitiveQuad

function primitiveQuad (scale) {
  scale = typeof scale !== 'undefined' ? scale : 1
  if (!Array.isArray(scale)) {
    scale = [scale, scale]
  }

  var positions = [
    [-scale[0], -scale[1], 0],
    [scale[0], -scale[1], 0],
    [scale[0], scale[1], 0],
    [-scale[0], scale[1], 0]
  ]
  var cells = [
    [0, 1, 2],
    [2, 3, 0]
  ]
  var uvs = [[0, 0], [1, 0], [1, 1], [0, 1]]
  var n = [0, 0, -1]
  var normals = [ n.slice(), n.slice(), n.slice(), n.slice() ]
  return {
    positions: positions,
    cells: cells,
    uvs: uvs,
    normals: normals
  }
}

},{}],10:[function(require,module,exports){
(function(ja,N){"object"===typeof exports&&"undefined"!==typeof module?module.exports=N():"function"===typeof define&&define.amd?define(N):ja.createREGL=N()})(this,function(){function ja(a,b){this.id=Bb++;this.type=a;this.data=b}function N(a){if(0===a.length)return[];var b=a.charAt(0),c=a.charAt(a.length-1);if(1<a.length&&b===c&&('"'===b||"'"===b))return['"'+a.substr(1,a.length-2).replace(/\\/g,"\\\\").replace(/"/g,'\\"')+'"'];if(b=/\[(false|true|null|\d+|'[^']*'|"[^"]*")\]/.exec(a))return N(a.substr(0,
b.index)).concat(N(b[1])).concat(N(a.substr(b.index+b[0].length)));b=a.split(".");if(1===b.length)return['"'+a.replace(/\\/g,"\\\\").replace(/"/g,'\\"')+'"'];a=[];for(c=0;c<b.length;++c)a=a.concat(N(b[c]));return a}function bb(a){return"["+N(a).join("][")+"]"}function Cb(){var a={"":0},b=[""];return{id:function(c){var e=a[c];if(e)return e;e=a[c]=b.length;b.push(c);return e},str:function(a){return b[a]}}}function Db(a,b,c){function e(){var b=window.innerWidth,e=window.innerHeight;a!==document.body&&
(e=a.getBoundingClientRect(),b=e.right-e.left,e=e.bottom-e.top);g.width=c*b;g.height=c*e;H(g.style,{width:b+"px",height:e+"px"})}var g=document.createElement("canvas");H(g.style,{border:0,margin:0,padding:0,top:0,left:0});a.appendChild(g);a===document.body&&(g.style.position="absolute",H(a.style,{margin:0,padding:0}));var d;a!==document.body&&"function"===typeof ResizeObserver?(d=new ResizeObserver(function(){setTimeout(e)}),d.observe(a)):window.addEventListener("resize",e,!1);e();return{canvas:g,
onDestroy:function(){d?d.disconnect():window.removeEventListener("resize",e);a.removeChild(g)}}}function Eb(a,b){function c(c){try{return a.getContext(c,b)}catch(g){return null}}return c("webgl")||c("experimental-webgl")||c("webgl-experimental")}function cb(a){return"string"===typeof a?a.split():a}function db(a){return"string"===typeof a?document.querySelector(a):a}function Fb(a){var b=a||{},c,e,g,d;a={};var r=[],n=[],u="undefined"===typeof window?1:window.devicePixelRatio,q=!1,t=function(a){},m=
function(){};"string"===typeof b?c=document.querySelector(b):"object"===typeof b&&("string"===typeof b.nodeName&&"function"===typeof b.appendChild&&"function"===typeof b.getBoundingClientRect?c=b:"function"===typeof b.drawArrays||"function"===typeof b.drawElements?(d=b,g=d.canvas):("gl"in b?d=b.gl:"canvas"in b?g=db(b.canvas):"container"in b&&(e=db(b.container)),"attributes"in b&&(a=b.attributes),"extensions"in b&&(r=cb(b.extensions)),"optionalExtensions"in b&&(n=cb(b.optionalExtensions)),"onDone"in
b&&(t=b.onDone),"profile"in b&&(q=!!b.profile),"pixelRatio"in b&&(u=+b.pixelRatio)));c&&("canvas"===c.nodeName.toLowerCase()?g=c:e=c);if(!d){if(!g){c=Db(e||document.body,t,u);if(!c)return null;g=c.canvas;m=c.onDestroy}void 0===a.premultipliedAlpha&&(a.premultipliedAlpha=!0);d=Eb(g,a)}return d?{gl:d,canvas:g,container:e,extensions:r,optionalExtensions:n,pixelRatio:u,profile:q,onDone:t,onDestroy:m}:(m(),t("webgl not supported, try upgrading your browser or graphics drivers http://get.webgl.org"),null)}
function Gb(a,b){function c(b){b=b.toLowerCase();var c;try{c=e[b]=a.getExtension(b)}catch(g){}return!!c}for(var e={},g=0;g<b.extensions.length;++g){var d=b.extensions[g];if(!c(d))return b.onDestroy(),b.onDone('"'+d+'" extension is not supported by the current WebGL context, try upgrading your system or a different browser'),null}b.optionalExtensions.forEach(c);return{extensions:e,restore:function(){Object.keys(e).forEach(function(a){if(e[a]&&!c(a))throw Error("(regl): error restoring extension "+
a);})}}}function A(a,b){for(var c=Array(a),e=0;e<a;++e)c[e]=b(e);return c}function eb(a){var b,c;b=(65535<a)<<4;a>>>=b;c=(255<a)<<3;a>>>=c;b|=c;c=(15<a)<<2;a>>>=c;b|=c;c=(3<a)<<1;return b|c|a>>>c>>1}function fb(){function a(a){a:{for(var b=16;268435456>=b;b*=16)if(a<=b){a=b;break a}a=0}b=c[eb(a)>>2];return 0<b.length?b.pop():new ArrayBuffer(a)}function b(a){c[eb(a.byteLength)>>2].push(a)}var c=A(8,function(){return[]});return{alloc:a,free:b,allocType:function(b,c){var d=null;switch(b){case 5120:d=
new Int8Array(a(c),0,c);break;case 5121:d=new Uint8Array(a(c),0,c);break;case 5122:d=new Int16Array(a(2*c),0,c);break;case 5123:d=new Uint16Array(a(2*c),0,c);break;case 5124:d=new Int32Array(a(4*c),0,c);break;case 5125:d=new Uint32Array(a(4*c),0,c);break;case 5126:d=new Float32Array(a(4*c),0,c);break;default:return null}return d.length!==c?d.subarray(0,c):d},freeType:function(a){b(a.buffer)}}}function X(a){return!!a&&"object"===typeof a&&Array.isArray(a.shape)&&Array.isArray(a.stride)&&"number"===
typeof a.offset&&a.shape.length===a.stride.length&&(Array.isArray(a.data)||G(a.data))}function gb(a,b,c,e,g,d){for(var r=0;r<b;++r)for(var n=a[r],u=0;u<c;++u)for(var q=n[u],t=0;t<e;++t)g[d++]=q[t]}function hb(a,b,c,e,g){for(var d=1,r=c+1;r<b.length;++r)d*=b[r];var n=b[c];if(4===b.length-c){var u=b[c+1],q=b[c+2];b=b[c+3];for(r=0;r<n;++r)gb(a[r],u,q,b,e,g),g+=d}else for(r=0;r<n;++r)hb(a[r],b,c+1,e,g),g+=d}function Fa(a){return Ga[Object.prototype.toString.call(a)]|0}function ib(a,b){for(var c=0;c<b.length;++c)a[c]=
b[c]}function jb(a,b,c,e,g,d,r){for(var n=0,u=0;u<c;++u)for(var q=0;q<e;++q)a[n++]=b[g*u+d*q+r]}function Hb(a,b,c,e){function g(b){this.id=u++;this.buffer=a.createBuffer();this.type=b;this.usage=35044;this.byteLength=0;this.dimension=1;this.dtype=5121;this.persistentData=null;c.profile&&(this.stats={size:0})}function d(b,c,k){b.byteLength=c.byteLength;a.bufferData(b.type,c,k)}function r(a,b,c,h,f,p){a.usage=c;if(Array.isArray(b)){if(a.dtype=h||5126,0<b.length)if(Array.isArray(b[0])){f=kb(b);for(var l=
h=1;l<f.length;++l)h*=f[l];a.dimension=h;b=Qa(b,f,a.dtype);d(a,b,c);p?a.persistentData=b:z.freeType(b)}else"number"===typeof b[0]?(a.dimension=f,f=z.allocType(a.dtype,b.length),ib(f,b),d(a,f,c),p?a.persistentData=f:z.freeType(f)):G(b[0])&&(a.dimension=b[0].length,a.dtype=h||Fa(b[0])||5126,b=Qa(b,[b.length,b[0].length],a.dtype),d(a,b,c),p?a.persistentData=b:z.freeType(b))}else if(G(b))a.dtype=h||Fa(b),a.dimension=f,d(a,b,c),p&&(a.persistentData=new Uint8Array(new Uint8Array(b.buffer)));else if(X(b)){f=
b.shape;var v=b.stride,l=b.offset,e=0,g=0,q=0,n=0;1===f.length?(e=f[0],g=1,q=v[0],n=0):2===f.length&&(e=f[0],g=f[1],q=v[0],n=v[1]);a.dtype=h||Fa(b.data)||5126;a.dimension=g;f=z.allocType(a.dtype,e*g);jb(f,b.data,e,g,q,n,l);d(a,f,c);p?a.persistentData=f:z.freeType(f)}else b instanceof ArrayBuffer&&(a.dtype=5121,a.dimension=f,d(a,b,c),p&&(a.persistentData=new Uint8Array(new Uint8Array(b))))}function n(c){b.bufferCount--;e(c);a.deleteBuffer(c.buffer);c.buffer=null;delete q[c.id]}var u=0,q={};g.prototype.bind=
function(){a.bindBuffer(this.type,this.buffer)};g.prototype.destroy=function(){n(this)};var t=[];c.profile&&(b.getTotalBufferSize=function(){var a=0;Object.keys(q).forEach(function(b){a+=q[b].stats.size});return a});return{create:function(m,e,d,h){function f(b){var m=35044,e=null,d=0,g=0,k=1;Array.isArray(b)||G(b)||X(b)||b instanceof ArrayBuffer?e=b:"number"===typeof b?d=b|0:b&&("data"in b&&(e=b.data),"usage"in b&&(m=lb[b.usage]),"type"in b&&(g=Ha[b.type]),"dimension"in b&&(k=b.dimension|0),"length"in
b&&(d=b.length|0));p.bind();e?r(p,e,m,g,k,h):(d&&a.bufferData(p.type,d,m),p.dtype=g||5121,p.usage=m,p.dimension=k,p.byteLength=d);c.profile&&(p.stats.size=p.byteLength*ha[p.dtype]);return f}b.bufferCount++;var p=new g(e);q[p.id]=p;d||f(m);f._reglType="buffer";f._buffer=p;f.subdata=function(b,c){var m=(c||0)|0,h;p.bind();if(G(b)||b instanceof ArrayBuffer)a.bufferSubData(p.type,m,b);else if(Array.isArray(b)){if(0<b.length)if("number"===typeof b[0]){var d=z.allocType(p.dtype,b.length);ib(d,b);a.bufferSubData(p.type,
m,d);z.freeType(d)}else if(Array.isArray(b[0])||G(b[0]))h=kb(b),d=Qa(b,h,p.dtype),a.bufferSubData(p.type,m,d),z.freeType(d)}else if(X(b)){h=b.shape;var e=b.stride,g=d=0,k=0,q=0;1===h.length?(d=h[0],g=1,k=e[0],q=0):2===h.length&&(d=h[0],g=h[1],k=e[0],q=e[1]);h=Array.isArray(b.data)?p.dtype:Fa(b.data);h=z.allocType(h,d*g);jb(h,b.data,d,g,k,q,b.offset);a.bufferSubData(p.type,m,h);z.freeType(h)}return f};c.profile&&(f.stats=p.stats);f.destroy=function(){n(p)};return f},createStream:function(a,b){var c=
t.pop();c||(c=new g(a));c.bind();r(c,b,35040,0,1,!1);return c},destroyStream:function(a){t.push(a)},clear:function(){J(q).forEach(n);t.forEach(n)},getBuffer:function(a){return a&&a._buffer instanceof g?a._buffer:null},restore:function(){J(q).forEach(function(b){b.buffer=a.createBuffer();a.bindBuffer(b.type,b.buffer);a.bufferData(b.type,b.persistentData||b.byteLength,b.usage)})},_initBuffer:r}}function Ib(a,b,c,e){function g(a){this.id=u++;n[this.id]=this;this.buffer=a;this.primType=4;this.type=this.vertCount=
0}function d(d,e,g,h,f,p,l){d.buffer.bind();var v;e?((v=l)||G(e)&&(!X(e)||G(e.data))||(v=b.oes_element_index_uint?5125:5123),c._initBuffer(d.buffer,e,g,v,3)):(a.bufferData(34963,p,g),d.buffer.dtype=v||5121,d.buffer.usage=g,d.buffer.dimension=3,d.buffer.byteLength=p);v=l;if(!l){switch(d.buffer.dtype){case 5121:case 5120:v=5121;break;case 5123:case 5122:v=5123;break;case 5125:case 5124:v=5125}d.buffer.dtype=v}d.type=v;e=f;0>e&&(e=d.buffer.byteLength,5123===v?e>>=1:5125===v&&(e>>=2));d.vertCount=e;e=
h;0>h&&(e=4,h=d.buffer.dimension,1===h&&(e=0),2===h&&(e=1),3===h&&(e=4));d.primType=e}function r(a){e.elementsCount--;delete n[a.id];a.buffer.destroy();a.buffer=null}var n={},u=0,q={uint8:5121,uint16:5123};b.oes_element_index_uint&&(q.uint32=5125);g.prototype.bind=function(){this.buffer.bind()};var t=[];return{create:function(a,b){function k(a){if(a)if("number"===typeof a)h(a),f.primType=4,f.vertCount=a|0,f.type=5121;else{var b=null,c=35044,e=-1,g=-1,m=0,n=0;if(Array.isArray(a)||G(a)||X(a))b=a;else if("data"in
a&&(b=a.data),"usage"in a&&(c=lb[a.usage]),"primitive"in a&&(e=Sa[a.primitive]),"count"in a&&(g=a.count|0),"type"in a&&(n=q[a.type]),"length"in a)m=a.length|0;else if(m=g,5123===n||5122===n)m*=2;else if(5125===n||5124===n)m*=4;d(f,b,c,e,g,m,n)}else h(),f.primType=4,f.vertCount=0,f.type=5121;return k}var h=c.create(null,34963,!0),f=new g(h._buffer);e.elementsCount++;k(a);k._reglType="elements";k._elements=f;k.subdata=function(a,b){h.subdata(a,b);return k};k.destroy=function(){r(f)};return k},createStream:function(a){var b=
t.pop();b||(b=new g(c.create(null,34963,!0,!1)._buffer));d(b,a,35040,-1,-1,0,0);return b},destroyStream:function(a){t.push(a)},getElements:function(a){return"function"===typeof a&&a._elements instanceof g?a._elements:null},clear:function(){J(n).forEach(r)}}}function nb(a){for(var b=z.allocType(5123,a.length),c=0;c<a.length;++c)if(isNaN(a[c]))b[c]=65535;else if(Infinity===a[c])b[c]=31744;else if(-Infinity===a[c])b[c]=64512;else{ob[0]=a[c];var e=Jb[0],g=e>>>31<<15,d=(e<<1>>>24)-127,e=e>>13&1023;b[c]=
-24>d?g:-14>d?g+(e+1024>>-14-d):15<d?g+31744:g+(d+15<<10)+e}return b}function na(a){return Array.isArray(a)||G(a)}function ka(a){return"[object "+a+"]"}function pb(a){return Array.isArray(a)&&(0===a.length||"number"===typeof a[0])}function qb(a){return Array.isArray(a)&&0!==a.length&&na(a[0])?!0:!1}function Y(a){return Object.prototype.toString.call(a)}function Ta(a){if(!a)return!1;var b=Y(a);return 0<=Kb.indexOf(b)?!0:pb(a)||qb(a)||X(a)}function rb(a,b){36193===a.type?(a.data=nb(b),z.freeType(b)):
a.data=b}function Ia(a,b,c,e,g,d){a="undefined"!==typeof w[a]?w[a]:S[a]*Z[b];d&&(a*=6);if(g){for(e=0;1<=c;)e+=a*c*c,c/=2;return e}return a*c*e}function Lb(a,b,c,e,g,d,r){function n(){this.format=this.internalformat=6408;this.type=5121;this.flipY=this.premultiplyAlpha=this.compressed=!1;this.unpackAlignment=1;this.colorSpace=37444;this.channels=this.height=this.width=0}function u(a,b){a.internalformat=b.internalformat;a.format=b.format;a.type=b.type;a.compressed=b.compressed;a.premultiplyAlpha=b.premultiplyAlpha;
a.flipY=b.flipY;a.unpackAlignment=b.unpackAlignment;a.colorSpace=b.colorSpace;a.width=b.width;a.height=b.height;a.channels=b.channels}function q(a,b){if("object"===typeof b&&b){"premultiplyAlpha"in b&&(a.premultiplyAlpha=b.premultiplyAlpha);"flipY"in b&&(a.flipY=b.flipY);"alignment"in b&&(a.unpackAlignment=b.alignment);"colorSpace"in b&&(a.colorSpace=Mb[b.colorSpace]);"type"in b&&(a.type=K[b.type]);var c=a.width,f=a.height,e=a.channels,d=!1;"shape"in b?(c=b.shape[0],f=b.shape[1],3===b.shape.length&&
(e=b.shape[2],d=!0)):("radius"in b&&(c=f=b.radius),"width"in b&&(c=b.width),"height"in b&&(f=b.height),"channels"in b&&(e=b.channels,d=!0));a.width=c|0;a.height=f|0;a.channels=e|0;c=!1;"format"in b&&(c=b.format,f=a.internalformat=B[c],a.format=M[f],c in K&&!("type"in b)&&(a.type=K[c]),c in V&&(a.compressed=!0),c=!0);!d&&c?a.channels=S[a.format]:d&&!c&&a.channels!==La[a.format]&&(a.format=a.internalformat=La[a.channels])}}function t(b){a.pixelStorei(37440,b.flipY);a.pixelStorei(37441,b.premultiplyAlpha);
a.pixelStorei(37443,b.colorSpace);a.pixelStorei(3317,b.unpackAlignment)}function m(){n.call(this);this.yOffset=this.xOffset=0;this.data=null;this.needsFree=!1;this.element=null;this.needsCopy=!1}function F(a,b){var c=null;Ta(b)?c=b:b&&(q(a,b),"x"in b&&(a.xOffset=b.x|0),"y"in b&&(a.yOffset=b.y|0),Ta(b.data)&&(c=b.data));if(b.copy){var f=g.viewportWidth,d=g.viewportHeight;a.width=a.width||f-a.xOffset;a.height=a.height||d-a.yOffset;a.needsCopy=!0}else if(!c)a.width=a.width||1,a.height=a.height||1,a.channels=
a.channels||4;else if(G(c))a.channels=a.channels||4,a.data=c,"type"in b||5121!==a.type||(a.type=Ga[Object.prototype.toString.call(c)]|0);else if(pb(c)){a.channels=a.channels||4;f=c;d=f.length;switch(a.type){case 5121:case 5123:case 5125:case 5126:d=z.allocType(a.type,d);d.set(f);a.data=d;break;case 36193:a.data=nb(f)}a.alignment=1;a.needsFree=!0}else if(X(c)){f=c.data;Array.isArray(f)||5121!==a.type||(a.type=Ga[Object.prototype.toString.call(f)]|0);var d=c.shape,e=c.stride,h,l,k,p;3===d.length?(k=
d[2],p=e[2]):p=k=1;h=d[0];l=d[1];d=e[0];e=e[1];a.alignment=1;a.width=h;a.height=l;a.channels=k;a.format=a.internalformat=La[k];a.needsFree=!0;h=p;c=c.offset;k=a.width;p=a.height;l=a.channels;for(var y=z.allocType(36193===a.type?5126:a.type,k*p*l),I=0,U=0;U<p;++U)for(var da=0;da<k;++da)for(var Ua=0;Ua<l;++Ua)y[I++]=f[d*da+e*U+h*Ua+c];rb(a,y)}else if(Y(c)===Va||Y(c)===Wa||Y(c)===sb)Y(c)===Va||Y(c)===Wa?a.element=c:a.element=c.canvas,a.width=a.element.width,a.height=a.element.height,a.channels=4;else if(Y(c)===
tb)a.element=c,a.width=c.width,a.height=c.height,a.channels=4;else if(Y(c)===ub)a.element=c,a.width=c.naturalWidth,a.height=c.naturalHeight,a.channels=4;else if(Y(c)===vb)a.element=c,a.width=c.videoWidth,a.height=c.videoHeight,a.channels=4;else if(qb(c)){f=a.width||c[0].length;d=a.height||c.length;e=a.channels;e=na(c[0][0])?e||c[0][0].length:e||1;h=Ma.shape(c);k=1;for(p=0;p<h.length;++p)k*=h[p];k=z.allocType(36193===a.type?5126:a.type,k);Ma.flatten(c,h,"",k);rb(a,k);a.alignment=1;a.width=f;a.height=
d;a.channels=e;a.format=a.internalformat=La[e];a.needsFree=!0}}function k(b,c,f,d,h){var g=b.element,k=b.data,l=b.internalformat,p=b.format,v=b.type,y=b.width,I=b.height;t(b);g?a.texSubImage2D(c,h,f,d,p,v,g):b.compressed?a.compressedTexSubImage2D(c,h,f,d,l,y,I,k):b.needsCopy?(e(),a.copyTexSubImage2D(c,h,f,d,b.xOffset,b.yOffset,y,I)):a.texSubImage2D(c,h,f,d,y,I,p,v,k)}function h(){return L.pop()||new m}function f(a){a.needsFree&&z.freeType(a.data);m.call(a);L.push(a)}function p(){n.call(this);this.genMipmaps=
!1;this.mipmapHint=4352;this.mipmask=0;this.images=Array(16)}function l(a,b,c){var f=a.images[0]=h();a.mipmask=1;f.width=a.width=b;f.height=a.height=c;f.channels=a.channels=4}function v(a,b){var c=null;if(Ta(b))c=a.images[0]=h(),u(c,a),F(c,b),a.mipmask=1;else if(q(a,b),Array.isArray(b.mipmap))for(var f=b.mipmap,d=0;d<f.length;++d)c=a.images[d]=h(),u(c,a),c.width>>=d,c.height>>=d,F(c,f[d]),a.mipmask|=1<<d;else c=a.images[0]=h(),u(c,a),F(c,b),a.mipmask=1;u(a,a.images[0])}function Q(b,c){for(var f=b.images,
d=0;d<f.length&&f[d];++d){var h=f[d],g=c,k=d,l=h.element,p=h.data,v=h.internalformat,y=h.format,I=h.type,U=h.width,da=h.height;t(h);l?a.texImage2D(g,k,y,y,I,l):h.compressed?a.compressedTexImage2D(g,k,v,U,da,0,p):h.needsCopy?(e(),a.copyTexImage2D(g,k,y,h.xOffset,h.yOffset,U,da,0)):a.texImage2D(g,k,y,U,da,0,y,I,p||null)}}function C(){var a=A.pop()||new p;n.call(a);for(var b=a.mipmask=0;16>b;++b)a.images[b]=null;return a}function va(a){for(var b=a.images,c=0;c<b.length;++c)b[c]&&f(b[c]),b[c]=null;A.push(a)}
function ea(){this.magFilter=this.minFilter=9728;this.wrapT=this.wrapS=33071;this.anisotropic=1;this.genMipmaps=!1;this.mipmapHint=4352}function mb(a,b){"min"in b&&(a.minFilter=O[b.min],0<=Nb.indexOf(a.minFilter)&&!("faces"in b)&&(a.genMipmaps=!0));"mag"in b&&(a.magFilter=T[b.mag]);var c=a.wrapS,f=a.wrapT;if("wrap"in b){var d=b.wrap;"string"===typeof d?c=f=la[d]:Array.isArray(d)&&(c=la[d[0]],f=la[d[1]])}else"wrapS"in b&&(c=la[b.wrapS]),"wrapT"in b&&(f=la[b.wrapT]);a.wrapS=c;a.wrapT=f;"anisotropic"in
b&&(a.anisotropic=b.anisotropic);if("mipmap"in b){c=!1;switch(typeof b.mipmap){case "string":a.mipmapHint=x[b.mipmap];c=a.genMipmaps=!0;break;case "boolean":c=a.genMipmaps=b.mipmap;break;case "object":a.genMipmaps=!1,c=!0}!c||"min"in b||(a.minFilter=9984)}}function Ra(c,f){a.texParameteri(f,10241,c.minFilter);a.texParameteri(f,10240,c.magFilter);a.texParameteri(f,10242,c.wrapS);a.texParameteri(f,10243,c.wrapT);b.ext_texture_filter_anisotropic&&a.texParameteri(f,34046,c.anisotropic);c.genMipmaps&&
(a.hint(33170,c.mipmapHint),a.generateMipmap(f))}function R(b){n.call(this);this.mipmask=0;this.internalformat=6408;this.id=P++;this.refCount=1;this.target=b;this.texture=a.createTexture();this.unit=-1;this.bindCount=0;this.texInfo=new ea;r.profile&&(this.stats={size:0})}function sa(b){a.activeTexture(33984);a.bindTexture(b.target,b.texture)}function za(){var b=W[0];b?a.bindTexture(b.target,b.texture):a.bindTexture(3553,null)}function D(b){var c=b.texture,f=b.unit,h=b.target;0<=f&&(a.activeTexture(33984+
f),a.bindTexture(h,null),W[f]=null);a.deleteTexture(c);b.texture=null;b.params=null;b.pixels=null;b.refCount=0;delete E[b.id];d.textureCount--}var x={"don't care":4352,"dont care":4352,nice:4354,fast:4353},la={repeat:10497,clamp:33071,mirror:33648},T={nearest:9728,linear:9729},O=H({mipmap:9987,"nearest mipmap nearest":9984,"linear mipmap nearest":9985,"nearest mipmap linear":9986,"linear mipmap linear":9987},T),Mb={none:0,browser:37444},K={uint8:5121,rgba4:32819,rgb565:33635,"rgb5 a1":32820},B={alpha:6406,
luminance:6409,"luminance alpha":6410,rgb:6407,rgba:6408,rgba4:32854,"rgb5 a1":32855,rgb565:36194},V={};b.ext_srgb&&(B.srgb=35904,B.srgba=35906);b.oes_texture_float&&(K.float32=K["float"]=5126);b.oes_texture_half_float&&(K.float16=K["half float"]=36193);b.webgl_depth_texture&&(H(B,{depth:6402,"depth stencil":34041}),H(K,{uint16:5123,uint32:5125,"depth stencil":34042}));b.webgl_compressed_texture_s3tc&&H(V,{"rgb s3tc dxt1":33776,"rgba s3tc dxt1":33777,"rgba s3tc dxt3":33778,"rgba s3tc dxt5":33779});
b.webgl_compressed_texture_atc&&H(V,{"rgb atc":35986,"rgba atc explicit alpha":35987,"rgba atc interpolated alpha":34798});b.webgl_compressed_texture_pvrtc&&H(V,{"rgb pvrtc 4bppv1":35840,"rgb pvrtc 2bppv1":35841,"rgba pvrtc 4bppv1":35842,"rgba pvrtc 2bppv1":35843});b.webgl_compressed_texture_etc1&&(V["rgb etc1"]=36196);var w=Array.prototype.slice.call(a.getParameter(34467));Object.keys(V).forEach(function(a){var b=V[a];0<=w.indexOf(b)&&(B[a]=b)});var wa=Object.keys(B);c.textureFormats=wa;var aa=[];
Object.keys(B).forEach(function(a){aa[B[a]]=a});var xa=[];Object.keys(K).forEach(function(a){xa[K[a]]=a});var ba=[];Object.keys(T).forEach(function(a){ba[T[a]]=a});var Da=[];Object.keys(O).forEach(function(a){Da[O[a]]=a});var fa=[];Object.keys(la).forEach(function(a){fa[la[a]]=a});var M=wa.reduce(function(a,c){var f=B[c];6409===f||6406===f||6409===f||6410===f||6402===f||34041===f||b.ext_srgb&&(35904===f||35906===f)?a[f]=f:32855===f||0<=c.indexOf("rgba")?a[f]=6408:a[f]=6407;return a},{}),L=[],A=[],
P=0,E={},ia=c.maxTextureUnits,W=Array(ia).map(function(){return null});H(R.prototype,{bind:function(){this.bindCount+=1;var b=this.unit;if(0>b){for(var c=0;c<ia;++c){var f=W[c];if(f){if(0<f.bindCount)continue;f.unit=-1}W[c]=this;b=c;break}r.profile&&d.maxTextureUnits<b+1&&(d.maxTextureUnits=b+1);this.unit=b;a.activeTexture(33984+b);a.bindTexture(this.target,this.texture)}return b},unbind:function(){--this.bindCount},decRef:function(){0>=--this.refCount&&D(this)}});r.profile&&(d.getTotalTextureSize=
function(){var a=0;Object.keys(E).forEach(function(b){a+=E[b].stats.size});return a});return{create2D:function(b,c){function e(a,b){var c=g.texInfo;ea.call(c);var f=C();"number"===typeof a?"number"===typeof b?l(f,a|0,b|0):l(f,a|0,a|0):a?(mb(c,a),v(f,a)):l(f,1,1);c.genMipmaps&&(f.mipmask=(f.width<<1)-1);g.mipmask=f.mipmask;u(g,f);g.internalformat=f.internalformat;e.width=f.width;e.height=f.height;sa(g);Q(f,3553);Ra(c,3553);za();va(f);r.profile&&(g.stats.size=Ia(g.internalformat,g.type,f.width,f.height,
c.genMipmaps,!1));e.format=aa[g.internalformat];e.type=xa[g.type];e.mag=ba[c.magFilter];e.min=Da[c.minFilter];e.wrapS=fa[c.wrapS];e.wrapT=fa[c.wrapT];return e}var g=new R(3553);E[g.id]=g;d.textureCount++;e(b,c);e.subimage=function(a,b,c,d){b|=0;c|=0;d|=0;var l=h();u(l,g);l.width=0;l.height=0;F(l,a);l.width=l.width||(g.width>>d)-b;l.height=l.height||(g.height>>d)-c;sa(g);k(l,3553,b,c,d);za();f(l);return e};e.resize=function(b,c){var f=b|0,d=c|0||f;if(f===g.width&&d===g.height)return e;e.width=g.width=
f;e.height=g.height=d;sa(g);for(var h=0;g.mipmask>>h;++h){var l=f>>h,y=d>>h;if(!l||!y)break;a.texImage2D(3553,h,g.format,l,y,0,g.format,g.type,null)}za();r.profile&&(g.stats.size=Ia(g.internalformat,g.type,f,d,!1,!1));return e};e._reglType="texture2d";e._texture=g;r.profile&&(e.stats=g.stats);e.destroy=function(){g.decRef()};return e},createCube:function(b,c,e,g,p,n){function m(a,b,c,f,d,e){var h,ma=x.texInfo;ea.call(ma);for(h=0;6>h;++h)D[h]=C();if("number"===typeof a||!a)for(a=a|0||1,h=0;6>h;++h)l(D[h],
a,a);else if("object"===typeof a)if(b)v(D[0],a),v(D[1],b),v(D[2],c),v(D[3],f),v(D[4],d),v(D[5],e);else if(mb(ma,a),q(x,a),"faces"in a)for(a=a.faces,h=0;6>h;++h)u(D[h],x),v(D[h],a[h]);else for(h=0;6>h;++h)v(D[h],a);u(x,D[0]);x.mipmask=ma.genMipmaps?(D[0].width<<1)-1:D[0].mipmask;x.internalformat=D[0].internalformat;m.width=D[0].width;m.height=D[0].height;sa(x);for(h=0;6>h;++h)Q(D[h],34069+h);Ra(ma,34067);za();r.profile&&(x.stats.size=Ia(x.internalformat,x.type,m.width,m.height,ma.genMipmaps,!0));m.format=
aa[x.internalformat];m.type=xa[x.type];m.mag=ba[ma.magFilter];m.min=Da[ma.minFilter];m.wrapS=fa[ma.wrapS];m.wrapT=fa[ma.wrapT];for(h=0;6>h;++h)va(D[h]);return m}var x=new R(34067);E[x.id]=x;d.cubeCount++;var D=Array(6);m(b,c,e,g,p,n);m.subimage=function(a,b,c,d,e){c|=0;d|=0;e|=0;var g=h();u(g,x);g.width=0;g.height=0;F(g,b);g.width=g.width||(x.width>>e)-c;g.height=g.height||(x.height>>e)-d;sa(x);k(g,34069+a,c,d,e);za();f(g);return m};m.resize=function(b){b|=0;if(b!==x.width){m.width=x.width=b;m.height=
x.height=b;sa(x);for(var c=0;6>c;++c)for(var f=0;x.mipmask>>f;++f)a.texImage2D(34069+c,f,x.format,b>>f,b>>f,0,x.format,x.type,null);za();r.profile&&(x.stats.size=Ia(x.internalformat,x.type,m.width,m.height,!1,!0));return m}};m._reglType="textureCube";m._texture=x;r.profile&&(m.stats=x.stats);m.destroy=function(){x.decRef()};return m},clear:function(){for(var b=0;b<ia;++b)a.activeTexture(33984+b),a.bindTexture(3553,null),W[b]=null;J(E).forEach(D);d.cubeCount=0;d.textureCount=0},getTexture:function(a){return null},
restore:function(){for(var b=0;b<ia;++b){var c=W[b];c&&(c.bindCount=0,c.unit=-1,W[b]=null)}J(E).forEach(function(b){b.texture=a.createTexture();a.bindTexture(b.target,b.texture);for(var c=0;32>c;++c)if(0!==(b.mipmask&1<<c))if(3553===b.target)a.texImage2D(3553,c,b.internalformat,b.width>>c,b.height>>c,0,b.internalformat,b.type,null);else for(var f=0;6>f;++f)a.texImage2D(34069+f,c,b.internalformat,b.width>>c,b.height>>c,0,b.internalformat,b.type,null);Ra(b.texInfo,b.target)})}}}function Ob(a,b,c,e,
g,d){function r(a,b,c){this.target=a;this.texture=b;this.renderbuffer=c;var f=a=0;b?(a=b.width,f=b.height):c&&(a=c.width,f=c.height);this.width=a;this.height=f}function n(a){a&&(a.texture&&a.texture._texture.decRef(),a.renderbuffer&&a.renderbuffer._renderbuffer.decRef())}function u(a,b,c){a&&(a.texture?a.texture._texture.refCount+=1:a.renderbuffer._renderbuffer.refCount+=1)}function q(b,c){c&&(c.texture?a.framebufferTexture2D(36160,b,c.target,c.texture._texture.texture,0):a.framebufferRenderbuffer(36160,
b,36161,c.renderbuffer._renderbuffer.renderbuffer))}function t(a){var b=3553,c=null,f=null,d=a;"object"===typeof a&&(d=a.data,"target"in a&&(b=a.target|0));a=d._reglType;"texture2d"===a?c=d:"textureCube"===a?c=d:"renderbuffer"===a&&(f=d,b=36161);return new r(b,c,f)}function m(a,b,c,f,d){if(c)return a=e.create2D({width:a,height:b,format:f,type:d}),a._texture.refCount=0,new r(3553,a,null);a=g.create({width:a,height:b,format:f});a._renderbuffer.refCount=0;return new r(36161,null,a)}function F(a){return a&&
(a.texture||a.renderbuffer)}function k(a,b,c){a&&(a.texture?a.texture.resize(b,c):a.renderbuffer&&a.renderbuffer.resize(b,c),a.width=b,a.height=c)}function h(){this.id=z++;w[this.id]=this;this.framebuffer=a.createFramebuffer();this.height=this.width=0;this.colorAttachments=[];this.depthStencilAttachment=this.stencilAttachment=this.depthAttachment=null}function f(a){a.colorAttachments.forEach(n);n(a.depthAttachment);n(a.stencilAttachment);n(a.depthStencilAttachment)}function p(b){a.deleteFramebuffer(b.framebuffer);
b.framebuffer=null;d.framebufferCount--;delete w[b.id]}function l(b){var f;a.bindFramebuffer(36160,b.framebuffer);var d=b.colorAttachments;for(f=0;f<d.length;++f)q(36064+f,d[f]);for(f=d.length;f<c.maxColorAttachments;++f)a.framebufferTexture2D(36160,36064+f,3553,null,0);a.framebufferTexture2D(36160,33306,3553,null,0);a.framebufferTexture2D(36160,36096,3553,null,0);a.framebufferTexture2D(36160,36128,3553,null,0);q(36096,b.depthAttachment);q(36128,b.stencilAttachment);q(33306,b.depthStencilAttachment);
a.checkFramebufferStatus(36160);a.isContextLost();a.bindFramebuffer(36160,Q.next?Q.next.framebuffer:null);Q.cur=Q.next;a.getError()}function v(a,b){function c(a,b){var d,h=0,g=0,k=!0,p=!0;d=null;var v=!0,n="rgba",q="uint8",r=1,ea=null,ba=null,Q=null,fa=!1;if("number"===typeof a)h=a|0,g=b|0||h;else if(a){"shape"in a?(g=a.shape,h=g[0],g=g[1]):("radius"in a&&(h=g=a.radius),"width"in a&&(h=a.width),"height"in a&&(g=a.height));if("color"in a||"colors"in a)d=a.color||a.colors,Array.isArray(d);if(!d){"colorCount"in
a&&(r=a.colorCount|0);"colorTexture"in a&&(v=!!a.colorTexture,n="rgba4");if("colorType"in a&&(q=a.colorType,!v))if("half float"===q||"float16"===q)n="rgba16f";else if("float"===q||"float32"===q)n="rgba32f";"colorFormat"in a&&(n=a.colorFormat,0<=C.indexOf(n)?v=!0:0<=va.indexOf(n)&&(v=!1))}if("depthTexture"in a||"depthStencilTexture"in a)fa=!(!a.depthTexture&&!a.depthStencilTexture);"depth"in a&&("boolean"===typeof a.depth?k=a.depth:(ea=a.depth,p=!1));"stencil"in a&&("boolean"===typeof a.stencil?p=
a.stencil:(ba=a.stencil,k=!1));"depthStencil"in a&&("boolean"===typeof a.depthStencil?k=p=a.depthStencil:(Q=a.depthStencil,p=k=!1))}else h=g=1;var M=null,z=null,w=null,R=null;if(Array.isArray(d))M=d.map(t);else if(d)M=[t(d)];else for(M=Array(r),d=0;d<r;++d)M[d]=m(h,g,v,n,q);h=h||M[0].width;g=g||M[0].height;ea?z=t(ea):k&&!p&&(z=m(h,g,fa,"depth","uint32"));ba?w=t(ba):p&&!k&&(w=m(h,g,!1,"stencil","uint8"));Q?R=t(Q):!ea&&!ba&&p&&k&&(R=m(h,g,fa,"depth stencil","depth stencil"));k=null;for(d=0;d<M.length;++d)u(M[d],
h,g),M[d]&&M[d].texture&&(p=Xa[M[d].texture._texture.format]*Na[M[d].texture._texture.type],null===k&&(k=p));u(z,h,g);u(w,h,g);u(R,h,g);f(e);e.width=h;e.height=g;e.colorAttachments=M;e.depthAttachment=z;e.stencilAttachment=w;e.depthStencilAttachment=R;c.color=M.map(F);c.depth=F(z);c.stencil=F(w);c.depthStencil=F(R);c.width=e.width;c.height=e.height;l(e);return c}var e=new h;d.framebufferCount++;c(a,b);return H(c,{resize:function(a,b){var f=Math.max(a|0,1),d=Math.max(b|0||f,1);if(f===e.width&&d===
e.height)return c;for(var h=e.colorAttachments,g=0;g<h.length;++g)k(h[g],f,d);k(e.depthAttachment,f,d);k(e.stencilAttachment,f,d);k(e.depthStencilAttachment,f,d);e.width=c.width=f;e.height=c.height=d;l(e);return c},_reglType:"framebuffer",_framebuffer:e,destroy:function(){p(e);f(e)},use:function(a){Q.setFBO({framebuffer:c},a)}})}var Q={cur:null,next:null,dirty:!1,setFBO:null},C=["rgba"],va=["rgba4","rgb565","rgb5 a1"];b.ext_srgb&&va.push("srgba");b.ext_color_buffer_half_float&&va.push("rgba16f","rgb16f");
b.webgl_color_buffer_float&&va.push("rgba32f");var ea=["uint8"];b.oes_texture_half_float&&ea.push("half float","float16");b.oes_texture_float&&ea.push("float","float32");var z=0,w={};return H(Q,{getFramebuffer:function(a){return"function"===typeof a&&"framebuffer"===a._reglType&&(a=a._framebuffer,a instanceof h)?a:null},create:v,createCube:function(a){function b(a){var f,d={color:null},h=0,g=null;f="rgba";var k="uint8",l=1;if("number"===typeof a)h=a|0;else if(a){"shape"in a?h=a.shape[0]:("radius"in
a&&(h=a.radius|0),"width"in a?h=a.width|0:"height"in a&&(h=a.height|0));if("color"in a||"colors"in a)g=a.color||a.colors,Array.isArray(g);g||("colorCount"in a&&(l=a.colorCount|0),"colorType"in a&&(k=a.colorType),"colorFormat"in a&&(f=a.colorFormat));"depth"in a&&(d.depth=a.depth);"stencil"in a&&(d.stencil=a.stencil);"depthStencil"in a&&(d.depthStencil=a.depthStencil)}else h=1;if(g)if(Array.isArray(g))for(a=[],f=0;f<g.length;++f)a[f]=g[f];else a=[g];else for(a=Array(l),g={radius:h,format:f,type:k},
f=0;f<l;++f)a[f]=e.createCube(g);d.color=Array(a.length);for(f=0;f<a.length;++f)l=a[f],h=h||l.width,d.color[f]={target:34069,data:a[f]};for(f=0;6>f;++f){for(l=0;l<a.length;++l)d.color[l].target=34069+f;0<f&&(d.depth=c[0].depth,d.stencil=c[0].stencil,d.depthStencil=c[0].depthStencil);if(c[f])c[f](d);else c[f]=v(d)}return H(b,{width:h,height:h,color:a})}var c=Array(6);b(a);return H(b,{faces:c,resize:function(a){var f=a|0;if(f===b.width)return b;var d=b.color;for(a=0;a<d.length;++a)d[a].resize(f);for(a=
0;6>a;++a)c[a].resize(f);b.width=b.height=f;return b},_reglType:"framebufferCube",destroy:function(){c.forEach(function(a){a.destroy()})}})},clear:function(){J(w).forEach(p)},restore:function(){Q.cur=null;Q.next=null;Q.dirty=!0;J(w).forEach(function(b){b.framebuffer=a.createFramebuffer();l(b)})}})}function Ya(){this.w=this.z=this.y=this.x=this.state=0;this.buffer=null;this.size=0;this.normalized=!1;this.type=5126;this.divisor=this.stride=this.offset=0}function Pb(a,b,c,e,g){function d(a){if(a!==h.currentVAO){var c=
b.oes_vertex_array_object;a?c.bindVertexArrayOES(a.vao):c.bindVertexArrayOES(null);h.currentVAO=a}}function r(c){if(c!==h.currentVAO){if(c)c.bindAttrs();else for(var d=b.angle_instanced_arrays,e=0;e<m.length;++e){var g=m[e];g.buffer?(a.enableVertexAttribArray(e),a.vertexAttribPointer(e,g.size,g.type,g.normalized,g.stride,g.offfset),d&&d.vertexAttribDivisorANGLE(e,g.divisor)):(a.disableVertexAttribArray(e),a.vertexAttrib4f(e,g.x,g.y,g.z,g.w))}h.currentVAO=c}}function n(){J(k).forEach(function(a){a.destroy()})}
function u(){this.id=++F;this.attributes=[];var a=b.oes_vertex_array_object;this.vao=a?a.createVertexArrayOES():null;k[this.id]=this;this.buffers=[]}function q(){b.oes_vertex_array_object&&J(k).forEach(function(a){a.refresh()})}var t=c.maxAttributes,m=Array(t);for(c=0;c<t;++c)m[c]=new Ya;var F=0,k={},h={Record:Ya,scope:{},state:m,currentVAO:null,targetVAO:null,restore:b.oes_vertex_array_object?q:function(){},createVAO:function(a){function b(a){for(var f=0;f<c.buffers.length;++f)c.buffers[f].destroy();
c.buffers.length=0;f=c.attributes;f.length=a.length;for(var d=0;d<a.length;++d){var h=a[d],e=f[d]=new Ya;Array.isArray(h)||G(h)||X(h)?(h=g.create(h,34962,!1,!0),e.buffer=g.getBuffer(h),e.size=e.buffer.dimension|0,e.normalized=!1,e.type=e.buffer.dtype,e.offset=0,e.stride=0,e.divisor=0,e.state=1,c.buffers.push(h)):g.getBuffer(h)?(e.buffer=g.getBuffer(h),e.size=e.buffer.dimension|0,e.normalized=!1,e.type=e.buffer.dtype,e.offset=0,e.stride=0,e.divisor=0,e.state=1):g.getBuffer(h.buffer)?(e.buffer=g.getBuffer(h.buffer),
e.size=(+h.size||e.buffer.dimension)|0,e.normalized=!!h.normalized||!1,e.type="type"in h?Ha[h.type]:e.buffer.dtype,e.offset=(h.offset||0)|0,e.stride=(h.stride||0)|0,e.divisor=(h.divisor||0)|0,e.state=1):"x"in h&&(e.x=+h.x||0,e.y=+h.y||0,e.z=+h.z||0,e.w=+h.w||0,e.state=2)}c.refresh();return b}var c=new u;e.vaoCount+=1;b.destroy=function(){c.destroy()};b._vao=c;b._reglType="vao";return b(a)},getVAO:function(a){return"function"===typeof a&&a._vao?a._vao:null},destroyBuffer:function(b){for(var c=0;c<
m.length;++c){var d=m[c];d.buffer===b&&(a.disableVertexAttribArray(c),d.buffer=null)}},setVAO:b.oes_vertex_array_object?d:r,clear:b.oes_vertex_array_object?n:function(){}};u.prototype.bindAttrs=function(){for(var c=b.angle_instanced_arrays,d=this.attributes,e=0;e<d.length;++e){var h=d[e];h.buffer?(a.enableVertexAttribArray(e),a.bindBuffer(34962,h.buffer.buffer),a.vertexAttribPointer(e,h.size,h.type,h.normalized,h.stride,h.offset),c&&c.vertexAttribDivisorANGLE(e,h.divisor)):(a.disableVertexAttribArray(e),
a.vertexAttrib4f(e,h.x,h.y,h.z,h.w))}for(c=d.length;c<t;++c)a.disableVertexAttribArray(c)};u.prototype.refresh=function(){var a=b.oes_vertex_array_object;a&&(a.bindVertexArrayOES(this.vao),this.bindAttrs(),h.currentVAO=this)};u.prototype.destroy=function(){if(this.vao){var a=b.oes_vertex_array_object;this===h.currentVAO&&(h.currentVAO=null,a.bindVertexArrayOES(null));a.deleteVertexArrayOES(this.vao);this.vao=null}k[this.id]&&(delete k[this.id],--e.vaoCount)};return h}function Qb(a,b,c,e){function g(a,
b,c,d){this.name=a;this.id=b;this.location=c;this.info=d}function d(a,b){for(var c=0;c<a.length;++c)if(a[c].id===b.id){a[c].location=b.location;return}a.push(b)}function r(c,f,d){d=35632===c?q:t;var e=d[f];if(!e){var g=b.str(f),e=a.createShader(c);a.shaderSource(e,g);a.compileShader(e);d[f]=e}return e}function n(a,b){this.id=k++;this.fragId=a;this.vertId=b;this.program=null;this.uniforms=[];this.attributes=[];e.profile&&(this.stats={uniformsCount:0,attributesCount:0})}function u(c,f,k){var m;m=r(35632,
c.fragId);var n=r(35633,c.vertId);f=c.program=a.createProgram();a.attachShader(f,m);a.attachShader(f,n);if(k)for(m=0;m<k.length;++m)n=k[m],a.bindAttribLocation(f,n[0],n[1]);a.linkProgram(f);n=a.getProgramParameter(f,35718);e.profile&&(c.stats.uniformsCount=n);var q=c.uniforms;for(m=0;m<n;++m)if(k=a.getActiveUniform(f,m))if(1<k.size)for(var u=0;u<k.size;++u){var t=k.name.replace("[0]","["+u+"]");d(q,new g(t,b.id(t),a.getUniformLocation(f,t),k))}else d(q,new g(k.name,b.id(k.name),a.getUniformLocation(f,
k.name),k));n=a.getProgramParameter(f,35721);e.profile&&(c.stats.attributesCount=n);c=c.attributes;for(m=0;m<n;++m)(k=a.getActiveAttrib(f,m))&&d(c,new g(k.name,b.id(k.name),a.getAttribLocation(f,k.name),k))}var q={},t={},m={},F=[],k=0;e.profile&&(c.getMaxUniformsCount=function(){var a=0;F.forEach(function(b){b.stats.uniformsCount>a&&(a=b.stats.uniformsCount)});return a},c.getMaxAttributesCount=function(){var a=0;F.forEach(function(b){b.stats.attributesCount>a&&(a=b.stats.attributesCount)});return a});
return{clear:function(){var b=a.deleteShader.bind(a);J(q).forEach(b);q={};J(t).forEach(b);t={};F.forEach(function(b){a.deleteProgram(b.program)});F.length=0;m={};c.shaderCount=0},program:function(a,b,d,e){var g=m[b];g||(g=m[b]={});var k=g[a];if(k&&!e)return k;b=new n(b,a);c.shaderCount++;u(b,d,e);k||(g[a]=b);F.push(b);return b},restore:function(){q={};t={};for(var a=0;a<F.length;++a)u(F[a],null,F[a].attributes.map(function(a){return[a.location,a.name]}))},shader:r,frag:-1,vert:-1}}function Rb(a,b,
c,e,g,d,r){function n(d){var g;g=null===b.next?5121:b.next.colorAttachments[0].texture._texture.type;var m=0,n=0,k=e.framebufferWidth,h=e.framebufferHeight,f=null;G(d)?f=d:d&&(m=d.x|0,n=d.y|0,k=(d.width||e.framebufferWidth-m)|0,h=(d.height||e.framebufferHeight-n)|0,f=d.data||null);c();d=k*h*4;f||(5121===g?f=new Uint8Array(d):5126===g&&(f=f||new Float32Array(d)));a.pixelStorei(3333,4);a.readPixels(m,n,k,h,6408,g,f);return f}function u(a){var c;b.setFBO({framebuffer:a.framebuffer},function(){c=n(a)});
return c}return function(a){return a&&"framebuffer"in a?u(a):n(a)}}function ta(a){return Array.prototype.slice.call(a)}function Aa(a){return ta(a).join("")}function Sb(){function a(){var a=[],b=[];return H(function(){a.push.apply(a,ta(arguments))},{def:function(){var d="v"+c++;b.push(d);0<arguments.length&&(a.push(d,"="),a.push.apply(a,ta(arguments)),a.push(";"));return d},toString:function(){return Aa([0<b.length?"var "+b.join(",")+";":"",Aa(a)])}})}function b(){function b(a,e){d(a,e,"=",c.def(a,
e),";")}var c=a(),d=a(),e=c.toString,g=d.toString;return H(function(){c.apply(c,ta(arguments))},{def:c.def,entry:c,exit:d,save:b,set:function(a,d,e){b(a,d);c(a,d,"=",e,";")},toString:function(){return e()+g()}})}var c=0,e=[],g=[],d=a(),r={};return{global:d,link:function(a){for(var b=0;b<g.length;++b)if(g[b]===a)return e[b];b="g"+c++;e.push(b);g.push(a);return b},block:a,proc:function(a,c){function d(){var a="a"+e.length;e.push(a);return a}var e=[];c=c||0;for(var g=0;g<c;++g)d();var g=b(),F=g.toString;
return r[a]=H(g,{arg:d,toString:function(){return Aa(["function(",e.join(),"){",F(),"}"])}})},scope:b,cond:function(){var a=Aa(arguments),c=b(),d=b(),e=c.toString,g=d.toString;return H(c,{then:function(){c.apply(c,ta(arguments));return this},"else":function(){d.apply(d,ta(arguments));return this},toString:function(){var b=g();b&&(b="else{"+b+"}");return Aa(["if(",a,"){",e(),"}",b])}})},compile:function(){var a=['"use strict";',d,"return {"];Object.keys(r).forEach(function(b){a.push('"',b,'":',r[b].toString(),
",")});a.push("}");var b=Aa(a).replace(/;/g,";\n").replace(/}/g,"}\n").replace(/{/g,"{\n");return Function.apply(null,e.concat(b)).apply(null,g)}}}function Oa(a){return Array.isArray(a)||G(a)||X(a)}function wb(a){return a.sort(function(a,c){return"viewport"===a?-1:"viewport"===c?1:a<c?-1:1})}function P(a,b,c,e){this.thisDep=a;this.contextDep=b;this.propDep=c;this.append=e}function ua(a){return a&&!(a.thisDep||a.contextDep||a.propDep)}function C(a){return new P(!1,!1,!1,a)}function L(a,b){var c=a.type;
return 0===c?(c=a.data.length,new P(!0,1<=c,2<=c,b)):4===c?(c=a.data,new P(c.thisDep,c.contextDep,c.propDep,b)):new P(3===c,2===c,1===c,b)}function Tb(a,b,c,e,g,d,r,n,u,q,t,m,F,k,h){function f(a){return a.replace(".","_")}function p(a,b,c){var d=f(a);Ka.push(a);Ca[d]=pa[d]=!!c;qa[d]=b}function l(a,b,c){var d=f(a);Ka.push(a);Array.isArray(c)?(pa[d]=c.slice(),Ca[d]=c.slice()):pa[d]=Ca[d]=c;ra[d]=b}function v(){var a=Sb(),c=a.link,d=a.global;a.id=ta++;a.batchId="0";var e=c(ka),f=a.shared={props:"a0"};
Object.keys(ka).forEach(function(a){f[a]=d.def(e,".",a)});var g=a.next={},h=a.current={};Object.keys(ra).forEach(function(a){Array.isArray(pa[a])&&(g[a]=d.def(f.next,".",a),h[a]=d.def(f.current,".",a))});var ca=a.constants={};Object.keys(Z).forEach(function(a){ca[a]=d.def(JSON.stringify(Z[a]))});a.invoke=function(b,d){switch(d.type){case 0:var e=["this",f.context,f.props,a.batchId];return b.def(c(d.data),".call(",e.slice(0,Math.max(d.data.length+1,4)),")");case 1:return b.def(f.props,d.data);case 2:return b.def(f.context,
d.data);case 3:return b.def("this",d.data);case 4:return d.data.append(a,b),d.data.ref}};a.attribCache={};var ya={};a.scopeAttrib=function(a){a=b.id(a);if(a in ya)return ya[a];var d=q.scope[a];d||(d=q.scope[a]=new ia);return ya[a]=c(d)};return a}function Q(a){var b=a["static"];a=a.dynamic;var c;if("profile"in b){var d=!!b.profile;c=C(function(a,b){return d});c.enable=d}else if("profile"in a){var e=a.profile;c=L(e,function(a,b){return a.invoke(b,e)})}return c}function z(a,b){var c=a["static"],d=a.dynamic;
if("framebuffer"in c){var e=c.framebuffer;return e?(e=n.getFramebuffer(e),C(function(a,b){var c=a.link(e),d=a.shared;b.set(d.framebuffer,".next",c);d=d.context;b.set(d,".framebufferWidth",c+".width");b.set(d,".framebufferHeight",c+".height");return c})):C(function(a,b){var c=a.shared;b.set(c.framebuffer,".next","null");c=c.context;b.set(c,".framebufferWidth",c+".drawingBufferWidth");b.set(c,".framebufferHeight",c+".drawingBufferHeight");return"null"})}if("framebuffer"in d){var f=d.framebuffer;return L(f,
function(a,b){var c=a.invoke(b,f),d=a.shared,e=d.framebuffer,c=b.def(e,".getFramebuffer(",c,")");b.set(e,".next",c);d=d.context;b.set(d,".framebufferWidth",c+"?"+c+".width:"+d+".drawingBufferWidth");b.set(d,".framebufferHeight",c+"?"+c+".height:"+d+".drawingBufferHeight");return c})}return null}function w(a,b,c){function d(a){if(a in e){var c=e[a];a=!0;var g=c.x|0,y=c.y|0,h,U;"width"in c?h=c.width|0:a=!1;"height"in c?U=c.height|0:a=!1;return new P(!a&&b&&b.thisDep,!a&&b&&b.contextDep,!a&&b&&b.propDep,
function(a,b){var d=a.shared.context,e=h;"width"in c||(e=b.def(d,".","framebufferWidth","-",g));var f=U;"height"in c||(f=b.def(d,".","framebufferHeight","-",y));return[g,y,e,f]})}if(a in f){var k=f[a];a=L(k,function(a,b){var c=a.invoke(b,k),d=a.shared.context,e=b.def(c,".x|0"),f=b.def(c,".y|0"),g=b.def('"width" in ',c,"?",c,".width|0:","(",d,".","framebufferWidth","-",e,")"),c=b.def('"height" in ',c,"?",c,".height|0:","(",d,".","framebufferHeight","-",f,")");return[e,f,g,c]});b&&(a.thisDep=a.thisDep||
b.thisDep,a.contextDep=a.contextDep||b.contextDep,a.propDep=a.propDep||b.propDep);return a}return b?new P(b.thisDep,b.contextDep,b.propDep,function(a,b){var c=a.shared.context;return[0,0,b.def(c,".","framebufferWidth"),b.def(c,".","framebufferHeight")]}):null}var e=a["static"],f=a.dynamic;if(a=d("viewport")){var g=a;a=new P(a.thisDep,a.contextDep,a.propDep,function(a,b){var c=g.append(a,b),d=a.shared.context;b.set(d,".viewportWidth",c[2]);b.set(d,".viewportHeight",c[3]);return c})}return{viewport:a,
scissor_box:d("scissor.box")}}function H(a,b){var c=a["static"];if("string"===typeof c.frag&&"string"===typeof c.vert){if(0<Object.keys(b.dynamic).length)return null;var c=b["static"],d=Object.keys(c);if(0<d.length&&"number"===typeof c[d[0]]){for(var e=[],f=0;f<d.length;++f)e.push([c[d[f]]|0,d[f]]);return e}}return null}function E(a,c,d){function e(a){if(a in f){var c=b.id(f[a]);a=C(function(){return c});a.id=c;return a}if(a in g){var d=g[a];return L(d,function(a,b){var c=a.invoke(b,d);return b.def(a.shared.strings,
".id(",c,")")})}return null}var f=a["static"],g=a.dynamic,h=e("frag"),ca=e("vert"),ya=null;ua(h)&&ua(ca)?(ya=t.program(ca.id,h.id,null,d),a=C(function(a,b){return a.link(ya)})):a=new P(h&&h.thisDep||ca&&ca.thisDep,h&&h.contextDep||ca&&ca.contextDep,h&&h.propDep||ca&&ca.propDep,function(a,b){var c=a.shared.shader,d;d=h?h.append(a,b):b.def(c,".","frag");var e;e=ca?ca.append(a,b):b.def(c,".","vert");return b.def(c+".program("+e+","+d+")")});return{frag:h,vert:ca,progVar:a,program:ya}}function G(a,b){function c(a,
b){if(a in e){var d=e[a]|0;return C(function(a,c){b&&(a.OFFSET=d);return d})}if(a in f){var h=f[a];return L(h,function(a,c){var d=a.invoke(c,h);b&&(a.OFFSET=d);return d})}return b&&g?C(function(a,b){a.OFFSET="0";return 0}):null}var e=a["static"],f=a.dynamic,g=function(){if("elements"in e){var a=e.elements;Oa(a)?a=d.getElements(d.create(a,!0)):a&&(a=d.getElements(a));var b=C(function(b,c){if(a){var d=b.link(a);return b.ELEMENTS=d}return b.ELEMENTS=null});b.value=a;return b}if("elements"in f){var c=
f.elements;return L(c,function(a,b){var d=a.shared,e=d.isBufferArgs,d=d.elements,f=a.invoke(b,c),g=b.def("null"),e=b.def(e,"(",f,")"),f=a.cond(e).then(g,"=",d,".createStream(",f,");")["else"](g,"=",d,".getElements(",f,");");b.entry(f);b.exit(a.cond(e).then(d,".destroyStream(",g,");"));return a.ELEMENTS=g})}return null}(),h=c("offset",!0);return{elements:g,primitive:function(){if("primitive"in e){var a=e.primitive;return C(function(b,c){return Sa[a]})}if("primitive"in f){var b=f.primitive;return L(b,
function(a,c){var d=a.constants.primTypes,e=a.invoke(c,b);return c.def(d,"[",e,"]")})}return g?ua(g)?g.value?C(function(a,b){return b.def(a.ELEMENTS,".primType")}):C(function(){return 4}):new P(g.thisDep,g.contextDep,g.propDep,function(a,b){var c=a.ELEMENTS;return b.def(c,"?",c,".primType:",4)}):null}(),count:function(){if("count"in e){var a=e.count|0;return C(function(){return a})}if("count"in f){var b=f.count;return L(b,function(a,c){return a.invoke(c,b)})}return g?ua(g)?g?h?new P(h.thisDep,h.contextDep,
h.propDep,function(a,b){return b.def(a.ELEMENTS,".vertCount-",a.OFFSET)}):C(function(a,b){return b.def(a.ELEMENTS,".vertCount")}):C(function(){return-1}):new P(g.thisDep||h.thisDep,g.contextDep||h.contextDep,g.propDep||h.propDep,function(a,b){var c=a.ELEMENTS;return a.OFFSET?b.def(c,"?",c,".vertCount-",a.OFFSET,":-1"):b.def(c,"?",c,".vertCount:-1")}):null}(),instances:c("instances",!1),offset:h}}function R(a,b){var c=a["static"],d=a.dynamic,e={};Ka.forEach(function(a){function b(f,h){if(a in c){var y=
f(c[a]);e[g]=C(function(){return y})}else if(a in d){var I=d[a];e[g]=L(I,function(a,b){return h(a,b,a.invoke(b,I))})}}var g=f(a);switch(a){case "cull.enable":case "blend.enable":case "dither":case "stencil.enable":case "depth.enable":case "scissor.enable":case "polygonOffset.enable":case "sample.alpha":case "sample.enable":case "depth.mask":return b(function(a){return a},function(a,b,c){return c});case "depth.func":return b(function(a){return $a[a]},function(a,b,c){return b.def(a.constants.compareFuncs,
"[",c,"]")});case "depth.range":return b(function(a){return a},function(a,b,c){a=b.def("+",c,"[0]");b=b.def("+",c,"[1]");return[a,b]});case "blend.func":return b(function(a){return[Ea["srcRGB"in a?a.srcRGB:a.src],Ea["dstRGB"in a?a.dstRGB:a.dst],Ea["srcAlpha"in a?a.srcAlpha:a.src],Ea["dstAlpha"in a?a.dstAlpha:a.dst]]},function(a,b,c){function d(a,e){return b.def('"',a,e,'" in ',c,"?",c,".",a,e,":",c,".",a)}a=a.constants.blendFuncs;var e=d("src","RGB"),f=d("dst","RGB"),e=b.def(a,"[",e,"]"),g=b.def(a,
"[",d("src","Alpha"),"]"),f=b.def(a,"[",f,"]");a=b.def(a,"[",d("dst","Alpha"),"]");return[e,f,g,a]});case "blend.equation":return b(function(a){if("string"===typeof a)return[W[a],W[a]];if("object"===typeof a)return[W[a.rgb],W[a.alpha]]},function(a,b,c){var d=a.constants.blendEquations,e=b.def(),f=b.def();a=a.cond("typeof ",c,'==="string"');a.then(e,"=",f,"=",d,"[",c,"];");a["else"](e,"=",d,"[",c,".rgb];",f,"=",d,"[",c,".alpha];");b(a);return[e,f]});case "blend.color":return b(function(a){return A(4,
function(b){return+a[b]})},function(a,b,c){return A(4,function(a){return b.def("+",c,"[",a,"]")})});case "stencil.mask":return b(function(a){return a|0},function(a,b,c){return b.def(c,"|0")});case "stencil.func":return b(function(a){return[$a[a.cmp||"keep"],a.ref||0,"mask"in a?a.mask:-1]},function(a,b,c){a=b.def('"cmp" in ',c,"?",a.constants.compareFuncs,"[",c,".cmp]",":",7680);var d=b.def(c,".ref|0");b=b.def('"mask" in ',c,"?",c,".mask|0:-1");return[a,d,b]});case "stencil.opFront":case "stencil.opBack":return b(function(b){return["stencil.opBack"===
a?1029:1028,Pa[b.fail||"keep"],Pa[b.zfail||"keep"],Pa[b.zpass||"keep"]]},function(b,c,d){function e(a){return c.def('"',a,'" in ',d,"?",f,"[",d,".",a,"]:",7680)}var f=b.constants.stencilOps;return["stencil.opBack"===a?1029:1028,e("fail"),e("zfail"),e("zpass")]});case "polygonOffset.offset":return b(function(a){return[a.factor|0,a.units|0]},function(a,b,c){a=b.def(c,".factor|0");b=b.def(c,".units|0");return[a,b]});case "cull.face":return b(function(a){var b=0;"front"===a?b=1028:"back"===a&&(b=1029);
return b},function(a,b,c){return b.def(c,'==="front"?',1028,":",1029)});case "lineWidth":return b(function(a){return a},function(a,b,c){return c});case "frontFace":return b(function(a){return xb[a]},function(a,b,c){return b.def(c+'==="cw"?2304:2305')});case "colorMask":return b(function(a){return a.map(function(a){return!!a})},function(a,b,c){return A(4,function(a){return"!!"+c+"["+a+"]"})});case "sample.coverage":return b(function(a){return["value"in a?a.value:1,!!a.invert]},function(a,b,c){a=b.def('"value" in ',
c,"?+",c,".value:1");b=b.def("!!",c,".invert");return[a,b]})}});return e}function sa(a,b){var c=a["static"],d=a.dynamic,e={};Object.keys(c).forEach(function(a){var b=c[a],d;if("number"===typeof b||"boolean"===typeof b)d=C(function(){return b});else if("function"===typeof b){var f=b._reglType;if("texture2d"===f||"textureCube"===f)d=C(function(a){return a.link(b)});else if("framebuffer"===f||"framebufferCube"===f)d=C(function(a){return a.link(b.color[0])})}else na(b)&&(d=C(function(a){return a.global.def("[",
A(b.length,function(a){return b[a]}),"]")}));d.value=b;e[a]=d});Object.keys(d).forEach(function(a){var b=d[a];e[a]=L(b,function(a,c){return a.invoke(c,b)})});return e}function J(a,c){var d=a["static"],e=a.dynamic,f={};Object.keys(d).forEach(function(a){var c=d[a],e=b.id(a),h=new ia;if(Oa(c))h.state=1,h.buffer=g.getBuffer(g.create(c,34962,!1,!0)),h.type=0;else{var y=g.getBuffer(c);if(y)h.state=1,h.buffer=y,h.type=0;else if("constant"in c){var I=c.constant;h.buffer="null";h.state=2;"number"===typeof I?
h.x=I:Ba.forEach(function(a,b){b<I.length&&(h[a]=I[b])})}else{var y=Oa(c.buffer)?g.getBuffer(g.create(c.buffer,34962,!1,!0)):g.getBuffer(c.buffer),k=c.offset|0,m=c.stride|0,da=c.size|0,n=!!c.normalized,l=0;"type"in c&&(l=Ha[c.type]);c=c.divisor|0;h.buffer=y;h.state=1;h.size=da;h.normalized=n;h.type=l||y.dtype;h.offset=k;h.stride=m;h.divisor=c}}f[a]=C(function(a,b){var c=a.attribCache;if(e in c)return c[e];var d={isStream:!1};Object.keys(h).forEach(function(a){d[a]=h[a]});h.buffer&&(d.buffer=a.link(h.buffer),
d.type=d.type||d.buffer+".dtype");return c[e]=d})});Object.keys(e).forEach(function(a){var b=e[a];f[a]=L(b,function(a,c){function d(a){c(y[a],"=",e,".",a,"|0;")}var e=a.invoke(c,b),f=a.shared,g=a.constants,h=f.isBufferArgs,f=f.buffer,y={isStream:c.def(!1)},I=new ia;I.state=1;Object.keys(I).forEach(function(a){y[a]=c.def(""+I[a])});var k=y.buffer,U=y.type;c("if(",h,"(",e,")){",y.isStream,"=true;",k,"=",f,".createStream(",34962,",",e,");",U,"=",k,".dtype;","}else{",k,"=",f,".getBuffer(",e,");","if(",
k,"){",U,"=",k,".dtype;",'}else if("constant" in ',e,"){",y.state,"=",2,";","if(typeof "+e+'.constant === "number"){',y[Ba[0]],"=",e,".constant;",Ba.slice(1).map(function(a){return y[a]}).join("="),"=0;","}else{",Ba.map(function(a,b){return y[a]+"="+e+".constant.length>"+b+"?"+e+".constant["+b+"]:0;"}).join(""),"}}else{","if(",h,"(",e,".buffer)){",k,"=",f,".createStream(",34962,",",e,".buffer);","}else{",k,"=",f,".getBuffer(",e,".buffer);","}",U,'="type" in ',e,"?",g.glTypes,"[",e,".type]:",k,".dtype;",
y.normalized,"=!!",e,".normalized;");d("size");d("offset");d("stride");d("divisor");c("}}");c.exit("if(",y.isStream,"){",f,".destroyStream(",k,");","}");return y})});return f}function D(a,b){var c=a["static"],d=a.dynamic;if("vao"in c){var e=c.vao;null!==e&&null===q.getVAO(e)&&(e=q.createVAO(e));return C(function(a){return a.link(q.getVAO(e))})}if("vao"in d){var f=d.vao;return L(f,function(a,b){var c=a.invoke(b,f);return b.def(a.shared.vao+".getVAO("+c+")")})}return null}function x(a){var b=a["static"],
c=a.dynamic,d={};Object.keys(b).forEach(function(a){var c=b[a];d[a]=C(function(a,b){return"number"===typeof c||"boolean"===typeof c?""+c:a.link(c)})});Object.keys(c).forEach(function(a){var b=c[a];d[a]=L(b,function(a,c){return a.invoke(c,b)})});return d}function la(a,b,d,e,g){function h(a){var b=n[a];b&&(Za[a]=b)}var k=H(a,b),m=z(a,g),n=w(a,m,g),l=G(a,g),Za=R(a,g),p=E(a,g,k);h("viewport");h(f("scissor.box"));var r=0<Object.keys(Za).length,m={framebuffer:m,draw:l,shader:p,state:Za,dirty:r,scopeVAO:null,
drawVAO:null,useVAO:!1,attributes:{}};m.profile=Q(a,g);m.uniforms=sa(d,g);m.drawVAO=m.scopeVAO=D(a,g);if(!m.drawVAO&&p.program&&!k&&c.angle_instanced_arrays){var t=!0;a=p.program.attributes.map(function(a){a=b["static"][a];t=t&&!!a;return a});if(t&&0<a.length){var v=q.getVAO(q.createVAO(a));m.drawVAO=new P(null,null,null,function(a,b){return a.link(v)});m.useVAO=!0}}k?m.useVAO=!0:m.attributes=J(b,g);m.context=x(e,g);return m}function T(a,b,c){var d=a.shared.context,e=a.scope();Object.keys(c).forEach(function(f){b.save(d,
"."+f);e(d,".",f,"=",c[f].append(a,b),";")});b(e)}function O(a,b,c,d){var e=a.shared,f=e.gl,g=e.framebuffer,h;Ja&&(h=b.def(e.extensions,".webgl_draw_buffers"));var k=a.constants,e=k.drawBuffer,k=k.backBuffer;a=c?c.append(a,b):b.def(g,".next");d||b("if(",a,"!==",g,".cur){");b("if(",a,"){",f,".bindFramebuffer(",36160,",",a,".framebuffer);");Ja&&b(h,".drawBuffersWEBGL(",e,"[",a,".colorAttachments.length]);");b("}else{",f,".bindFramebuffer(",36160,",null);");Ja&&b(h,".drawBuffersWEBGL(",k,");");b("}",
g,".cur=",a,";");d||b("}")}function S(a,b,c){var d=a.shared,e=d.gl,g=a.current,h=a.next,k=d.current,m=d.next,n=a.cond(k,".dirty");Ka.forEach(function(b){b=f(b);if(!(b in c.state)){var d,I;if(b in h){d=h[b];I=g[b];var l=A(pa[b].length,function(a){return n.def(d,"[",a,"]")});n(a.cond(l.map(function(a,b){return a+"!=="+I+"["+b+"]"}).join("||")).then(e,".",ra[b],"(",l,");",l.map(function(a,b){return I+"["+b+"]="+a}).join(";"),";"))}else d=n.def(m,".",b),l=a.cond(d,"!==",k,".",b),n(l),b in qa?l(a.cond(d).then(e,
".enable(",qa[b],");")["else"](e,".disable(",qa[b],");"),k,".",b,"=",d,";"):l(e,".",ra[b],"(",d,");",k,".",b,"=",d,";")}});0===Object.keys(c.state).length&&n(k,".dirty=false;");b(n)}function K(a,b,c,d){var e=a.shared,f=a.current,g=e.current,h=e.gl;wb(Object.keys(c)).forEach(function(e){var k=c[e];if(!d||d(k)){var m=k.append(a,b);if(qa[e]){var n=qa[e];ua(k)?m?b(h,".enable(",n,");"):b(h,".disable(",n,");"):b(a.cond(m).then(h,".enable(",n,");")["else"](h,".disable(",n,");"));b(g,".",e,"=",m,";")}else if(na(m)){var l=
f[e];b(h,".",ra[e],"(",m,");",m.map(function(a,b){return l+"["+b+"]="+a}).join(";"),";")}else b(h,".",ra[e],"(",m,");",g,".",e,"=",m,";")}})}function B(a,b){oa&&(a.instancing=b.def(a.shared.extensions,".angle_instanced_arrays"))}function V(a,b,c,d,e){function f(){return"undefined"===typeof performance?"Date.now()":"performance.now()"}function g(a){q=b.def();a(q,"=",f(),";");"string"===typeof e?a(l,".count+=",e,";"):a(l,".count++;");k&&(d?(t=b.def(),a(t,"=",r,".getNumPendingQueries();")):a(r,".beginQuery(",
l,");"))}function h(a){a(l,".cpuTime+=",f(),"-",q,";");k&&(d?a(r,".pushScopeStats(",t,",",r,".getNumPendingQueries(),",l,");"):a(r,".endQuery();"))}function m(a){var c=b.def(p,".profile");b(p,".profile=",a,";");b.exit(p,".profile=",c,";")}var n=a.shared,l=a.stats,p=n.current,r=n.timer;c=c.profile;var q,t;if(c){if(ua(c)){c.enable?(g(b),h(b.exit),m("true")):m("false");return}c=c.append(a,b);m(c)}else c=b.def(p,".profile");n=a.block();g(n);b("if(",c,"){",n,"}");a=a.block();h(a);b.exit("if(",c,"){",a,
"}")}function N(a,b,c,d,e){function f(a){switch(a){case 35664:case 35667:case 35671:return 2;case 35665:case 35668:case 35672:return 3;case 35666:case 35669:case 35673:return 4;default:return 1}}function g(c,d,e){function f(){b("if(!",l,".buffer){",m,".enableVertexAttribArray(",n,");}");var c=e.type,g;g=e.size?b.def(e.size,"||",d):d;b("if(",l,".type!==",c,"||",l,".size!==",g,"||",da.map(function(a){return l+"."+a+"!=="+e[a]}).join("||"),"){",m,".bindBuffer(",34962,",",U,".buffer);",m,".vertexAttribPointer(",
[n,g,c,e.normalized,e.stride,e.offset],");",l,".type=",c,";",l,".size=",g,";",da.map(function(a){return l+"."+a+"="+e[a]+";"}).join(""),"}");oa&&(c=e.divisor,b("if(",l,".divisor!==",c,"){",a.instancing,".vertexAttribDivisorANGLE(",[n,c],");",l,".divisor=",c,";}"))}function k(){b("if(",l,".buffer){",m,".disableVertexAttribArray(",n,");",l,".buffer=null;","}if(",Ba.map(function(a,b){return l+"."+a+"!=="+p[b]}).join("||"),"){",m,".vertexAttrib4f(",n,",",p,");",Ba.map(function(a,b){return l+"."+a+"="+
p[b]+";"}).join(""),"}")}var m=h.gl,n=b.def(c,".location"),l=b.def(h.attributes,"[",n,"]");c=e.state;var U=e.buffer,p=[e.x,e.y,e.z,e.w],da=["buffer","normalized","offset","stride"];1===c?f():2===c?k():(b("if(",c,"===",1,"){"),f(),b("}else{"),k(),b("}"))}var h=a.shared;d.forEach(function(d){var h=d.name,k=c.attributes[h],m;if(k){if(!e(k))return;m=k.append(a,b)}else{if(!e(yb))return;var n=a.scopeAttrib(h);m={};Object.keys(new ia).forEach(function(a){m[a]=b.def(n,".",a)})}g(a.link(d),f(d.info.type),
m)})}function wa(a,c,d,e,f){for(var g=a.shared,h=g.gl,k,m=0;m<e.length;++m){var n=e[m],l=n.name,p=n.info.type,r=d.uniforms[l],n=a.link(n)+".location",q;if(r){if(!f(r))continue;if(ua(r)){l=r.value;if(35678===p||35680===p)p=a.link(l._texture||l.color[0]._texture),c(h,".uniform1i(",n,",",p+".bind());"),c.exit(p,".unbind();");else if(35674===p||35675===p||35676===p)l=a.global.def("new Float32Array(["+Array.prototype.slice.call(l)+"])"),r=2,35675===p?r=3:35676===p&&(r=4),c(h,".uniformMatrix",r,"fv(",n,
",false,",l,");");else{switch(p){case 5126:k="1f";break;case 35664:k="2f";break;case 35665:k="3f";break;case 35666:k="4f";break;case 35670:k="1i";break;case 5124:k="1i";break;case 35671:k="2i";break;case 35667:k="2i";break;case 35672:k="3i";break;case 35668:k="3i";break;case 35673:k="4i";break;case 35669:k="4i"}c(h,".uniform",k,"(",n,",",na(l)?Array.prototype.slice.call(l):l,");")}continue}else q=r.append(a,c)}else{if(!f(yb))continue;q=c.def(g.uniforms,"[",b.id(l),"]")}35678===p?c("if(",q,"&&",q,
'._reglType==="framebuffer"){',q,"=",q,".color[0];","}"):35680===p&&c("if(",q,"&&",q,'._reglType==="framebufferCube"){',q,"=",q,".color[0];","}");l=1;switch(p){case 35678:case 35680:p=c.def(q,"._texture");c(h,".uniform1i(",n,",",p,".bind());");c.exit(p,".unbind();");continue;case 5124:case 35670:k="1i";break;case 35667:case 35671:k="2i";l=2;break;case 35668:case 35672:k="3i";l=3;break;case 35669:case 35673:k="4i";l=4;break;case 5126:k="1f";break;case 35664:k="2f";l=2;break;case 35665:k="3f";l=3;break;
case 35666:k="4f";l=4;break;case 35674:k="Matrix2fv";break;case 35675:k="Matrix3fv";break;case 35676:k="Matrix4fv"}c(h,".uniform",k,"(",n,",");if("M"===k.charAt(0)){var n=Math.pow(p-35674+2,2),t=a.global.def("new Float32Array(",n,")");c("false,(Array.isArray(",q,")||",q," instanceof Float32Array)?",q,":(",A(n,function(a){return t+"["+a+"]="+q+"["+a+"]"}),",",t,")")}else 1<l?c(A(l,function(a){return q+"["+a+"]"})):c(q);c(");")}}function aa(a,b,c,d){function e(f){var g=l[f];return g?g.contextDep&&d.contextDynamic||
g.propDep?g.append(a,c):g.append(a,b):b.def(m,".",f)}function f(){function a(){c(v,".drawElementsInstancedANGLE(",[p,r,u,q+"<<(("+u+"-5121)>>1)",t],");")}function b(){c(v,".drawArraysInstancedANGLE(",[p,q,r,t],");")}n?ba?a():(c("if(",n,"){"),a(),c("}else{"),b(),c("}")):b()}function g(){function a(){c(k+".drawElements("+[p,r,u,q+"<<(("+u+"-5121)>>1)"]+");")}function b(){c(k+".drawArrays("+[p,q,r]+");")}n?ba?a():(c("if(",n,"){"),a(),c("}else{"),b(),c("}")):b()}var h=a.shared,k=h.gl,m=h.draw,l=d.draw,
n=function(){var e=l.elements,f=b;if(e){if(e.contextDep&&d.contextDynamic||e.propDep)f=c;e=e.append(a,f)}else e=f.def(m,".","elements");e&&f("if("+e+")"+k+".bindBuffer(34963,"+e+".buffer.buffer);");return e}(),p=e("primitive"),q=e("offset"),r=function(){var e=l.count,f=b;if(e){if(e.contextDep&&d.contextDynamic||e.propDep)f=c;e=e.append(a,f)}else e=f.def(m,".","count");return e}();if("number"===typeof r){if(0===r)return}else c("if(",r,"){"),c.exit("}");var t,v;oa&&(t=e("instances"),v=a.instancing);
var u=n+".type",ba=l.elements&&ua(l.elements);oa&&("number"!==typeof t||0<=t)?"string"===typeof t?(c("if(",t,">0){"),f(),c("}else if(",t,"<0){"),g(),c("}")):f():g()}function xa(a,b,c,d,e){b=v();e=b.proc("body",e);oa&&(b.instancing=e.def(b.shared.extensions,".angle_instanced_arrays"));a(b,e,c,d);return b.compile().body}function ba(a,b,c,d){B(a,b);c.useVAO?c.drawVAO?b(a.shared.vao,".setVAO(",c.drawVAO.append(a,b),");"):b(a.shared.vao,".setVAO(",a.shared.vao,".targetVAO);"):(b(a.shared.vao,".setVAO(null);"),
N(a,b,c,d.attributes,function(){return!0}));wa(a,b,c,d.uniforms,function(){return!0});aa(a,b,b,c)}function Da(a,b){var c=a.proc("draw",1);B(a,c);T(a,c,b.context);O(a,c,b.framebuffer);S(a,c,b);K(a,c,b.state);V(a,c,b,!1,!0);var d=b.shader.progVar.append(a,c);c(a.shared.gl,".useProgram(",d,".program);");if(b.shader.program)ba(a,c,b,b.shader.program);else{c(a.shared.vao,".setVAO(null);");var e=a.global.def("{}"),f=c.def(d,".id"),g=c.def(e,"[",f,"]");c(a.cond(g).then(g,".call(this,a0);")["else"](g,"=",
e,"[",f,"]=",a.link(function(c){return xa(ba,a,b,c,1)}),"(",d,");",g,".call(this,a0);"))}0<Object.keys(b.state).length&&c(a.shared.current,".dirty=true;")}function fa(a,b,c,d){function e(){return!0}a.batchId="a1";B(a,b);N(a,b,c,d.attributes,e);wa(a,b,c,d.uniforms,e);aa(a,b,b,c)}function M(a,b,c,d){function e(a){return a.contextDep&&g||a.propDep}function f(a){return!e(a)}B(a,b);var g=c.contextDep,h=b.def(),k=b.def();a.shared.props=k;a.batchId=h;var m=a.scope(),l=a.scope();b(m.entry,"for(",h,"=0;",
h,"<","a1",";++",h,"){",k,"=","a0","[",h,"];",l,"}",m.exit);c.needsContext&&T(a,l,c.context);c.needsFramebuffer&&O(a,l,c.framebuffer);K(a,l,c.state,e);c.profile&&e(c.profile)&&V(a,l,c,!1,!0);d?(c.useVAO?c.drawVAO?e(c.drawVAO)?l(a.shared.vao,".setVAO(",c.drawVAO.append(a,l),");"):m(a.shared.vao,".setVAO(",c.drawVAO.append(a,m),");"):m(a.shared.vao,".setVAO(",a.shared.vao,".targetVAO);"):(m(a.shared.vao,".setVAO(null);"),N(a,m,c,d.attributes,f),N(a,l,c,d.attributes,e)),wa(a,m,c,d.uniforms,f),wa(a,l,
c,d.uniforms,e),aa(a,m,l,c)):(b=a.global.def("{}"),d=c.shader.progVar.append(a,l),k=l.def(d,".id"),m=l.def(b,"[",k,"]"),l(a.shared.gl,".useProgram(",d,".program);","if(!",m,"){",m,"=",b,"[",k,"]=",a.link(function(b){return xa(fa,a,c,b,2)}),"(",d,");}",m,".call(this,a0[",h,"],",h,");"))}function X(a,b){function c(a){return a.contextDep&&e||a.propDep}var d=a.proc("batch",2);a.batchId="0";B(a,d);var e=!1,f=!0;Object.keys(b.context).forEach(function(a){e=e||b.context[a].propDep});e||(T(a,d,b.context),
f=!1);var g=b.framebuffer,h=!1;g?(g.propDep?e=h=!0:g.contextDep&&e&&(h=!0),h||O(a,d,g)):O(a,d,null);b.state.viewport&&b.state.viewport.propDep&&(e=!0);S(a,d,b);K(a,d,b.state,function(a){return!c(a)});b.profile&&c(b.profile)||V(a,d,b,!1,"a1");b.contextDep=e;b.needsContext=f;b.needsFramebuffer=h;f=b.shader.progVar;if(f.contextDep&&e||f.propDep)M(a,d,b,null);else if(f=f.append(a,d),d(a.shared.gl,".useProgram(",f,".program);"),b.shader.program)M(a,d,b,b.shader.program);else{d(a.shared.vao,".setVAO(null);");
var g=a.global.def("{}"),h=d.def(f,".id"),k=d.def(g,"[",h,"]");d(a.cond(k).then(k,".call(this,a0,a1);")["else"](k,"=",g,"[",h,"]=",a.link(function(c){return xa(M,a,b,c,2)}),"(",f,");",k,".call(this,a0,a1);"))}0<Object.keys(b.state).length&&d(a.shared.current,".dirty=true;")}function Y(a,c){function d(b){var g=c.shader[b];g&&e.set(f.shader,"."+b,g.append(a,e))}var e=a.proc("scope",3);a.batchId="a2";var f=a.shared,g=f.current;T(a,e,c.context);c.framebuffer&&c.framebuffer.append(a,e);wb(Object.keys(c.state)).forEach(function(b){var d=
c.state[b].append(a,e);na(d)?d.forEach(function(c,d){e.set(a.next[b],"["+d+"]",c)}):e.set(f.next,"."+b,d)});V(a,e,c,!0,!0);["elements","offset","count","instances","primitive"].forEach(function(b){var d=c.draw[b];d&&e.set(f.draw,"."+b,""+d.append(a,e))});Object.keys(c.uniforms).forEach(function(d){e.set(f.uniforms,"["+b.id(d)+"]",c.uniforms[d].append(a,e))});Object.keys(c.attributes).forEach(function(b){var d=c.attributes[b].append(a,e),f=a.scopeAttrib(b);Object.keys(new ia).forEach(function(a){e.set(f,
"."+a,d[a])})});c.scopeVAO&&e.set(f.vao,".targetVAO",c.scopeVAO.append(a,e));d("vert");d("frag");0<Object.keys(c.state).length&&(e(g,".dirty=true;"),e.exit(g,".dirty=true;"));e("a1(",a.shared.context,",a0,",a.batchId,");")}function ha(a){if("object"===typeof a&&!na(a)){for(var b=Object.keys(a),c=0;c<b.length;++c)if(ga.isDynamic(a[b[c]]))return!0;return!1}}function ja(a,b,c){function d(a,b){g.forEach(function(c){var d=e[c];ga.isDynamic(d)&&(d=a.invoke(b,d),b(l,".",c,"=",d,";"))})}var e=b["static"][c];
if(e&&ha(e)){var f=a.global,g=Object.keys(e),h=!1,k=!1,m=!1,l=a.global.def("{}");g.forEach(function(b){var c=e[b];if(ga.isDynamic(c))"function"===typeof c&&(c=e[b]=ga.unbox(c)),b=L(c,null),h=h||b.thisDep,m=m||b.propDep,k=k||b.contextDep;else{f(l,".",b,"=");switch(typeof c){case "number":f(c);break;case "string":f('"',c,'"');break;case "object":Array.isArray(c)&&f("[",c.join(),"]");break;default:f(a.link(c))}f(";")}});b.dynamic[c]=new ga.DynamicVariable(4,{thisDep:h,contextDep:k,propDep:m,ref:l,append:d});
delete b["static"][c]}}var ia=q.Record,W={add:32774,subtract:32778,"reverse subtract":32779};c.ext_blend_minmax&&(W.min=32775,W.max=32776);var oa=c.angle_instanced_arrays,Ja=c.webgl_draw_buffers,pa={dirty:!0,profile:h.profile},Ca={},Ka=[],qa={},ra={};p("dither",3024);p("blend.enable",3042);l("blend.color","blendColor",[0,0,0,0]);l("blend.equation","blendEquationSeparate",[32774,32774]);l("blend.func","blendFuncSeparate",[1,0,1,0]);p("depth.enable",2929,!0);l("depth.func","depthFunc",513);l("depth.range",
"depthRange",[0,1]);l("depth.mask","depthMask",!0);l("colorMask","colorMask",[!0,!0,!0,!0]);p("cull.enable",2884);l("cull.face","cullFace",1029);l("frontFace","frontFace",2305);l("lineWidth","lineWidth",1);p("polygonOffset.enable",32823);l("polygonOffset.offset","polygonOffset",[0,0]);p("sample.alpha",32926);p("sample.enable",32928);l("sample.coverage","sampleCoverage",[1,!1]);p("stencil.enable",2960);l("stencil.mask","stencilMask",-1);l("stencil.func","stencilFunc",[519,0,-1]);l("stencil.opFront",
"stencilOpSeparate",[1028,7680,7680,7680]);l("stencil.opBack","stencilOpSeparate",[1029,7680,7680,7680]);p("scissor.enable",3089);l("scissor.box","scissor",[0,0,a.drawingBufferWidth,a.drawingBufferHeight]);l("viewport","viewport",[0,0,a.drawingBufferWidth,a.drawingBufferHeight]);var ka={gl:a,context:F,strings:b,next:Ca,current:pa,draw:m,elements:d,buffer:g,shader:t,attributes:q.state,vao:q,uniforms:u,framebuffer:n,extensions:c,timer:k,isBufferArgs:Oa},Z={primTypes:Sa,compareFuncs:$a,blendFuncs:Ea,
blendEquations:W,stencilOps:Pa,glTypes:Ha,orientationType:xb};Ja&&(Z.backBuffer=[1029],Z.drawBuffer=A(e.maxDrawbuffers,function(a){return 0===a?[0]:A(a,function(a){return 36064+a})}));var ta=0;return{next:Ca,current:pa,procs:function(){var a=v(),b=a.proc("poll"),d=a.proc("refresh"),f=a.block();b(f);d(f);var g=a.shared,h=g.gl,k=g.next,m=g.current;f(m,".dirty=false;");O(a,b);O(a,d,null,!0);var l;oa&&(l=a.link(oa));c.oes_vertex_array_object&&d(a.link(c.oes_vertex_array_object),".bindVertexArrayOES(null);");
for(var n=0;n<e.maxAttributes;++n){var p=d.def(g.attributes,"[",n,"]"),q=a.cond(p,".buffer");q.then(h,".enableVertexAttribArray(",n,");",h,".bindBuffer(",34962,",",p,".buffer.buffer);",h,".vertexAttribPointer(",n,",",p,".size,",p,".type,",p,".normalized,",p,".stride,",p,".offset);")["else"](h,".disableVertexAttribArray(",n,");",h,".vertexAttrib4f(",n,",",p,".x,",p,".y,",p,".z,",p,".w);",p,".buffer=null;");d(q);oa&&d(l,".vertexAttribDivisorANGLE(",n,",",p,".divisor);")}d(a.shared.vao,".currentVAO=null;",
a.shared.vao,".setVAO(",a.shared.vao,".targetVAO);");Object.keys(qa).forEach(function(c){var e=qa[c],g=f.def(k,".",c),l=a.block();l("if(",g,"){",h,".enable(",e,")}else{",h,".disable(",e,")}",m,".",c,"=",g,";");d(l);b("if(",g,"!==",m,".",c,"){",l,"}")});Object.keys(ra).forEach(function(c){var e=ra[c],g=pa[c],l,n,p=a.block();p(h,".",e,"(");na(g)?(e=g.length,l=a.global.def(k,".",c),n=a.global.def(m,".",c),p(A(e,function(a){return l+"["+a+"]"}),");",A(e,function(a){return n+"["+a+"]="+l+"["+a+"];"}).join("")),
b("if(",A(e,function(a){return l+"["+a+"]!=="+n+"["+a+"]"}).join("||"),"){",p,"}")):(l=f.def(k,".",c),n=f.def(m,".",c),p(l,");",m,".",c,"=",l,";"),b("if(",l,"!==",n,"){",p,"}"));d(p)});return a.compile()}(),compile:function(a,b,c,d,e){var f=v();f.stats=f.link(e);Object.keys(b["static"]).forEach(function(a){ja(f,b,a)});Ub.forEach(function(b){ja(f,a,b)});c=la(a,b,c,d,f);Da(f,c);Y(f,c);X(f,c);return f.compile()}}}function zb(a,b){for(var c=0;c<a.length;++c)if(a[c]===b)return c;return-1}var H=function(a,
b){for(var c=Object.keys(b),e=0;e<c.length;++e)a[c[e]]=b[c[e]];return a},Bb=0,ga={DynamicVariable:ja,define:function(a,b){return new ja(a,bb(b+""))},isDynamic:function(a){return"function"===typeof a&&!a._reglType||a instanceof ja},unbox:function(a,b){return"function"===typeof a?new ja(0,a):a},accessor:bb},ab={next:"function"===typeof requestAnimationFrame?function(a){return requestAnimationFrame(a)}:function(a){return setTimeout(a,16)},cancel:"function"===typeof cancelAnimationFrame?function(a){return cancelAnimationFrame(a)}:
clearTimeout},Ab="undefined"!==typeof performance&&performance.now?function(){return performance.now()}:function(){return+new Date},z=fb();z.zero=fb();var Vb=function(a,b){var c=1;b.ext_texture_filter_anisotropic&&(c=a.getParameter(34047));var e=1,g=1;b.webgl_draw_buffers&&(e=a.getParameter(34852),g=a.getParameter(36063));var d=!!b.oes_texture_float;if(d){d=a.createTexture();a.bindTexture(3553,d);a.texImage2D(3553,0,6408,1,1,0,6408,5126,null);var r=a.createFramebuffer();a.bindFramebuffer(36160,r);
a.framebufferTexture2D(36160,36064,3553,d,0);a.bindTexture(3553,null);if(36053!==a.checkFramebufferStatus(36160))d=!1;else{a.viewport(0,0,1,1);a.clearColor(1,0,0,1);a.clear(16384);var n=z.allocType(5126,4);a.readPixels(0,0,1,1,6408,5126,n);a.getError()?d=!1:(a.deleteFramebuffer(r),a.deleteTexture(d),d=1===n[0]);z.freeType(n)}}n=!0;"undefined"!==typeof navigator&&(/MSIE/.test(navigator.userAgent)||/Trident\//.test(navigator.appVersion)||/Edge/.test(navigator.userAgent))||(n=a.createTexture(),r=z.allocType(5121,
36),a.activeTexture(33984),a.bindTexture(34067,n),a.texImage2D(34069,0,6408,3,3,0,6408,5121,r),z.freeType(r),a.bindTexture(34067,null),a.deleteTexture(n),n=!a.getError());return{colorBits:[a.getParameter(3410),a.getParameter(3411),a.getParameter(3412),a.getParameter(3413)],depthBits:a.getParameter(3414),stencilBits:a.getParameter(3415),subpixelBits:a.getParameter(3408),extensions:Object.keys(b).filter(function(a){return!!b[a]}),maxAnisotropic:c,maxDrawbuffers:e,maxColorAttachments:g,pointSizeDims:a.getParameter(33901),
lineWidthDims:a.getParameter(33902),maxViewportDims:a.getParameter(3386),maxCombinedTextureUnits:a.getParameter(35661),maxCubeMapSize:a.getParameter(34076),maxRenderbufferSize:a.getParameter(34024),maxTextureUnits:a.getParameter(34930),maxTextureSize:a.getParameter(3379),maxAttributes:a.getParameter(34921),maxVertexUniforms:a.getParameter(36347),maxVertexTextureUnits:a.getParameter(35660),maxVaryingVectors:a.getParameter(36348),maxFragmentUniforms:a.getParameter(36349),glsl:a.getParameter(35724),
renderer:a.getParameter(7937),vendor:a.getParameter(7936),version:a.getParameter(7938),readFloat:d,npotTextureCube:n}},G=function(a){return a instanceof Uint8Array||a instanceof Uint16Array||a instanceof Uint32Array||a instanceof Int8Array||a instanceof Int16Array||a instanceof Int32Array||a instanceof Float32Array||a instanceof Float64Array||a instanceof Uint8ClampedArray},J=function(a){return Object.keys(a).map(function(b){return a[b]})},Ma={shape:function(a){for(var b=[];a.length;a=a[0])b.push(a.length);
return b},flatten:function(a,b,c,e){var g=1;if(b.length)for(var d=0;d<b.length;++d)g*=b[d];else g=0;c=e||z.allocType(c,g);switch(b.length){case 0:break;case 1:e=b[0];for(b=0;b<e;++b)c[b]=a[b];break;case 2:e=b[0];b=b[1];for(d=g=0;d<e;++d)for(var r=a[d],n=0;n<b;++n)c[g++]=r[n];break;case 3:gb(a,b[0],b[1],b[2],c,0);break;default:hb(a,b,0,c,0)}return c}},Ga={"[object Int8Array]":5120,"[object Int16Array]":5122,"[object Int32Array]":5124,"[object Uint8Array]":5121,"[object Uint8ClampedArray]":5121,"[object Uint16Array]":5123,
"[object Uint32Array]":5125,"[object Float32Array]":5126,"[object Float64Array]":5121,"[object ArrayBuffer]":5121},Ha={int8:5120,int16:5122,int32:5124,uint8:5121,uint16:5123,uint32:5125,"float":5126,float32:5126},lb={dynamic:35048,stream:35040,"static":35044},Qa=Ma.flatten,kb=Ma.shape,ha=[];ha[5120]=1;ha[5122]=2;ha[5124]=4;ha[5121]=1;ha[5123]=2;ha[5125]=4;ha[5126]=4;var Sa={points:0,point:0,lines:1,line:1,triangles:4,triangle:4,"line loop":2,"line strip":3,"triangle strip":5,"triangle fan":6},ob=
new Float32Array(1),Jb=new Uint32Array(ob.buffer),Nb=[9984,9986,9985,9987],La=[0,6409,6410,6407,6408],S={};S[6409]=S[6406]=S[6402]=1;S[34041]=S[6410]=2;S[6407]=S[35904]=3;S[6408]=S[35906]=4;var Va=ka("HTMLCanvasElement"),Wa=ka("OffscreenCanvas"),sb=ka("CanvasRenderingContext2D"),tb=ka("ImageBitmap"),ub=ka("HTMLImageElement"),vb=ka("HTMLVideoElement"),Kb=Object.keys(Ga).concat([Va,Wa,sb,tb,ub,vb]),Z=[];Z[5121]=1;Z[5126]=4;Z[36193]=2;Z[5123]=2;Z[5125]=4;var w=[];w[32854]=2;w[32855]=2;w[36194]=2;w[34041]=
4;w[33776]=.5;w[33777]=.5;w[33778]=1;w[33779]=1;w[35986]=.5;w[35987]=1;w[34798]=1;w[35840]=.5;w[35841]=.25;w[35842]=.5;w[35843]=.25;w[36196]=.5;var E=[];E[32854]=2;E[32855]=2;E[36194]=2;E[33189]=2;E[36168]=1;E[34041]=4;E[35907]=4;E[34836]=16;E[34842]=8;E[34843]=6;var Wb=function(a,b,c,e,g){function d(a){this.id=q++;this.refCount=1;this.renderbuffer=a;this.format=32854;this.height=this.width=0;g.profile&&(this.stats={size:0})}function r(b){var c=b.renderbuffer;a.bindRenderbuffer(36161,null);a.deleteRenderbuffer(c);
b.renderbuffer=null;b.refCount=0;delete t[b.id];e.renderbufferCount--}var n={rgba4:32854,rgb565:36194,"rgb5 a1":32855,depth:33189,stencil:36168,"depth stencil":34041};b.ext_srgb&&(n.srgba=35907);b.ext_color_buffer_half_float&&(n.rgba16f=34842,n.rgb16f=34843);b.webgl_color_buffer_float&&(n.rgba32f=34836);var u=[];Object.keys(n).forEach(function(a){u[n[a]]=a});var q=0,t={};d.prototype.decRef=function(){0>=--this.refCount&&r(this)};g.profile&&(e.getTotalRenderbufferSize=function(){var a=0;Object.keys(t).forEach(function(b){a+=
t[b].stats.size});return a});return{create:function(b,c){function k(b,c){var d=0,e=0,m=32854;"object"===typeof b&&b?("shape"in b?(e=b.shape,d=e[0]|0,e=e[1]|0):("radius"in b&&(d=e=b.radius|0),"width"in b&&(d=b.width|0),"height"in b&&(e=b.height|0)),"format"in b&&(m=n[b.format])):"number"===typeof b?(d=b|0,e="number"===typeof c?c|0:d):b||(d=e=1);if(d!==h.width||e!==h.height||m!==h.format)return k.width=h.width=d,k.height=h.height=e,h.format=m,a.bindRenderbuffer(36161,h.renderbuffer),a.renderbufferStorage(36161,
m,d,e),g.profile&&(h.stats.size=E[h.format]*h.width*h.height),k.format=u[h.format],k}var h=new d(a.createRenderbuffer());t[h.id]=h;e.renderbufferCount++;k(b,c);k.resize=function(b,c){var d=b|0,e=c|0||d;if(d===h.width&&e===h.height)return k;k.width=h.width=d;k.height=h.height=e;a.bindRenderbuffer(36161,h.renderbuffer);a.renderbufferStorage(36161,h.format,d,e);g.profile&&(h.stats.size=E[h.format]*h.width*h.height);return k};k._reglType="renderbuffer";k._renderbuffer=h;g.profile&&(k.stats=h.stats);k.destroy=
function(){h.decRef()};return k},clear:function(){J(t).forEach(r)},restore:function(){J(t).forEach(function(b){b.renderbuffer=a.createRenderbuffer();a.bindRenderbuffer(36161,b.renderbuffer);a.renderbufferStorage(36161,b.format,b.width,b.height)});a.bindRenderbuffer(36161,null)}}},Xa=[];Xa[6408]=4;Xa[6407]=3;var Na=[];Na[5121]=1;Na[5126]=4;Na[36193]=2;var Ba=["x","y","z","w"],Ub="blend.func blend.equation stencil.func stencil.opFront stencil.opBack sample.coverage viewport scissor.box polygonOffset.offset".split(" "),
Ea={0:0,1:1,zero:0,one:1,"src color":768,"one minus src color":769,"src alpha":770,"one minus src alpha":771,"dst color":774,"one minus dst color":775,"dst alpha":772,"one minus dst alpha":773,"constant color":32769,"one minus constant color":32770,"constant alpha":32771,"one minus constant alpha":32772,"src alpha saturate":776},$a={never:512,less:513,"<":513,equal:514,"=":514,"==":514,"===":514,lequal:515,"<=":515,greater:516,">":516,notequal:517,"!=":517,"!==":517,gequal:518,">=":518,always:519},
Pa={0:0,zero:0,keep:7680,replace:7681,increment:7682,decrement:7683,"increment wrap":34055,"decrement wrap":34056,invert:5386},xb={cw:2304,ccw:2305},yb=new P(!1,!1,!1,function(){}),Xb=function(a,b){function c(){this.endQueryIndex=this.startQueryIndex=-1;this.sum=0;this.stats=null}function e(a,b,d){var e=r.pop()||new c;e.startQueryIndex=a;e.endQueryIndex=b;e.sum=0;e.stats=d;n.push(e)}if(!b.ext_disjoint_timer_query)return null;var g=[],d=[],r=[],n=[],u=[],q=[];return{beginQuery:function(a){var c=g.pop()||
b.ext_disjoint_timer_query.createQueryEXT();b.ext_disjoint_timer_query.beginQueryEXT(35007,c);d.push(c);e(d.length-1,d.length,a)},endQuery:function(){b.ext_disjoint_timer_query.endQueryEXT(35007)},pushScopeStats:e,update:function(){var a,c;a=d.length;if(0!==a){q.length=Math.max(q.length,a+1);u.length=Math.max(u.length,a+1);u[0]=0;var e=q[0]=0;for(c=a=0;c<d.length;++c){var k=d[c];b.ext_disjoint_timer_query.getQueryObjectEXT(k,34919)?(e+=b.ext_disjoint_timer_query.getQueryObjectEXT(k,34918),g.push(k)):
d[a++]=k;u[c+1]=e;q[c+1]=a}d.length=a;for(c=a=0;c<n.length;++c){var e=n[c],h=e.startQueryIndex,k=e.endQueryIndex;e.sum+=u[k]-u[h];h=q[h];k=q[k];k===h?(e.stats.gpuTime+=e.sum/1E6,r.push(e)):(e.startQueryIndex=h,e.endQueryIndex=k,n[a++]=e)}n.length=a}},getNumPendingQueries:function(){return d.length},clear:function(){g.push.apply(g,d);for(var a=0;a<g.length;a++)b.ext_disjoint_timer_query.deleteQueryEXT(g[a]);d.length=0;g.length=0},restore:function(){d.length=0;g.length=0}}};return function(a){function b(){if(0===
B.length)w&&w.update(),aa=null;else{aa=ab.next(b);t();for(var a=B.length-1;0<=a;--a){var c=B[a];c&&c(A,null,0)}k.flush();w&&w.update()}}function c(){!aa&&0<B.length&&(aa=ab.next(b))}function e(){aa&&(ab.cancel(b),aa=null)}function g(a){a.preventDefault();e();V.forEach(function(a){a()})}function d(a){k.getError();f.restore();D.restore();R.restore();x.restore();N.restore();T.restore();J.restore();w&&w.restore();O.procs.refresh();c();X.forEach(function(a){a()})}function r(a){function b(a){var c={},d=
{};Object.keys(a).forEach(function(b){var e=a[b];ga.isDynamic(e)?d[b]=ga.unbox(e,b):c[b]=e});return{dynamic:d,"static":c}}function c(a){for(;m.length<a;)m.push(null);return m}var d=b(a.context||{}),e=b(a.uniforms||{}),f=b(a.attributes||{}),g=b(function(a){function b(a){if(a in c){var d=c[a];delete c[a];Object.keys(d).forEach(function(b){c[a+"."+b]=d[b]})}}var c=H({},a);delete c.uniforms;delete c.attributes;delete c.context;delete c.vao;"stencil"in c&&c.stencil.op&&(c.stencil.opBack=c.stencil.opFront=
c.stencil.op,delete c.stencil.op);b("blend");b("depth");b("cull");b("stencil");b("polygonOffset");b("scissor");b("sample");"vao"in a&&(c.vao=a.vao);return c}(a));a={gpuTime:0,cpuTime:0,count:0};var d=O.compile(g,f,e,d,a),h=d.draw,k=d.batch,l=d.scope,m=[];return H(function(a,b){var d;if("function"===typeof a)return l.call(this,null,a,0);if("function"===typeof b)if("number"===typeof a)for(d=0;d<a;++d)l.call(this,null,b,d);else if(Array.isArray(a))for(d=0;d<a.length;++d)l.call(this,a[d],b,d);else return l.call(this,
a,b,0);else if("number"===typeof a){if(0<a)return k.call(this,c(a|0),a|0)}else if(Array.isArray(a)){if(a.length)return k.call(this,a,a.length)}else return h.call(this,a)},{stats:a})}function n(a,b){var c=0;O.procs.poll();var d=b.color;d&&(k.clearColor(+d[0]||0,+d[1]||0,+d[2]||0,+d[3]||0),c|=16384);"depth"in b&&(k.clearDepth(+b.depth),c|=256);"stencil"in b&&(k.clearStencil(b.stencil|0),c|=1024);k.clear(c)}function u(a){B.push(a);c();return{cancel:function(){function b(){var a=zb(B,b);B[a]=B[B.length-
1];--B.length;0>=B.length&&e()}var c=zb(B,a);B[c]=b}}}function q(){var a=S.viewport,b=S.scissor_box;a[0]=a[1]=b[0]=b[1]=0;A.viewportWidth=A.framebufferWidth=A.drawingBufferWidth=a[2]=b[2]=k.drawingBufferWidth;A.viewportHeight=A.framebufferHeight=A.drawingBufferHeight=a[3]=b[3]=k.drawingBufferHeight}function t(){A.tick+=1;A.time=z();q();O.procs.poll()}function m(){q();O.procs.refresh();w&&w.update()}function z(){return(Ab()-C)/1E3}a=Fb(a);if(!a)return null;var k=a.gl,h=k.getContextAttributes();k.isContextLost();
var f=Gb(k,a);if(!f)return null;var p=Cb(),l={vaoCount:0,bufferCount:0,elementsCount:0,framebufferCount:0,shaderCount:0,textureCount:0,cubeCount:0,renderbufferCount:0,maxTextureUnits:0},v=f.extensions,w=Xb(k,v),C=Ab(),E=k.drawingBufferWidth,L=k.drawingBufferHeight,A={tick:0,time:0,viewportWidth:E,viewportHeight:L,framebufferWidth:E,framebufferHeight:L,drawingBufferWidth:E,drawingBufferHeight:L,pixelRatio:a.pixelRatio},G=Vb(k,v),R=Hb(k,l,a,function(a){return J.destroyBuffer(a)}),J=Pb(k,v,G,l,R),P=
Ib(k,v,R,l),D=Qb(k,p,l,a),x=Lb(k,v,G,function(){O.procs.poll()},A,l,a),N=Wb(k,v,G,l,a),T=Ob(k,v,G,x,N,l),O=Tb(k,p,v,G,R,P,x,T,{},J,D,{elements:null,primitive:4,count:-1,offset:0,instances:-1},A,w,a),p=Rb(k,T,O.procs.poll,A,h,v,G),S=O.next,K=k.canvas,B=[],V=[],X=[],Y=[a.onDestroy],aa=null;K&&(K.addEventListener("webglcontextlost",g,!1),K.addEventListener("webglcontextrestored",d,!1));var Z=T.setFBO=r({framebuffer:ga.define.call(null,1,"framebuffer")});m();h=H(r,{clear:function(a){if("framebuffer"in
a)if(a.framebuffer&&"framebufferCube"===a.framebuffer_reglType)for(var b=0;6>b;++b)Z(H({framebuffer:a.framebuffer.faces[b]},a),n);else Z(a,n);else n(null,a)},prop:ga.define.bind(null,1),context:ga.define.bind(null,2),"this":ga.define.bind(null,3),draw:r({}),buffer:function(a){return R.create(a,34962,!1,!1)},elements:function(a){return P.create(a,!1)},texture:x.create2D,cube:x.createCube,renderbuffer:N.create,framebuffer:T.create,framebufferCube:T.createCube,vao:J.createVAO,attributes:h,frame:u,on:function(a,
b){var c;switch(a){case "frame":return u(b);case "lost":c=V;break;case "restore":c=X;break;case "destroy":c=Y}c.push(b);return{cancel:function(){for(var a=0;a<c.length;++a)if(c[a]===b){c[a]=c[c.length-1];c.pop();break}}}},limits:G,hasExtension:function(a){return 0<=G.extensions.indexOf(a.toLowerCase())},read:p,destroy:function(){B.length=0;e();K&&(K.removeEventListener("webglcontextlost",g),K.removeEventListener("webglcontextrestored",d));D.clear();T.clear();N.clear();x.clear();P.clear();R.clear();
J.clear();w&&w.clear();Y.forEach(function(a){a()})},_gl:k,_refresh:m,poll:function(){t();w&&w.update()},now:z,stats:l});a.onDone(null,h);return h}});

},{}]},{},[1]);
