import { Editor } from '@tiptap/react'
import { Redo, Undo } from 'lucide-react'
import React from 'react'

function UndoRendo({ editor }: { editor: Editor }) {
    if (!editor) return null

    return (
        <div>
            <button
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().chain().focus().undo().run()}
                className="p-2 rounded-md hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
                aria-label="Undo"
            >
                <Undo className="h-4 w-4" />
            </button>
            <button
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().chain().focus().redo().run()}
                className="p-2 rounded-md hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
                aria-label="Redo"
            >
                <Redo className="h-4 w-4" />
            </button>
        </div>
    )
}

export default UndoRendo
