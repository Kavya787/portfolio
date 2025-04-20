

import { useState } from "react";

const Spotify = () => {
    const [songUrl] = useState("https://open.spotify.com/embed/track/2Eqlfs4oDSeXeZq0OwT8MG"); // Innerbloom by The Chemical Brothers

    return (
        <div className="spotify" onClick={() => window.open(songUrl, "_blank")}>
            <div className="current-fav">Current Favourite: Innerbloom</div>
            <iframe
                style={{ borderRadius: "12px" }}
                src={songUrl}
                width="100%"
                height="352"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
            ></iframe>
        </div>
    );
};

export default Spotify;
