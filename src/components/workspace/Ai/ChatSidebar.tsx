import React, { useState } from "react";
import { SendHorizonal, SettingsIcon, StepBackIcon } from "lucide-react";
import AISettingsPanel from "./AISettingsPannel";

const messagesMock = [
  { id: 1, sender: "bot", text: "Halo! Ada yang bisa saya bantu?" },
  { id: 2, sender: "user", text: "Ya, saya butuh bantuan." },
];

export default function ChatSidebar() {
  const [messages, setMessages] = useState(messagesMock);
  const [settingOpen, setSettingOpen] = useState<boolean>(false);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { id: Date.now(), sender: "user", text: input }]);
    setInput("");
    // Optional: Trigger bot reply here
  };

  return (
    <div className=" h-full border-l flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b font-semibold text-zinc-800 dark:text-zinc-100">
        <div>{!settingOpen? '💬 Chat Assistant' : '⚙️ AI Settings'}</div>
        <div>
          <button onClick={() => setSettingOpen(!settingOpen)}>
            {settingOpen ? <StepBackIcon className="w-5 h-5" />: <SettingsIcon className="w-5 h-5" />}
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
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${
                  msg.sender === "user"
                    ? "ml-auto bg-blue-500 text-white"
                    : "mr-auto bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-100"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Tulis pesan..."
              className="flex-1 px-3 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-sm text-zinc-900 dark:text-white outline-none"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg"
            >
              <SendHorizonal size={16} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
