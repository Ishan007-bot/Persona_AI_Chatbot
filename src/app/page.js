"use client";

// ============================================
// MAIN PAGE — Persona AI Chat
// ============================================
// This is the shell that will assemble all components.
// Full wiring happens in Phase 4–5.

import { useState } from "react";
import { DEFAULT_PERSONA } from "@/lib/constants";
import { getPersona, getAllPersonas } from "@/lib/personas";

export default function Home() {
  const [activePersona, setActivePersona] = useState(DEFAULT_PERSONA);
  const persona = getPersona(activePersona);
  const allPersonas = getAllPersonas();

  return (
    <div
      className="app-container"
      data-persona={activePersona}
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background will go here (Phase 4) */}

      {/* Temporary Phase 1 verification UI */}
      <div
        className="glass"
        style={{
          padding: "var(--sp-3xl)",
          textAlign: "center",
          maxWidth: "600px",
          animation: "scaleIn 0.6s ease-out",
          zIndex: "var(--z-surface)",
        }}
      >
        <h1
          className="text-gradient"
          style={{
            fontSize: "var(--fs-3xl)",
            fontWeight: "var(--fw-bold)",
            marginBottom: "var(--sp-md)",
          }}
        >
          Persona AI
        </h1>
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "var(--fs-md)",
            marginBottom: "var(--sp-2xl)",
          }}
        >
          Chat with Scaler Personalities
        </p>

        {/* Persona switcher preview */}
        <div
          style={{
            display: "flex",
            gap: "var(--sp-md)",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {allPersonas.map((p) => (
            <button
              key={p.id}
              onClick={() => setActivePersona(p.id)}
              style={{
                padding: "var(--sp-md) var(--sp-xl)",
                borderRadius: "var(--radius-md)",
                border: `1px solid ${
                  activePersona === p.id
                    ? p.colors.primary
                    : "var(--glass-border)"
                }`,
                background:
                  activePersona === p.id
                    ? `${p.colors.primary}22`
                    : "var(--glass-bg)",
                color:
                  activePersona === p.id
                    ? p.colors.primary
                    : "var(--text-secondary)",
                fontWeight: "var(--fw-medium)",
                fontSize: "var(--fs-sm)",
                transition: "all var(--transition-base)",
                cursor: "pointer",
              }}
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* Active persona info */}
        <div
          style={{
            marginTop: "var(--sp-2xl)",
            padding: "var(--sp-lg)",
            borderRadius: "var(--radius-md)",
            border: `1px solid ${persona.colors.primary}33`,
            background: `${persona.colors.primary}0a`,
            transition: "all var(--transition-slow)",
          }}
        >
          <p
            style={{
              color: persona.colors.primary,
              fontWeight: "var(--fw-semibold)",
              fontSize: "var(--fs-md)",
              marginBottom: "var(--sp-xs)",
            }}
          >
            {persona.name}
          </p>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "var(--fs-sm)",
            }}
          >
            {persona.role} — "{persona.tagline}"
          </p>
        </div>

        <p
          className="text-mono"
          style={{
            marginTop: "var(--sp-2xl)",
            color: "var(--text-muted)",
            fontSize: "var(--fs-xs)",
          }}
        >
          ✓ Phase 1 Complete — Design System Loaded
        </p>
      </div>
    </div>
  );
}
