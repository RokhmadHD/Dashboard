import {  Editor, FloatingMenu } from '@tiptap/react'
import React from 'react'

function TableFloatingMenu({ editor }: { editor: Editor }) {
    if (!editor) return null
    const inTable = editor.isActive('table')
    const inTableCell = editor.isActive('customTableCell') || editor.isActive('customTableHeader')
    return (
        <FloatingMenu
            editor={editor}
            shouldShow={({ editor }) => editor.isActive('table')}
            >
            {inTable && !inTableCell && (
                <div>
                    <div className="flex gap-2 bg-white border shadow-sm rounded px-3 py-2 dark:bg-gray-800">
                        <button
                            onClick={() => editor.commands.addRowAfter()}
                            className="text-sm px-2 py-1 bg-gray-100 rounded hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                        >
                            ➕ Row
                        </button>
                        <button
                            onClick={() => editor.commands.deleteRow()}
                            className="text-sm px-2 py-1 bg-gray-100 rounded hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                        >
                            🗑️ Row
                        </button>
                        <button
                            onClick={() => editor.commands.mergeCells()}
                            className="text-sm px-2 py-1 bg-gray-100 rounded hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                        >
                            🔀 Merge
                        </button>
                    </div>
                    <div className="flex gap-2 bg-white border shadow-sm rounded px-3 py-2 dark:bg-gray-800">
                        <button
                            onClick={() => editor.commands.addColumnAfter()}
                            className="text-sm px-2 py-1 bg-gray-100 rounded hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                        >
                            ➕ Column
                        </button>
                        <button
                            onClick={() => editor.commands.deleteColumn()}
                            className="text-sm px-2 py-1 bg-gray-100 rounded hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                        >
                            🗑️ Column
                        </button>
                        <button
                            onClick={() => editor.commands.mergeCells()}
                            className="text-sm px-2 py-1 bg-gray-100 rounded hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                        >
                            🔀 Merge
                        </button>
                    </div>
                    <div className="flex gap-2 bg-white border shadow-sm rounded px-3 py-2 dark:bg-gray-800">
                        <button
                            onClick={() => editor.commands.deleteTable()}
                            className="text-sm px-2 py-1 bg-gray-100 rounded hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                        >
                            🗑️ Table
                        </button>
                    </div>
                </div>
            )}
        </FloatingMenu>
    )
}

export default TableFloatingMenu
