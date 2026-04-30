"use client";

import { BrainCircuit } from "lucide-react";
import "./Header.css";

export default function Header({ persona }) {
  return (
    <header className="header">
      <div className="header-left">
        <div className="header-logo">
          <div className="header-logo-icon">
            <BrainCircuit size={18} strokeWidth={2.5} />
          </div>
          <div className="header-title-container">
            <span className="header-title">PERSONA</span>
            <span className="header-title-highlight">AI</span>
          </div>
        </div>
      </div>

      <div className="header-right">
        <div className="active-persona-badge">
          <span className="active-persona-dot" />
          <span className="active-persona-name">{persona.name}</span>
          <span>Active</span>
        </div>
      </div>
    </header>
  );
}
