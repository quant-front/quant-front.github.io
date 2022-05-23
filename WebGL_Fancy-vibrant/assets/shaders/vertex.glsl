 varying vec2 vUv;
 uniform float time;
 varying vec3 vNormal;
 void main() {
 vNormal = normal;
 vUv = uv;
// vec3 pos = position.xyz * sin(time);
 gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
 }
