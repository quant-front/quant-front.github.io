varying vec3 v_position;
varying vec2 vUv;
uniform float time;
void main() {
 vUv = uv;
 gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
