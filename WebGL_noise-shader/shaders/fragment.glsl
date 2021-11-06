 varying vec2 vUv;
 uniform float time;
 #pragma glslify: snoise3 = require(glsl-noise/simplex/3d);
 #pragma glslify: hsl2rgb = require('glsl-hsl2rgb');

 void main() {

//  vec2 center = vUv - 0.5;
//  float n = snoise3(vec3(center * 1.0, time));
//  vec3 rgb = hsl2rgb(
//  n,
//  0.5,
//  0.5
//  );
//  gl_FragColor = vec4(rgb,1.0);
  float n = snoise3(vec3(vUv.xy, time));
  gl_FragColor = vec4(vec3(n),1.0);

 }
