"use client";

import { Sparkles } from "lucide-react";
import "./Header.css";

export default function Header({ persona }) {
  return (
    <header className="header">
      <div className="header-left">
        <div className="header-logo">
          <div className="header-logo-icon">
            <Sparkles size={16} />
          </div>
          <span className="header-title">Persona AI</span>
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
