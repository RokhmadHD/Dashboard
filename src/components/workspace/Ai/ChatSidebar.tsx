import React, { useEffect, useRef, useState } from "react";
import { SendHorizonal, SettingsIcon, StepBackIcon } from "lucide-react";
import AISettingsPanel from "./AISettingsPannel";
import { decrypt, loadSetting } from "@/lib/db";
import { getSessions, saveSession, sendToGemini } from "@/lib/gemini";
import AutoResizeTextarea from "@/components/form/input/AutoResizeTextarea";
import { useAI } from "@/context/AIContext";

import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import Markdown from "react-markdown";
import { useTiptapEditor } from "@/hooks/use-tiptap-editor";
import { convertMarkdownToHtml } from "@/lib/utils";

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
  const [model, setModel] = useState("");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { selectedText, setSelectedText } = useAI();
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  const editor = useTiptapEditor();
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

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
      const model = (await loadSetting("model")) as string | null | undefined;

      if (encryptedKey) setApiKey(decrypt(encryptedKey));
      if (model) setModel(model);
    };
    load();
  }, []);

  const handleGeminiChat = async (
    type: "rewrite" | "translate" | "summarize" | "generate" | "agent"
  ) => {
    if (selectedText) setSelectedText("");
    const text_input = type == "agent" ? input : selectedText;
    const userMessage = {
      role: "user" as const,
      parts: [{ text: text_input || "" }],
    };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);
    const reply = await sendToGemini(apiKey, model, type, updatedMessages);
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
        <button onClick={() => setSettingOpen(!settingOpen)}>
          {settingOpen ? (
            <StepBackIcon className="w-5 h-5" />
          ) : (
            <SettingsIcon className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Setting Panel */}
      {settingOpen ? (
        <AISettingsPanel />
      ) : (
        <>
          {/* Chat Bubble Area */}
          <div className="flex-1 overflow-y-auto content-wrapper max-h-[60vh] p-4 space-y-2 pb-20">
            {messages.map((msg, id) => (
              <div
                key={id}
                className={`relative group max-w-[80%] px-3 py-2 rounded-2xl text-sm ${
                  msg.role === "user"
                    ? "ml-auto bg-brand-500 text-white"
                    : "mr-auto bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-100"
                }`}
              >
                {msg.parts.map((message, idx) => (
                  <div key={idx}>
                    <div className="absolute hidden group-hover:block bottom-4 left-3">
                      <button
                        onClick={() => {
                          if (editor) {
                            editor
                              .chain()
                              .focus()
                              .insertContent(
                                convertMarkdownToHtml(message.text)
                              )
                              .run();
                          }
                        }}
                        className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded"
                      >
                        Insert to Editor
                      </button>
                    </div>
                    <Markdown
                      remarkPlugins={[remarkGfm, remarkParse, remarkRehype]}
                    >
                      {message.text}
                    </Markdown>
                  </div>
                ))}
              </div>
            ))}
            {loading && <div>🤖 Gemini is typing...</div>}
            <div ref={messageEndRef} />
          </div>

          {/* Selected Text & Inline Action */}
          {selectedText && (
            <div className="p-2 border-t bg-zinc-50 dark:bg-zinc-900 fixed z-50 bottom-0">
              <div className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">
                Teks terpilih:
              </div>
              <div className="text-sm mb-3 italic">
                {renderSelect(selectedText)}
                <AutoResizeTextarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    !e.shiftKey &&
                    handleGeminiChat("agent")
                  }
                  placeholder="Tulis pesan..."
                />
              </div>

              <div className="flex flex-wrap gap-2 text-xs">
                <button
                  onClick={() => handleGeminiChat("rewrite")}
                  className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded"
                >
                  ✍️ Rewrite
                </button>
                <button
                  onClick={() => handleGeminiChat("translate")}
                  className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded"
                >
                  🌐 Translate
                </button>
                <button
                  onClick={() => handleGeminiChat("summarize")}
                  className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded"
                >
                  📌 Summarize
                </button>
                <button
                  onClick={() => handleGeminiChat("generate")}
                  className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded"
                >
                  💡 Generate Idea
                </button>
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-3 flex gap-2 fixed bottom-0 w-full">
            <AutoResizeTextarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && !e.shiftKey && handleGeminiChat("agent")
              }
              placeholder="Tulis pesan..."
            />
            <div className="flex flex-col justify-end">
              <button
                onClick={() => handleGeminiChat("agent")}
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
