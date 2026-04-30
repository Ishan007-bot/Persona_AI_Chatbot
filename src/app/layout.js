import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-primary",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata = {
  title: "Persona AI — Chat with Scaler Personalities",
  description:
    "Have real conversations with Anshuman Singh, Abhimanyu Saxena, and Kshitij Mishra — powered by AI with deeply researched persona prompts.",
  keywords: ["Scaler", "AI Chatbot", "Persona", "Anshuman Singh", "Abhimanyu Saxena", "Kshitij Mishra"],
  openGraph: {
    title: "Persona AI — Chat with Scaler Personalities",
    description: "AI-powered conversations with Scaler's top personalities.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetBrainsMono.variable}`}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
