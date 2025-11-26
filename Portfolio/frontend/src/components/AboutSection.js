import React from "react";
import "./AboutSection.css";
import aboutImg from "../assets/about.jpg";

const AboutSection = () => {
  return (
    <section id="about" className="about-section">
      <h2 className="about-title">ABOUT ME</h2>

      <div className="about-card">
        <div className="about-container">
          {/* LEFT */}
          <div className="about-left">
            <img src={aboutImg} alt="Anushika" className="about-img" />

            <div className="stats">
              <div className="stat-card">
                <h4>Projects</h4>
                <p>10+ Completed</p>
              </div>
              <div className="stat-card">
                <h4>Technologies</h4>
                <p>15+ Tools</p>
              </div>
              <div className="stat-card">
                <h4>Experience</h4>
                <p>2 Years</p>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="about-right">
            <div className="about-info">
              <h3>Anushika Balamurgan</h3>
              <p>
                I’m Anushika Balamurgan, an AI Developer and Frontend Developer who enjoys designing thoughtful, intuitive digital experiences. Outside of work, I’m a traveler and an artist, and my love for exploring and painting inspires my creativity.
              </p>
            </div>

            <p className="learn-title">Learn More About Me From My:</p>
<div className="button-group">
  <a href="#skills" className="about-btn">Skills</a>
  <a href="#projects" className="about-btn">Projects</a>
  <a href="#resume" className="about-btn">Resume</a>
  <a href="#experience" className="about-btn">Experience</a>
  <a href="#feed" className="about-btn">Feed</a>
  <a href="#ai-companion" className="about-btn">AI Companion</a>
</div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
