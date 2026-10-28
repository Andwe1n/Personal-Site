// GLSL copied verbatim from the supplied Storm specification.

export const stormVertexShader = `
uniform float uTime; uniform float uSize; uniform float uBlowUp;
uniform vec3 uCursor; uniform float uRepelRadius; uniform float uRepelStrength; uniform float uActivity;
uniform vec3 uCore; uniform vec3 uMid; uniform vec3 uRim;
attribute float aScale; attribute float aNoise; attribute float aRadialPush; attribute float aMix;
varying vec3 vColor; varying float vBlowUp;
void main() {
  vec3 pos = position;

  // Per-particle in/out wobble.
  float t = uTime * 1.4 + aNoise * 6.2831;
  float wobble = sin(t) * 0.1 * aRadialPush;
  pos *= 1.0 + wobble;

  // Slow secondary swirl on xz.
  float swirlAngle = uTime * 0.05 + aNoise * 6.2831;
  mat2 swirl = mat2(cos(swirlAngle), -sin(swirlAngle), sin(swirlAngle), cos(swirlAngle));
  pos.xz = swirl * pos.xz;

  // Blow-up — radial explosion with a squared falloff.
  vec3 outward = normalize(pos + vec3(0.0001));
  float blow = uBlowUp * uBlowUp;
  pos += outward * blow * (10.0 + aNoise * 18.0) * aRadialPush;

  vec4 modelPosition = modelMatrix * vec4(pos, 1.0);

  vec3 toParticle = modelPosition.xyz - uCursor;
  float dist = length(toParticle);
  float falloff = smoothstep(uRepelRadius, 0.0, dist);
  modelPosition.xyz += normalize(toParticle + vec3(0.0001)) * falloff * uRepelStrength * uActivity;

  vec4 viewPosition = viewMatrix * modelPosition;
  gl_Position = projectionMatrix * viewPosition;
  gl_PointSize = uSize * aScale;
  gl_PointSize *= (1.0 / -viewPosition.z);

  // Three-stop radial gradient (aMix = biased radius 0..1).
  float t1 = smoothstep(0.25, 0.85, aMix);
  vec3 mix1 = mix(uCore, uMid, t1);
  float t2 = clamp((aMix - 0.7) * 3.0, 0.0, 1.0);
  vColor = mix(mix1, uRim, t2);
  vBlowUp = uBlowUp;
}
`;

export const stormFragmentShader = `
uniform float uOpacity; uniform float uBrightness;
varying vec3 vColor; varying float vBlowUp;
void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float d = length(uv);
  if (d > 0.5) discard;
  float strength = pow(1.0 - d * 2.0, 4.5);
  vec3 color = mix(vec3(0.0), vColor, strength);
  float blowFade = 1.0 - smoothstep(0.15, 1.0, vBlowUp);
  gl_FragColor = vec4(color * uBrightness, strength * uOpacity * blowFade);
}
`;

export const compositeFragmentShader = `
uniform float iTime; uniform sampler2D tDiffuse; uniform sampler2D bloomTexture; uniform sampler2D torusTexture; uniform sampler2D haloTexture;
uniform vec3 uBg; uniform vec3 uFlameA; uniform vec3 uFlameB; uniform float uFlameAmt;
varying vec2 vUv;
vec3 warp3d(vec3 pos, float t){ float curv=.8,a=1.9,b=0.7; pos*=2.;
  pos.x+=curv*sin(t+a*pos.y)+t*b; pos.y+=curv*cos(t+a*pos.x);
  pos.y+=curv*sin(t+a*pos.z)+t*b; pos.z+=curv*cos(t+a*pos.y);
  pos.z+=curv*sin(t+a*pos.x)+t*b; pos.x+=curv*cos(t+a*pos.z);
  return 0.5+0.5*cos(pos.xyz+vec3(1,2,4)); }
void main(){
  vec2 uv = 2.*vUv - 1.;
  vec3 w = pow(warp3d(vec3(uv.x, sin(uv.y), uv.y), iTime*1.5), vec3(1.5));
  vec3 flame = 1.5*uFlameA*w.x; flame*=w.y; flame += uFlameB*w.z;
  flame *= smoothstep(0.25, 1., abs(uv.y));
  float md = smoothstep(-0.7, 1., -uv.y*uv.x); flame *= md*md;
  vec3 bg = uBg * (1.0 - 0.4 * length(uv));
  vec3 halo = texture2D(haloTexture, vUv).xyz;
  gl_FragColor = vec4(bg + flame*uFlameAmt + texture2D(bloomTexture, vUv).xyz + texture2D(torusTexture, vUv).xyz + texture2D(tDiffuse, vUv).xyz + halo, 1.);
}
`;

export const atmosphereVertexShader = `
attribute float size; attribute float seed; uniform float uTime; uniform vec2 uRes;
varying float vA;
vec3 warp(vec3 p, float t){ float c=0.9,a=1.9,b=0.02,s=0.05; p*=2.;
  p.x+=c*sin(s*t+a*p.y)+t*b; p.y+=c*cos(s*t+a*p.x); p.y+=c*sin(s*t+a*p.z)+t*b;
  p.z+=c*cos(s*t+a*p.y); p.z+=c*sin(s*t+a*p.x)+t*b; p.x+=c*cos(s*t+a*p.z);
  return cos(p+vec3(1,2,4)); }
void main(){
  vec3 v = position*4.0 + warp(position, uTime)*1.2;
  vec4 mv = modelViewMatrix * vec4(v, 1.0);
  float r = length(v); float farF = 1.0 - smoothstep(5.0, 6.5, r); float nearF = smoothstep(0.0, 0.5, -mv.z);
  vA = farF * nearF;
  gl_PointSize = size * uRes.y / 900.0 / -mv.z; gl_PointSize = max(gl_PointSize, 1.0);
  gl_Position = projectionMatrix * mv;
}
`;

export const atmosphereFragmentShader = `
uniform vec3 uColor; varying float vA;
void main(){ vec2 p = gl_PointCoord - 0.5; float l = length(p); if (l > 0.5) discard;
  float tex = smoothstep(0.5, 0.0, l); gl_FragColor = vec4(uColor * tex, tex * vA * 0.6); }
`;
