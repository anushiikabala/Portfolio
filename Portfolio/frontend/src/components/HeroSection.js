import React, { useState } from "react";
import "./HeroSection.css";
import profilePic from "../assets/profile1.png";

const HeroSection = ({ onZoomToggle, isChatOpen }) => {
  const [muted, setMuted] = useState(true);
  const [zoomed, setZoomed] = useState(false);
  const [message, setMessage] = useState("");

  const handleZoomClick = () => {
    if (!isChatOpen && onZoomToggle) {
      onZoomToggle();  // only open, no message
    }
    setZoomed(!zoomed);
  };

  const handleSendClick = () => {
    if (message.trim()) {
      if (onZoomToggle) onZoomToggle(message); // send once
      setMessage("");
    }
  };




  return (
    <header className="hero">
      <div className="overlay"></div>

      <div className="hero-content">
        <img
          src={profilePic}
          alt="Anushika"
          className={`hero-img ${zoomed ? "zoomed" : ""}`}
          onClick={handleZoomClick}
        />
        <h1 className="hero-name">Anushika Balamurgan</h1>
        <p className="hero-tagline">
          Generative AI & Full-Stack Developer | Travel Enthusiast
        </p>

        <div className="ai-bar">
          <div className="ai-left">
            <span
              className="ai-icon"
              onClick={handleZoomClick}
              title={zoomed ? "Zoom Out" : "Zoom In"}
            >
              ⛶
            </span>

            <span
              className="ai-icon"
              onClick={() => setMuted(!muted)}
              title={muted ? "Unmute" : "Mute"}
            >
              {muted ? "🔇" : "🔊"}
            </span>

            <input
              type="text"
              className="ai-input"
              placeholder="Ask My AI Companion!"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSendClick();     // 🔥 ENTER works like send arrow
                }
              }}
            />

          </div>

          <div className="ai-send" title="Send" onClick={handleSendClick}>
            <span className="send-arrow">↑</span>
          </div>
        </div>

        <button className="enter-btn">Enter Portfolio</button>
      </div>
    </header>
  );
};

export default HeroSection;
