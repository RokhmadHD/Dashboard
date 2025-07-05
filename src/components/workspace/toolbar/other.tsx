import { Toggle } from  '@/components/ui/toggle'
import { Editor } from '@tiptap/react'
import { Quote, Code } from 'lucide-react'
import React from 'react'

function OtherToolbar({ editor }: { editor: Editor }) {
    if (!editor) return null
    return (
        <>
            <Toggle
                size="sm"
                pressed={editor.isActive("blockquote")}
                onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
                aria-label="Toggle blockquote"
            >
                <Quote className="h-4 w-4" />
            </Toggle>
            <div className="h-6 w-px bg-border mx-2" />
            <Toggle
                size="sm"
                pressed={editor.isActive("codeBlock")}
                onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}
                aria-label="Toggle code block"
            >
                <Code className="h-4 w-4" />
            </Toggle>
        </>
    )
}

export default OtherToolbar
