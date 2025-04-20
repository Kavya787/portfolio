import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import { Loader } from "@react-three/drei";
import CustomLoader from "./components/CustomLoader";
import MusicButton from "./components/MusicButton";
import Tips from "./components/Tips";
import Spotify from "./components/Spotify";
import DarkModeToggleContainer from "./components/DarkModeToggleContainer";
import HelperBot from "./components/HelperBot"; // 👈 New import
import axios from "axios";

// ✅ Your provided credentials
const BIN_ID = "68051b1d8561e97a5003b2c3";
const API_KEY = "$2a$10$VSrJqa7dziQ3VRhoK4vvLuA.3bUuWgDVoHtG4DuugW1Zq6gcGf1vS";

const config = {
    headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': API_KEY
    }
};

export default function App() {
    const [colorMode, setColorMode] = useState("light");
    const [loadState, setLoadState] = useState(false);
    const [visitCount, setVisitCount] = useState(null);

    useEffect(() => {
        // 🚀 Fetch and update visit count only once when app opens
        axios.get(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, config)
            .then(res => {
                const currentCount = res.data.record.visitCount || 0;
                const newCount = currentCount + 1;
                setVisitCount(newCount);

                // Update visit count on the server
                axios.put(`https://api.jsonbin.io/v3/b/${BIN_ID}`, { visitCount: newCount }, config)
                    .catch(err => console.error("Failed to update visit count:", err));
            })
            .catch(err => console.error("Failed to fetch visit count:", err));
    }, []);

    return (
        <>
            <Tips typeOf={"app"} text={"Click outside the object to escape the camera mode"} />
            <Spotify />
            <Canvas
                className="r3f"
                style={{
                    background: colorMode === "dark" ? "#000" : "#f3f54c",
                }}
                gl={{ antialias: true }}
                shadows="soft"
                flat
                linear
            >
                <Suspense fallback={<CustomLoader setLoadState={setLoadState} />}>
                    <Scene colorMode={colorMode} loadState={loadState} />
                </Suspense>
            </Canvas>
            <DarkModeToggleContainer colorMode={colorMode} setColorMode={setColorMode} />
            <MusicButton colorMode={colorMode} />
            <HelperBot visitCount={visitCount} /> {/* 👈 Passing visitCount prop */}
            <Loader />
        </>
    );
}
