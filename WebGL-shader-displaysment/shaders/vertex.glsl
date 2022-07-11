 varying vec2 vUv;
 uniform float time;
 varying vec3 vNormal;
 #pragma glslify: snoise3 = require(glsl-noise/simplex/3d);
 #pragma glslify: pnoise4 = require(glsl-noise/periodic/4d);
 #pragma glslify: pnoise3 = require(glsl-noise/periodic/3d);
 #pragma glslify: cnoise3 = require(glsl-noise/classic/3d);

 void main() {
  vNormal = normal;
 vUv = uv;
  float displaysment  = 0.75 * snoise3(0.43 * position + time);
  vec3 newPosition = position + normal * displaysment;
// vec3 pos = position.xyz * sin(time);
 gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
 }
