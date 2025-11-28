import React, { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showResumePopup, setShowResumePopup] = useState(false);

  const handleDownload = () => {
    window.location.href = "https://portfolio-z3n0.onrender.com/download-resume";
    setShowResumePopup(false);
  };

  const closeMenu = () => setMenuOpen(false);


  return (
    <>
      <nav className="navbar">
        <div className="nav-left">
          <h2 className="logo">Anushika Balamurgan</h2>
        </div>

        <div
          className={`menu-toggle ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </div>

        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li><a href="#about" className="nav-link" onClick={closeMenu}>About</a></li>
  <li><a href="#skills" className="nav-link" onClick={closeMenu}>Skills</a></li>
  <li><a href="#projects" className="nav-link" onClick={closeMenu}>Projects</a></li>
  <li><a href="#experience" className="nav-link" onClick={closeMenu}>Experience</a></li>
  <li><a href="#contact" className="nav-link" onClick={closeMenu}>Contact</a></li>
  <li><a href="#feed" className="nav-link" onClick={closeMenu}>Feed</a></li>

          <li>
            <button
              className="nav-link resume-btn"
              onClick={() => setShowResumePopup(true)}
            >
              📄 Resume
            </button>
          </li>
        </ul>
      </nav>

      {/* 🌸 Fancy Resume Confirmation Popup */}
      {showResumePopup && (
        <div className="resume-popup-overlay">
          <div className="resume-popup">
            <h3>Download Resume?</h3>
            <p>Would you like to download Anushika’s Resume now?</p>
            <div className="popup-buttons">
              <button className="confirm-btn" onClick={handleDownload}>
                Yes, Download
              </button>
              <button
                className="cancel-btn"
                onClick={() => setShowResumePopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
