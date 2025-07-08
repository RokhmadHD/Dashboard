import { EyeOff, Eye, ChevronDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import { saveSetting, loadSetting, decrypt, encrypt } from "@/lib/db";
import { toast } from "sonner";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";

const models = [
  "Gemini 2.5 Pro",
  "gemini-2.5-flash-lite-preview-06-17",
  "Gemini 2.5 Flash",
  "Gemini 2.0 Flash",
  "Gemini 2.0 Flash-Lite",
  "Gemma 3",
];
export default function AISettingsPanel() {
  const [personality, setPersonality] = useState("Helpful and friendly");
  const [temperature, setTemperature] = useState(0.7);
  const [model, setModel] = useState("gpt-4o");
  const [modelOpen, setModelOpen] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);

  useEffect(() => {
    const load = async () => {
      const encryptedKey = (await loadSetting("apiKey")) as
        | string
        | null
        | undefined;
      const pers = (await loadSetting("personality")) as
        | string
        | null
        | undefined;
      const temp = (await loadSetting("temperature")) as number | undefined;
      const mdl = (await loadSetting("model")) as string | null | undefined;

      if (encryptedKey) setApiKey(decrypt(encryptedKey));
      if (pers) setPersonality(pers);
      if (temp !== undefined) setTemperature(temp);
      if (mdl) setModel(mdl);
    };
    load();
  }, []);

  const handleSave = async () => {
    try {
      await saveSetting("apiKey", encrypt(apiKey));
      await saveSetting("personality", personality);
      await saveSetting("temperature", temperature);
      await saveSetting("model", model);
      toast.success("Settings saved to IndexedDB!");
    } catch (error) {
      toast.error(`Error: ${error}`);
    }
  };

  return (
    <div className="w-full h-full border-l flex flex-col">
      {/* Content */}
      <div className="flex-1 p-4 space-y-4 text-sm text-zinc-800 dark:text-zinc-200">
        {/* API Key */}
        <div>
          <label className="block mb-1 font-medium">OpenAI API Key</label>
          <div className="relative">
            <input
              type={showKey ? "text" : "password"}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-..."
              className="w-full p-2 pr-10 rounded-md bg-zinc-100/20 dark:bg-zinc-800/20 outline-none"
            />
            <button
              onClick={() => setShowKey(!showKey)}
              type="button"
              className="absolute top-2 right-2 text-zinc-500 hover:text-zinc-700 dark:hover:text-white"
            >
              {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>
        {/* Personality */}
        <div>
          <label className="block mb-1 font-medium">AI Personality</label>
          <textarea
            value={personality}
            onChange={(e) => setPersonality(e.target.value)}
            className="w-full p-2 rounded-md bg-zinc-100/20 dark:bg-zinc-800/20 text-sm outline-none"
            rows={3}
          />
        </div>

        {/* Temperature */}
        <div>
          <label className="block mb-1 font-medium">
            Creativity (Temperature)
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
            className="w-full"
          />
          <div className="text-xs mt-1">Value: {temperature}</div>
        </div>

        {/* Model */}
        <div className="relative">
          <label className="block mb-1 font-medium">Model</label>
          <button
            onClick={() => setModelOpen(!modelOpen)}
            className="w-full flex justify-between items-center bg-zinc-100 dark:bg-zinc-800 px-3 py-2 rounded-md text-sm text-zinc-800 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700"
          >
            {models.find((mdl) => mdl.toLocaleLowerCase().replaceAll(" ", "-") === model)}
            <ChevronDown
              className={`ml-2 w-4 h-4 transition-transform ${
                modelOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          <Dropdown isOpen={modelOpen} onClose={() => setModelOpen(false)} className="absolute left-0">
            {models.map((model) => (
              <DropdownItem
                key={model.toLocaleLowerCase()}
                onItemClick={() =>
                {
                  setModel(model.toLocaleLowerCase().replaceAll(" ", "-"))
                  setModelOpen(false)
                }
                }
              >
                {model}
              </DropdownItem>
            ))}
          </Dropdown>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t">
        <button
          onClick={handleSave}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}
