import { useState, useEffect, useRef } from "react";
import "./DrumKit.css";

const INSTRUMENTS = [
  { keyCode: "A", soundName: "clap", audioPath: "/sounds/clap.wav" },
  { keyCode: "S", soundName: "hihat", audioPath: "/sounds/hihat.wav" },
  { keyCode: "D", soundName: "kick", audioPath: "/sounds/kick.wav" },
  { keyCode: "F", soundName: "openhat", audioPath: "/sounds/openhat.wav" },
  { keyCode: "G", soundName: "boom", audioPath: "/sounds/boom.wav" },
  { keyCode: "H", soundName: "ride", audioPath: "/sounds/ride.wav" },
  { keyCode: "J", soundName: "snare", audioPath: "/sounds/snare.wav" },
  { keyCode: "K", soundName: "tom", audioPath: "/sounds/tom.wav" },
  { keyCode: "L", soundName: "tink", audioPath: "/sounds/tink.wav" },
];

function Instrument({ keyCode, soundName, audioPath }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  function handlePlay() {
    audioRef.current.currentTime = 0;
    audioRef.current.play();
    setIsPlaying(true);
  }

  useEffect(() => {
    function handleKeyPress(e) {
      if (e.key.toUpperCase() === keyCode.toUpperCase()) {
        handlePlay();
      }
    }

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [keyCode]);

  return (
    <div
      className={`key ${isPlaying && "playing"}`}
      onClick={handlePlay}
      onTransitionEnd={() => setIsPlaying(false)}
    >
      <kbd>{keyCode}</kbd>
      <span className="sound">{soundName}</span>
      <audio src={audioPath} ref={audioRef}></audio>
    </div>
  );
}

export default function DrumKit() {
  return (
    <>
      <h1 id="title">Drum Kit</h1>
      <div className="keys">
        {INSTRUMENTS.map((instrument, idx) => (
          <Instrument key={idx} {...instrument}></Instrument>
        ))}
      </div>
    </>
  );
}
