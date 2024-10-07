import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import axios from 'axios'; // Volvemos a incluir axios para obtener los cometas
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './App.css';

// Componente para mostrar la información de los planetas y cometas
const PlanetInfo = ({ planet }) => {
  if (!planet) {
    return <div className="planet-info">Haz clic en un planeta para ver la información</div>;
  }

  return (
    <div className="planet-info">
      <h2>{planet.name}</h2>
      <p><strong>Diámetro:</strong> {planet.realDiameter} km</p>
      <p><strong>Distancia al Sol:</strong> {planet.realDistance} millones de km</p>
      {planet.composition && <p><strong>Composición:</strong> {planet.composition}</p>}
    </div>
  );
};

// Datos reales de planetas
const orbitalElements = {
  mercurio: { a: 0.387, e: 0.205, I: 7.0, L: 252.25, ω: 77.45, Ω: 48.33, texture: 'texturamercurio.jpg', size: 0.3, realDiameter: 4879, realDistance: 57.9, composition: 'Mercurio está compuesto principalmente de metales (70% hierro) y silicatos (30%). Tiene un gran núcleo de hierro.' },
  venus: { a: 0.723, e: 0.007, I: 3.39, L: 181.98, ω: 131.53, Ω: 76.68, texture: 'texturavenus.jpg', size: 1.0, realDiameter: 12104, realDistance: 108.2, composition: 'Venus tiene un núcleo de hierro, un manto de silicatos y una atmósfera densa de CO2 (96.5%) y nitrógeno (3.5%).' },
  tierra: { a: 1.000, e: 0.017, I: 0.00, L: 100.46, ω: 102.94, Ω: 0.00, texture: 'texturatierra.jpg', size: 1.25, realDiameter: 12742, realDistance: 149.6, composition: 'La Tierra tiene un núcleo de hierro y níquel, manto de silicatos y una atmósfera de nitrógeno (78%) y oxígeno (21%).' },
  marte: { a: 1.524, e: 0.093, I: 1.85, L: 355.45, ω: 336.04, Ω: 49.56, texture: 'texturamarte.jpg', size: 0.75, realDiameter: 6779, realDistance: 227.9, composition: 'Marte tiene un núcleo de hierro y níquel, y una superficie basáltica. Su atmósfera es de CO2 (95%).' },
  jupiter: { a: 5.203, e: 0.048, I: 1.30, L: 34.40, ω: 14.73, Ω: 100.56, texture: 'texturajupiter.jpg', size: 3.0, realDiameter: 139820, realDistance: 778.5, composition: 'Júpiter está compuesto de hidrógeno (90%) y helio (10%). Su interior contiene hidrógeno metálico y un pequeño núcleo rocoso.' },
  saturno: { a: 9.537, e: 0.056, I: 2.49, L: 49.94, ω: 92.86, Ω: 113.64, texture: 'texturasaturno.jpg', size: 2.5, realDiameter: 116460, realDistance: 1434, composition: 'Saturno está compuesto principalmente de hidrógeno (96%) y helio (3%). Al igual que Júpiter, tiene un pequeño núcleo rocoso.' },
  urano: { a: 19.191, e: 0.046, I: 0.77, L: 313.23, ω: 170.96, Ω: 74.00, texture: 'texturaurano.jpg', size: 2.0, realDiameter: 50724, realDistance: 2871, composition: 'Urano contiene hidrógeno, helio y "hielos" como agua, amoníaco y metano, que le dan su color azul verdoso.' },
  neptuno: { a: 30.068, e: 0.010, I: 1.77, L: 304.88, ω: 44.97, Ω: 131.79, texture: 'texturaneptuno.jpg', size: 1.75, realDiameter: 49244, realDistance: 4495, composition: 'Neptuno tiene hidrógeno, helio y "hielos" como agua, amoníaco y metano. Su color azul profundo se debe al metano.' },
};

// Función para resolver la ecuación de Kepler
const solveKepler = (M, e, tol = 1e-6) => {
  let E = M;
  let deltaE = 1;
  while (Math.abs(deltaE) > tol) {
    deltaE = (M - (E - e * Math.sin(E))) / (1 - e * Math.cos(E));
    E = E + deltaE;
  }
  return E;
};

// Función para convertir a coordenadas heliocéntricas
const calculatePosition = (a, e, I, ω, Ω, L, T) => {
  const M = ((L - ω) + 360 * (T / 36525)) % 360;
  const M_rad = THREE.MathUtils.degToRad(M);

  const E = solveKepler(M_rad, e);

  const x_orbital = a * (Math.cos(E) - e);
  const y_orbital = a * Math.sqrt(1 - e * e) * Math.sin(E);

  const x_ec = (Math.cos(Ω) * Math.cos(ω) - Math.sin(Ω) * Math.sin(ω) * Math.cos(I)) * x_orbital +
    (-Math.cos(Ω) * Math.sin(ω) - Math.sin(Ω) * Math.cos(ω) * Math.cos(I)) * y_orbital;

  const y_ec = (Math.sin(Ω) * Math.cos(ω) + Math.cos(Ω) * Math.sin(ω) * Math.cos(I)) * x_orbital +
    (-Math.sin(Ω) * Math.sin(ω) + Math.cos(Ω) * Math.cos(ω) * Math.cos(I)) * y_orbital;

  const z_ec = (Math.sin(ω) * Math.sin(I)) * x_orbital + (Math.cos(ω) * Math.sin(I)) * y_orbital;

  return { x: x_ec, y: y_ec, z: z_ec };
};

// Función para crear la órbita elíptica como una línea
const createOrbitLine = (a, e, I, ω, Ω, L, distance, T) => {
  const points = [];
  for (let i = 0; i <= 360; i++) {
    const M = (L + i) % 360;
    const M_rad = THREE.MathUtils.degToRad(M);
    const E = solveKepler(M_rad, e);

    const x_orbital = a * (Math.cos(E) - e);
    const y_orbital = a * Math.sqrt(1 - e * e) * Math.sin(E);

    const x_ec = (Math.cos(Ω) * Math.cos(ω) - Math.sin(Ω) * Math.sin(ω) * Math.cos(I)) * x_orbital +
      (-Math.cos(Ω) * Math.sin(ω) - Math.sin(Ω) * Math.cos(ω) * Math.cos(I)) * y_orbital;

    const y_ec = (Math.sin(Ω) * Math.cos(ω) + Math.cos(Ω) * Math.sin(ω) * Math.cos(I)) * x_orbital +
      (-Math.sin(Ω) * Math.sin(ω) + Math.cos(Ω) * Math.cos(ω) * Math.cos(I)) * y_orbital;

    const z_ec = (Math.sin(ω) * Math.sin(I)) * x_orbital + (Math.cos(ω) * Math.sin(I)) * y_orbital;

    points.push(new THREE.Vector3(x_ec * distance, y_ec * distance, z_ec * distance));
  }

  const orbitGeometry = new THREE.BufferGeometry().setFromPoints(points);
  const orbitMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
  const orbitLine = new THREE.Line(orbitGeometry, orbitMaterial);

  return orbitLine;
};

// Función para crear planetas con texturas y sus posiciones keplerianas y su órbita
const createPlanet = (name, size, distance, texturePath, orbitalParams, T) => {
  const geometry = new THREE.SphereGeometry(size * 2.5, 32, 32);
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load(`./${texturePath}`);
  const material = new THREE.MeshPhongMaterial({ map: texture, shininess: 100 });
  const planet = new THREE.Mesh(geometry, material);

  const position = calculatePosition(
    orbitalParams.a,
    orbitalParams.e,
    THREE.MathUtils.degToRad(orbitalParams.I),
    THREE.MathUtils.degToRad(orbitalParams.ω),
    THREE.MathUtils.degToRad(orbitalParams.Ω),
    orbitalParams.L,
    T
  );

  planet.position.set(position.x * distance, position.y * distance, position.z * distance);
  planet.name = name;
  planet.size = size;
  planet.distance = distance;

  const orbitLine = createOrbitLine(
    orbitalParams.a,
    orbitalParams.e,
    THREE.MathUtils.degToRad(orbitalParams.I),
    THREE.MathUtils.degToRad(orbitalParams.ω),
    THREE.MathUtils.degToRad(orbitalParams.Ω),
    orbitalParams.L,
    distance,
    T
  );

  return { planet, orbitLine };
};

// Función para crear cometas con sus respectivas propiedades
const createComet = (name, orbitalParams, composition, size = 0.3, color = 0xffffff) => {
  const geometry = new THREE.SphereGeometry(size, 32, 32);
  const material = new THREE.MeshBasicMaterial({ color });
  const comet = new THREE.Mesh(geometry, material);

  const position = calculatePosition(
    parseFloat(orbitalParams.q_au_1),
    parseFloat(orbitalParams.e),
    THREE.MathUtils.degToRad(parseFloat(orbitalParams.i_deg)),
    THREE.MathUtils.degToRad(parseFloat(orbitalParams.w_deg)),
    THREE.MathUtils.degToRad(parseFloat(orbitalParams.node_deg)),
    parseFloat(orbitalParams.tp_tdb),
    2451545.0
  );

  comet.position.set(position.x * 100, position.y * 100, position.z * 100);
  comet.name = name;
  comet.composition = composition;

  return comet;
};

const App = () => {
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [planetsArray, setPlanetsArray] = useState([]);
  const [cometsArray, setCometsArray] = useState([]);
  const [camera, setCamera] = useState(null);

  useEffect(() => {
    const scene = new THREE.Scene();

    const cam = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 5000);
    cam.position.z = 300;
    setCamera(cam);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const controls = new OrbitControls(cam, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;

    const ambientLight = new THREE.AmbientLight(0xffffff, 4);
    scene.add(ambientLight);

    const planetsArrayTemp = [];

    const textureLoader = new THREE.TextureLoader();
    const sunTexture = textureLoader.load('./texturasol.jpg');
    const sunGeometry = new THREE.SphereGeometry(15, 32, 32);
    const sunMaterial = new THREE.MeshPhongMaterial({ map: sunTexture, shininess: 150 });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);

    let T = 2451545.0;
    let velocityFactor = 20;

    // Crear planetas
    Object.keys(orbitalElements).forEach((planetKey) => {
      const planetParams = orbitalElements[planetKey];
      const { planet, orbitLine } = createPlanet(
        planetKey,
        planetParams.size,
        50,
        planetParams.texture,
        planetParams,
        T
      );

      scene.add(planet);
      scene.add(orbitLine);
      planetsArrayTemp.push(planet);
    });

    setPlanetsArray(planetsArrayTemp);

    // Solicitud de cometas desde la API de la NASA
    const fetchComets = async () => {
      try {
        const response = await axios.get('https://data.nasa.gov/resource/b67r-rgxc.json');
        const cometData = response.data;

        const cometsTempArray = [];

        cometData.forEach(comet => {
          if (comet.tp_tdb && comet.q_au_1) {
            const newComet = createComet(comet.object, comet, comet.composition || 'Desconocida');
            scene.add(newComet);
            cometsTempArray.push(newComet);
          }
        });

        setCometsArray(cometsTempArray);
      } catch (error) {
        console.error('Error al obtener los datos de cometas', error);
      }
    };

    fetchComets();

    // Raycaster para detección de clics
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, cam);
      const intersects = raycaster.intersectObjects([...planetsArrayTemp, ...cometsArray]);
      document.body.style.cursor = intersects.length > 0 ? 'pointer' : 'default';
    };

    const onMouseClick = (event) => {
      raycaster.setFromCamera(mouse, cam);
      const intersects = raycaster.intersectObjects(planetsArrayTemp);
      if (intersects.length > 0) {
        const clickedPlanetName = intersects[0].object.name;  // Obtenemos el nombre del planeta clicado
        const clickedPlanet = orbitalElements[clickedPlanetName]; // Obtenemos los detalles del planeta desde `orbitalElements`
        if (clickedPlanet) {
          setSelectedPlanet({ ...clickedPlanet, name: clickedPlanetName }); // Aseguramos que `name` esté incluido en el estado
        }
      }
    };
    

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onMouseClick);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();

      T += velocityFactor;
      planetsArrayTemp.forEach((planet) => {
        const orbitalParams = orbitalElements[planet.name];
        const position = calculatePosition(
          orbitalParams.a,
          orbitalParams.e,
          THREE.MathUtils.degToRad(orbitalParams.I),
          THREE.MathUtils.degToRad(orbitalParams.ω),
          THREE.MathUtils.degToRad(orbitalParams.Ω),
          orbitalParams.L,
          T
        );
        planet.position.set(position.x * planet.distance, position.y * planet.distance, position.z * planet.distance);
      });

      renderer.render(scene, cam);
    };

    animate();

    return () => {
      document.body.removeChild(renderer.domElement);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onMouseClick);
    };
  }, []);

  const focusOnPlanet = (planet) => {
    if (camera && planet) {
      const planetSize = planet.size;
      const zoomFactor = 6;

      const offsetDistance = planet.name === 'jupiter'
        ? planetSize * zoomFactor - 20
        : planetSize * zoomFactor - 10;

      const direction = new THREE.Vector3()
        .subVectors(new THREE.Vector3(0, 0, 0), planet.position)
        .normalize();

      camera.position.set(
        planet.position.x + direction.x * offsetDistance,
        planet.position.y + direction.y * offsetDistance,
        planet.position.z + direction.z * offsetDistance
      );

      camera.lookAt(planet.position);
      camera.updateProjectionMatrix();
    }
  };

  return (
    <div>
      <div className="planet-menu">
        <h2>Planetas</h2>
        <ul>
          {planetsArray.map((planet) => (
            <li key={planet.name} onClick={() => focusOnPlanet(planet)}>
              {planet.name}
            </li>
          ))}
        </ul>
      </div>
      <PlanetInfo planet={selectedPlanet} />
    </div>
  );
};

export default App;











