import React from "react";
import { MessageSquare } from "lucide-react";

export default function ChatWidget({ onClick, className = "" }) {
  return (
    <div className={`chat-icon ${className}`} onClick={onClick}>
      <MessageSquare size={28} color="#2a9d8f" strokeWidth={2} />

      <style>{`
        .chat-icon {
          position: fixed;
          bottom: 25px;
          right: 25px;
          background: var(--surface);
          border: 1px solid var(--glass-border);
          border-radius: 50%;
          width: 55px;
          height: 55px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow);
          cursor: pointer;
          z-index: 9999;
          animation: bounce 2s infinite;
          transition: all 0.3s ease;
        }

        .chat-icon:hover {
          transform: scale(1.1);
          box-shadow: 0 8px 20px rgba(42,157,143,0.4);
        }

        .chat-icon.hidden {
          opacity: 0;
          transform: translateY(20px);
          pointer-events: none;
          z-index: -1;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-8px); }
          60% { transform: translateY(-4px); }
        }
      `}</style>
    </div>
  );
}
