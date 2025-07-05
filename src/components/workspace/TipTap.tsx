// src/Tiptap.tsx
import { EditorContent, FloatingMenu, BubbleMenu, Editor } from '@tiptap/react'

import { Toolbar } from './Toolbar'
import ImageFloatingMenu from './floatingmenu/ImageFloatingMenu'

interface TipTapProps {
    editor: Editor
    handleTitle: (title: string) => void
}
const Tiptap = ({ editor, handleTitle }: TipTapProps) => {

    return (
        <div className='text-gray-600 dark:text-white space-y-4'>
            <Toolbar editor={editor as Editor} />
            <div className="h-full min-h-[calc(70vh)] max-h-[calc(70vh)] overflow-auto px-4 hide-scrollbar mb-3 beautiful-scrollbar">
                <input
                    type="text"
                    placeholder="Enter post title"
                    className="w-full px-4 py-2 focus:outline-none"
                    style={{ fontSize: '1.5rem', fontWeight: 600 }}
                    onChange={(e) => handleTitle(e.target.value)}
                />
                <EditorContent
                    editor={editor}

                />
            </div>
            <FloatingMenu editor={editor}>
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`text-sm px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${editor?.isActive('bold') ? 'bg-gray-200 dark:bg-gray-600' : ''
                        }`}
                >
                    Bold
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`text-sm px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${editor?.isActive('italic') ? 'bg-gray-200 dark:bg-gray-600' : ''
                        }`}
                >
                    Italic
                </button>
            </FloatingMenu>
            <ImageFloatingMenu editor={editor} />
            <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu>
        </div>
    )
}

export default Tiptap
