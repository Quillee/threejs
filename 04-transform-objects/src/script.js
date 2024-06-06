import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
mesh.position.x = 1.9
mesh.position.y = -1.1
mesh.scale.x = 1.4
mesh.scale.z = 0.5
mesh.scale.y = 0.75
scene.add(mesh)

/**
 * Helpers
 */
const axes_helpers = new THREE.AxesHelper(2);
scene.add(axes_helpers);

/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
mesh.rotation.x += Math.PI * 0.05;
mesh.rotation.y += Math.PI * 0.02;
let initial_x = 0;
let initial_y = 0;
let initial_z = 0;
let change = 0.01;

setInterval(() => {
    // geometry.rotateX(0.03);
    // geometry.rotateY(0.03);
    const is_limit_reached = initial_x >= 2 || initial_x <= -2;
    if (is_limit_reached) {
        change = -change;
    }

    initial_x += change;
    initial_y += change * 2;
    initial_z += change * 5;
    // mesh.lookAt(new THREE.Vector3(initial_x, initial_y, initial_z));
    camera.lookAt(new THREE.Vector3(initial_x, initial_y, initial_z));

    renderer.render(scene, camera);
}, 1000 / 60)
