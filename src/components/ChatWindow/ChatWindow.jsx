"use client";

import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import ChatMessage from "@/components/ChatMessage/ChatMessage";
import TypingIndicator from "@/components/TypingIndicator/TypingIndicator";
import SuggestionChips from "@/components/SuggestionChips/SuggestionChips";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import { MAX_MESSAGE_LENGTH } from "@/lib/constants";
import "./ChatWindow.css";

export default function ChatWindow({
  persona,
  messages,
  isLoading,
  error,
  onSend,
  onDismissError,
  isTransitioning,
}) {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Focus input on mount and persona change
  useEffect(() => {
    inputRef.current?.focus();
  }, [persona.id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSend(input);
    setInput("");
  };

  const handleChipSelect = (text) => {
    onSend(text);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="chat-window" style={{ position: "relative" }}>
      {/* Transition overlay */}
      <div
        className={`chat-transition-overlay ${isTransitioning ? "active" : ""}`}
      />

      {/* Messages or Empty State */}
      <div className="chat-messages">
        {isEmpty ? (
          <div className="chat-empty-state">
            <div className="chat-empty-avatar">{persona.name.charAt(0)}</div>
            <h2 className="chat-empty-title">Chat with {persona.name}</h2>
            <p className="chat-empty-subtitle">
              {persona.tagline}. Ask anything about tech, career growth, or
              engineering excellence.
            </p>
            <SuggestionChips
              suggestions={persona.suggestions}
              onSelect={handleChipSelect}
            />
          </div>
        ) : (
          <>
            {messages.map((msg, i) => (
              <ChatMessage key={i} message={msg} persona={persona} />
            ))}
            {isLoading && <TypingIndicator persona={persona} />}
            <ErrorMessage error={error} onDismiss={onDismissError} />
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Bar */}
      <div className="chat-input-area">
        <form className="chat-input-form" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            className="chat-input"
            placeholder={`Ask ${persona.name.split(" ")[0]} something...`}
            value={input}
            onChange={(e) => setInput(e.target.value.slice(0, MAX_MESSAGE_LENGTH))}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            autoComplete="off"
          />
          <button
            type="submit"
            className="chat-send-btn"
            disabled={!input.trim() || isLoading}
            aria-label="Send message"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
