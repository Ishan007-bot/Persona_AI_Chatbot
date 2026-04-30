"use client";

// ============================================
// MAIN PAGE — Persona AI Chat
// ============================================

import { useCallback } from "react";
import Header from "@/components/Header/Header";
import AnimatedBackground from "@/components/AnimatedBackground/AnimatedBackground";
import PersonaSwitcher from "@/components/PersonaSwitcher/PersonaSwitcher";
import ChatWindow from "@/components/ChatWindow/ChatWindow";
import { useChat } from "@/hooks/useChat";
import { usePersona } from "@/hooks/usePersona";
import "./page.css";

export default function Home() {
  const { activePersonaId, persona, isTransitioning, switchPersona } =
    usePersona();
  const { messages, isLoading, error, send, clearMessages, setError } =
    useChat(activePersonaId);

  const handleSwitchPersona = useCallback(
    (personaId) => {
      switchPersona(personaId, clearMessages);
    },
    [switchPersona, clearMessages]
  );

  const handleDismissError = useCallback(() => {
    setError(null);
  }, [setError]);

  return (
    <div className="app-container" data-persona={activePersonaId}>
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Header */}
      <Header persona={persona} />

      {/* Main Content */}
      <main className="app-main">
        {/* Sidebar: Persona Switcher */}
        <aside className="app-sidebar">
          <PersonaSwitcher
            activePersonaId={activePersonaId}
            onSwitch={handleSwitchPersona}
          />
          <div className="sidebar-info">
            <p className="sidebar-persona-name">{persona.name}</p>
            <p className="sidebar-persona-role">{persona.role}</p>
          </div>
        </aside>

        {/* Chat Area */}
        <section className="app-chat">
          <ChatWindow
            persona={persona}
            messages={messages}
            isLoading={isLoading}
            error={error}
            onSend={send}
            onDismissError={handleDismissError}
            isTransitioning={isTransitioning}
          />
        </section>
      </main>
    </div>
  );
}
