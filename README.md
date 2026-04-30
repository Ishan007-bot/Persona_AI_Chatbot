# Persona AI — Chat with Scaler Personalities

A persona-based AI chatbot that lets you have real conversations with three Scaler/InterviewBit personalities — **Anshuman Singh**, **Abhimanyu Saxena**, and **Kshitij Mishra** — each powered by deeply researched system prompts and the Google Gemini API.

🔗 **Live Demo:** [Coming Soon — Vercel Deployment]

---

## ✨ Features

- **3 Distinct Personas** — Each with unique communication styles, vocabulary, and expertise areas
- **Rich System Prompts** — 6-7 few-shot examples per persona, Chain-of-Thought reasoning, output formatting, and constraints
- **Real-time Chat** — Powered by Google Gemini Flash Latest API
- **Persona Switching** — Switch between personas with smooth transitions; conversation resets automatically
- **Suggestion Chips** — Quick-start questions tailored to each persona
- **Typing Indicator** — Animated dots with glow effects while the AI responds
- **Graceful Error Handling** — User-friendly messages for rate limits, invalid keys, and network errors
- **Dark Theme** — Premium "Command Center" aesthetic with glassmorphism and animated gradient background
- **Fully Responsive** — Works on desktop, tablet, and mobile

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14+ (App Router) |
| Language | JavaScript (JSX) |
| Styling | Vanilla CSS (custom properties, keyframe animations) |
| LLM API | Google Gemini Flash Latest |
| Icons | Lucide React |
| Fonts | Space Grotesk + JetBrains Mono (Google Fonts) |
| Deployment | Vercel |

---

## 📁 Project Structure

```
persona-chatbot/
├── public/
│   └── avatars/              # Persona avatar images
├── src/
│   ├── app/
│   │   ├── api/chat/
│   │   │   └── route.js      # POST /api/chat — Gemini API endpoint
│   │   ├── globals.css       # Design system (tokens, animations, theme)
│   │   ├── layout.js         # Root layout with fonts and metadata
│   │   ├── page.js           # Main page assembling all components
│   │   └── page.css          # Page layout styles
│   ├── components/
│   │   ├── AnimatedBackground/
│   │   ├── ChatMessage/
│   │   ├── ChatWindow/
│   │   ├── ErrorMessage/
│   │   ├── Header/
│   │   ├── PersonaSwitcher/
│   │   ├── SuggestionChips/
│   │   └── TypingIndicator/
│   ├── hooks/
│   │   ├── useChat.js        # Chat state management
│   │   └── usePersona.js     # Persona switching logic
│   └── lib/
│       ├── api.js            # Client-side fetch wrapper
│       ├── constants.js      # App-wide constants
│       └── personas.js       # Persona configs + system prompts
├── prompts.md                # Annotated system prompts documentation
├── reflection.md             # 300-500 word reflection
├── .env.example              # API key template
├── .gitignore
├── README.md
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- A Google Gemini API key ([Get one here](https://aistudio.google.com/app/apikey))

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ishan007-bot/Persona_AI_Chatbot.git
   cd Persona_AI_Chatbot/persona-chatbot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` and add your Gemini API key:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open** [http://localhost:3000](http://localhost:3000) in your browser

---

## 🎭 The Three Personas

| Persona | Style | Expertise |
|---|---|---|
| **Anshuman Singh** | Intense, authoritative, no-nonsense | DSA, System Design, Product Thinking |
| **Abhimanyu Saxena** | Warm, strategic, philosophical | Career Growth, EdTech Vision, Life Outcomes |
| **Kshitij Mishra** | Dry humor, disciplinarian, methodical | LLD, Design Patterns, DSA, SOLID Principles |

Each system prompt includes:
- Detailed persona description with verified background
- 6-7 few-shot examples
- 4-step Chain-of-Thought reasoning instruction
- Output format specification
- 6-9 behavioral constraints

See [`prompts.md`](./prompts.md) for the full annotated system prompts.

---

## 📝 Documentation

- **[prompts.md](./prompts.md)** — All three system prompts with inline annotations explaining design decisions
- **[reflection.md](./reflection.md)** — 300-500 word reflection on the project

---

## 🔒 Security

- API key is stored in `.env.local` (gitignored)
- `.env.example` provides the template without exposing real keys
- No API keys are committed anywhere in the git history

---

## 📄 License

This project was built as part of the Scaler Academy Prompt Engineering assignment.
