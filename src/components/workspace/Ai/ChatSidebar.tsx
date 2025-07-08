import React, { useEffect, useState } from "react";
import { SendHorizonal, SettingsIcon, StepBackIcon } from "lucide-react";
import AISettingsPanel from "./AISettingsPannel";
import { decrypt, loadSetting } from "@/lib/db";
import { getSessions, saveSession, sendToGemini } from "@/lib/gemini";
import AutoResizeTextarea from "@/components/form/input/AutoResizeTextarea";
import { useAI } from "@/context/AIContext";

const messagesMock = [
  { role: "model" as const, parts: [{ text: "What can I help with?" }] },
];
const SESSION_ID = "default-session";

type Role = "user" | "model";
type Message = { role: Role; parts: { text: string }[] };

export default function ChatSidebar() {
  const [messages, setMessages] = useState<Message[]>(messagesMock);
  const [settingOpen, setSettingOpen] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState("");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { selectedText } = useAI();

  useEffect(() => {
    // Load chat history
    getSessions().then((sessions) => {
      const session = sessions.find((s) => s.id === SESSION_ID);
      if (session) {
        setMessages(session.messages);
      }
    });
  }, []);

  useEffect(() => {
    const load = async () => {
      const encryptedKey = (await loadSetting("apiKey")) as
        | string
        | null
        | undefined;
      if (encryptedKey) setApiKey(decrypt(encryptedKey));
    };
    load();
  }, []);

  const handleGeminiChat = async (
    type: "rewrite" | "translate" | "summarize" | "generate"
  ) => {
    const userMessage = { role: "user" as const, parts: [{ text: input }] };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);
    const reply = await sendToGemini(apiKey, type, updatedMessages);
    setLoading(false);

    if (reply instanceof Error) {
      alert("Error: " + reply.message);
      return;
    }

    const botMessage = { role: "model" as const, parts: [{ text: reply }] };
    const finalMessages = [...updatedMessages, botMessage];
    setMessages(finalMessages);

    // Save to DB
    await saveSession({
      id: SESSION_ID,
      title: "Chat with Gemini",
      createdAt: new Date(),
      messages: finalMessages,
    });
  };

  const renderSelect = (text: string) => {
    const isLong = text.length > 100;
    if (isLong) {
      return `${text.substring(0, 100)}...`;
    }
    return text;
  };
  return (
    <div className="h-full min-h-[70vh] flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b font-semibold text-zinc-800 dark:text-zinc-100">
        <div>{!settingOpen ? "💬 Chat Assistant" : "⚙️ AI Settings"}</div>
        <div>
          <button onClick={() => setSettingOpen(!settingOpen)}>
            {settingOpen ? (
              <StepBackIcon className="w-5 h-5" />
            ) : (
              <SettingsIcon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Message List */}
      {settingOpen ? (
        <>
          <AISettingsPanel />
        </>
      ) : (
        <>
          <div className="flex-1 content-wrapper max-h-[50vh] p-4 space-y-2">
            {messages.map((msg, id) => (
              <div
                key={id}
                className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${
                  msg.role === "user"
                    ? "ml-auto bg-blue-500 text-white"
                    : "mr-auto bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-100"
                }`}
              >
                {msg.parts.map((message, id) => (
                  <div key={id}>{message.text}</div>
                ))}
              </div>
            ))}
            {loading && <div>🤖 Gemini is typing...</div>}
          </div>

          {/* Input */}
          <div className="p-2">
            <div
              className={`sticky overflow-hidden px-3 py-2 rounded-xl text-sm border border-dashed border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-100`}
            >
              <span>{renderSelect(selectedText || "")}</span>
            <div className="flex gap-2 p-1 bg-white dark:bg-zinc-800 border rounded shadow-sm text-xs mx-auto fixed z-50">
              <button
                onClick={() => handleGeminiChat("rewrite")}
                className="px-2 py-1 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded"
              >
                ✍️ Rewrite
              </button>
              <button
                onClick={() => handleGeminiChat("translate")}
                className="px-2 py-1 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded"
              >
                🌐 Translate
              </button>
              <button
                onClick={() => handleGeminiChat("summarize")}
                className="px-2 py-1 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded"
              >
                📌 Summarize
              </button>
              <button
                onClick={() => handleGeminiChat("generate")}
                className="px-2 py-1 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded"
              >
                💡 Generate Idea
              </button>
            </div>
            </div>
          </div>
          <div className="p-3 border-t flex gap-2">
            <AutoResizeTextarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && handleGeminiChat("generate")
              }
              placeholder="Tulis pesan..."
              // className="flex-1 px-3 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-sm text-zinc-900 dark:text-white outline-none"
            />
            <div className=" flex flex-col justify-end">
              <button
                onClick={() => handleGeminiChat("generate")}
                className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg"
              >
                <SendHorizonal size={16} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
