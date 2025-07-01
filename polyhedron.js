function createGradientIcosahedron() {
  const geometry = new THREE.IcosahedronGeometry(1, 1); // Радиус, детализация

  // Цвета для градиента
  const colors = [];

  // Улучшенный метод создания градиента:
  // Определяем цвета для вершин
  const color1 = new THREE.Color(0xff0000); // Красный
  const color2 = new THREE.Color(0xff4500); // Зеленый
  const color3 = new THREE.Color(0x0000ff); // Синий

  // Создаем массив вершинных цветов
  const vertexCount = geometry.attributes.position.count;
  for (let i = 0; i < vertexCount; i++) {
    // Получаем координаты вершины
    const x = geometry.attributes.position.getX(i);
    const y = geometry.attributes.position.getY(i);
    const z = geometry.attributes.position.getZ(i);

    // Нормализуем координаты в диапазон [-1, 1]
    const nx = (x + 1) / 2;
    const ny = (y + 1) / 2;
    const nz = (z + 1) / 2;

    // Смешиваем цвета в зависимости от нормализованных координат
    let color = new THREE.Color();
    color.r = color1.r * nx + color2.r * ny + color3.r * nz;
    color.g = color1.g * nx + color2.g * ny + color3.g * nz;
    color.b = color1.b * nx + color2.b * ny + color3.b * nz;
    colors.push(color.r, color.g, color.b);
  }

  // Устанавливаем цвета для каждой грани (vertex colors)
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geometry.computeVertexNormals(); // Важно для освещения

  // Материал с использованием vertex colors и Phong shading
  const material = new THREE.MeshPhongMaterial({
    vertexColors: true,
    shininess: 50, // Регулирует блеск
    specular: 0xffffff, // Белый блик
    side: THREE.DoubleSide, // Если видны внутренние грани
  });

  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
}

// Пример использования:
// Создайте сцену, камеру, свет и рендерер в Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / 2 / window.innerHeight,
  0.1,
  1000,
); // Уменьшаем ширину камеры вдвое
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth / 2, window.innerHeight); // Уменьшаем ширину рендерера вдвое

// Добавляем рендерер в контейнер
const container = document.getElementById('three-js-container');
container.appendChild(renderer.domElement);

// Добавьте свет
const ambientLight = new THREE.AmbientLight(0x404040); // Мягкий рассеянный свет
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7); // Направленный свет. Увеличиваем интенсивность
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
