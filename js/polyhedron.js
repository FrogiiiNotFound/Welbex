function createGradientIcosahedron() {
  const geometry = new THREE.IcosahedronGeometry(1, 1);

  const colors = [];
  const color1 = new THREE.Color(0xff0000);
  const color2 = new THREE.Color(0xff4500);
  const color3 = new THREE.Color(0x0000ff);

  const vertexCount = geometry.attributes.position.count;
  for (let i = 0; i < vertexCount; i++) {
    const x = geometry.attributes.position.getX(i);
    const y = geometry.attributes.position.getY(i);
    const z = geometry.attributes.position.getZ(i);

    const nx = (x + 1) / 2;
    const ny = (y + 1) / 2;
    const nz = (z + 1) / 2;

    let color = new THREE.Color();
    color.r = color1.r * nx + color2.r * ny + color3.r * nz;
    color.g = color1.g * nx + color2.g * ny + color3.g * nz;
    color.b = color1.b * nx + color2.b * ny + color3.b * nz;
    colors.push(color.r, color.g, color.b);
  }

  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geometry.computeVertexNormals();

  const material = new THREE.MeshPhongMaterial({
    vertexColors: true,
    shininess: 50,
    specular: 0xffffff,
    side: THREE.DoubleSide,
  });

  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / 2 / window.innerHeight,
  0.1,
  1000,
);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth / 2, window.innerHeight);

const container = document.getElementById('three-js-container');
container.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

const icosahedron = createGradientIcosahedron();
scene.add(icosahedron);

camera.position.z = 3;

function animate() {
  requestAnimationFrame(animate);
  icosahedron.rotation.x += 0.002;
  icosahedron.rotation.y += 0.001;
  renderer.render(scene, camera);
}

animate();
