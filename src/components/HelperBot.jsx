import { useEffect, useState } from "react";
import axios from "axios";

const botImg = "https://cdn-icons-png.flaticon.com/512/4712/4712102.png";

export default function HelperBot({ visitCount }) {
    const [showQuestion, setShowQuestion] = useState(true);
    const [showHelp, setShowHelp] = useState(false);
    const [greeting, setGreeting] = useState("");
    const [expression, setExpression] = useState("😊");
    const [insight, setInsight] = useState("");
    const [botVisible, setBotVisible] = useState(true);

    useEffect(() => {
        // Greeting and emojis
        const hour = new Date().getHours();
        if (hour < 12) setGreeting("Good morning!");
        else if (hour < 18) setGreeting("Good afternoon!");
        else setGreeting("Good evening!");

        const expressions = ["😊", "😄", "🤖", "👀", "✨", "😐", "🥲"];
        setExpression(expressions[Math.floor(Math.random() * expressions.length)]);

        const insights = [
            "Tip: Click and drag to move the camera!",
            "Insight: You can explore scenes using your mouse.",
            "Tip: Use the dark/light toggle for comfort.",
            "Fact: This project uses React Three Fiber!",
            "Hint: Hover over 3D objects for interactions.",
        ];
        setInsight(insights[Math.floor(Math.random() * insights.length)]);
    }, []);

    const handleYes = () => {
        setShowQuestion(false);
        setShowHelp(true);
    };

    const handleNo = () => {
        setShowQuestion(false);
        setShowHelp(false);
        setBotVisible(false);
    };

    const closeHelp = () => {
        setShowHelp(false);
        setBotVisible(false);
    };

    const reopenBot = () => {
        setShowQuestion(true);
        setShowHelp(false);
        setBotVisible(true);
    };

    return (
        <>
            {botVisible ? (
                <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 1000, fontFamily: 'sans-serif', color: '#000' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img
                            src={botImg}
                            alt="Helper Bot"
                            style={{
                                width: '70px',
                                height: '70px',
                                borderRadius: '50%',
                                border: '2px solid #ccc',
                                background: '#fff',
                                padding: '5px',
                                animation: 'float 2s ease-in-out infinite',
                            }}
                        />
                        {showQuestion && (
                            <div style={{
                                background: '#FFD8B1',
                                padding: '1rem',
                                borderRadius: '12px',
                                boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                                maxWidth: '200px',
                            }}>
                                <p>{expression} {greeting}<br />
                                    {visitCount !== null && (
                                    <span>Welcome! This portfolio is visted <strong>{visitCount}</strong> times{visitCount > 1 ? "s" : ""}.</span>
                                    )}<br />
                                    Do you need help?
                                </p>
                                <button onClick={handleYes} style={{ marginRight: '10px' }}>Yes</button>
                                <button onClick={handleNo}>No</button>
                            </div>
                        )}
                    </div>

                    {showHelp && (
                        <div style={{
                            marginTop: '10px',
                            background: '#FFD8B1',
                            padding: '1rem',
                            borderRadius: '12px',
                            maxWidth: '300px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                            position: 'relative'
                        }}>
                            <strong>Instructions 🛠️</strong>
                            <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                                <li>🖱️ Click and drag to move the camera</li>
                                <li>🎯 Click on objects to interact</li>
                                <li>🚪 Click outside to exit camera mode</li>
                                <li>🎵 Use the music button for ambience</li>
                                <li>🌓 Toggle dark/light mode</li>
                            </ul>
                            <p style={{ marginTop: '10px' }}>{insight}</p>
                            <button
                                onClick={closeHelp}
                                style={{
                                    position: 'absolute',
                                    top: '5px',
                                    right: '10px',
                                    background: 'transparent',
                                    border: 'none',
                                    fontSize: '16px',
                                    cursor: 'pointer'
                                }}
                            >❌</button>
                        </div>
                    )}
                </div>
            ) : (
                <button
                    onClick={reopenBot}
                    style={{
                        position: 'absolute',
                        top: '20px',
                        left: '20px',
                        zIndex: 1000,
                        backgroundColor: '#fff',
                        border: '2px solid #ccc',
                        borderRadius: '50%',
                        width: '60px',
                        height: '60px',
                        backgroundImage: `url(${botImg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        cursor: 'pointer',
                    }}
                    title="Reopen Assistant"
                />
            )}
        </>
    );
}
