"use client";

import "./TypingIndicator.css";

export default function TypingIndicator({ persona }) {
  return (
    <div className="typing-indicator">
      <div className="typing-indicator-avatar">
        {persona.name.charAt(0)}
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
