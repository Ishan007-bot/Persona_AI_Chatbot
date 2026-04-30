"use client";

import "./SuggestionChips.css";

export default function SuggestionChips({ suggestions, onSelect }) {
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <div className="suggestion-chips">
      <span className="suggestions-label">Quick questions to get started</span>
      {suggestions.map((text, index) => (
        <button
          key={index}
          className="suggestion-chip"
          onClick={() => onSelect(text)}
        >
          {text}
        </button>
      ))}
    </div>
  );
}
