 varying vec2 vUv;
 uniform float time;
 uniform sampler2D t1;
 uniform sampler2D t2;
 varying float vHieght;
 void main() {
 vUv = uv;

  vec3 newpos = position;

  vec2 uv1 = position.xz + vec2(0.5,0.5);
  vec2 vUv1 = uv1 + time* 0.06;
  vec2 vUv2 = uv1 - time* 0.06;

  vUv1 *= 0.2;
  vUv2 *= 0.4;

  float top = step(0.,position.y);


  vec4 bump1 = texture2D(t1,vUv1);
  vec4 bump2 = texture2D(t2,vUv1);
  float hieght = (bump1.x+ bump2.x) / 2.;
  vHieght = hieght;


  newpos.y += top*hieght/2.5;


 gl_Position = projectionMatrix * modelViewMatrix * vec4(newpos, 1.0);
 }
