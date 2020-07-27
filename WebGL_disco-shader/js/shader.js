var  glsl = require('glslify');
const  canvasSketch = require('canvas-sketch');
const  shader = require('canvas-sketch-util/shader');


const  settings = {
     context: 'webgl',
     animate: true,
}


const  frag = glsl(`
precision highp float;

uniform float time;
uniform float aspect;
varying vec2 vUv;

#pragma glslify: noise = require('glsl-noise/simplex/3d');
#pragma glslify: hsl2rgb = require('glsl-hsl2rgb'); 

void main () {
  // vec3 colorA = vec3(1.0,0.0,0.0);
  // vec3 colorB = vec3(0.0,0.5,0.0);
  // vec3 color = mix(colorA,colorB,vUv.x);
  // gl_FragColor = vec4(color, 1.0);
  vec2 center = vUv - 0.5;
  // center.x *= aspect;
  float n = noise(vec3(center * 1.0, time));
   vec3 rgb = hsl2rgb(
    n, 
   0.5,
   0.5
    );


  gl_FragColor = vec4(rgb,1.0);
}
`);




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
