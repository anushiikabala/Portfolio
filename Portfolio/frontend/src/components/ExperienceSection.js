import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Handshake, Briefcase, Award, ThumbsUp } from "lucide-react";
import kuttysImg from "../assets/experience/kuttys.jpg";
import ltimindtreeImg from "../assets/experience/LTIMindtree.jpg";
import creative from "../assets/experience/creative.jpg";
import nss from "../assets/experience/nss.jpeg";
import publicity from "../assets/experience/publicity.jpg";
import master from "../assets/experience/masters.jpg";
import college from "../assets/experience/college.jpeg";



// Auto slide hook
const useAutoSlide = (length, interval = 4000) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % length);
    }, interval);
    return () => clearInterval(timer);
  }, [length, interval]);
  return [currentSlide, setCurrentSlide];
};

// LikeButton component with +1 animation
const LikeButton = ({ onLike }) => {
  const [animate, setAnimate] = useState(false);

  const handleClick = () => {
    onLike();
    setAnimate(true);
    setTimeout(() => setAnimate(false), 800);
  };

  return (
    <div className="like-btn-wrapper">
      <button className="like-btn" onClick={handleClick}>
        <ThumbsUp size={18} />
      </button>
      {animate && <span className="like-animate">+1</span>}
    </div>
  );
};

// Involvement Tab
const InvolvementTabPage = () => {
  const involvementData = [
  {
    id: 1,
    organization: "Creative Team - SIES GST",
    role: "Team Head",
    location: "Nerul, Mumbai",
    period: "2021 - 2022",

    shortDescription:
      "Led college creative activities, decor, and large-scale art installations.",

    longDescription:
      "As Team Head of the Creative Team at SIES GST, I was responsible for planning and creating artistic installations for college festivals, events, and annual programs. I designed stage décors, crafted 3-D models, themed artwork, and large-scale visual pieces that transformed event spaces. I also coordinated a team of artists, managed material planning, and ensured every creative element aligned with event themes and audience engagement.",

    tagline: "Design. Inspire. Create.",
    image: creative,
    likes: 12,
  },

  {
    id: 2,
    organization: "CSI - SIES",
    role: "Publicity Coordinator",
    location: "Mumbai, India",
    period: "2022 - 2023",

    shortDescription:
      "Managed event publicity, student outreach, and digital design for CSI.",

    longDescription:
      "As the Publicity Coordinator for CSI SIES, I handled branding, event promotions, and digital communication for technical and cultural events organized by the Computer Society of India (SIES Chapter). I designed posters, coordinated PR strategies, managed social media outreach, and ensured strong audience engagement. My role also involved collaborating with event teams to deliver consistent, visually appealing communication materials.",

    tagline: "Lead. Collaborate. Influence.",
    image: publicity,
    likes: 8,
  },

  {
    id: 3,
    organization: "NSS – National Service Scheme",
    role: "NSS Volunteer",
    location: "Mumbai, India",
    period: "2019 - 2021",

    shortDescription:
      "Volunteered for social initiatives, campus drives, and community service.",

    longDescription:
      "As an NSS Volunteer, I actively participated in community welfare programs including cleanliness drives, blood donation camps, beach cleanups, teaching activities for underprivileged children, and tree plantation campaigns. I supported organizing awareness initiatives and worked alongside teams to contribute toward social responsibility, leadership, and community development.",

    tagline: "Serve. Support. Empower.",
    image: nss,
    likes: 15,
  }
];



  const [currentSlide, setCurrentSlide] = useAutoSlide(involvementData.length, 4000);
  const [data, setData] = useState(involvementData[0]);
  const [selectedModal, setSelectedModal] = useState(null);

  useEffect(() => {
    setData(involvementData[currentSlide]);
  }, [currentSlide]);

  const handleLike = () => {
    data.likes += 1;
    setData({ ...data });
  };

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % involvementData.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + involvementData.length) % involvementData.length);

  return (
    <>
      <div className="tab-section">
        <h2 className="section-title">My Involvement</h2>
        <div className="slider">
          <button className="arrow left" onClick={prevSlide}><ChevronLeft size={28} /></button>
          <div className="card">
            <LikeButton onLike={handleLike} />
            <img src={data.image} alt={data.organization} className="card-image" />
            <div className="card-content">
              <h3>{data.role}</h3>
              <h4>{data.organization}</h4>
              <p className="timeline">{data.location} | {data.period}</p>
              <p className="tagline">{data.tagline}</p>
              <p className="description">{data.shortDescription}</p>
              <div className="card-footer">
                <button className="learn-btn" onClick={() => setSelectedModal(data)}>Learn More →</button>
                <div className="likes">Likes: {data.likes}</div>
              </div>
            </div>
          </div>
          <button className="arrow right" onClick={nextSlide}><ChevronRight size={28} /></button>
        </div>
      </div>

      {selectedModal && (
        <div className="modal-overlay" onClick={() => setSelectedModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedModal(null)}>✕</button>
            <h2 className="modal-title">{selectedModal.organization}</h2>
            
            <div className="modal-details">
              <div className="detail-row">
                <span className="detail-label">Name:</span>
                <span className="detail-value">{selectedModal.organization}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Role:</span>
                <span className="detail-value">{selectedModal.role}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Year:</span>
                <span className="detail-value">{selectedModal.period}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Location:</span>
                <span className="detail-value">{selectedModal.location}</span>
              </div>
            </div>

            <div className="modal-description">
              <h3 className="modal-section-title">Description</h3>
              <p>{selectedModal.longDescription}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Career Tab
const CareerTabPage = () => {
 const careerData = [
  {
    id: 1,
    company: "LTIMindtree",
    role: "Software Engineer",
    location: "Mumbai, India",
    period: "September 2023 – September 2025",

    shortDescription:
      "Supported digital transformation & AI POC development for Johnson & Johnson.",

    longDescription:
      "At LTIMindtree, I worked as a Software Engineer supporting enterprise-scale digital transformation initiatives for Johnson & Johnson Life Sciences. I contributed to workflow automation tools, UI/UX enhancements, and AI-driven Proof of Concept (POC) solutions that improved operational efficiency across global teams.",

    tagline: "Building Smart Solutions.",
    image: ltimindtreeImg,
    likes: 14,
  },
  {
    id: 2,
    company: "Kutty's Classes",
    role: "Assistant Teacher",
    location: "Mumbai, India",
    period: "May 2023 – Sep 2023",

    shortDescription:
      "Taught mathematics with engaging methods that boosted student performance.",

    longDescription:
      "At Kutty’s Classes, I taught mathematics to high school students while creating engaging lesson plans and personalized learning support. I contributed to improved student performance through structured teaching techniques and interactive problem-solving sessions.",

    tagline: "Educate. Empower. Excel.",
    image: kuttysImg,
    likes: 10,
  }
];



  const [currentSlide, setCurrentSlide] = useAutoSlide(careerData.length, 4000);
  const [data, setData] = useState(careerData[0]);
  const [selectedModal, setSelectedModal] = useState(null);

  useEffect(() => {
    setData(careerData[currentSlide]);
  }, [currentSlide]);

  const handleLike = () => {
    data.likes += 1;
    setData({ ...data });
  };

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % careerData.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + careerData.length) % careerData.length);

  return (
    <>
      <div className="tab-section">
        <h2 className="section-title">My Career</h2>
        <div className="slider">
          <button className="arrow left" onClick={prevSlide}><ChevronLeft size={28} /></button>
          <div className="card">
            <LikeButton onLike={handleLike} />
            <img src={data.image} alt={data.company} className="card-image" />
            <div className="card-content">
              <h3>{data.role}</h3>
              <h4>{data.company}</h4>
              <p className="timeline">{data.location} | {data.period}</p>
              <p className="tagline">{data.tagline}</p>
              <p className="description">{data.shortDescription}</p>
              <div className="card-footer">
                <button className="learn-btn" onClick={() => setSelectedModal(data)}>Learn More →</button>
                <div className="likes">Likes: {data.likes}</div>
              </div>
            </div>
          </div>
          <button className="arrow right" onClick={nextSlide}><ChevronRight size={28} /></button>
        </div>
      </div>

      {selectedModal && (
        <div className="modal-overlay" onClick={() => setSelectedModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedModal(null)}>✕</button>
            <h2 className="modal-title">{selectedModal.company}</h2>
            
            <div className="modal-details">
              <div className="detail-row">
                <span className="detail-label">Company:</span>
                <span className="detail-value">{selectedModal.company}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Role:</span>
                <span className="detail-value">{selectedModal.role}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Year:</span>
                <span className="detail-value">{selectedModal.period}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Location:</span>
                <span className="detail-value">{selectedModal.location}</span>
              </div>
            </div>

            <div className="modal-description">
              <h3 className="modal-section-title">Description</h3>
              <p>{selectedModal.longDescription}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Education Tab
const EducationTabPage = () => {
  const educationData = [
  {
    id: 1,
    institution: "Northeastern University",
    degree: "Master's in Information Systems",
    location: "Boston, MA",
    period: "2024 – 2026",

    shortDescription:
      "Specializing in AI, data engineering, and advanced software systems.",

    longDescription:
      "At Northeastern University, I am pursuing a Master’s in Information Systems with a strong focus on artificial intelligence, cloud architectures, data engineering, and full-stack development. My coursework and projects integrate modern AI workflows, software design, and real-world problem solving, preparing me to build scalable, intelligent systems for industry applications.",

    tagline: "Transforming Data into Decisions.",
    image: master,
    likes: 20,
  },

  {
    id: 2,
    institution: "SIES Graduate School of Technology",
    degree: "Bachelor of Science in Computer Science",
    location: "Mumbai, India",
    period: "2019 – 2022",

    shortDescription:
      "Developed strong foundations in CS principles, algorithms, and databases.",

    longDescription:
      "During my Bachelor's in Computer Science at SIES, I built a solid understanding of algorithms, data structures, database management, operating systems, and software engineering fundamentals. I participated in academic projects, research assignments, and department activities that strengthened my technical foundation and analytical thinking.",

    tagline: "Learning Beyond Limits.",
    image: college,
    likes: 18,
  }
];


  const [currentSlide, setCurrentSlide] = useAutoSlide(educationData.length, 4000);
  const [data, setData] = useState(educationData[0]);
  const [selectedModal, setSelectedModal] = useState(null);

  useEffect(() => {
    setData(educationData[currentSlide]);
  }, [currentSlide]);

  const handleLike = () => {
    data.likes += 1;
    setData({ ...data });
  };

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % educationData.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + educationData.length) % educationData.length);

  return (
    <>
      <div className="tab-section">
        <h2 className="section-title">My Education</h2>
        <div className="slider">
          <button className="arrow left" onClick={prevSlide}><ChevronLeft size={28} /></button>
          <div className="card">
            <LikeButton onLike={handleLike} />
            <img src={data.image} alt={data.institution} className="card-image" />
            <div className="card-content">
              <h3>{data.degree}</h3>
              <h4>{data.institution}</h4>
              <p className="timeline">{data.location} | {data.period}</p>
              <p className="tagline">{data.tagline}</p>
              <p className="description">{data.shortDescription}</p>
              <div className="card-footer">
                <button className="learn-btn" onClick={() => setSelectedModal(data)}>Learn More →</button>
                <div className="likes">Likes: {data.likes}</div>
              </div>
            </div>
          </div>
          <button className="arrow right" onClick={nextSlide}><ChevronRight size={28} /></button>
        </div>
      </div>

      {selectedModal && (
        <div className="modal-overlay" onClick={() => setSelectedModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedModal(null)}>✕</button>
            <h2 className="modal-title">{selectedModal.institution}</h2>
            
            <div className="modal-details">
              <div className="detail-row">
                <span className="detail-label">University Name:</span>
                <span className="detail-value">{selectedModal.institution}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Majors:</span>
                <span className="detail-value">{selectedModal.degree}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Year:</span>
                <span className="detail-value">{selectedModal.period}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Location:</span>
                <span className="detail-value">{selectedModal.location}</span>
              </div>
            </div>

            <div className="modal-description">
              <h3 className="modal-section-title">Description</h3>
              <p>{selectedModal.longDescription}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const tabs = [
  { title: "Involvement", icon: <Handshake size={18} />, component: InvolvementTabPage },
  { title: "Career", icon: <Briefcase size={18} />, component: CareerTabPage },
  { title: "Education", icon: <Award size={18} />, component: EducationTabPage },
];

const ExperiencePage = () => {
  const [selectedTab, setSelectedTab] = useState(tabs[1]);
  const [ActiveComponent, setActiveComponent] = useState(() => selectedTab.component);

  return (
    <div className="experience-page">
      <div className="tab-nav-wrapper">
        <div className="tab-nav">
          {tabs.map((tab) => (
            <button
              key={tab.title}
              className={`tab-btn ${selectedTab.title === tab.title ? "active" : ""}`}
              onClick={() => {
                setSelectedTab(tab);
                setActiveComponent(() => tab.component);
              }}
            >
              {tab.icon}
              <span>{tab.title}</span>
            </button>
          ))}
        </div>
      </div>
      <ActiveComponent />
      <style>{`
:root{
  --bg-grad: linear-gradient(180deg, #0d1b2a, #1b263b, #2a9d8f);
  --surface: rgba(255,255,255,0.08);
  --surface-strong: rgba(255,255,255,0.14);
  --glass-border: rgba(255,255,255,0.22);
  --shadow: 0 10px 28px rgba(0,0,0,0.28);

  --text-strong: #e0fbfc;
  --text: #bcd4e6;
  --text-muted: #95a8bb;

  --accent: #2a9d8f;
  --accent-2: #38b2ac;
  --accent-3: #48c6b5;

  --chip-bg: rgba(42,157,143,0.12);
  --chip-border: rgba(42,157,143,0.35);
}

/* Page */
.experience-page {
  background: var(--bg-grad);
  min-height: 100%;
  padding: 40px;
  font-family: 'Poppins', sans-serif;
  color: var(--text-strong);
}

/* Tabs */
.tab-nav-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  background: var(--surface);
  border: 1px solid var(--glass-border);
  border-radius: 20px;
  padding: 10px;
  width: fit-content;
  margin: 0 auto 24px auto;
  box-shadow: var(--shadow);
  backdrop-filter: blur(10px);
}
.tab-nav { display: flex; gap: 12px; }
.tab-btn {
  border: 1px solid transparent;
  background: transparent;
  padding: 10px 16px;
  border-radius: 12px;
  cursor: pointer;
  color: var(--text);
  font-weight: 500;
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}
.tab-btn:hover {
  background: var(--surface-strong);
  color: var(--text-strong);
  border-color: var(--glass-border);
  transform: translateY(-1px);
}
.tab-btn.active {
  background: linear-gradient(90deg, var(--accent), var(--accent-2));
  color: #fff;
  border-color: transparent;
  box-shadow: 0 8px 20px rgba(42,157,143,0.35);
}

/* Section */
.tab-section { text-align: center; }
.section-title {
  font-size: 36px;
  font-weight: 700;
  color: var(--text-strong);
  margin-bottom: 16px;
}

/* Slider + Arrows */
.slider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}
.arrow {
  background: var(--surface);
  border: 1px solid var(--glass-border);
  width: 42px; height: 42px;
  border-radius: 50%;
  display: grid; place-items: center;
  color: var(--text-strong);
  cursor: pointer;
  box-shadow: var(--shadow);
  transition: transform .2s ease, background .2s ease;
}
.arrow:hover { transform: scale(1.05); background: var(--surface-strong); }

/* Card */
.card {
  background: var(--surface);
  backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  border-radius: 20px;
  box-shadow: var(--shadow);
  overflow: hidden;
  width: 900px;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  position: relative;
  padding-bottom: 12px;
}
.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(0,0,0,0.32);
}

/* Image */
.card-image {
  width: 50%;
  height: 216px;
  object-fit: cover;
  border-radius: 18px;
  margin-top: 15px;
}

/* Content */
.card-content { padding: 20px; }
.card-content h3 {
  font-size: 22px;
  margin-bottom: 6px;
  color: #ffffff;
}
.card-content h4 {
  font-size: 18px;
  margin-bottom: 8px;
  color: var(--text);
}
.timeline {
  font-size: 14px;
  color: var(--text);
  margin-bottom: 10px;
}
.tagline {
  font-style: italic;
  color: var(--accent-2);
  margin-bottom: 10px;
}
.description {
  font-size: 15px;
  color: var(--text);
  margin-bottom: 18px;
}

/* Footer row */
.card-footer {
  display: flex; justify-content: space-between; align-items: center;
}
.learn-btn {
  background: linear-gradient(90deg, var(--accent), var(--accent-2));
  border: 1px solid transparent;
  padding: 8px 18px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  color: #fff;
  transition: 0.25s;
  box-shadow: 0 6px 16px rgba(42,157,143,0.3);
}
.learn-btn:hover {
  transform: translateY(-1px);
  background: linear-gradient(90deg, var(--accent-2), var(--accent-3));
}
.likes { font-size: 14px; color: var(--text); }

/* Like */
.like-btn-wrapper { position: absolute; top: 12px; right: 15px; }
.like-btn {
  background: var(--chip-bg);
  border: 1px solid var(--chip-border);
  border-radius: 50%;
  padding: 6px;
  cursor: pointer;
  transition: 0.25s;
  color: var(--accent-2);
}
.like-btn:hover { transform: scale(1.06); }
.like-animate {
  position: absolute;
  top: -15px; right: 5px;
  color: var(--accent-2);
  font-weight: 700;
  animation: floatUp 0.8s ease-out forwards;
}
@keyframes floatUp {
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(-25px); }
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
  padding: 1rem;
}

.modal-content {
  background: linear-gradient(135deg, #1b263b 0%, #0d1b2a 100%);
  border: 1.5px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(15px);
  max-width: 600px;
  width: 100%;
  color: var(--text-strong);
  position: relative;
  max-height: 80vh;
  overflow-y: auto;
}

.modal-close {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.5rem;
  color: var(--text-strong);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
}

.modal-close:hover {
  transform: scale(1.1);
}

.modal-title {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: var(--text-strong);
}

.modal-details {
  margin-bottom: 2rem;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0.8rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.detail-row:last-child {
  border-bottom: none;
}

.detail-label {
  font-weight: 600;
  color: var(--accent-2);
  min-width: 140px;
}

.detail-value {
  color: var(--text);
  text-align: right;
  flex: 1;
}

.modal-description {
  margin-top: 2rem;
}

.modal-section-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--accent-2);
  margin-bottom: 1rem;
}

.modal-description p {
  font-size: 0.95rem;
  color: var(--text);
  line-height: 1.7;
}

/* =================== Responsive =================== */

/* Tablet */
@media (min-width: 600px) and (max-width: 820px) {
  .experience-page { padding: 30px 40px; }
  .section-title { font-size: 32px; margin-bottom: 20px; }
  .slider { gap: 20px; }
  .card {
    width: 90%; max-width: 700px;
    border-radius: 20px;
    background: var(--surface);
  }
  .card-image {
    width: 70%; height: 220px; border-radius: 18px; margin-top: 18px;
  }
  .card-content { padding: 24px 28px; }
  .card-content h3 { font-size: 22px; }
  .card-content h4 { font-size: 18px; }
  .timeline { font-size: 14px; }
  .tagline { font-size: 16px; }
  .description { font-size: 15px; line-height: 1.55; }
  .learn-btn { font-size: 15px; padding: 10px 22px; }
  .like-btn { padding: 7px; }

  .modal-content {
    max-width: 90%;
    padding: 2rem;
  }
  .modal-title { font-size: 1.6rem; }
}

/* Mobile <= 480px */
@media (max-width: 480px) {
  .experience-page { padding: 20px 0; }
  .tab-nav-wrapper {
    flex-wrap: wrap; justify-content: center; gap: 10px;
    padding: 8px 6px; width: 80%;
    background: var(--surface);
  }
  .tab-btn { padding: 6px 10px; font-size: 12px; gap: 6px; }
  .section-title { font-size: 22px; margin-bottom: 10px; }
  .slider { gap: 8px; position: relative; }
  .arrow {
    width: 36px; height: 36px; font-size: 22px;
  }
  .card {
    width: 90%; max-width: 360px; height: 450px;
    border-radius: 16px; background: var(--surface);
    display: flex; flex-direction: column; justify-content: space-between;
    padding: 12px 14px;
  }
  .card-image {
    width: 85%; height: 150px; border-radius: 14px;
    margin: 0 auto 8px auto; display: block;
  }
  .card-content {
    flex: 1; display: flex; flex-direction: column; justify-content: flex-start; text-align: center;
  }
  .card-content h3 { font-size: 15px; margin-bottom: 4px; }
  .card-content h4 { font-size: 14px; margin-bottom: 4px; }
  .timeline { font-size: 12px; margin-bottom: 6px; }
  .tagline { font-size: 13px; margin-bottom: 6px; }
  .description { font-size: 12px; line-height: 1.3; margin-bottom: 8px; }
  .card-footer { margin-top: auto; }
  .learn-btn { font-size: 12px; padding: 7px 14px; }
  .likes { font-size: 12px; }
  .like-btn-wrapper { top: 10px; right: 12px; }
  .like-btn { padding: 5px; }

  .modal-content {
    max-width: 95%;
    padding: 1.5rem;
    border-radius: 16px;
  }
  .modal-close {
    width: 36px;
    height: 36px;
    font-size: 1.2rem;
    top: 1rem;
    right: 1rem;
  }
  .modal-title { font-size: 1.3rem; margin-bottom: 1.2rem; }
  .detail-row { padding: 0.6rem 0; }
  .detail-label { min-width: 100px; font-size: 0.9rem; }
  .detail-value { font-size: 0.9rem; }
  .modal-section-title { font-size: 1rem; }
  .modal-description p { font-size: 0.9rem; }
}
      `}</style>
    </div>
  );
};

export default ExperiencePage;