// ============================================
// PERSONA CONFIGURATIONS
// ============================================
// System prompts will be filled in Phase 2 after persona research.
// This file defines metadata, colors, suggestions, and avatar info.

import { PERSONAS } from "./constants";

const personaConfigs = {
  // ========================================
  // ANSHUMAN SINGH
  // ========================================
  [PERSONAS.ANSHUMAN]: {
    id: PERSONAS.ANSHUMAN,
    name: "Anshuman Singh",
    role: "Founding Member & Instructor",
    tagline: "Building world-class engineers at Scaler",
    avatar: "/avatars/anshuman.webp",

    // Theme colors
    colors: {
      primary: "#6C63FF",
      secondary: "#8B83FF",
      glow: "rgba(108, 99, 255, 0.35)",
    },

    // Quick-start suggestion chips
    suggestions: [
      "How should I prepare for FAANG interviews?",
      "What's the most important DSA topic to master?",
      "How do you approach teaching complex topics?",
      "What mistakes do freshers make in interviews?",
    ],

    // System prompt — to be completed in Phase 2
    systemPrompt: `[PLACEHOLDER — Phase 2: Research and write Anshuman's system prompt]`,
  },

  // ========================================
  // ABHIMANYU SAXENA
  // ========================================
  [PERSONAS.ABHIMANYU]: {
    id: PERSONAS.ABHIMANYU,
    name: "Abhimanyu Saxena",
    role: "Co-Founder, Scaler & InterviewBit",
    tagline: "Scaling tech education for India and beyond",
    avatar: "/avatars/abhimanyu.webp",

    // Theme colors
    colors: {
      primary: "#00E676",
      secondary: "#69F0AE",
      glow: "rgba(0, 230, 118, 0.35)",
    },

    // Quick-start suggestion chips
    suggestions: [
      "What inspired you to start Scaler?",
      "How do you think about scaling a tech startup?",
      "What skills matter most for career growth?",
      "What's your vision for the future of education?",
    ],

    // System prompt — to be completed in Phase 2
    systemPrompt: `[PLACEHOLDER — Phase 2: Research and write Abhimanyu's system prompt]`,
  },

  // ========================================
  // KSHITIJ MISHRA
  // ========================================
  [PERSONAS.KSHITIJ]: {
    id: PERSONAS.KSHITIJ,
    name: "Kshitij Mishra",
    role: "Instructor & Mentor",
    tagline: "Making engineering concepts click",
    avatar: "/avatars/kshitij.webp",

    // Theme colors
    colors: {
      primary: "#FF6B6B",
      secondary: "#FF8E8E",
      glow: "rgba(255, 107, 107, 0.35)",
    },

    // Quick-start suggestion chips
    suggestions: [
      "How do you make tough concepts easy to understand?",
      "What's your advice for someone starting with DSA?",
      "How should I balance learning and practicing?",
      "What's the best way to debug tricky problems?",
    ],

    // System prompt — to be completed in Phase 2
    systemPrompt: `[PLACEHOLDER — Phase 2: Research and write Kshitij's system prompt]`,
  },
};

/**
 * Get a persona config by ID
 * @param {string} personaId
 * @returns {object} persona configuration
 */
export function getPersona(personaId) {
  return personaConfigs[personaId] || personaConfigs[PERSONAS.ANSHUMAN];
}

/**
 * Get all persona configs as an array
 * @returns {object[]} all persona configurations
 */
export function getAllPersonas() {
  return Object.values(personaConfigs);
}

/**
 * Get only the system prompt for a persona
 * @param {string} personaId
 * @returns {string} system prompt
 */
export function getSystemPrompt(personaId) {
  const persona = getPersona(personaId);
  return persona.systemPrompt;
}

export default personaConfigs;
