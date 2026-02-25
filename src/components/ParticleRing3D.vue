<template>
  <div ref="container" class="particle-ring"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import * as THREE from 'three';

const container = ref<HTMLElement | null>(null);

let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let instancedMesh: THREE.InstancedMesh;
let dummy = new THREE.Object3D();

// Variables for physics and animation
const PARTICLE_COUNT = 8000;
const defaultPositions = new Float32Array(PARTICLE_COUNT * 3);
const velocities = new Float32Array(PARTICLE_COUNT * 3);

// Mouse interaction
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2(-9999, -9999);
const mousePlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
const targetVec = new THREE.Vector3();

// Torus settings
const MAIN_RADIUS = 28; // Increased significantly to push particles to the edges
const TUBE_RADIUS = 6;  // Make the ring itself slightly thicker

let animationFrameId: number;

const initThree = () => {
  if (!container.value) return;

  // Scene setup
  scene = new THREE.Scene();
  // Optional Fog for depth
  scene.fog = new THREE.FogExp2(0x000000, 0.015);

  // Camera setup
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 200);
  camera.position.z = 60; // Pull camera further back to see the wider ring

  // Renderer setup
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.value.appendChild(renderer.domElement);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);

  const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.5);
  dirLight1.position.set(10, 20, 10);
  scene.add(dirLight1);

  const dirLight2 = new THREE.DirectionalLight(0xff4d00, 2); // Orange aesthetic highlight
  dirLight2.position.set(-10, -10, 5);
  scene.add(dirLight2);

  // Geometry and Material
  // Note: High detail sphere geo can be heavy. Icosahedron is often faster for particles.
  const geometry = new THREE.IcosahedronGeometry(0.15, 2);
  const material = new THREE.MeshStandardMaterial({
    color: 0xdddddd,
    roughness: 0.4,
    metalness: 0.1,
  });

  instancedMesh = new THREE.InstancedMesh(geometry, material, PARTICLE_COUNT);
  scene.add(instancedMesh);

  // Initialize Particles
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    // Generate Torus distribution
    const u = Math.random() * Math.PI * 2;
    const v = Math.random() * Math.PI * 2;
    
    // Add some random scatter within the tube
    const scatter = Math.random() * 1.5;
    const r = TUBE_RADIUS + (Math.random() * 2 - 1) * scatter;
    
    const x = (MAIN_RADIUS + r * Math.cos(v)) * Math.cos(u);
    const y = (MAIN_RADIUS + r * Math.cos(v)) * Math.sin(u);
    const z = r * Math.sin(v) + (Math.random() - 0.5) * 2;

    defaultPositions[i * 3] = x;
    defaultPositions[i * 3 + 1] = y;
    defaultPositions[i * 3 + 2] = z;

    velocities[i * 3] = 0;
    velocities[i * 3 + 1] = 0;
    velocities[i * 3 + 2] = 0;

    dummy.position.set(x, y, z);
    
    // Random scale for variety
    const scale = Math.random() * 0.8 + 0.4;
    dummy.scale.set(scale, scale, scale);
    
    // Random rotation
    dummy.rotation.x = Math.random() * Math.PI;
    dummy.rotation.y = Math.random() * Math.PI;

    dummy.updateMatrix();
    instancedMesh.setMatrixAt(i, dummy.matrix);
  }
  
  instancedMesh.instanceMatrix.needsUpdate = true;

  // Events
  window.addEventListener('resize', onWindowResize);
  window.addEventListener('mousemove', onMouseMove);
};

const onWindowResize = () => {
  if (!camera || !renderer) return;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

const onMouseMove = (event: MouseEvent) => {
  // Normalize mouse coordinates for Raycaster
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
};

const animate = () => {
  animationFrameId = requestAnimationFrame(animate);

  const time = performance.now() * 0.001;
  
  // Rotate the entire ring slowly
  if (instancedMesh) {
    instancedMesh.rotation.z = time * 0.05;
    instancedMesh.rotation.x = Math.sin(time * 0.1) * 0.1;
  }

  // Update particles with Physics
  raycaster.setFromCamera(mouse, camera);
  raycaster.ray.intersectPlane(mousePlane, targetVec);
  
  // We need to account for the instancedMesh rotation to match global mouse pos to local particle pos.
  // Converting mouse world pos to local pos of the instanced mesh:
  const localTarget = targetVec.clone();
  if (instancedMesh) {
     instancedMesh.worldToLocal(localTarget);
  }

  const MOUSE_RADIUS = 8;
  const REPULSE_STRENGTH = 0.5;
  const RETURN_STRENGTH = 0.05;
  const DAMPING = 0.9;

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const idx = i * 3;
    
    // Current Position (extracted roughly, better to track in separate array)
    instancedMesh.getMatrixAt(i, dummy.matrix);
    dummy.position.setFromMatrixPosition(dummy.matrix);
    
    // Base target position
    const baseX = defaultPositions[idx];
    const baseY = defaultPositions[idx + 1];
    const baseZ = defaultPositions[idx + 2];
    
    // Add gentle organic float to base position
    const organicX = baseX + Math.sin(time * 1.5 + i) * 0.2;
    const organicY = baseY + Math.cos(time * 1.2 + i) * 0.2;
    const organicZ = baseZ + Math.sin(time * 1.8 + i) * 0.2;

    // Calculate distance to mouse cursor (in local space)
    const dx = dummy.position.x - localTarget.x;
    const dy = dummy.position.y - localTarget.y;
    // Assume z interaction is flat for now
    const distSq = dx * dx + dy * dy;

    if (distSq < MOUSE_RADIUS * MOUSE_RADIUS) {
      // Apply repulsion force
      const force = (MOUSE_RADIUS - Math.sqrt(distSq)) / MOUSE_RADIUS;
      const angle = Math.atan2(dy, dx);
      // Explode outward in 3D
      velocities[idx] += Math.cos(angle) * force * REPULSE_STRENGTH;
      velocities[idx + 1] += Math.sin(angle) * force * REPULSE_STRENGTH;
      velocities[idx + 2] += (Math.random() - 0.5) * force * REPULSE_STRENGTH * 2;
    }

    // Spring force towards organic base
    velocities[idx] += (organicX - dummy.position.x) * RETURN_STRENGTH;
    velocities[idx + 1] += (organicY - dummy.position.y) * RETURN_STRENGTH;
    velocities[idx + 2] += (organicZ - dummy.position.z) * RETURN_STRENGTH;

    // Apply damping
    velocities[idx] *= DAMPING;
    velocities[idx + 1] *= DAMPING;
    velocities[idx + 2] *= DAMPING;

    // Apply velocity
    dummy.position.x += velocities[idx];
    dummy.position.y += velocities[idx + 1];
    dummy.position.z += velocities[idx + 2];

    dummy.updateMatrix();
    instancedMesh.setMatrixAt(i, dummy.matrix);
  }

  instancedMesh.instanceMatrix.needsUpdate = true;
  renderer.render(scene, camera);
};

// Theme reactive handling
const updateTheme = (theme: string) => {
  if (!scene) return;
  if (theme === 'light') {
    scene.fog = new THREE.FogExp2(0xf0f0f0, 0.015);
  } else {
    scene.fog = new THREE.FogExp2(0x000000, 0.015);
  }
}

onMounted(() => {
  initThree();
  animate();
  
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  updateTheme(savedTheme);

  window.addEventListener('theme-changed', (e: Event) => {
    const customEvent = e as CustomEvent;
    updateTheme(customEvent.detail.theme);
  });
});

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId);
  window.removeEventListener('resize', onWindowResize);
  window.removeEventListener('mousemove', onMouseMove);
  if (renderer && container.value) {
    container.value.removeChild(renderer.domElement);
    renderer.dispose();
  }
});
</script>

<style lang="scss" scoped>
.particle-ring {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none; /* Let clicks pass through, JS mousemove will still catch cursor via window */
}
</style>
