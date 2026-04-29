"use client";

// ============================================
// usePersona — Persona State Management Hook
// ============================================
// Manages active persona selection and triggers reset on switch.

import { useState, useCallback } from "react";
import { DEFAULT_PERSONA } from "@/lib/constants";
import { getPersona } from "@/lib/personas";

export function usePersona() {
  const [activePersonaId, setActivePersonaId] = useState(DEFAULT_PERSONA);
  const [isTransitioning, setIsTransitioning] = useState(false);

  /**
   * Switch to a different persona with transition animation
   * @param {string} personaId - Target persona ID
   * @param {Function} onSwitch - Callback to run during switch (e.g., clear chat)
   */
  const switchPersona = useCallback(
    (personaId, onSwitch) => {
      if (personaId === activePersonaId || isTransitioning) return;

      setIsTransitioning(true);

      // Small delay for exit animation
      setTimeout(() => {
        setActivePersonaId(personaId);
        if (onSwitch) onSwitch();

        // End transition after enter animation
        setTimeout(() => {
          setIsTransitioning(false);
        }, 300);
      }, 300);
    },
    [activePersonaId, isTransitioning]
  );

  const persona = getPersona(activePersonaId);

  return {
    activePersonaId,
    persona,
    isTransitioning,
    switchPersona,
  };
}
