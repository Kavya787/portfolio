import { Html } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import TWEEN from "@tweenjs/tween.js";
import useSound from "use-sound";

const Computer = ({
  nodes,
  materials,
  floor,
  wallBack,
  wallLeft,
  cameraMode,
  setCameraMode,
}) => {
  const computerRef = useRef();
  const html = useRef();
  const [hovered, setHovered] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // Sounds
  const [play] = useSound("./rising-pops.mp3", { volume: 0.3 });
  const [playSwish] = useSound("./swish.wav", { volume: 0.3 });
  const [playSwishReverse] = useSound("./swish-rev.wav", { volume: 0.3 });
  const [playStartup] = useSound("./windows-xp-startup.mp3", { volume: 0.5 });
  const [playShutDown] = useSound("./windows-xp-shutdown.mp3", { volume: 0.5 });
  const [playCardClick] = useSound("./click.wav", { volume: 0.4 });

  // Project data with image and GitHub link
  const projects = [
    {
      name: "Angry Birds using LIBGDX ",
      description:
        "This is a custom-built Angry Birds game created using the libGDX framework. It features classic physics-based gameplay with a catapult mechanism, destructible structures, and pig targets. Players can use special bird abilities—like the yellow bird’s speed boost and the black bird’s explosive power—to strategically destroy pigs and structures. The game includes realistic physics, TNT boxes, and save/load functionality. It also has JUnit tests to ensure core features like pig positioning, bird powers, and level setup work correctly. Use arrow keys to aim, 1 or 2 to trigger bird powers, and 0 to pause the game.",
      imageUrl:
        "/images/project1.png",
      githubUrl: "https://github.com/Kavya787/libgdx",
    },
    {
      name: "GoCab",
      description:
        "A clean, responsive app that delivers real-time weather updates and interactive charts.",
      imageUrl:
        "/images/project2.png",
      githubUrl: "https://github.com/Kavya787/GoCab",
    },
    {
      name: "Just In Case (VR game)",
      description:
        "A pixel art platformer built in Godot featuring multiple levels and collectible power-ups.",
      imageUrl:
        "/images/project3.png",
      githubUrl: "https://github.com/Kavya787/Just_In_Case",
    },
    {
      name: "E-commerce Dashboard",
      description:
        "A pixel art platformer built in Godot featuring multiple levels and collectible power-ups",
      imageUrl:
        "/images/project4.png",
      githubUrl: "https://github.com/username/ecommerce-dashboard",
    },
  ];

  useEffect(() => {
    if (cameraMode === "default" && hovered) {
      document.body.style.cursor = "pointer";
      html.current?.children[0].classList.add("active");
      new TWEEN.Tween(computerRef.current.scale)
        .to({ x: 0.45, y: 0.45, z: 0.45 }, 300)
        .easing(TWEEN.Easing.Quadratic.Out)
        .start();
      play();
    } else {
      document.body.style.cursor = "auto";
      html.current?.children[0].classList.remove("active");
      new TWEEN.Tween(computerRef.current.scale)
        .to({ x: 0.42, y: 0.42, z: 0.42 }, 300)
        .easing(TWEEN.Easing.Quadratic.Out)
        .start();
    }

    if (cameraMode === "computer" && hovered) {
      document.body.style.cursor = "auto";
    } else if (cameraMode === "computer" && !hovered) {
      document.body.style.cursor = "pointer";
    }
  }, [hovered, cameraMode]);

  return (
    <>
      <group
        ref={computerRef}
        onPointerMissed={() => {
          if (cameraMode === "computer") {
            playShutDown();
            setSelectedProject(null);
            setCameraMode("default");
            playSwishReverse();
          }
        }}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onClick={() => {
          if (cameraMode === "default") {
            setCameraMode("computer");
            playSwish();
            setHovered(false);
            playStartup();
          }
        }}
        position={[161.46, -85.26, 146.15]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={0.42}
      >
        {/* Title */}
        <Html
          ref={html}
          position={[-250, 150, 0]}
          distanceFactor={0.8}
          occlude={[floor, wallBack, wallLeft]}
          center
        >
          <div
            style={{
              fontFamily: 'Arial, sans-serif',
              fontSize: '18px',
              color: '#fff',
              background: 'rgba(0,0,0,0.6)',
              padding: '4px 8px',
              borderRadius: '4px',
            }}
          >
            Projects 🚀
          </div>
        </Html>

        {/* 2x2 Grid of Cards */}
        {cameraMode === "computer" && !selectedProject && (
          <Html
            wrapperClass="projectScreen"
            transform
            zIndexRange={[16777270, 16777270]}
            scale={10}
            position={[-1, 130, 0]}
          >
            <div style={{
                width: '800px',
                height: '550px',
                backgroundColor: '#1e1e1e',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gridTemplateRows: '1fr 1fr',
                gap: '20px',
                padding: '20px',
                borderRadius: '12px',
                fontFamily: 'Arial, sans-serif',
            }}>
              {projects.map((project, idx) => (
                <div
                  key={idx}
                  style={{
                    position: 'relative',
                    backgroundImage: `url(${project.imageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '12px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProject(project);
                    playCardClick();
                  }}
                >
                  {/* Project Title */}
                  <div style={{
                      fontSize: '16px',
                      fontWeight: 'bold',
                      color: '#fff',
                      textShadow: '0 1px 3px rgba(0,0,0,0.7)',
                  }}>
                    {project.name}
                  </div>
                </div>
              ))}
            </div>
          </Html>
        )}

        {/* Popup matching grid size */}
        {selectedProject && (
          <Html
            wrapperClass="projectPopup"
            transform
            zIndexRange={[16777271, 16777271]}
            scale={10}
            position={[-1, 130, 0]}
          >
            <div style={{
              width: '800px',
              height: '550px',
              backgroundColor: '#fff',
              padding: '24px',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
              fontFamily: 'Arial, sans-serif',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
              <h2 style={{ margin: 0 }}>{selectedProject.name}</h2>
              <p style={{ flexGrow: 1, margin: '16px 0', lineHeight: '1.4' }}>
                {selectedProject.description}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '8px 16px',
                    background: '#0366d6',
                    color: '#fff',
                    textDecoration: 'none',
                    borderRadius: '6px',
                    fontWeight: 'bold',
                  }}
                >
                  View on GitHub
                </a>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProject(null);
                  }}
                  style={{
                    padding: '8px 16px',
                    border: 'none',
                    borderRadius: '6px',
                    background: '#333',
                    color: '#fff',
                    cursor: 'pointer',
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </Html>
        )}

        {/* Meshes (unchanged) */}
        {nodes["Cube 71"] && <mesh name="Cube 71" geometry={nodes["Cube 71"].geometry} material={materials.hanger} castShadow receiveShadow position={[-4.64, 17.44, 2]} rotation={[0, 0, Math.PI / 2]} scale={[5.14, 7.58, 0.15]} />}
        {nodes["Cube 61"] && <mesh name="Cube 61" geometry={nodes["Cube 61"].geometry} material={materials.hanger} castShadow receiveShadow position={[-4.64, 251.36, 2]} rotation={[0, 0, Math.PI / 2]} scale={[5.14, 7.58, 0.15]} />}
        {nodes["Cube 5"] && <mesh name="Cube 5" geometry={nodes["Cube 5"].geometry} material={materials.hanger} castShadow receiveShadow position={[214.8, 134.34, 2]} scale={[4.95, 4.42, 0.15]} />}
        {nodes["Cube 4"] && <mesh name="Cube 4" geometry={nodes["Cube 4"].geometry} material={materials.hanger} castShadow receiveShadow position={[-214.58, 134.34, 2]} scale={[4.95, 4.42, 0.15]} />}
        {nodes["Cube 81"] && <mesh name="Cube 81" geometry={nodes["Cube 81"].geometry} material={materials.hanger} castShadow receiveShadow position={[0.06, 134.34, -3.28]} scale={[4.95, 4.42, 0.13]} />}
        {nodes["Cube 23"] && <mesh name="Cube 23" geometry={nodes["Cube 23"].geometry} material={materials.black} castShadow receiveShadow position={[0.06, 135.05, 2.16]} scale={[4.85, 4.42, 0.13]} />}
        {nodes["Cube 31"] && <mesh name="Cube 31" geometry={nodes["Cube 31"].geometry} material={materials.hanger} castShadow receiveShadow position={[0.06, 8.37, 0]} scale={[1.06, 4.67, 0.08]} />}
        {nodes["Cube4"] && <mesh name="Cube4" geometry={nodes.Cube4.geometry} material={materials.hanger} castShadow receiveShadow position={[0.06, 2.86, 0]} scale={[2.08, 4.67, 0.81]} />}
      </group>
    </>
  );
};

export default Computer;