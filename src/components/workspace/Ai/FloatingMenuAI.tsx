// components/FloatingMenuAI.tsx
import { FloatingMenu } from '@tiptap/react'
import { useEffect, useState } from 'react'
import { useTiptapEditor } from '@/hooks/use-tiptap-editor'
import { useAI } from '@/context/AIContext'


export default function FloatingMenuAI() {
    const editor = useTiptapEditor()
    const ai = useAI()

  const [selectedText, setSelectedText] = useState('')
    useEffect(() => {
        const updateSelection = () => {
            const selection = window.getSelection()
            const text = selection?.toString().trim() || ''
            setSelectedText(text)
        }
        
        document.addEventListener('selectionchange', updateSelection)
        return () => document.removeEventListener('selectionchange', updateSelection)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    if(!editor) return null;
    
    const handleClick = () => {
        const text = editor.state.doc.textBetween(
            editor.state.selection.from,
            editor.state.selection.to,
            ' '
    )
    if (text) ai.setSelectedText(text)
  }


  return (
    <FloatingMenu
      editor={editor}
      tippyOptions={{
        duration: 150,
        placement: 'top',
      }}
      shouldShow={({ editor }) => {
        const text = editor.state.doc.textBetween(
          editor.state.selection.from,
          editor.state.selection.to,
          ' '
        )
        return !!text.trim()
      }}
    >
      <div className="flex gap-2 bg-white dark:bg-zinc-900 border p-1 rounded shadow-md z-50">
        <button
          className="text-sm px-2 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
          onClick={() => {
            if (selectedText) handleClick()
          }}
        >
          Kirim ke AI
        </button>
      </div>
    </FloatingMenu>
  )
}
