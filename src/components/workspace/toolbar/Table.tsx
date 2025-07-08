import { Toggle } from '@/components/ui/toggle'
import { Editor } from '@tiptap/react'
import { Table } from 'lucide-react'
// import React, { useState } from 'react'

function TableToolbar({ editor }: { editor: Editor }) {
    // const [open, setOpen] = useState(false);
    if (!editor) return null
    return (
        <Toggle
            size="sm"
            pressed={editor.isActive("table")}
            onPressedChange={() => !editor.isActive("table") && editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true,  }).run()}
            aria-label="Toggle table"
        >
            <Table className="h-4 w-4" />
        </Toggle>
    )
}

export default TableToolbar
