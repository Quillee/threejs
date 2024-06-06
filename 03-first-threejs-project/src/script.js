import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);

const sphere = new THREE.SphereGeometry();
sphere.translate(0.0, 100.0, 0.0);
const material2 = new THREE.MeshBasicMaterial({ color: 0x8A2BE2 });
const mesh2 = new THREE.Mesh(sphere, material2);

scene.add(mesh)
scene.add(mesh2)

/**
 * Sizes
 */
const sizes = {
    width: 900,
    height: 1000
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 2
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

setInterval(() => {
    geometry.rotateX(0.03);
    geometry.rotateY(0.03);
    mesh.position.x = .2;

    sphere.radius = Math.sin(sphere.radius + 0.01);
    renderer.render(scene, camera);
}, 1000 / 60)
