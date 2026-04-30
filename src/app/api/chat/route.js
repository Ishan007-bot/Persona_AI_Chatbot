// ============================================
// POST /api/chat — Persona Chat Endpoint
// ============================================
// Receives a persona ID + message history, calls Gemini API
// with the persona's system prompt, and returns the reply.

import { GoogleGenerativeAI } from "@google/generative-ai";
import { getPersona, getSystemPrompt } from "@/lib/personas";
import { PERSONAS } from "@/lib/constants";

// Valid persona IDs for validation
const VALID_PERSONAS = new Set(Object.values(PERSONAS));

export async function POST(request) {
  try {
    // --- 1. Parse & validate request body ---
    let body;
    try {
      body = await request.json();
    } catch {
      return Response.json(
        { error: "Invalid request body. Expected JSON." },
        { status: 400 }
      );
    }

    const { persona, messages } = body;

    if (!persona || !VALID_PERSONAS.has(persona)) {
      return Response.json(
        {
          error: `Invalid persona. Must be one of: ${[...VALID_PERSONAS].join(", ")}`,
        },
        { status: 400 }
      );
    }

    // --- 2. Select API Key dynamically ---
    let apiKey = process.env.GEMINI_API_KEY; // Fallback
    
    if (persona === "anshuman" && process.env.GEMINI_API_KEY_ANSHUMAN) {
      apiKey = process.env.GEMINI_API_KEY_ANSHUMAN;
    } else if (persona === "abhimanyu" && process.env.GEMINI_API_KEY_ABHIMANYU) {
      apiKey = process.env.GEMINI_API_KEY_ABHIMANYU;
    } else if (persona === "kshitij" && process.env.GEMINI_API_KEY_KSHITIJ) {
      apiKey = process.env.GEMINI_API_KEY_KSHITIJ;
    }

    if (!apiKey) {
      return Response.json(
        {
          error: "The AI service is not configured. Please add your Gemini API keys to .env.local",
        },
        { status: 503 }
      );
    }

    // Initialize the Gemini client with the specific key
    const genAI = new GoogleGenerativeAI(apiKey);

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return Response.json(
        { error: "Messages array is required and must not be empty." },
        { status: 400 }
      );
    }

    // Validate message format
    for (const msg of messages) {
      if (!msg.role || !msg.content) {
        return Response.json(
          { error: "Each message must have a 'role' and 'content' field." },
          { status: 400 }
        );
      }
      if (!["user", "assistant"].includes(msg.role)) {
        return Response.json(
          { error: "Message role must be 'user' or 'assistant'." },
          { status: 400 }
        );
      }
    }

    // --- 3. Build the Gemini request ---
    const systemPrompt = getSystemPrompt(persona);
    const personaConfig = getPersona(persona);

    // Initialize the model with the system instruction
    const model = genAI.getGenerativeModel({
      model: "gemini-flash-latest",
      systemInstruction: systemPrompt,
      generationConfig: {
        temperature: 0.8,
        topP: 0.9,
        topK: 40,
        maxOutputTokens: 5000,
      },
    });

    // Convert our message format to Gemini's format
    // Gemini uses "user" and "model" roles
    const history = messages.slice(0, -1).map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    // The last message is the current user input
    const lastMessage = messages[messages.length - 1];

    // Start chat with history
    const chat = model.startChat({ history });

    // --- 4. Send message and get response ---
    const result = await chat.sendMessage(lastMessage.content);
    const reply = result.response.text();

    if (!reply || reply.trim().length === 0) {
      return Response.json(
        { error: `${personaConfig.name} is thinking... please try again.` },
        { status: 502 }
      );
    }

    // --- 5. Return successful response ---
    return Response.json({
      reply: reply.trim(),
      persona: persona,
    });
  } catch (error) {
    console.error("Chat API error:", error);

    // Handle specific Gemini API errors
    const errorMessage = error.message || "";

    if (
      errorMessage.includes("API_KEY_INVALID") ||
      errorMessage.includes("API key not valid")
    ) {
      return Response.json(
        {
          error:
            "Invalid API key. Please check your Gemini API key in .env.local",
        },
        { status: 401 }
      );
    }

    if (
      errorMessage.includes("RATE_LIMIT") ||
      errorMessage.includes("429") ||
      errorMessage.includes("quota")
    ) {
      return Response.json(
        {
          error:
            "Too many requests. Please wait a moment and try again.",
        },
        { status: 429 }
      );
    }

    if (
      errorMessage.includes("SAFETY") ||
      errorMessage.includes("blocked")
    ) {
      return Response.json(
        {
          error:
            "The response was blocked by safety filters. Please rephrase your question.",
        },
        { status: 400 }
      );
    }

    // Generic fallback
    return Response.json(
      {
        error:
          "Something went wrong while generating a response. Please try again.",
      },
      { status: 500 }
    );
  }
}
