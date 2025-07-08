// context/AIContext.tsx
import { createContext, useContext, useState } from "react"

type AIContextType = {
  selectedText: string | null
  aiResult: string | null
  setSelectedText: (text: string) => void
  setAIResult: (text: string) => void
  clearAI: () => void
}

const AIContext = createContext<AIContextType | undefined>(undefined)

export const AIProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedText, setSelectedText] = useState<string | null>(null)
  const [aiResult, setAIResult] = useState<string | null>(null)

  const clearAI = () => {
    setSelectedText(null)
    setAIResult(null)
  }

  return (
    <AIContext.Provider
      value={{
        selectedText,
        aiResult,
        setSelectedText,
        setAIResult,
        clearAI,
      }}
    >
      {children}
    </AIContext.Provider>
  )
}

export const useAI = () => {
  const context = useContext(AIContext)
  if (!context) throw new Error("useAI must be used within an AIProvider")
  return context
}
