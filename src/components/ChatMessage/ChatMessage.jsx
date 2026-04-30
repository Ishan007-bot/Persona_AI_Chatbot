"use client";

import "./ChatMessage.css";

export default function ChatMessage({ message, persona }) {
  const isUser = message.role === "user";

  return (
    <div className={`chat-message ${message.role}`}>
      <div className="chat-message-avatar">
        {isUser ? "Y" : persona.name.charAt(0)}
      </div>
      <div
        className="chat-message-bubble"
        dangerouslySetInnerHTML={{
          __html: formatMessage(message.content),
        }}
      />
    </div>
  );
}

/**
 * Basic formatting: bold **text** and line breaks
 */
function formatMessage(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br />");
}
