
import { Html, useTexture } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import TWEEN from "@tweenjs/tween.js";
import useSound from "use-sound";

const BrainstormingWall = ({
    nodes,
    materials,
    floor,
    wallBack,
    wallLeft,
    cameraMode,
    setCameraMode,
}) => {
    const brainstormingWallRef = useRef();
    const html = useRef();
    const clickableHtml = useRef();
    const [hovered, setHovered] = useState(false);
    const [resumeHovered, setResumeHovered] = useState(false);

    const texture = useTexture("./new_resume.png");

    const [play] = useSound("./rising-pops.mp3", { volume: 0.3 });
    const [playSwish] = useSound("./swish.wav", { volume: 0.3 });
    const [playSwishReverse] = useSound("./swish-rev.wav", { volume: 0.3 });

    useEffect(() => {
        if (cameraMode === "default" && hovered) {
            document.body.style.cursor = "pointer";
            html.current?.children[0].classList.add("active");
            new TWEEN.Tween(brainstormingWallRef.current.scale)
                .to({ x: 0.45, y: 0.45, z: 0.45 }, 300)
                .easing(TWEEN.Easing.Quadratic.Out)
                .start();
            play();
        } else {
            document.body.style.cursor = "auto";
            html.current?.children[0].classList.remove("active");
            new TWEEN.Tween(brainstormingWallRef.current.scale)
                .to({ x: 0.42, y: 0.42, z: 0.42 }, 300)
                .easing(TWEEN.Easing.Quadratic.Out)
                .start();
        }

        if (cameraMode === "brainstormingWall" && hovered) {
            document.body.style.cursor = "auto";
        } else if (cameraMode === "brainstormingWall" && !hovered) {
            document.body.style.cursor = "pointer";
        }

        if (cameraMode === "brainstormingWall" && resumeHovered) {
            clickableHtml.current?.children[0].classList.add("active");
            document.body.style.cursor = "pointer";
        } else {
            clickableHtml.current?.children[0].classList.remove("active");
        }
    }, [hovered, resumeHovered]);

    return (
        <group
            ref={brainstormingWallRef}
            onPointerMissed={() => {
                if (cameraMode === "brainstormingWall") {
                    setCameraMode("default");
                    playSwishReverse();
                }
            }}
            onPointerEnter={() => setHovered(true)}
            onPointerLeave={() => setHovered(false)}
            onClick={() => {
                if (cameraMode === "default") {
                    setCameraMode("brainstormingWall");
                    playSwish();
                    setHovered(false);
                    setResumeHovered(true);
                }
            }}
            name="Brainstorming Wall"
            position={[-60.29, -3.45, 19.24]}
            rotation={[0, 0, Math.PI / 2]}
            scale={0.48}
        >
            <Html
                ref={html}
                position={[0, 200, 10]}
                distanceFactor={0.8}
                occlude={[floor, wallBack, wallLeft]}
                center
            >
                <div className="label">Resume 📌</div>
            </Html>

            {/* Resume Image (larger size now!) */}
            <mesh
                onPointerEnter={() => {
                    if (cameraMode === "brainstormingWall") {
                        setResumeHovered(true);
                    }
                }}
                onPointerLeave={() => setResumeHovered(false)}
                onClick={() => {
                    if (cameraMode === "brainstormingWall") {
                        window.open("./resume.pdf", "_blank");
                    }
                }}
                name="ResumeImage"
                position={[56.39, 80.99, 11.62]}
                rotation={[0, 0, -1.45]}
                scale={[120, 140, 1]} // 💥 Increased from [20, 28, 1]
            >
                <planeBufferGeometry args={[1, 1]} />
                <meshBasicMaterial map={texture} transparent />

                {/* Click to open */}
                <Html
                    ref={clickableHtml}
                    onPointerEnter={() => setHovered(true)}
                    position={[1100, 800, 0]}
                    distanceFactor={0.1}
                    occlude={[floor, wallBack, wallLeft]}
                    center
                >
                    <div
                        className="label resumeLabel"
                        onClick={() => setCameraMode("resume")}
                    >
                        Click to open 👆
                    </div>
                </Html>

                {/* About Me Card */}
                <Html
                    position={[1100, 500, 0]}
                    distanceFactor={0.1}
                    occlude={[floor, wallBack, wallLeft]}
                    center
                >
                    <div
                        style={{
                            background: "rgba(255, 255, 255, 0.95)",
                            padding: "12px 16px",
                            borderRadius: "12px",
                            maxWidth: "250px",
                            fontSize: "14px",
                            color: "#222",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                        }}
                    >
                        <h3 style={{ margin: "0 0 8px 0", fontSize: "16px" }}>
                            About Me
                        </h3>
                        <p style={{ margin: 0 }}>
                            I'm a passionate developer focused on 3D web experiences. I love blending design, code, and interaction to bring ideas to life!
                        </p>
                    </div>
                </Html>
            </mesh>

            {/* Additional elements like Notes, Thumbtack, Papers */}
            {/* Keep those as is from your Spline model or other imported assets */}
        </group>
    );
};

export default BrainstormingWall;


