import { Editor, FloatingMenu } from '@tiptap/react'
import React from 'react'

function TableFloatingMenu({ editor }: { editor: Editor }) {
    if (!editor) return null

    const inTable = editor.isActive('table')
    const inTableCell = editor.isActive('customTableCell')
    const inTableHeader = editor.isActive('customTableHeader')

    console.log(inTable, inTableCell, inTableHeader)

    return (
        <FloatingMenu
            editor={editor}
            shouldShow={({ editor }) => editor.isActive('table')}
        >
            <div className="space-y-2 p-2 w-max rounded-md shadow-md border bg-white dark:bg-gray-800 dark:border-gray-700 text-sm">
                {inTable && <div>
                    <div className="grid grid-cols-1">
                        <button
                            onClick={() => editor.commands.deleteTable()}
                            className="px-2 py-1 w-max rounded bg-red-100 hover:bg-red-200 text-red-800 dark:bg-red-900 dark:hover:bg-red-700 dark:text-red-100"
                        >
                            🗑️ Delete Table
                        </button>
                    </div>
                </div>}
            </div>
        </FloatingMenu>
    )
}

export default TableFloatingMenu
