"use client";

import { AlertCircle } from "lucide-react";
import "./ErrorMessage.css";

export default function ErrorMessage({ error, onDismiss }) {
  if (!error) return null;

  return (
    <div className="error-message">
      <AlertCircle className="error-message-icon" size={18} />
      <span className="error-message-text">{error}</span>
      {onDismiss && (
        <button className="error-message-retry" onClick={onDismiss}>
          Dismiss
        </button>
      )}
    </div>
  );
}
