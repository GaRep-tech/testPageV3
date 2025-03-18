import * as THREE from 'https://unpkg.com/three/build/three.module.js';
import {GLTFLoader} from './three/examples/jsm/loaders/GLTFLoader.js';

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.outputColorSpace = THREE.sRGBEncoding;

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x000000);

document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth/ window.innerHeight, 0.1, 1000);
camera.position.set(4,5,11);
camera.lookAt(0,0,0);

const groundGeometry = new THREE.PlaneGeometry(20, 20, 32, 32);
groundGeometry.rotateX(-Math.PI / 2);
const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x555555, side: THREE.DoubleSide });
const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
Scene.add(groundMesh);

const spotLight = new THREE.SpotLight(0xffffff, 3, 100, 0.2, 0.5);
spotLight.position.set(0, 25, 0);
scene.add(spotLight);
spotLight.castShadow = true;
spotLight.shadow.bias = -0.0001;

const loader = new GLTFLoader().setPath('./assets/');
loader.load('scene.gltf', (gltf)=> {
    const mesh = gltf.scene;
    mesh.position.set(0, 1.05, -1);
    scene.add(mesh);


    mesh.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    
      mesh.position.set(0, 1.05, -1);
      scene.add(mesh);
    
      document.getElementById('progress-container').style.display = 'none';
    }, (xhr) => {
      console.log(`loading ${xhr.loaded / xhr.total * 100}%`);
    }, (error) => {
      console.error(error);
    });
    
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  
  animate();
