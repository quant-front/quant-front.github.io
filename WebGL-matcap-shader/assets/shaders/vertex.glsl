varying vec2 vUv;
uniform float time;
varying vec3 vNormal;
varying vec3 vPosition;
varying vec3 vView;
void main() {

 vec4 transformed = modelViewMatrix * vec4(position, 1.0);
 vView = normalize(-transformed.xyz);

 vUv = uv;
 vNormal = normal;
 vPosition = position;

 gl_Position = projectionMatrix * transformed;
}
