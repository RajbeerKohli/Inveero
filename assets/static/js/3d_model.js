// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("3d-container").appendChild(renderer.domElement);

// Add orbit controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Load 3D model
let model;
const loader = new THREE.GLTFLoader();
loader.load(
  "../model/dollar_bill.glb", // Updated path to the model
  (gltf) => {
    model = gltf.scene;
    scene.add(model);

    // Set initial rotation (angles in radians)
    model.rotation.x = Math.PI / 360; // Rotate 45 degrees around X-axis
    model.rotation.y = Math.PI / 1; // Rotate 30 degrees around Y-axis
    model.rotation.z = Math.PI / 1; // Rotate 22.5 degrees around Z-axis
  },
  undefined,
  (error) => console.error("Error loading model:", error)
);

// Add lighting
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

// // Set camera position
// camera.position.y = 8;

// Adjust camera position based on device
camera.position.y = window.innerWidth < 768 ? 12 : 7.5; // Set a smaller camera position for smaller screens

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Rotate the model
  if (model) model.rotation.z += 0.01;

  controls.update();
  renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
