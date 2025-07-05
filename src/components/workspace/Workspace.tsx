"use client"
import { useEffect, useState } from "react"

import { useEditor, Editor } from "@tiptap/react"
import { Color } from '@tiptap/extension-color'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import Highlight from '@tiptap/extension-highlight'
import Image from '@tiptap/extension-image'
import FloatingMenu from '@tiptap/extension-floating-menu'

import Tiptap from "@/components/workspace/TipTap"
import SidebarEditor from "@/components/workspace/SidebarEditor"
import { AlertBox } from "@/components/workspace/extension/AlertBox"
import { ImageBox } from "./extension/ImageBox"
import { CustomTable, CustomTableCell as CustomCell, CustomTableRow as CustomRow, CustomTableHeader as CustomHeader } from '@/components/workspace/extension/Table'


export type Post = {
    title: string
    slug: string | number
    author: string
    date: string // ISO string atau tanggal biasa
    update_at?: string // Optional
    excerpt: string
    status?: "draft" | "published" | "scheduled"
    featured_image?: string
    template?: string
    discussion?: "open" | "closed"
}


const initial_post: Post = {
    title: '',
    author: '',
    date: '',
    update_at: '',
    excerpt: '',
    slug: ""
}

function Workspace() {
    const [post, setPost] = useState<Post>(initial_post)
    const [content, setContent] = useState<string>('<p>Hello World!</p>')
    const [currentBlock, setCurrentBlock] = useState<import("prosemirror-model").Node | null>(null)
    const [activeTab, setActiveTab] = useState<'post' | 'block'>('post')

    const editor = useEditor({
        extensions: [
            StarterKit,
            TextStyle,
            Image,
            ImageBox,
            AlertBox,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Color.configure({
                types: ['textStyle'],
            }),
            Highlight.configure({ multicolor: true }),
            CustomTable.configure({
                resizable: true,
                HTMLAttributes: {
                    class: 'beauty-table',
                },
            }),
            CustomRow,
            CustomCell,
            CustomHeader,
            FloatingMenu.configure({
                shouldShow: ({ editor, state }) => {
                    const hasSelection = state.selection.from !== state.selection.to
                    const isText = editor.isActive('paragraph') || editor.isActive('textStyle')
                    return hasSelection && isText
                }

            }),
        ],
        content: content,
        onUpdate: ({ editor }) => {
            const block = editor.state.selection.$head.parent
            setCurrentBlock(block)
            setContent(editor.getHTML())
        },
        immediatelyRender: false,
        onFocus: (option) => {
            const handleKeyDown = (e: Event) => {
                const event = e as KeyboardEvent;
                if (event.key === " " || event.key === "Spacebar") {
                    setTimeout(() => {
                        event.preventDefault();
                        option.editor.chain().focus().unsetColor().run();
                        option.editor.chain().focus().unsetHighlight().run();
                    }, 0)
                }
            };
            const block = option.editor.state.selection.$head.parent
            setCurrentBlock(block)
            option.event.target?.addEventListener('keydown', handleKeyDown)
        },
        onBlur: () => {
            if (activeTab === 'block') return;
            setCurrentBlock(null)
        }
    })

    useEffect(() => {
        if (!editor) return

        const handler = () => {
            const state = editor.state
            const { from, to } = state.selection
            let node = null

            state.doc.nodesBetween(from, to, (n) => {
                if (n.type.name === 'imageBox') {
                    node = n
                }
            })

            if (node) {
                setCurrentBlock(node)
            } else {
                setCurrentBlock(null)
            }
        }

        editor.on('selectionUpdate', handler)

        return () => {
            editor.off('selectionUpdate', handler)
        }
    }, [editor])

    // Slug generator function
    function generateSlug(title: string) {
        return title
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, '') // Remove invalid chars
            .replace(/\s+/g, '-')         // Replace spaces with -
            .replace(/-+/g, '-')          // Collapse multiple -
    }

    // Update slug when title changes
    useEffect(() => {
        if (post.title) {
            const slug = generateSlug(post.title)
            setPost(prev => ({ ...prev, slug }))
        }
    }, [post.title])

    return (
        <div className="flex flex-col md:flex-row h-full w-full">
            <div className="flex-1 rounded">
                <Tiptap editor={editor as Editor} handleTitle={(title: string) => setPost({ ...post, title })} />
            </div>
            <SidebarEditor activeBlock={activeTab === "post" ? { type: { name: "details" } } : currentBlock ? currentBlock : { type: { name: 'none' } }} editor={editor as Editor} post={post} activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
    )
}

export default Workspace
