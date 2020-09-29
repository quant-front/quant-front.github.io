
//#pragma glslify: hsl2rgb = require(glsl-hsl2rgb);
uniform float time;
varying vec2 vUv;
varying vec4 vPosition;

void main() {
// vec3 color1 = vec3(hsl2rgb(290.0/360.0, 0.74, 0.34));
// vec3 color2 = vec3(hsl2rgb(185.0/360.0, 0.83, 0.54));
 vec3 color1 = vec3(0.533, 0.847, 0.745);
 vec3 color2 = vec3(0.192, 0.216, 0.576);
 float threshold = 0.05;

 float pi = 3.1415926;
 float f_line = sin(pi*200. * (vUv.x - vUv.y*0.05) - time*4.);
// sin(pi*200.*(vUv.x - 0.08*vUv.y) - time*4.);
 float k = 0.;
 float sk = 0.;

 if(f_line<0.){
  k = -1.;
 } else{
  k = 1.;
 }
 float f_line_a = abs(f_line);

 if (f_line_a < threshold) {
   sk = (threshold - f_line_a) / threshold;
  k =  f_line* sk + (1. - sk)*k;
 }

 k = (k+1.)/2.;

 vec3 resultcolor = color1*k + color2*(1.-k);
 gl_FragColor = vec4(resultcolor,1.0);
// gl_FragColor = vec4(rgb, 1.0);
}

// void main() {
// vec3 color = vec3(1.0);
// gl_FragColor = vec4(vec3(vUv.x ),1.0);
//
// }
