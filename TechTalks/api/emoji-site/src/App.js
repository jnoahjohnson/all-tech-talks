import React, { useState } from "react";

function App() {
  const [emoji, setEmoji] = useState("");
  const [loading, setLoading] = useState(false);
  const getEmoji = () => {
    setLoading(true);
    fetch("https://emoji-api-kuv3d.ondigitalocean.app/random").then(
      (response) => {
        response.json().then((result) => {
          setEmoji(result.message);
          setLoading(false);
        });
      }
    );
  };
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-b from-yellow-400  to-pink-500">
      <div
        className={`text-white mb-4 ${
          loading ? "opacity-0" : "opacity-100"
        } transition-all duration-700`}
        style={{ fontSize: 80 }}
      >
        {emoji}
      </div>
      <button
        onClick={getEmoji}
        className="bg-gradient-to-b from-blue-700  to-blue-800 text-white font-bold text-4xl py-2 px-4 rounded shadow-lg"
      >
        Get Emoji!
      </button>
    </div>
  );
}

export default App;
