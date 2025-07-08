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

type ActionType = "rewrite" | "translate" | "summarize" | "generate";

function buildPrompt(action: ActionType, text: string): string {
  switch (action) {
    case "rewrite":
      return `Rewrite the following text to improve clarity, tone, and grammar:\n\n"${text}"`;
    case "translate":
      return `Translate the following Indonesian text into clear, natural English:\n\n"${text}"`;
    case "summarize":
      return `Summarize the following text into a few sentences:\n\n"${text}"`;
    case "generate":
      return `Use the following text as a starting point to generate new content ideas or expand the concept creatively:\n\n"${text}"`;
    default:
      return text;
  }
}

export async function sendToGemini(
  apiKey: string, // GoogleGenerativeAI instance, misalnya dari new GoogleGenerativeAI(apiKey)
  type: ActionType,
  messages: Array<{ role: "user" | "model"; parts: { text: string }[] }>
): Promise<string | Error> {
  try {
    const ai = new GoogleGenAI({ apiKey });
    const chat = ai.chats.create({
      model: "gemini-1.5-flash", // atau "gemini-1.5-pro"
      history: messages,
      config: {
        systemInstruction: `You are an AI Content Assistant integrated into a document editor. 

Your purpose is to help the user enhance selected text with tasks such as:
- Rewriting (style, tone, clarity)
- Translating between Bahasa Indonesia and English
- Summarizing or simplifying
- Expanding or generating creative variations
- Generating ideas or content suggestions

🧠 Workflow:
1. The user selects a portion of text (usually in Bahasa Indonesia)
2. The system will translate it into English internally before sending to you
3. You must perform the task in English
4. Your response will be automatically translated back into Bahasa Indonesia for the user

🎯 Rules:
- Only act on the selected text
- Be focused, relevant, and concise
- Maintain or improve clarity, tone, and intent
- Never alter the meaning unless explicitly asked
- Respond in plain text (no markdown unless asked)
- Provide alternative suggestions when applicable

🌐 Supported Modes:
- **Rewrite**: Improve grammar, tone (formal/casual), fluency
- **Translate**: Between Indonesian ↔ English
- **Summarize**: Make it shorter, clearer
- **Expand**: Add context or elaborate ideas
- **Idea Generation**: Titles, outlines, captions, hooks

🎨 Output Style:
The system may ask for a specific tone (e.g. formal, persuasive, educational). Adjust accordingly but preserve the meaning.

Only respond to the selected input, not the entire document unless asked.
If the instruction is unclear, ask for clarification (in English).
`,
      },
    });

    const prompt = buildPrompt(type, messages[messages.length-1].parts[0].text)
    const response: GenerateContentResponse = await chat.sendMessage({
      message: prompt
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
