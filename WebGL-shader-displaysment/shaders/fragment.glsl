 varying vec2 vUv;
 varying vec3 vNormal;
 void main() {
 vec3 color = vec3(1.0);
// gl_FragColor = vec4(vec3(vUv.x ),1.0);
  gl_FragColor = vec4(vNormal, 1.0);
 }
