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

void main () {
  // vec3 colorA = vec3(1.0,0.0,0.0);
  // vec3 colorB = vec3(0.0,0.5,0.0);
  // vec3 color = mix(colorA,colorB,vUv.x);
  // gl_FragColor = vec4(color, 1.0);

  float n = noise(vec3(vUv.xy, time));

  gl_FragColor = vec4(vec3(n),1.0);
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
