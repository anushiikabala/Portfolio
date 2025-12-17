import { useState, useEffect } from "react";
import { X, Send } from "lucide-react";
import me from "../assets/me.jpg";
import refreshIcon from "../assets/refresh.png";


export default function ChatPopup({
  onClose,
  isClosing,
  initialMessage,
  onInitialMessageConsumed,
  messages,
  setMessages,
}) {
  // const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState([
    "What skills have you developed?",
    "Tell me about your AI projects.",
    "What's your technical stack?",
  ]);

  // ✅ Triggered only once when HeroSection sends a message
  useEffect(() => {
    if (initialMessage && initialMessage.trim()) {
      handleNewMessage(initialMessage);
      if (onInitialMessageConsumed) onInitialMessageConsumed();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialMessage]);

  // ✅ Handles both user input and backend call
  const handleNewMessage = async (text) => {
    const timestamp = Date.now();
    const newUserMessage = { id: `${timestamp}-${Math.random()}`, type: "user", text };
    setMessages((prev) => [...prev, newUserMessage]);
    setIsTyping(true);

    try {
      // 🔹 Call Flask backend (update port if different)
      const response = await fetch("https://sea-lion-app-o5zfi.ondigitalocean.app/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: text }),
      });

      // const response = await fetch("http://localhost:5000/chat", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ query: text }),
      // });

      const data = await response.json();

      const botMessage = {
        id: `${Date.now()}-${Math.random()}`,
        type: "bot",
        text: data.response || "Sorry, I couldn't find an answer.",
      };

      setMessages((prev) => [...prev, botMessage]);

      // 🔹 Update follow-up suggestions (loop)
      if (data.suggestions && data.suggestions.length > 0) {
        setSuggestions(data.suggestions);
      } else {
        setSuggestions([
          "Can you tell me more?",
          "What inspired this project?",
          "How did you overcome challenges?",
        ]);
      }
    } catch (error) {
      console.error("Error connecting to backend:", error);
      const botMessage = {
        id: `${Date.now()}-${Math.random()}`,
        type: "bot",
        text: "There was a problem connecting to the AI backend.",
      };
      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = (text) => handleNewMessage(text);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      handleNewMessage(inputValue);
      setInputValue("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSendMessage();
  };

  return (
    <div className={`chat-popup ${isClosing ? "closing" : "open"}`}>
      <div className="chat-header">
        <h3>Anushika's AI Companion</h3>
        <button className="refresh-btn" onClick={() => setMessages([])}>
  <img src={refreshIcon} alt="refresh" className="refresh-icon" />
</button>


        <button className="close-btn" onClick={onClose}>
          <X size={18} />
        </button>
      </div>

      {messages.length === 0 ? (
        <div className="chat-body">
          <img
            src={me}
            alt="Anushika"
            className="chat-avatar"
          />
          <h2>Anushika's AI Companion</h2>
          <p className="chat-subtitle">
            Meet my AI Companion — she knows about my journey and projects.
          </p>
          <p className="chat-prompt">Try asking:</p>
          <div className="suggestions">
            {suggestions.map((suggestion, index) => (
              <button key={index} onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="chat-messages">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message ${message.type === "user" ? "user-message" : "bot-message"
                }`}
            >
              {message.type === "bot" && (
                <img
                  src={me}
                  alt="Bot"
                  className="message-avatar"
                />
              )}
              <div className="message-bubble">{message.text}</div>
              {message.type === "user" && <div className="user-avatar">You</div>}
            </div>
          ))}

          {isTyping && (
            <div className="message bot-message">
              <img
                src={me}
                alt="Bot"
                className="message-avatar"
              />
              <div className="message-bubble typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}

          {/* 🔁 Dynamic Suggestions after last bot reply */}
          {!isTyping && suggestions.length > 0 && (
            <div className="followup-suggestions">
              {suggestions.map((q, i) => (
                <button key={i} onClick={() => handleSuggestionClick(q)}>
                  {q}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="chat-input-wrapper">
        <input
          type="text"
          placeholder="Ask any question about me!"
          className="chat-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className="send-btn" onClick={handleSendMessage}>
          <Send size={20} color="#fff" />
        </button>
      </div>

      <style>{`
        .refresh-btn {
          position: absolute;
          right: 3.5rem;        /* sits left of X */
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .refresh-icon {
          width: 30px;
          height: 30px; /* makes icon white */
          opacity: 0.85;
          transition: 0.2s ease;
        }

        .refresh-btn:hover .refresh-icon {
          opacity: 1;
          transform: scale(1.1);
        }


        .chat-popup {
          position: fixed;
          top: 60px;
          left: 0;
          width: 100%;
          height: calc(100vh - 60px);
          background: linear-gradient(180deg, #0d1b2a, #1b263b);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          color: #e0fbfc;
          z-index: 9998;
          opacity: 0;
          transform: translateY(40px);
          animation: fadeIn 0.6s ease forwards;
        }

        .chat-popup.closing {
          animation: fadeOut 0.5s ease forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeOut {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(40px); }
        }

        .chat-header {
          width: 100%;
          background: rgba(255,255,255,0.05);
          padding: 0.5rem 1.5rem;
          display: flex;
          justify-content: center;
          align-items: center;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          position: relative;
        }

        .chat-header h3 {
          font-size: 1.4rem;
          color: #2a9d8f;
          font-weight: 600;
          text-align: center;
          margin: 0;
        }

        .close-btn {
          position: absolute;
          right: 1.5rem;
          background: transparent;
          border: none;
          color: #e0fbfc;
          cursor: pointer;
          transition: 0.2s;
        }

        .close-btn:hover {
          color: #2a9d8f;
          transform: scale(1.1);
        }

        .chat-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 2rem 1rem;
        }

        .chat-avatar {
          width: 110px;
          height: 110px;
          border-radius: 50%;
          border: 2px solid #2a9d8f;
          object-fit: cover;
          margin-bottom: 1rem;
        }

        .chat-body h2 {
          color: #2a9d8f;
          font-size: 1.5rem;
          margin-bottom: 0.3rem;
        }

        .chat-subtitle {
          font-size: 0.95rem;
          color: #a9bcd0;
          margin-bottom: 1.2rem;
        }

        .chat-prompt {
          font-size: 0.9rem;
          color: #a9bcd0;
          margin-bottom: 1rem;
        }

        .suggestions {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
          width: 70%;
          max-width: 800px;
        }

        .suggestions button {
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          color: #e0fbfc;
          border-radius: 25px;
          padding: 0.8rem 1.2rem;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 100%;
        }

        .suggestions button:hover {
          background: #2a9d8f;
          color: #fff;
        }

        .chat-input-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding: 1rem 0;
          background: rgba(255,255,255,0.05);
          border-top: 1px solid rgba(255,255,255,0.1);
        }

        .chat-input {
          width: 60%;
          max-width: 800px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 30px;
          padding: 0.8rem 1.2rem;
          color: #e0fbfc;
          font-size: 0.95rem;
          outline: none;
          transition: 0.3s;
        }

        .chat-input:focus {
          border-color: #2a9d8f;
          background: rgba(255,255,255,0.15);
        }

        .send-btn {
          background: #2a9d8f;
          border: none;
          margin-left: 10px;
          border-radius: 50%;
          width: 45px;
          height: 45px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: 0.3s;
        }

        .send-btn:hover {
          background: #38b2ac;
          transform: scale(1.1);
        }

        .chat-messages {
          flex: 1;
          width: 90%;
          max-width: 850px;
          overflow-y: auto;
          padding: 2rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin: 10px auto;
        }

        .message {
          display: flex;
          align-items: flex-start;
          gap: 0.8rem;
          max-width: 95%;
        }

        .user-message {
          align-self: flex-end;
          flex-direction: row;
        }

        .bot-message {
          align-self: flex-start;
        }

        .message-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #2a9d8f;
          flex-shrink: 0;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #f4a261;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 0.75rem;
          font-weight: 600;
          flex-shrink: 0;
        }

        .message-bubble {
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 18px;
          padding: 0.5rem 0.9rem;
          color: #e0fbfc;
          line-height: 1.5;
          font-size: 0.95rem;
        }

        .user-message .message-bubble {
          background: #f4a261;
          border-color: #f4a261;
          color: #fff;
        }

        .typing-indicator {
          display: flex;
          gap: 0.4rem;
          padding: 1rem 1.2rem;
        }

        .typing-indicator span {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #2a9d8f;
          animation: typing 1.4s infinite;
        }

        .typing-indicator span:nth-child(2) {
          animation-delay: 0.2s;
        }

        .typing-indicator span:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes typing {
          0%, 60%, 100% {
            transform: translateY(0);
            opacity: 0.7;
          }
          30% {
            transform: translateY(-10px);
            opacity: 1;
          }
        }

        .followup-suggestions {
          margin-top: 1rem;
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          justify-content: flex-start;
          animation: fadeIn 0.5s ease-in;
        }

        .followup-suggestions button {
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          color: #e0fbfc;
          border-radius: 25px;
          padding: 0.6rem 1rem;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .followup-suggestions button:hover {
          background: #2a9d8f;
          color: #fff;
        }

        .chat-messages::-webkit-scrollbar {
          width: 6px;
        }

        .chat-messages::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.05);
        }

        .chat-messages::-webkit-scrollbar-thumb {
          background: rgba(42, 157, 143, 0.5);
          border-radius: 3px;
        }

        .chat-messages::-webkit-scrollbar-thumb:hover {
          background: rgba(42, 157, 143, 0.7);
        }
          
          /* =====================================================
   🌍 GLOBAL FIX — popup MUST appear below navbar
   ===================================================== */
.chat-popup {
  top: 60px; /* Default navbar height */
  height: calc(100vh - 60px);
}


/* =====================================================
   📱 VERY SMALL SCREENS (iPhone SE, <400px)
   ===================================================== */
@media (max-width: 400px) {

  .chat-popup {
    top: 45px; /* small navbar height */
    height: calc(100vh - 45px);
    padding-top: 45px;
  }

  .chat-header {
    padding: 0.45rem 0.8rem;
    height: 45px;
  }

  .chat-header h3 {
    font-size: 0.8rem;
    max-width: 65%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .close-btn {
    right: 0.4rem;
    top: 50%;
    transform: translateY(-50%);
  }

  .chat-avatar {
    width: 70px;
    height: 70px;
  }

  .chat-body h2 {
    font-size: 1.1rem;
  }

  .chat-subtitle {
    font-size: 0.75rem;
    margin-bottom: 1rem;
  }

  .suggestions {
    width: 90%;
    gap: 0.5rem;
  }

  .suggestions button {
    padding: 0.6rem 1rem;
    font-size: 0.78rem;
  }

  .chat-messages {
    max-height: calc(100vh - 290px);
    padding: 1rem;
  }

  .chat-input-wrapper {
    padding: 0.5rem;
  }

  .chat-input {
    width: 65%;
    padding: 0.6rem 0.8rem;
    font-size: 0.85rem;
  }

  .send-btn {
    width: 38px;
    height: 38px;
  }
}


/* =====================================================
   📱 MID PHONES (401px–700px)
   ===================================================== */
/* =======================================================
   📱 VERY SMALL SCREENS (iPhone SE) — REAL FIX
   ======================================================= */
@media (max-width: 400px) {

  /* 🔥 Start popup BELOW navbar (actual height ~70px) */
  .chat-popup {
    top: 70px;
    height: calc(100vh - 80px);
    padding-top: 10px; /* inner padding for header, not navbar */
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  /* shrink header */
  .chat-header {
    height: 45px;
    padding: 0.4rem 0.6rem;
  }

  .chat-header h3 {
    font-size: 0.82rem;
    max-width: 65%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .close-btn {
    right: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
  }

  /* shrink content */
  .chat-body {
    flex: 0 0 auto;
    padding: 0.8rem 0.5rem;
  }

  .chat-avatar {
    width: 65px;
    height: 65px;
  }

  .chat-body h2 {
    font-size: 1rem;
  }

  .suggestions {
    width: 92%;
    gap: 0.45rem;
  }

  .suggestions button {
    padding: 0.55rem 0.8rem;
    font-size: 0.8rem;
  }

  /* scrollable messages */
  .chat-messages {
    flex: 1;
    max-height: calc(100vh - 350px);
    overflow-y: auto;
    padding: 0.6rem 0.5rem;
  }

  /* input ALWAYS visible */
  .chat-input-wrapper {
    flex-shrink: 0;
    padding: 0.6rem 0.5rem;
    background: rgba(0,0,0,0.15);
  }

  .chat-input {
    width: 68%;
    font-size: 0.85rem;
    padding: 0.6rem 0.8rem;
  }

  .send-btn {
    width: 38px;
    height: 38px;
  }
}



/* =====================================================
   📱 TABLETS (iPad Mini / Air — 701px–1024px)
   ===================================================== */
@media (min-width: 701px) and (max-width: 1024px) {

  .chat-popup {
    top: 60px;
    height: calc(100vh - 60px);
    padding-top: 60px;
  }

  .chat-body {
    margin-top: 1rem;
  }

  .chat-avatar {
    width: 90px;
    height: 90px;
  }

  .chat-messages {
    width: 80%;
    max-width: 650px;
    padding: 2rem;
    max-height: calc(100vh - 330px);
  }

  .message-bubble {
    font-size: 1rem;
    padding: 0.8rem 1.3rem;
  }

  .followup-suggestions {
    width: 80%;
    gap: 0.7rem;
  }

  .followup-suggestions button {
    font-size: 0.9rem;
    padding: 0.7rem 1.1rem;
  }

  .chat-input-wrapper {
    padding: 1rem;
  }

  .chat-input {
    width: 65%;
    padding: 0.8rem 1.2rem;
    font-size: 1rem;
  }

  .send-btn {
    width: 48px;
    height: 48px;
  }
}


      `}</style>
    </div>
  );
}