<template>
  <div class="project-card-3d" ref="container" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import * as THREE from 'three';

const props = defineProps<{
  imageSrc: string;
}>();

const container = ref<HTMLElement | null>(null);

let scene: THREE.Scene;
let camera: THREE.OrthographicCamera;
let renderer: THREE.WebGLRenderer;
let material: THREE.ShaderMaterial;
let mesh: THREE.Mesh;
let texture: THREE.Texture;

let animationFrameId: number;
let time = 0;

// Hover state management for the shader transition
let hoverState = 0; // 0 = off, 1 = on
let targetHoverState = 0;

// Mouse coordinates
const mouseParams = new THREE.Vector2(0.5, 0.5); // Center by default

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uHover;
  uniform vec2 uMouse;
  uniform vec2 uRatio;
  
  varying vec2 vUv;
  
  // Fake noise function
  float noise(vec2 p) {
    p = fract(p * vec2(233.14, 113.14));
    p += dot(p, p + 23.45);
    return fract(p.x * p.y);
  }

  void main() {
    // Correct UVs for aspect ratio (object-fit: cover)
    vec2 p = vec2(
      vUv.x * uRatio.x + (1.0 - uRatio.x) * 0.5,
      vUv.y * uRatio.y + (1.0 - uRatio.y) * 0.5
    );
    
    // Distance from mouse to current pixel
    float dist = distance(vUv, uMouse); // Use original UVs for mouse bounding box to keep interaction circular
    
    // Influence area based on hover state
    float area = smoothstep(0.4, 0.0, dist) * uHover;
    
    // Displacement math (organic "liquid" noise)
    float n = noise(vUv * 5.0 + uTime * 2.0); // Use original UVs for consistent noise scale
    vec2 displacement = vec2(n * 0.1, n * 0.1) * area;
    
    // Distort corrected UVs
    vec2 distortedUV = p + displacement;

    // RGB split effect (classic glitch/chromatic aberration)
    float r = texture2D(uTexture, distortedUV + vec2(0.01 * area, 0.0)).r;
    float g = texture2D(uTexture, distortedUV).g;
    float b = texture2D(uTexture, distortedUV - vec2(0.01 * area, 0.0)).b;
    
    vec4 color = vec4(r, g, b, 1.0);
    
    // Desaturate logic when NOT hovering
    // Luma formula for grayscale
    float luma = dot(color.rgb, vec3(0.299, 0.587, 0.114));
    vec3 grayscale = vec3(luma);
    
    // Interpolate between grayscale (uHover = 0) and full distorted color (uHover = 1)
    color.rgb = mix(grayscale, color.rgb, uHover);
    
    // Add fake noise texture on top based on theme aesthetic
    float staticNoise = noise(vUv * 100.0 + uTime) * 0.1;
    color.rgb += vec3(staticNoise);

    gl_FragColor = color;
  }
`;

const initThree = () => {
  if (!container.value) return;

  scene = new THREE.Scene();

  // Orthographic Camera is best for 2D plane rendering
  camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Determine size based on CSS layout
  updateBounds();
  
  container.value.appendChild(renderer.domElement);

  // Load Texture
  const textureLoader = new THREE.TextureLoader();
  texture = textureLoader.load(props.imageSrc, () => {
    // Force re-render once image is loaded to avoid blank planes
    updateRatio();
    if (renderer) renderer.render(scene, camera);
  });
  // Make sure texture covers area
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;

  // Shader Material
  material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTexture: { value: texture },
      uTime: { value: 0 },
      uHover: { value: 0 },
      uMouse: { value: mouseParams },
      uRatio: { value: new THREE.Vector2(1, 1) }
    },
    transparent: true
  });

  // Simple plane mapping 1-to-1 with ortho camera
  const geometry = new THREE.PlaneGeometry(2, 2);
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  window.addEventListener('resize', updateBounds);
  container.value.addEventListener('mousemove', onMouseMove);
};

const updateBounds = () => {
  if (!container.value || !renderer) return;
  const rect = container.value.getBoundingClientRect();
  renderer.setSize(rect.width, rect.height);
  updateRatio();
};

const updateRatio = () => {
  if (!container.value || !material || !texture || !texture.image) return;
  const rect = container.value.getBoundingClientRect();
  const containerAspect = rect.width / rect.height;
  
  let imageAspect = 1;
  // Make sure image is loaded
  const img = texture.image as HTMLImageElement | undefined;
  if (img && img.width && img.height) {
    imageAspect = img.width / img.height;
  }
  
  if (containerAspect > imageAspect) {
    material.uniforms.uRatio.value.set(1, imageAspect / containerAspect);
  } else {
    material.uniforms.uRatio.value.set(containerAspect / imageAspect, 1);
  }
};

const onMouseEnter = () => {
  targetHoverState = 1;
};

const onMouseLeave = () => {
  targetHoverState = 0;
};

const onMouseMove = (event: MouseEvent) => {
  if (!container.value) return;
  const rect = container.value.getBoundingClientRect();
  // Normalize mouse coordinates [0, 1] relative to the element
  mouseParams.x = (event.clientX - rect.left) / rect.width;
  mouseParams.y = 1.0 - ((event.clientY - rect.top) / rect.height); // WebGL y is usually inverted
};

const animate = () => {
  animationFrameId = requestAnimationFrame(animate);

  time += 0.05;

  // LERP the hover state for smooth transition
  hoverState += (targetHoverState - hoverState) * 0.1;

  if (material) {
    material.uniforms.uTime.value = time;
    material.uniforms.uHover.value = hoverState;
    material.uniforms.uMouse.value.copy(mouseParams);
  }

  if (scene && camera && renderer) {
    renderer.render(scene, camera);
  }
};

onMounted(() => {
  initThree();
  animate();
  
  // Watch for dynamic image source changes if any
  watch(() => props.imageSrc, (newSrc) => {
    if (material && material.uniforms.uTexture) {
      new THREE.TextureLoader().load(newSrc, (tex) => {
        texture = tex;
        // Make sure filtering is consistent
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        material.uniforms.uTexture.value = texture;
        updateRatio();
      });
    }
  });
});

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId);
  window.removeEventListener('resize', updateBounds);
  if (container.value) {
    container.value.removeEventListener('mousemove', onMouseMove);
  }
  if (renderer && container.value) {
    container.value.removeChild(renderer.domElement);
    renderer.dispose();
  }
  if (texture) texture.dispose();
  if (mesh) mesh.geometry.dispose();
  if (material) material.dispose();
});
</script>

<style lang="scss" scoped>
.project-card-3d {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  
  canvas {
    display: block;
    width: 100% !important;
    height: 100% !important;
  }
}
</style>
