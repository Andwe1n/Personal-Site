import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader.js';
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader.js';
import {
  stormVertexShader, stormFragmentShader, compositeFragmentShader,
  atmosphereVertexShader, atmosphereFragmentShader,
} from './storm-shaders.js';

// The final override block in the prompt supersedes its initial pink/gold defaults.
export const CONFIG = Object.freeze({
  atmoColor: '#434341', bgColor: '#030303', coreColor: '#ffffff',
  flameColor: '#0b0b09', flameColor2: '#000000', midColor: '#787878', rimColor: '#ffffff',
  atmoCount: 430, atmoSize: 57, atmoSpeed: 2.5, blowUp: 0.69,
  brightness: 3.8, flameAmt: 2.4, opacity: 1.47, parallax: 0.8,
  pointSize: 67, repelRadius: 2.1, repelStrength: 3.3,
  scrollDive: 3.6, scrollGrow: 0.95, scrollSpin: 1.4, spin: 0.81,
});

const LAYERS = { NONE: 0, TORUS_SCENE: 1, BLOOM_SCENE: 2, ENTIRE_SCENE: 3 };
const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
function hexToVec3(hex) {
  const n = parseInt(hex.slice(1), 16);
  return new THREE.Vector3(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255);
}

export function createStorm(canvas, isPaused = () => false) {
  const renderer = new THREE.WebGL1Renderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.VSMShadowMap;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  scene.fog = new THREE.Fog(0x000000, 0, 15);
  const camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 80);
  camera.position.set(0, 0, 7);
  camera.layers.enable(LAYERS.TORUS_SCENE);
  camera.layers.enable(LAYERS.BLOOM_SCENE);
  camera.layers.enable(LAYERS.ENTIRE_SCENE);
  scene.add(camera);

  const count = 50000, radius = 2.5;
  const positions = new Float32Array(count * 3);
  const scales = new Float32Array(count), noises = new Float32Array(count);
  const radialPush = new Float32Array(count), mixv = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    let u, v, s;
    do { u = Math.random() * 2 - 1; v = Math.random() * 2 - 1; s = u * u + v * v; } while (s >= 1 || s === 0);
    const factor = 2 * Math.sqrt(1 - s);
    const dx = u * factor, dy = v * factor, dz = 1 - 2 * s;
    const rN = Math.pow(Math.random(), 0.4);
    const r = radius * (0.55 + rN * 0.45);
    positions[i3] = dx * r; positions[i3 + 1] = dy * r; positions[i3 + 2] = dz * r;
    mixv[i] = rN;
    scales[i] = 0.45 + Math.random() * 0.8;
    noises[i] = Math.random();
    radialPush[i] = 0.4 + rN * 1.1;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('aScale', new THREE.Float32BufferAttribute(scales, 1));
  geometry.setAttribute('aNoise', new THREE.Float32BufferAttribute(noises, 1));
  geometry.setAttribute('aRadialPush', new THREE.Float32BufferAttribute(radialPush, 1));
  geometry.setAttribute('aMix', new THREE.Float32BufferAttribute(mixv, 1));
  const uniforms = {
    uTime: { value: 0 }, uSize: { value: CONFIG.pointSize }, uOpacity: { value: 0 },
    uBlowUp: { value: CONFIG.blowUp }, uCursor: { value: new THREE.Vector3() },
    uRepelRadius: { value: CONFIG.repelRadius }, uRepelStrength: { value: CONFIG.repelStrength },
    uActivity: { value: 0 }, uCore: { value: hexToVec3(CONFIG.coreColor) },
    uMid: { value: hexToVec3(CONFIG.midColor) }, uRim: { value: hexToVec3(CONFIG.rimColor) },
    uBrightness: { value: CONFIG.brightness },
  };
  const material = new THREE.ShaderMaterial({
    uniforms, vertexShader: stormVertexShader, fragmentShader: stormFragmentShader,
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  });
  const points = new THREE.Points(geometry, material);
  points.layers.enable(LAYERS.ENTIRE_SCENE);
  const group = new THREE.Group();
  group.add(points);
  scene.add(group);

  // Retain the exact three-composer pipeline and layer routing from the prompt.
  const renderScene = new RenderPass(scene, camera);
  const torusComposer = new EffectComposer(renderer);
  torusComposer.renderToScreen = false;
  torusComposer.addPass(renderScene);
  torusComposer.addPass(new ShaderPass(GammaCorrectionShader));
  torusComposer.addPass(new UnrealBloomPass(new THREE.Vector2(innerWidth, innerHeight), 0.22, 0.2, 0));
  torusComposer.addPass(new ShaderPass(CopyShader));
  const bloomComposer = new EffectComposer(renderer);
  bloomComposer.renderToScreen = false;
  bloomComposer.addPass(renderScene);
  bloomComposer.addPass(new UnrealBloomPass(new THREE.Vector2(innerWidth, innerHeight), 0.4, 0.55, 0));
  bloomComposer.addPass(new ShaderPass(GammaCorrectionShader));
  const finalComposer = new EffectComposer(renderer);
  finalComposer.addPass(renderScene);
  // The prompt's unused halo sampler contributes black; bind that explicitly.
  const blackHalo = new THREE.DataTexture(new Uint8Array([0, 0, 0, 255]), 1, 1, THREE.RGBAFormat);
  blackHalo.needsUpdate = true;
  const finalPass = new ShaderPass({
    uniforms: {
      iTime: { value: 0 }, tDiffuse: { value: null },
      torusTexture: { value: null },
      bloomTexture: { value: null },
      haloTexture: { value: null }, uBg: { value: hexToVec3(CONFIG.bgColor) },
      uFlameA: { value: hexToVec3(CONFIG.flameColor) },
      uFlameB: { value: hexToVec3(CONFIG.flameColor2) }, uFlameAmt: { value: CONFIG.flameAmt },
    },
    vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position, 1.0); }',
    fragmentShader: compositeFragmentShader,
  });
  finalPass.uniforms.bloomTexture.value = bloomComposer.renderTarget1.texture;
  finalPass.uniforms.torusTexture.value = torusComposer.renderTarget1.texture;
  finalPass.uniforms.haloTexture.value = blackHalo;
  finalComposer.addPass(finalPass);

  const N = Math.round(CONFIG.atmoCount);
  const atmoPositions = new Float32Array(N * 3), sizes = new Float32Array(N), seeds = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    atmoPositions[i * 3] = 2 * Math.random() - 1;
    atmoPositions[i * 3 + 1] = 2 * Math.random() - 1;
    atmoPositions[i * 3 + 2] = 2 * Math.random() - 1;
    sizes[i] = CONFIG.atmoSize * (0.4 + Math.random()); seeds[i] = Math.random();
  }
  const atmoGeometry = new THREE.BufferGeometry();
  atmoGeometry.setAttribute('position', new THREE.Float32BufferAttribute(atmoPositions, 3));
  atmoGeometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));
  atmoGeometry.setAttribute('seed', new THREE.Float32BufferAttribute(seeds, 1));
  const atmoMaterial = new THREE.ShaderMaterial({
    transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, depthTest: false,
    uniforms: {
      uTime: { value: 0 }, uColor: { value: hexToVec3(CONFIG.atmoColor) },
      uRes: { value: new THREE.Vector2(innerWidth * devicePixelRatio, innerHeight * devicePixelRatio) },
    },
    vertexShader: atmosphereVertexShader, fragmentShader: atmosphereFragmentShader,
  });
  const motes = new THREE.Points(atmoGeometry, atmoMaterial);
  motes.frustumCulled = false;
  motes.layers.enable(LAYERS.ENTIRE_SCENE);
  scene.add(motes);

  const pointer = {
    ndc: new THREE.Vector2(), world: new THREE.Vector3(), activity: 0,
    active: false, lastMove: performance.now(),
  };
  const ndc = new THREE.Vector3(), direction = new THREE.Vector3(), target = new THREE.Vector3();
  const onMouseMove = (e) => {
    pointer.ndc.set(e.clientX / innerWidth * 2 - 1, -(e.clientY / innerHeight * 2 - 1));
    pointer.active = true; pointer.lastMove = performance.now();
  };
  const onMouseOut = () => { pointer.active = false; };
  function updatePointer() {
    target.set(0, 0, 0);
    if (pointer.active) {
      ndc.set(pointer.ndc.x, pointer.ndc.y, 0.5).unproject(camera);
      direction.copy(ndc).sub(camera.position).normalize();
      if (Math.abs(direction.z) > 1e-4) {
        const t = -camera.position.z / direction.z;
        if (t > 0 && Number.isFinite(t)) target.copy(camera.position).addScaledVector(direction, t);
      }
    }
    pointer.world.lerp(target, 0.12);
    const idle = (performance.now() - pointer.lastMove) / 1000;
    const want = pointer.active && idle < 3 ? 1 : 0;
    pointer.activity += (want - pointer.activity) * 0.06;
  }
  let scrollTarget = 0, scrollSmooth = 0, scrollCurrent = 0;
  const mouseSmooth = { x: 0, y: 0 };
  function updateScroll() {
    const max = document.documentElement.scrollHeight - innerHeight;
    scrollTarget = max > 0 ? clamp(window.scrollY / max, 0, 1) : 0;
  }
  const composers = [torusComposer, bloomComposer, finalComposer];
  function resize() {
    const pixelRatio = Math.min(devicePixelRatio, 1.5);
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(innerWidth, innerHeight);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    for (const composer of composers) {
      composer.setPixelRatio(pixelRatio);
      composer.setSize(innerWidth, innerHeight);
    }
    atmoMaterial.uniforms.uRes.value.set(innerWidth * pixelRatio, innerHeight * pixelRatio);
    updateScroll();
  }
  window.addEventListener('mousemove', onMouseMove, { passive: true });
  window.addEventListener('mouseout', onMouseOut, { passive: true });
  window.addEventListener('scroll', updateScroll, { passive: true });
  window.addEventListener('resize', resize);
  resize();

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const appearStart = performance.now();
  let previous = appearStart / 1000, time = previous, frame, lastDraw = 0, needsRender = true;
  motes.onBeforeRender = () => {
    atmoMaterial.uniforms.uTime.value = time * CONFIG.atmoSpeed * 8;
    motes.position.copy(camera.position);
    finalPass.uniforms.iTime.value = time;
  };
  function render(now) {
    frame = requestAnimationFrame(render);
    const realTime = now / 1000;
    if (document.hidden || scrollY > innerHeight * 1.3) { previous = realTime; return; }
    if (now - lastDraw < 1000 / 30) return;
    lastDraw = now;
    const moving = !isPaused() && !reducedMotion.matches;
    const dt = moving ? Math.min(0.05, realTime - previous) : 0;
    if (!moving && !needsRender && now - appearStart > 1800) { previous = realTime; return; }
    needsRender = false;
    if (moving) time += Math.min(0.05, realTime - previous);
    previous = realTime;
    scrollSmooth = lerp(scrollSmooth, scrollTarget, 0.10);
    scrollCurrent = lerp(scrollCurrent, scrollSmooth, 0.06);
    mouseSmooth.x = lerp(mouseSmooth.x, pointer.ndc.x, 0.06);
    mouseSmooth.y = lerp(mouseSmooth.y, pointer.ndc.y, 0.06);
    updatePointer();
    uniforms.uTime.value = time;
    camera.position.set(mouseSmooth.x * CONFIG.parallax, mouseSmooth.y * CONFIG.parallax, 7 - scrollCurrent * CONFIG.scrollDive);
    camera.lookAt(0, 0, 0);
    group.scale.setScalar(1 + scrollCurrent * CONFIG.scrollGrow);
    const fade = clamp((now - appearStart - 300) / 1400, 0, 1);
    uniforms.uOpacity.value = fade * CONFIG.opacity;
    uniforms.uBlowUp.value = CONFIG.blowUp;
    uniforms.uCursor.value.copy(pointer.world);
    uniforms.uActivity.value = pointer.activity;
    group.rotation.y += dt * (CONFIG.spin + scrollCurrent * CONFIG.scrollSpin);
    group.rotation.x += dt * CONFIG.spin * 0.33;
    camera.layers.set(LAYERS.TORUS_SCENE); torusComposer.render();
    camera.layers.set(LAYERS.BLOOM_SCENE); bloomComposer.render();
    camera.layers.set(LAYERS.ENTIRE_SCENE); finalComposer.render();
  }
  const invalidate = () => { needsRender = true; };
  window.addEventListener('resize', invalidate);
  frame = requestAnimationFrame(render);

  return () => {
    window.removeEventListener('resize', invalidate);
    cancelAnimationFrame(frame);
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseout', onMouseOut);
    window.removeEventListener('scroll', updateScroll);
    window.removeEventListener('resize', resize);
    geometry.dispose(); material.dispose(); atmoGeometry.dispose(); atmoMaterial.dispose(); blackHalo.dispose();
    const passes = new Set(composers.flatMap(composer => composer.passes));
    for (const pass of passes) {
      pass.dispose?.(); pass.material?.dispose(); pass.fsQuad?.dispose();
      pass.materialHighPassFilter?.dispose(); pass.basic?.dispose();
      pass.compositeMaterial?.dispose(); pass.materialCopy?.dispose();
      pass.separableBlurMaterials?.forEach(material => material.dispose());
    }
    for (const composer of composers) {
      composer.renderTarget1.dispose(); composer.renderTarget2.dispose();
      composer.copyPass.material.dispose(); composer.copyPass.fsQuad.dispose();
    }
    renderer.dispose();
  };
}
