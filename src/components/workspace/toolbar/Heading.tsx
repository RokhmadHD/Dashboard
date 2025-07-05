import { Toggle } from '@/components/ui/toggle'
import { Editor } from '@tiptap/react'
import { Heading2, Heading3 } from 'lucide-react'
import React from 'react'

function HeadingToolbar({ editor }: { editor: Editor }) {
    if (!editor) return null
    return (
        <div>

            <Toggle
                size="sm"
                pressed={editor.isActive("heading", { level: 2 })}
                onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                aria-label="Toggle heading 2"
            >
                <Heading2 className="h-4 w-4" />
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor.isActive("heading", { level: 3 })}
                onPressedChange={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                aria-label="Toggle heading 3"
            >
                <Heading3 className="h-4 w-4" />
            </Toggle>
        </div>
    )
}

export default HeadingToolbar
