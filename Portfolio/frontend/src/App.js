import React, { useState } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";
import ExperienceSection from "./components/ExperienceSection";
import ContactSection from "./components/ContactSection";
import ChatPopup from "./components/ChatPopup";
import ChatWidget from "./components/ChatWidget";
import FeedSection from "./components/FeedSection";
function App() {
  const [showChat, setShowChat] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [pendingMessage, setPendingMessage] = useState("");

  const [chatMessages, setChatMessages] = useState([]);

  const handleOpenChatAndMaybeSend = (msg = "") => {
    if (!showChat) {
      // open chat first
      setShowChat(true);
      // send message only after chat opens
      if (msg.trim()) {
        setTimeout(() => setPendingMessage(msg), 300);
      }
    } else if (msg.trim()) {
      // if already open, just send it
      setPendingMessage(msg);
    }
  };




  const handleCloseChat = () => {
    if (isClosing) return; // 🛑 Prevent multiple clicks while closing
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setShowChat(false);
    }, 400); // match animation duration in ChatPopup
  };


  const handleInitialMessageConsumed = () => {
    setPendingMessage("");
  };

  return (
    <>
      <Navbar />
      {/* 🟠 ChatWidget (small floating icon) — hide when popup is open */}
      <ChatWidget
        onClick={() => setShowChat(true)}
        className={`chat-widget ${showChat ? "hidden" : ""}`}
      />



      <section id="hero">
        <HeroSection
          onZoomToggle={handleOpenChatAndMaybeSend}
          isChatOpen={showChat}
        />
      </section>

      <section id="about">
        <AboutSection />
      </section>

      <section id="skills">
        <SkillsSection />
      </section>

      <section id="projects">
        <ProjectsSection />
      </section>

      <section id="experience">
        <ExperienceSection />
      </section>


      <section id="feed">
        <FeedSection />
      </section>

      <section id="contact">
        <ContactSection />
      </section>

      {/* 🟢 ChatPopup (fullscreen) */}
      {showChat && (
        <ChatPopup
          onClose={handleCloseChat}
          isClosing={isClosing}
          initialMessage={pendingMessage}
          onInitialMessageConsumed={handleInitialMessageConsumed}

          messages={chatMessages}        // 🔥 persistent messages
          setMessages={setChatMessages}  // 🔥 parent controls chat
        />
      )}

    </>
  );
}

export default App;
