// ============================================
// CLIENT-SIDE API HELPER
// ============================================

import { API_ENDPOINT } from "./constants";

/**
 * Send a chat message to the API and get the persona's response
 * @param {string} persona - The persona ID ("anshuman" | "abhimanyu" | "kshitij")
 * @param {Array<{role: string, content: string}>} messages - Conversation history
 * @returns {Promise<string>} The persona's reply
 * @throws {Error} If the API call fails
 */
export async function sendMessage(persona, messages) {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ persona, messages }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error || `Something went wrong (status ${response.status}). Please try again.`
      );
    }

    const data = await response.json();
    return data.reply;
  } catch (error) {
    // Re-throw API errors as-is
    if (error.message && !error.message.includes("Failed to fetch")) {
      throw error;
    }
    // Network errors
    throw new Error(
      "Unable to connect. Please check your internet connection and try again."
    );
  }
}
