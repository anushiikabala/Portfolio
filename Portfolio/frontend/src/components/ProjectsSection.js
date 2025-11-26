import React, { useState, useEffect } from "react";

const projects = [
  {
    title: "My AI Companion - Personal Portfolio Website",
    timeline: "Full-Stack AI Development | Jan 2025 – Apr 2025",
    desc: "An interactive AI-powered personal portfolio showcasing dynamic responses and GenAI integration.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop",
    skills: ["React", "Node.js", "OpenAI API", "MongoDB"],
    details: "This personal portfolio website represents a comprehensive full-stack application that combines cutting-edge frontend technologies with powerful backend infrastructure. The platform leverages generative AI to create dynamic, conversational experiences that engage visitors and showcase technical capabilities in real-time. The interface utilizes React for responsive component management, while the backend harnesses Node.js and OpenAI's API to generate intelligent responses tailored to user interactions.\n\nThe project demonstrates expertise in integrating third-party AI services, implementing real-time data synchronization, and creating seamless user experiences across multiple devices. From portfolio showcasing to interactive demos, the application serves as both a professional presentation tool and a functional demonstration of modern web development practices, incorporating best practices in performance optimization, security, and scalability.",
    codeLink: "https://github.com",
    linkLabel: "View Code"
  },
  {
    title: "Healthcare Prior Authorization System",
    timeline: "Generative AI Workflow | Dec 2024",
    desc: "Flask + React app automating healthcare pre-authorization decisions through GenAI models.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=250&fit=crop",
    skills: ["Flask", "React", "GPT-4", "Healthcare APIs"],
    details: "This specialized application addresses a critical challenge in the healthcare industry by automating the complex prior authorization process using advanced generative AI. The system was designed to significantly reduce manual review times and improve consistency in authorization decisions by leveraging GPT-4's natural language understanding capabilities. Built with Flask as the backend framework, the application processes patient data, medical records, and insurance policies to make informed pre-authorization recommendations.\n\nThe platform integrates seamlessly with existing healthcare management systems through standardized APIs, enabling medical professionals to quickly assess authorization requirements without lengthy manual reviews. By combining React's interactive frontend with Flask's robust backend processing, the solution delivers a user-friendly interface that displays authorization decisions, reasoning, and alternative pathways for disputed cases, ultimately improving patient care timelines and reducing administrative burden on healthcare providers.",
    codeLink: "#",
    linkLabel: "Office PoC"
  },
  {
    title: "AAMC Chatbot for PDF Insight Extraction",
    timeline: "Conversational Retrieval | Jul 2024",
    desc: "Flask chatbot leveraging FAISS embeddings to query and summarize PDF documents interactively.",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=400&h=250&fit=crop",
    skills: ["Flask", "FAISS", "LangChain", "PDF Processing"],
    details: "This conversational AI chatbot was engineered to transform how users interact with PDF documents by providing intelligent, context-aware responses to natural language queries. Leveraging FAISS (Facebook AI Similarity Search), the system creates high-dimensional vector embeddings of document content, enabling lightning-fast semantic searches across large document repositories. The Flask backend orchestrates the document processing pipeline, handling PDF ingestion, text extraction, and embedding generation while maintaining performance at scale.\n\nThe chatbot interface allows users to ask complex questions about document content and receive accurate, source-cited responses that maintain contextual relevance. By combining LangChain's orchestration capabilities with FAISS's vector search efficiency, the system delivers an intuitive alternative to traditional document searching, reducing the time required for information discovery and synthesis. This approach demonstrates advanced proficiency in information retrieval systems, embeddings-based search, and conversational AI architecture.",
    codeLink: "#",
    linkLabel: "Office PoC"
  },
  {
    title: "End-to-End Visualization Dashboard (J&J)",
    timeline: "Enterprise Visualization | May 2024",
    desc: "React dashboard with Flask + Azure API integration for advanced data visualization and monitoring.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
    skills: ["React", "Flask", "Azure", "D3.js", "Data Analytics"],
    details: "This enterprise-grade visualization dashboard was developed for a Fortune 500 pharmaceutical company to provide real-time insights into complex operational metrics and business intelligence data. The React-based frontend delivers responsive, interactive visualizations that enable stakeholders to explore data across multiple dimensions and time periods. Integrated with Azure cloud services, the application accesses scalable data warehouses and processes millions of data points to generate meaningful visual representations in real-time.\n\nThe architecture combines Flask's reliable backend processing with advanced D3.js visualizations to create immersive data exploration experiences. The dashboard supports custom filtering, drill-down capabilities, and export functionality, allowing business users without technical expertise to derive actionable insights from complex datasets. This project showcases expertise in enterprise data architecture, cloud infrastructure management, and building production-grade analytics platforms that serve critical business decision-making processes.",
    codeLink: "#",
    linkLabel: "Office PoC"
  },
  {
    title: "CSV GenAI Platform",
    timeline: "Compliance Automation | Jan 2024",
    desc: "GenAI-driven CSV documentation and validation automation using Flask and Azure OpenAI.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
    skills: ["Flask", "Azure OpenAI", "CSV Processing", "Python"],
    details: "This innovative platform automates the tedious process of CSV (Computer System Validation) documentation and validation by leveraging generative AI to understand data structure, infer relationships, and generate comprehensive documentation automatically. Built with Flask and integrated with Azure OpenAI services, the system analyzes CSV files to identify patterns, data types, and potential data quality issues while simultaneously generating human-readable documentation and validation rules. The solution dramatically reduces the manual effort required to document data pipelines and ensure compliance with data governance standards.\n\nThe platform provides features including automatic schema detection, anomaly identification, compliance rule generation, and interactive dashboards for data exploration. By utilizing advanced language models to understand data context and relationships, the system bridges the gap between technical data management and business requirements, enabling non-technical stakeholders to understand data provenance and quality metrics. This project demonstrates expertise in AI-driven automation, data governance, and building tools that enhance organizational efficiency while maintaining data integrity and compliance standards.",
    codeLink: "#",
    linkLabel: "Office PoC"
  },
];

export default function ProjectsSection() {
  const [likes, setLikes] = useState(Array(projects.length).fill(19));
  const [isMobile, setIsMobile] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleLike = (index) => {
    const newLikes = [...likes];
    newLikes[index] += 1;
    setLikes(newLikes);
  };

  return (
    <section
      id="projects"
      style={{
        background: "linear-gradient(180deg, #0d1b2a, #1b263b, #2a9d8f)",
        padding: "6rem 2rem 1rem",
        minHeight: "100vh",
        position: "relative",
        color: "#e0fbfc",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div style={{ maxWidth: "950px", margin: "0 auto", position: "relative" }}>
        <h2
          style={{
            textAlign: "center",
            fontSize: isMobile ? "1.7rem" : "2.2rem",
            fontWeight: 700,
            color: "#e0fbfc",
            marginBottom: isMobile ? "2rem" : "3.5rem",
            position: "sticky",
            top: isMobile ? "60px" : "80px",
            zIndex: 50,
          }}
        >
          My Projects
        </h2>

        <div style={{ position: "relative" }}>
          {projects.map((proj, i) => {
            const stackPosition = isMobile ? 100 + i * 30 : 150 + i * 70;

            return (
              <div
                key={i}
                style={{
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1.5px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "25px",
                  padding: isMobile ? "0.9rem" : "1.6rem",
                  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.25)",
                  backdropFilter: "blur(15px)",
                  marginBottom: isMobile ? "1.5rem" : "4rem",
                  position: "sticky",
                  top: `${stackPosition}px`,
                  zIndex: i + 1,
                  transition: "transform 0.3s ease",
                }}
              >
                {/* Like Button */}
                <div
                  style={{
                    position: "absolute",
                    top: isMobile ? "0.5rem" : "3px",
                    right: isMobile ? "0.5rem" : "0.8rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    background: "rgba(255, 255, 255, 0.08)",
                    padding: isMobile ? "0.3rem 0.6rem" : "0.45rem 0.8rem",
                    borderRadius: "25px",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.35)",
                  }}
                >
                  <button
                    style={{
                      border: "none",
                      background: "transparent",
                      borderRadius: "50%",
                      width: "30px",
                      height: "30px",
                      fontSize: "1.1rem",
                      color: "#38b2ac",
                      cursor: "pointer",
                      transition: "transform 0.2s ease",
                    }}
                    onClick={() => handleLike(i)}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  >
                    💙
                  </button>
                  <span
                    style={{
                      fontSize: isMobile ? "0.75rem" : "0.85rem",
                      color: "#a9bcd0",
                      fontWeight: 500,
                    }}
                  >
                    {likes[i]} likes
                  </span>
                </div>

                {/* Project Info */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: isMobile ? "0.8rem" : "2rem",
                    flexDirection: isMobile ? "column" : "row",
                  }}
                >
                  <div style={{ flex: 1, minWidth: "300px" }}>
                    <p
                      style={{
                        fontSize: isMobile ? "0.7rem" : "0.9rem",
                        color: "#bcd4e6",
                        marginBottom: "0.5rem",
                        fontWeight: 500,
                      }}
                    >
                      {proj.timeline}
                    </p>
                    <h3
                      style={{
                        fontSize: isMobile ? "1rem" : "1.4rem",
                        fontWeight: 600,
                        color: "#e0fbfc",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {proj.title}
                    </h3>
                    <p
                      style={{
                        fontSize: isMobile ? "0.75rem" : "0.95rem",
                        color: "#a9bcd0",
                        marginBottom: "1rem",
                        lineHeight: "1.5",
                      }}
                    >
                      {proj.desc}
                    </p>
                    <button
                      onClick={() => setSelectedProject(i)}
                      style={{
                        display: "inline-block",
                        background: "linear-gradient(90deg, #2a9d8f, #38b2ac)",
                        padding: isMobile ? "0.4rem 1rem" : "0.6rem 1.4rem",
                        borderRadius: "12px",
                        fontWeight: 600,
                        color: "#fff",
                        textDecoration: "none",
                        border: "none",
                        cursor: "pointer",
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.25)",
                        transition: "transform 0.3s ease",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    >
                      Learn More →
                    </button>
                  </div>

                  <img
                    src={proj.image}
                    alt={proj.title}
                    style={{
                      width: isMobile ? "100%" : "250px",
                      height: isMobile ? "120px" : "160px",
                      borderRadius: "15px",
                      objectFit: "cover",
                      boxShadow: "0 6px 20px rgba(0, 0, 0, 0.35)",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {selectedProject !== null && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "1rem",
          }}
          onClick={() => setSelectedProject(null)}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #1b263b 0%, #0d1b2a 100%)",
              border: "1.5px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "25px",
              padding: isMobile ? "1.5rem" : "2.5rem",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(15px)",
              maxWidth: isMobile ? "90%" : "700px",
              maxHeight: "85vh",
              overflow: "auto",
              color: "#e0fbfc",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              style={{
                position: "absolute",
                top: "1.5rem",
                right: "1.5rem",
                background: "rgba(255, 255, 255, 0.1)",
                border: "none",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                fontSize: "1.5rem",
                color: "#e0fbfc",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              ✕
            </button>

            {/* Modal Content */}
            <h2
              style={{
                fontSize: isMobile ? "1.3rem" : "1.8rem",
                fontWeight: 700,
                marginBottom: "1.5rem",
                color: "#e0fbfc",
                margin: 0,
              }}
            >
              {projects[selectedProject].title}
            </h2>

            {/* Technical Skills */}
            <div style={{ marginBottom: "1.5rem" }}>
              <h3
                style={{
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "#2a9d8f",
                  marginBottom: "0.8rem",
                  margin: "0 0 0.8rem 0",
                }}
              >
                Technical Skills Used
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
                {projects[selectedProject].skills.map((skill, idx) => (
                  <span
                    key={idx}
                    style={{
                      background: "rgba(42, 157, 143, 0.2)",
                      border: "1px solid rgba(42, 157, 143, 0.5)",
                      color: "#38b2ac",
                      padding: "0.4rem 0.8rem",
                      borderRadius: "20px",
                      fontSize: isMobile ? "0.8rem" : "0.85rem",
                      fontWeight: 500,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div style={{ marginBottom: "1.5rem", flex: 1 }}>
              <h3
                style={{
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "#2a9d8f",
                  marginBottom: "0.8rem",
                  margin: "0 0 0.8rem 0",
                }}
              >
                About
              </h3>
              <div
                style={{
                  fontSize: isMobile ? "0.85rem" : "0.95rem",
                  color: "#a9bcd0",
                  lineHeight: "1.6",
                  whiteSpace: "pre-wrap",
                  wordWrap: "break-word",
                }}
              >
                {projects[selectedProject].details}
              </div>
            </div>

            {/* Code Link Section */}
            <div>
              <h3
                style={{
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "#2a9d8f",
                  marginBottom: "0.8rem",
                  margin: "0 0 0.8rem 0",
                }}
              >
                Code Link
              </h3>
              <a
                href={projects[selectedProject].codeLink}
                target={projects[selectedProject].linkLabel === "View Code" ? "_blank" : "_self"}
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (projects[selectedProject].codeLink === "#") {
                    e.preventDefault();
                  }
                }}
                style={{
                  display: "inline-block",
                  background: "linear-gradient(90deg, #2a9d8f, #38b2ac)",
                  padding: "0.7rem 1.4rem",
                  borderRadius: "12px",
                  fontWeight: 600,
                  color: "#fff",
                  textDecoration: "none",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.25)",
                  transition: "transform 0.3s ease",
                  cursor: projects[selectedProject].codeLink === "#" ? "not-allowed" : "pointer",
                  opacity: projects[selectedProject].codeLink === "#" ? 0.6 : 1,
                  fontSize: "0.95rem",
                }}
                onMouseEnter={(e) => {
                  if (projects[selectedProject].codeLink !== "#") {
                    e.currentTarget.style.transform = "scale(1.05)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                {projects[selectedProject].linkLabel} →
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}