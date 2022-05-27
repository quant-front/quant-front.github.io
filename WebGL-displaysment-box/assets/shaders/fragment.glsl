 varying vec2 vUv;
 uniform sampler2D t1;
 uniform sampler2D t2;
 varying float vHieght;
 void main() {


  vec4 color = texture2D(t1,vUv);
  gl_FragColor = vec4(vHieght,0.3,0.0,1.0);
 }
