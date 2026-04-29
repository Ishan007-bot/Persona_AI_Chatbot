"use client";

// ============================================
// useChat — Chat State Management Hook
// ============================================
// Manages message list, loading state, and API communication.
// Stub — will be fully implemented in Phase 5.

import { useState, useCallback } from "react";
import { sendMessage } from "@/lib/api";
import { MAX_HISTORY_LENGTH } from "@/lib/constants";

export function useChat(personaId) {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Send a user message and get the persona's reply
   * @param {string} content - The user's message text
   */
  const send = useCallback(
    async (content) => {
      if (!content.trim() || isLoading) return;

      const userMessage = { role: "user", content: content.trim() };
      setMessages((prev) => [...prev, userMessage]);
      setError(null);
      setIsLoading(true);

      try {
        // Build conversation history (trimmed to limit)
        const history = [...messages, userMessage].slice(-MAX_HISTORY_LENGTH);
        const reply = await sendMessage(personaId, history);

        const assistantMessage = { role: "assistant", content: reply };
        setMessages((prev) => [...prev, assistantMessage]);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    },
    [personaId, messages, isLoading]
  );

  /**
   * Clear all messages (used on persona switch)
   */
  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    messages,
    isLoading,
    error,
    send,
    clearMessages,
    setError,
  };
}
