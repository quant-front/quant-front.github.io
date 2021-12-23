uniform sampler2D t1;
uniform sampler2D t2;
uniform float transition;
varying vec2 vUv;
void main(){
 vec4 tex1 = texture2D(t1, vUv);
 vec4 tex2 = texture2D(t2, vUv);


 gl_FragColor = mix(tex1, tex2, transition);

}
