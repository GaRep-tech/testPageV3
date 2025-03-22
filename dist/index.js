import * as THREE from 'three'

//building a 3d shape
const w= window.innerWidth;
const h= window.innerHeight;
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(w,h);
document.body.appendChild(renderer.domElement);

//creating camera, fields in parentheses are: fov, aspect ratio, near clipping plane, far clipping plane
const camera = new THREE.PerspectiveCamera(75, w/h, 0.1, 1000);
camera.position.z = 2;

const scene = new THREE.Scene();

const geometry = new THREE.IcosahedronGeometry(1,3);
//basic material is a material that is not affected by light, standard material is affected by light
const material = new THREE.MeshStandardMaterial({color: 0x00ff00, wireframe: false, flatShading: true});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const hemiLight = new THREE.HemisphereLight(0xffffbb, 0x080820, );
scene.add(hemiLight);


function animate(){
    requestAnimationFrame(animate);
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate();

renderer.render(scene, camera);