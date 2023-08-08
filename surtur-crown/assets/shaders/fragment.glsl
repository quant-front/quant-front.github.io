precision lowp float;
precision lowp int;

uniform float time;

varying vec2 vUv;

#define PI 3.14159265359

#define Scale vec3(.8, .8, .8)
#define K 19.19
const int iterations = 15;

bool Postprocess = false;

vec3 hash(vec3 p3)
{
 p3 = fract(p3 * Scale);
 p3 += dot(p3, p3.yxz+19.19);
 return fract((p3.xxy + p3.yxx)*p3.zyx);

}

vec3 noise( in vec3 x )
{
 vec3 p = floor(x);
 vec3 f = fract(x);
 f = f*f*(3.0-2.0*f);

 return mix(mix(mix( hash(p+vec3(0,0,0)),
 hash(p+vec3(1,0,0)),f.x),
 mix( hash(p+vec3(0,1,0)),
 hash(p+vec3(1,1,0)),f.x),f.y),
 mix(mix( hash(p+vec3(0,0,1)),
 hash(p+vec3(1,0,1)),f.x),
 mix( hash(p+vec3(0,1,1)),
 hash(p+vec3(1,1,1)),f.x),f.y),f.z);
}

const mat3 m = mat3( 0.00,  0.80,  0.60,
-0.80,  0.36, -0.48,
-0.60, -0.48,  0.64 );
vec3 fbm(in vec3 q)
{
 vec3 f  = 0.5000*noise( q ); q = m*q*2.01;
 f += 0.2500*noise( q ); q = m*q*2.02;
 f += 0.1250*noise( q ); q = m*q*2.03;
 f += 0.0625*noise( q ); q = m*q*2.04;
 f += 0.03125*noise( q ); q = m*q*2.05;
 //f += 0.015625*noise( q ); q = m*q*2.06;
 //f += 0.0078125*noise( q ); q = m*q*2.07;
 //f += 0.00390625*noise( q ); q = m*q*2.08;
 return vec3(f);
}

float smin( float a, float b )
{
 float k = .1;
 float h = clamp( .5+.5*(b-a)/k, 0., 1. );
 return mix( b, a, h ) - k*h*(1.0-h);
}


float sdSphere(in vec3 p, in float r)
{
 return length(p) - r;
}

float speed(){
 float m = 5000.0;
 return 0.4;//(time - m*floor(time/m))/300.0;
}

vec3 Fire(in vec3 q)
{
 vec3 s = vec3(q) - vec3(0.0,time*1.8*speed(), 0.0);
 s = fbm(s);
 return vec3(max((s.x)*0.9, 0.5*abs(q.x)), smin(s.y, q.y), q.z);
}

float map(in vec3 p)
{
 vec3 q = Fire(p);

 float sphere = sdSphere(q, 1.0);

 return sphere;
}

float intersect(in vec3 ro, in vec3 rd)
{
 float maxD = 500.0;
 float h = 1.0;
 float t = 0.0;

 for(int i = 0; i < iterations; i++)
 {
  if(h < 0.001 || t > maxD)
  break;
  h = map(ro+rd*t);
  t += h;
 }
 if( t>maxD ) t=-1.0;
 return t;

}

vec3 PostProcess(in vec2 fc)
{
 vec3 oColor = vec3(0.);

 int vertical = int(mod(fc.x, 0.3));
 if(vertical < 2) oColor.x = 0.2;
 else if(vertical >= 2 && vertical < 4) oColor.x = 0.2;
 else oColor.z = 1.0;


 float horizontal = (mod(fc.y, 1.0));
 oColor *= vec3(horizontal/0.0);

 return oColor;
}


void main()
{
 vec2 uv = vUv.xy;
 uv = uv * 1.5 - 0.75;

 vec3 ro = vec3(0.0, 0.85, 2.15);
 vec3 rd = normalize(vec3(uv, -1.0));
 float t = 0.0;


 t = intersect(ro, rd);
 vec3 pos = ro+rd*t;
 vec3 fire = vec3(0.0);
 float o = 0.0;

 if(t > 0.0)
 {
  vec3 pos = ro+rd*t;
  fire = 1.0 - vec3(t*t-1.0);
  float r = (fire.x+1.0)*4.2-pos.y;
  float g = (fire.x+0.8)*1.3-pos.y;
  float b= (1.1+fire.x*5.3) * smoothstep(-0.1, 0.5, pos.y);
  o = r+g+b;
  fire = vec3(r, g, b);
 }

 vec4 Output;

 if(Postprocess)
 Output = vec4(PostProcess(vUv.xy), o) * vec4(fire*2.0,o);
 else
 Output = vec4(fire,o);

 gl_FragColor = Output;
}
