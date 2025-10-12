import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/**
 * Base
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Object
 */
// const geometry = new THREE.BoxGeometry(1, 1, 1);

// positions of vertices can be represented using 3D coordinates as follows:
const positions = new Float32Array(9);
// also can use new Float32Array([0, 0, 0, ...])
positions[0] = 0;
positions[1] = 0;
positions[2] = 0;

positions[3] = 0;
positions[4] = 1;
positions[5] = 0;

positions[6] = 1;
positions[7] = 0;
positions[8] = 0;

const position_attr = new THREE.BufferAttribute(positions, positions.length / 3);
const geometry = new THREE.BufferGeometry('position', position_attr);

const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100,
);
camera.position.z = 3;
scene.add(camera);

/**
 * Sizes
 */

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  if (!renderer) return;
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
});

window.addEventListener('dblclick', () => {
    if (document.fullscreenElement || document.webkitFullscreen) {
        document.exitFullscreen()
    } else {
        canvas.requestFullscreen()
        canvas.webkitFullscreen()
    }
});

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
