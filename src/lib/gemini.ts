import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { openDB } from "idb";

type Role = "user" | "model";
type Message = { role: Role; parts: { text: string }[] };
type Sessions = {
  id: string;
  title: string;
  createdAt: Date;
  messages: Message[];
};

const DB_NAME = "chat-db";
const STORE_NAME = "sessions";
const SYSTEM_INTRUCTIONS = `You are an AI assistant integrated into a bilingual writing and productivity environment.

You have two primary roles based on the current mode selected by the user:

---

✍️ 1. Content Assistant Mode (AI Editor)

Purpose: Help the user with editing, improving, translating, summarizing, or generating ideas based on selected content from their document.

Workflow:
- The user selects a portion of text (usually in Bahasa Indonesia)
- The system will translate it into English before sending it to you
- You process the request in English (rewrite, translate, summarize, or generate)
- The output will be translated back to Bahasa Indonesia before being shown to the user

Rules:
- Only act on the selected text
- Be focused, clear, and accurate
- Follow the task type exactly (e.g. summarize, rewrite, generate idea)
- Never change meaning unless asked
- Use plain text output (no markdown unless requested)

Supported task types:
- 'rewrite': Improve tone, clarity, grammar, or style
- 'translate': Translate between Bahasa Indonesia ↔ English
- 'summarize': Condense into clearer or shorter version
- 'generate': Suggest ideas, expand content, or reframe it creatively

---

🧠 2. Agent Mode (Conversational)

Purpose: Act as a general-purpose assistant for natural language conversation.

Capabilities:
- Answer questions clearly and helpfully
- Speak casually or formally depending on user tone
- Help with productivity, research, or explanation
- Answer in English unless asked to respond in Bahasa Indonesia

Rules:
- Be conversational and natural
- Provide helpful, factual, and relevant answers
- Be brief unless detail is explicitly requested
- You may ask follow-up questions if the user input is vague

---

Your response must adapt based on the mode selected by the system.
Never switch modes on your own — always wait for the user or system to determine it.
`;

const getDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    },
  });
};

export async function saveSession(session: Sessions) {
  const db = await getDB();
  return db.put(STORE_NAME, session);
}

export async function getSessions() {
  const db = await getDB();
  return db.getAll(STORE_NAME);
}

export async function deleteSession(id: string) {
  const db = await getDB();
  return db.delete(STORE_NAME, id);
}

/**
 * Kirim pesan ke Gemini API dan dapatkan balasan
 * @param apiKey API Key Gemini dari Google AI Studio
 * @param messages Array isi percakapan (role + parts)
 */

type ActionType = "rewrite" | "translate" | "summarize" | "generate" | "agent";

function buildPrompt(action: ActionType, text: string): string {
  switch (action) {
    case "rewrite":
      return `✍️ Rewrite the following text to improve clarity, tone, and grammar:\n\n"${text}"`;
    case "translate":
      return `✍️ Translate the following Indonesian text into clear, natural English:\n\n"${text}"`;
    case "summarize":
      return `✍️ Summarize the following text into a few sentences:\n\n"${text}"`;
    case "generate":
      return `✍️ Use the following text as a starting point to generate new content ideas or expand the concept creatively:\n\n"${text}"`;
    case "agent":
    default:
      return `🧠 ${text}`;
  }
}

export async function sendToGemini(
  apiKey: string,
  model: string, // GoogleGenerativeAI instance, misalnya dari new GoogleGenerativeAI(apiKey)
  type: ActionType,
  messages: Array<{ role: "user" | "model"; parts: { text: string }[] }>
): Promise<string | Error> {
  try {
    const ai = new GoogleGenAI({ apiKey });
    const groundingTool = {
      googleSearch: {},
    };
    const chat = ai.chats.create({
      model: model, // atau "gemini-1.5-pro"
      history: messages,
      config: {
        systemInstruction: SYSTEM_INTRUCTIONS,
        tools: [groundingTool],
      },
    });

    const prompt = buildPrompt(
      type,
      messages[messages.length - 1].parts[0].text
    );
    const response: GenerateContentResponse = await chat.sendMessage({
      message: prompt,
    });
    const text = response.text;
    return text || new Error("No response text from Gemini");
  } catch (error) {
    if (error instanceof Error) {
      return error;
    }
    return new Error("Unknown error");
  }
}
