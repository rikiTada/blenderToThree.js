import * as THREE from "three";
import { OrbitControls } from "./node_modules/three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "./node_modules/three/examples/jsm/loaders/GLTFLoader";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);

const webglElement = document.getElementById("webgl");
webglElement.appendChild(renderer.domElement);

camera.position.set(0, 0.1, 1);

const loader = new GLTFLoader();
loader.load(
  "./public/Apple.glb",
  function (gltf) {
    scene.add(gltf.scene);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

const light = new THREE.PointLight(0xffffff, 1, 500);
light.position.set(10, 10, 10);
scene.add(light);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;

const animate = function () {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
};

animate();

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
