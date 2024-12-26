// Create the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('3d-container').appendChild(renderer.domElement);

// Create ambient light for the scene
const light = new THREE.AmbientLight(0xffffff, 1); // White light
scene.add(light);

// Load the GLTF model (update with the correct path to your GLTF model)
const loader = new THREE.GLTFLoader();
loader.load('models/dollar_bill_model.glb', (gltf) => {
    scene.add(gltf.scene);
    console.log('Model loaded successfully!');
}, undefined, (error) => {
    console.error('An error occurred while loading the model:', error);
});

// Set up the camera position
camera.position.z = 5;

// Add orbit controls for user interactivity (rotate, zoom, pan)
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Animate the scene (render continuously)
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Update controls for smoother interaction
    renderer.render(scene, camera);
}
animate();

// Adjust canvas size when the window is resized
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

