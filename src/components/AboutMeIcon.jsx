import { Html } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import TWEEN from "@tweenjs/tween.js";
import useSound from "use-sound";

const AboutMeIcon = ({ nodes, floor, wallBack, wallLeft, cameraMode }) => {
    const instagramRef = useRef(); // Reference for scaling and animations
    const html = useRef(); // Reference for HTML content
    const [hovered, setHovered] = useState(false); // Hover state for scaling and cursor
    const [play] = useSound("./rising-pops.mp3", { volume: 0.3 });

    // Handle hover and animations
    useEffect(() => {
        if (cameraMode === "default" && hovered) {
            document.body.style.cursor = "pointer"; // Change cursor on hover
            html.current?.children[0].classList.add("active");
            new TWEEN.Tween(instagramRef.current.scale)
                .to({ x: 11.5, y: 11.5, z: 11.5 }, 300)
                .easing(TWEEN.Easing.Quadratic.Out)
                .start();
            play();
        } else {
            document.body.style.cursor = "auto";
            html.current?.children[0].classList.remove("active");
            new TWEEN.Tween(instagramRef.current.scale)
                .to({ x: 10.81, y: 10.81, z: 10.81 }, 300)
                .easing(TWEEN.Easing.Quadratic.Out)
                .start();
        }
    }, [hovered]);

    // Handle click event
    const handleClick = () => {
        // if (cameraMode === "default") {
        //     window.open("https://www.instagram.com/_.chintuuu._", "_blank");
        // }
    };

    return (
        <group
            ref={instagramRef}
            onPointerEnter={() => setHovered(true)} // Set hover state on pointer enter
            onPointerLeave={() => setHovered(false)} // Reset hover state on pointer leave
            onClick={handleClick}
            name="GLTF_SceneRootNode"
            position={[231.91, 68.37, 164.37]}
            rotation={[0, -Math.PI / 2, 0]}
            scale={10.81}
        >
            {/* HTML content that will be shown on hover */}
            <Html
                ref={html}
                position={[2, 7, 10]}
                distanceFactor={0.8}
                occlude={[floor, wallBack, wallLeft]} // Occlusion settings
                center
            >
                <div className="label">Instagram 📸</div>
            </Html>

            {/* 3D objects for the icon, with mesh rendering */}
            {nodes && (
                <>
                    {/* Check if the nodes exist and render the meshes */}
                    {/* <group name="Cylinder043_1" position={[0, 3.02, 6]} rotation={[Math.PI / 2, 0, 0]} scale={0.69}>
                        <mesh
                            name="Object_43"
                            geometry={nodes.Object_43.geometry}
                            material={nodes.Object_43.material}
                            castShadow
                            receiveShadow
                        />
                    </group>
                    <group name="Cylinder042_2" position={[0, 3, 6]} rotation={[Math.PI / 2, 0, 0]} scale={0.84}>
                        <mesh
                            name="Object_61"
                            geometry={nodes.Object_61.geometry}
                            material={nodes.Object_61.material}
                            castShadow
                            receiveShadow
                        />
                    </group>
                    <group name="Cylinder023_3" position={[0, 3, 6]} rotation={[Math.PI / 2, 0, 0]} scale={0.84}>
                        <mesh
                            name="Object_8"
                            geometry={nodes.Object_8.geometry}
                            material={nodes.Object_8.material}
                            castShadow
                            receiveShadow
                        />
                    </group> */}
                </>
            )}
        </group>
    );
};

export default AboutMeIcon;
