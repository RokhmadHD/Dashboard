import { Toggle } from '@/components/ui/toggle'
import { Editor } from '@tiptap/react'
import { List, ListOrdered } from 'lucide-react'
import React from 'react'

function ListToolbar({ editor }: { editor: Editor }) {
    if (!editor) return null
    return (
        <div>
            <Toggle
                size="sm"
                pressed={editor.isActive("bulletList")}
                onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
                aria-label="Toggle bullet list"
            >
                <List className="h-4 w-4" />
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor.isActive("orderedList")}
                onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
                aria-label="Toggle ordered list"
            >
                <ListOrdered className="h-4 w-4" />
            </Toggle>
        </div>
    )
}

export default ListToolbar
