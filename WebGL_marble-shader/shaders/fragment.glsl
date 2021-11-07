 varying vec2 vUv;
 uniform float time;
 #pragma glslify: snoise3 = require(glsl-noise/simplex/3d);
 #pragma glslify: hsl2rgb = require('glsl-hsl2rgb');
 uniform vec3 u_LightColor;
 uniform vec3 u_DarkColor;
 uniform float u_Frequency;
 uniform float u_NoiseScale;
 uniform float u_RingScale;
 uniform float u_Contrast;
 void main() {

  vec2 center = vUv - 0.5;

  float n = snoise3(vec3(center * 1.0, time));
  vec3 rgb = hsl2rgb(
  n,
  0.5,
  0.5
  );
  float ring = u_Contrast - fract(u_NoiseScale * n);
  float lerp = pow(ring, u_RingScale) + n;
  vec3 color = mix(u_DarkColor, u_LightColor, lerp);
//  vec3 color = mix(rgb, u_LightColor, lerp);   cool colors
  gl_FragColor = vec4(color,1.0);
//  float n = snoise3(vec3(vUv.xy, time));
//  gl_FragColor = vec4(vec3(n),1.0);

 }
