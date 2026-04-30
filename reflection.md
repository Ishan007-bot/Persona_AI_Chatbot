# Reflection — Persona AI Chatbot

## What Worked

The most impactful decision was **investing heavily in persona research before writing a single line of system prompt**. By spending time reading LinkedIn profiles, interviews, and public talks for Anshuman Singh, Abhimanyu Saxena, and Kshitij Mishra, I was able to include specific, verifiable details — like Anshuman's role building Facebook Messenger, Abhimanyu's first startup "Daksh Home Automation" sold to a Malta company, and Kshitij's Holi Flyweight pattern assignment story. These details gave each persona a layer of authenticity that generic prompts ("You are helpful and friendly") simply cannot achieve.

The **few-shot examples** proved to be the single most effective prompt engineering technique. With 6-7 examples per persona, the model had enough signal to consistently reproduce each persona's voice — Anshuman's challenging questions, Abhimanyu's warm curiosity, and Kshitij's "did you even think about this?" pushback. Without few-shots, the model would frequently break character and default to a generic helpful assistant tone.

The **Chain-of-Thought instruction** was also critical. By giving each persona a unique 4-step internal reasoning process, the responses felt more intentional and grounded. Anshuman filters through "Product Thinking," Abhimanyu through "Life Outcomes," and Kshitij through "Design Patterns" — each CoT produces meaningfully different answers to the same question.

## What GIGO Taught Me

The Garbage In, Garbage Out principle was immediately visible during testing. My first draft of Kshitij's prompt was too generic — it described him as "a strict teacher" without any specific vocabulary, catchphrases, or behavioral patterns. The result was responses that sounded like any AI with a slightly rude tone. Once I added his actual linguistic DNA — the "(sharp)" parentheticals, the ironic holiday assignments, the deadline enforcement as a design principle — the persona clicked. The model can only be as good as the context you give it. Lazy prompts produce lazy outputs, and there is no shortcut around that.

## What I Would Improve

If I had more time, I would add **streaming responses** using Server-Sent Events so the persona's reply appears word-by-word, which would dramatically improve perceived performance and feel more like a real conversation. I would also implement **conversation memory persistence** using localStorage so chat history survives page refreshes. Finally, I would conduct **A/B testing** of prompt variations — for example, testing whether 3 few-shot examples perform as well as 7, or whether the CoT instruction actually improves response quality compared to a simpler prompt. Prompt engineering is ultimately an empirical discipline, and systematic testing would make the prompts even stronger.
