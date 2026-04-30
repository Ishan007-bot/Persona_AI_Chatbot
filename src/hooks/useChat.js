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
  // Store messages for ALL personas in a dictionary
  const [messagesByPersona, setMessagesByPersona] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // The active messages for the currently selected persona
  const messages = messagesByPersona[personaId] || [];

  /**
   * Send a user message and get the persona's reply
   * @param {string} content - The user's message text
   */
  const send = useCallback(
    async (content) => {
      if (!content.trim() || isLoading) return;

      const userMessage = { role: "user", content: content.trim() };
      
      // Optimistically update UI
      setMessagesByPersona((prev) => ({
        ...prev,
        [personaId]: [...(prev[personaId] || []), userMessage]
      }));
      
      setError(null);
      setIsLoading(true);

      try {
        // Build conversation history using the currently active persona's messages
        const history = [...messages, userMessage].slice(-MAX_HISTORY_LENGTH);
        const reply = await sendMessage(personaId, history);

        const assistantMessage = { role: "assistant", content: reply };
        
        setMessagesByPersona((prev) => ({
          ...prev,
          [personaId]: [...(prev[personaId] || []), assistantMessage]
        }));
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    },
    [personaId, messages, isLoading]
  );

  /**
   * Clear all messages (used on persona switch - actually we don't want to clear them anymore!)
   * We will leave this function here but it will just reset the error state
   */
  const clearMessages = useCallback(() => {
    // Instead of deleting messages, we just clear the error/loading state
    // when switching personas so they start fresh
    setError(null);
    setIsLoading(false);
  }, []);

  /**
   * Actually delete the conversation history for the currently active persona
   */
  const clearActiveChat = useCallback(() => {
    setMessagesByPersona((prev) => ({
      ...prev,
      [personaId]: []
    }));
    setError(null);
  }, [personaId]);

  return {
    messages,
    isLoading,
    error,
    send,
    clearMessages,
    clearActiveChat,
    setError,
  };
}
