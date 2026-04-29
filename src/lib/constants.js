// ============================================
// APP CONSTANTS
// ============================================

export const APP_NAME = "Persona AI";
export const APP_TAGLINE = "Chat with Scaler Personalities";

// Persona identifiers
export const PERSONAS = {
  ANSHUMAN: "anshuman",
  ABHIMANYU: "abhimanyu",
  KSHITIJ: "kshitij",
};

// Default persona on load
export const DEFAULT_PERSONA = PERSONAS.ANSHUMAN;

// API
export const API_ENDPOINT = "/api/chat";

// Chat limits
export const MAX_MESSAGE_LENGTH = 2000;
export const MAX_HISTORY_LENGTH = 20; // Keep last N messages for context

// UI
export const TYPING_INDICATOR_DELAY = 300; // ms before showing typing indicator
export const MESSAGE_ANIMATION_DURATION = 400; // ms for message entrance animation
export const PERSONA_SWITCH_DURATION = 600; // ms for persona transition
