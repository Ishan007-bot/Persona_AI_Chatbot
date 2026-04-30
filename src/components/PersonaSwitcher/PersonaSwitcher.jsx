"use client";

import { getAllPersonas } from "@/lib/personas";
import "./PersonaSwitcher.css";

export default function PersonaSwitcher({ activePersonaId, onSwitch }) {
  const personas = getAllPersonas();

  return (
    <div className="persona-switcher">
      {personas.map((p) => {
        const isActive = activePersonaId === p.id;
        return (
          <button
            key={p.id}
            className={`persona-tab ${isActive ? "active" : ""}`}
            onClick={() => onSwitch(p.id)}
            style={
              isActive
                ? {
                    background: p.colors.primary,
                    borderColor: p.colors.primary,
                  }
                : {}
            }
            aria-label={`Switch to ${p.name}`}
            aria-pressed={isActive}
          >
            <div
              className="persona-tab-avatar"
              style={{ background: isActive ? "rgba(0,0,0,0.25)" : p.colors.primary + "33" }}
            >
              <img
                src={p.avatar}
                alt={p.name}
                style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }}
              />
            </div>
            <div className="persona-tab-info">
              <span className="persona-tab-name">{p.name}</span>
              <span className="persona-tab-role">{p.role}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
