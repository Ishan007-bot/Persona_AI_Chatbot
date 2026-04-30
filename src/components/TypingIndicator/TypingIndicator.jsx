"use client";

import "./TypingIndicator.css";

export default function TypingIndicator({ persona }) {
  return (
    <div className="typing-indicator">
      <div className="typing-indicator-avatar">
        <img
          src={persona.avatar}
          alt={persona.name}
          style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }}
        />
      </div>
      <div className="typing-indicator-bubble">
        <span className="typing-dot" />
        <span className="typing-dot" />
        <span className="typing-dot" />
        <span className="typing-label">{persona.name.split(" ")[0]} is typing</span>
      </div>
    </div>
  );
}
