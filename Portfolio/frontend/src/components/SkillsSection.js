import React, { useState, useEffect } from "react";
import "./SkillsSection.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from "recharts";

const skillSets = [
  {
    title: "Full Stack Development",
    desc: "Experience with robust front-end and back-end technologies.",
    skills: [
      { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
      { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Node.JS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Flask", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" },
      { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
      { name: "Angular", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" },
    ],
  },
  {
    title: "Programming & Development",
    desc: "Showcasing expertise in modern programming languages and frameworks.",
    skills: [
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
      { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
      { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    ],
  },
];

const barColors = ["#1a1a1a", "#2d2d2d", "#3f3f3f", "#4a4a4a", "#5a5a5a", "#6b6b6b"];

const codingData = [
  { language: "JavaScript", hours: 480 },
  { language: "Python", hours: 390 },
  { language: "HTML", hours: 150 },
  { language: "CSS", hours: 100 },
  { language: "C++", hours: 110 },
  { language: "ASP.NET", hours: 70 },
];

const radarCharts = [
  {
    title: "Problem Solving",
    data: [
      { skill: "Problem Solving", value: 4.8 },
      { skill: "Data Analysis", value: 4.5 },
      { skill: "Flexibility", value: 4.6 },
      { skill: "Efficiency", value: 4.7 },
      { skill: "Optimization", value: 4.4 },
    ],
    avg: 4.6,
  },
  {
    title: "Technical Skills",
    data: [
      { skill: "Frontend", value: 4.7 },
      { skill: "Backend", value: 4.5 },
      { skill: "Database", value: 4.3 },
      { skill: "DevOps", value: 4.0 },
      { skill: "Testing", value: 4.2 },
    ],
    avg: 4.34,
  },
  {
    title: "Soft Skills",
    data: [
      { skill: "Communication", value: 4.6 },
      { skill: "Teamwork", value: 4.8 },
      { skill: "Leadership", value: 4.3 },
      { skill: "Adaptability", value: 4.7 },
      { skill: "Creativity", value: 4.5 },
    ],
    avg: 4.58,
  },
];

export default function SkillsSection() {
  const [current, setCurrent] = useState(0);
  const [radarIndex, setRadarIndex] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);
  const [autoRadar, setAutoRadar] = useState(true);

  // Auto-slide carousel every 4 seconds
  useEffect(() => {
    if (!autoSlide) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % skillSets.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [autoSlide]);

  // Auto-slide radar every 4 seconds
  useEffect(() => {
    if (!autoRadar) return;
    const timer = setInterval(() => {
      setRadarIndex((prev) => (prev + 1) % radarCharts.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [autoRadar]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % skillSets.length);
    setAutoSlide(false);
    setTimeout(() => setAutoSlide(true), 4000);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + skillSets.length) % skillSets.length);
    setAutoSlide(false);
    setTimeout(() => setAutoSlide(true), 4000);
  };

  const nextRadar = () => {
    setRadarIndex((prev) => (prev + 1) % radarCharts.length);
    setAutoRadar(false);
    setTimeout(() => setAutoRadar(true), 4000);
  };

  const prevRadar = () => {
    setRadarIndex((prev) => (prev - 1 + radarCharts.length) % radarCharts.length);
    setAutoRadar(false);
    setTimeout(() => setAutoRadar(true), 4000);
  };

  return (
    <section className="skills-section">
      <div className="skills-overlay"></div>

      <div className="skills-container">
        <h2 className="skills-title">Skills</h2>
        <p className="skills-sub">My TechStack</p>

        {/* Carousel Section */}
        <div className="carousel-container">
          <h3 className="carousel-title">{skillSets[current].title}</h3>
          <p className="carousel-desc">{skillSets[current].desc}</p>

          <div className="carousel-buttons">
            <button className="carousel-btn" onClick={prevSlide}>
              <ChevronLeft size={20} color="#6b4f69" />
            </button>

            <div className="skill-icons">
              {skillSets[current].skills.map((skill, i) => (
                <div className="skill-item" key={i}>
                  <img src={skill.icon} alt={skill.name} />
                  <p>{skill.name}</p>
                </div>
              ))}
            </div>

            <button className="carousel-btn" onClick={nextSlide}>
              <ChevronRight size={20} color="#6b4f69" />
            </button>
          </div>
        </div>

        {/* Workspace */}
        <div className="workspace">
          <h3>My Workspace</h3>

          <div className="workspace-grid">
            {/* Bar Chart */}
            <div className="chart-box">
              <h4>Coding Hours by Language</h4>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={codingData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 0, 0, 0.4)" />
                  <XAxis
                    dataKey="language"
                    stroke="#e0fbfc"
                    tick={{ fontSize: window.innerWidth < 600 ? 8 : 12, fill: "#e0fbfc" }}
                    angle={window.innerWidth < 600 ? -20 : 0}
                    textAnchor="end"
                  />
                  <YAxis stroke="#e0fbfc" tick={{ fontSize: window.innerWidth < 600 ? 8 : 12, fill: "#e0fbfc" }} />

                  <Tooltip contentStyle={{ background: "rgba(255,255,255,0.95)", borderRadius: "8px" }} />
                  <Bar dataKey="hours" radius={[6, 6, 0, 0]} animationDuration={1000}>
                    {codingData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Radar Chart */}
            <div className="chart-box">
              <div className="carousel-buttons">
                <button className="carousel-btn" onClick={prevRadar}>
                  <ChevronLeft size={16} color="#6b4f69" />
                </button>
                <h4>{radarCharts[radarIndex].title}</h4>
                <button className="carousel-btn" onClick={nextRadar}>
                  <ChevronRight size={16} color="#6b4f69" />
                </button>
              </div>

              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarCharts[radarIndex].data}>
                  <PolarGrid stroke="rgba(0, 0, 0, 0.5)" />
                  <PolarAngleAxis dataKey="skill" stroke="#e0fbfc" tick={{ fontSize: window.innerWidth < 600 ? 8 : 12, fill: "#e0fbfc" }} />
                  <PolarRadiusAxis stroke="#e0fbfc" tick={{ fontSize: window.innerWidth < 600 ? 7 : 11, fill: "#e0fbfc" }} />
                  <Radar dataKey="value" stroke="#1a1a1a" fill="#4a4a4a" fillOpacity={0.8} animationDuration={1000} />
                </RadarChart>
              </ResponsiveContainer>

              <p style={{ color: "#e0fbfc", fontWeight: "400" }}>
                Avg: {radarCharts[radarIndex].avg}
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .carousel-container {
          animation: fadeInScale 0.6s ease-out;
        }

        .carousel-title {
          animation: slideInLeft 0.5s ease-out;
        }

        .carousel-desc {
          animation: slideInRight 0.5s ease-out 0.1s both;
        }

        .skill-icons {
          animation: fadeInScale 0.5s ease-out 0.2s both;
        }

        .chart-box {
          animation: fadeInScale 0.6s ease-out;
        }

        .chart-box h4 {
          animation: slideInLeft 0.5s ease-out;
        }
      `}</style>
    </section>
  );
}