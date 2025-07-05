import { Editor } from "@tiptap/react"
import { CircleDot } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
// import { PencilLine } from 'lucide-react'
// import { SubString } from "@/lib/utils"
import { ReactNode } from "react"

function DetailItem({
    label,
    value,
    icon,
}: {
    label: string
    value: string | number
    icon?: ReactNode
}) {
    return (
        <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">{label}</span>
            <span className="text-blue-600 flex items-center gap-1">
                {icon}
                {value}
            </span>
        </div>
    )
}


function renderView(block: typeCurrentBlock, editor: Editor | null, post: Post) {
    if (!block || !editor) return null

    const type = block?.type?.name
    if (!type) return <div className="text-xs text-gray-500">No block selected</div>
    switch (type) {
        case "details":
            return (
                <div className="space-y-4">
                    {/* Featured Image */}
                    <button className="w-full border rounded px-3 py-2 text-sm hover:bg-gray-900/50 transition">
                        Set featured image
                    </button>

                    {/* Last edited */}
                    <p className="text-xs text-gray-500">Last edited 33 minutes ago.</p>

                    {/* Post Meta */}
                    <div className="space-y-1 text-sm">
                        <DetailItem label="Status" value="Draft" icon={<CircleDot className="w-3 h-3 text-blue-500" />} />
                        <DetailItem label="Publish" value="Immediately" />
                        <DetailItem label="Slug" value={`/${post.slug}`} />
                        <DetailItem label="Author" value={post.author} />
                        <DetailItem label="Template" value="Single Posts" />
                        <DetailItem label="Discussion" value="Open" />
                    </div>

                    {/* Trash Button */}
                    <button className="w-full border border-red-500 text-red-500 text-sm py-1.5 rounded hover:bg-red-500/20 transition">
                        Move to trash
                    </button>

                    {/* Disclosure Panels */}
                    <DisclosurePanel title="Writing Assistance ⚡" />
                    <DisclosurePanel title="Access ⚡" />
                    <DisclosurePanel title="Excerpt" />
                    <DisclosurePanel title="Categories" />
                    <DisclosurePanel title="Tags" open />
                </div>
            )

        case "paragraph":
            return (
                <div className="space-y-4">
                    {/* Heading */}
                    <h4 className="text-xs font-semibold">Paragraph Settings</h4>

                    {/* Text Alignment */}
                    <div>
                        <label className="text-xs font-medium block mb-1">Alignment</label>
                        <div className="flex gap-2">
                            {["left", "center", "right"].map((align) => (
                                <button
                                    key={align}
                                    onClick={() => editor.chain().focus().setTextAlign(align).run()}
                                    className="border px-2 py-1 rounded text-xs hover:bg-gray-100 capitalize"
                                >
                                    {align}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Typography */}
                    <div>
                        <label className="text-xs font-medium block mb-1">Typography</label>
                        <div className="flex gap-2">
                            <button
                                onClick={() => editor.chain().focus().toggleBold().run()}
                                className="border px-2 py-1 rounded text-xs hover:bg-gray-100"
                            >
                                Bold
                            </button>
                            <button
                                onClick={() => editor.chain().focus().toggleItalic().run()}
                                className="border px-2 py-1 rounded text-xs hover:bg-gray-100"
                            >
                                Italic
                            </button>
                        </div>
                    </div>

                    {/* List Options */}
                    <div>
                        <label className="text-xs font-medium block mb-1">List</label>
                        <div className="flex gap-2">
                            <button
                                onClick={() => editor.chain().focus().toggleBulletList().run()}
                                className="border px-2 py-1 rounded text-xs hover:bg-gray-100"
                            >
                                Bullet
                            </button>
                            <button
                                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                                className="border px-2 py-1 rounded text-xs hover:bg-gray-100"
                            >
                                Numbered
                            </button>
                        </div>
                    </div>

                    {/* Color Picker */}
                    <div>
                        <h4 className="text-xs font-semibold mb-1">Color</h4>
                        <div className="space-y-2 border p-2 px-4">
                            <ColorField editor={editor} label="Text" />
                            <ColorField editor={editor} label="Background" />
                        </div>
                    </div>

                    {/* Disclosure Sections */}
                    <DisclosurePanel title="Dimensions" />
                    <DisclosurePanel title="Advanced" open />
                </div>
            )


        case "heading":
            return (
                <div className="space-y-2">
                    <h4 className="text-xs font-semibold">Heading Settings</h4>
                    <div className="flex gap-2">
                        {[1, 2, 3].map((level) => (
                            <button
                                key={level}
                                onClick={() => editor.commands.toggleHeading({ level: level as 1 | 2 | 3 })}
                                className="border px-2 py-1 rounded text-xs hover:bg-gray-100"
                            >
                                H{level}
                            </button>
                        ))}
                    </div>
                </div>
            )

        case "codeBlock":
            return (
                <div className="space-y-2">
                    <h4 className="text-xs font-semibold">Code Block</h4>
                    <button
                        onClick={() => editor.commands.toggleCodeBlock()}
                        className="border px-2 py-1 rounded text-xs hover:bg-gray-100"
                    >
                        Toggle Code Block
                    </button>
                </div>
            )
        case 'imageBox':
            return (
                <div className="space-y-3">
                    <h4 className="text-sm font-semibold">Edit Image</h4>

                    <div className="flex flex-col space-y-2 text-sm">
                        <label className="font-medium">Image URL</label>
                        <input
                            value={editor.getAttributes('imageBox')?.src || ''}
                            onChange={(e) =>
                                editor
                                    .chain()
                                    .focus()
                                    .updateAttributes('imageBox', { src: e.target.value })
                                    .run()
                            }
                            placeholder="https://..."
                        />
                    </div>

                    <div className="flex flex-col space-y-2 text-sm">
                        <label className="font-medium">Alt Text</label>
                        <input
                            value={editor.getAttributes('imageBox')?.caption || ''}
                            onChange={(e) =>
                                editor
                                    .chain()
                                    .focus()
                                    .updateAttributes('imageBox', { caption: e.target.value })
                                    .run()
                            }
                            placeholder="Deskripsi gambar"
                        />
                    </div>
                </div>
            )
        default:
            return (
                <div className="text-xs text-gray-500">
                    No custom settings for <code>{type}</code> block.
                </div>
            )
    }
}
interface ColorFieldProps {
    label: string;
    editor: Editor
}

const TAILWIND_COLORS = [
    { name: "White", value: "#ffffff" },
    { name: "Black", value: "#000000" },
    { name: "Gray", value: "#6b7280" },
    { name: "Red", value: "#ef4444" },
    { name: "Yellow", value: "#f59e42" },
    { name: "Green", value: "#22c55e" },
    { name: "Blue", value: "#3b82f6" },
    { name: "Indigo", value: "#6366f1" },
    { name: "Purple", value: "#a21caf" },
    { name: "Pink", value: "#ec4899" },
];

function ColorField({ label, editor }: ColorFieldProps) {
    const currectEditor = useMemo(() => editor, [editor])

    const [selectedValue, setSelectedValue] = useState<string>('')
    const [open, setOpen] = useState(false)
    const getCurrentColor = () => {
        const attrs = currectEditor.getAttributes("textStyle")
        const highlight = currectEditor.getAttributes('highlight')
        return label === "Text" ? attrs?.color : highlight?.color
    }
    // Update selected color if editor changes
    useEffect(() => {
        const updateColor = () => {
            const color = getCurrentColor()
            setSelectedValue(color || TAILWIND_COLORS[0].value)
        }

        editor.on("selectionUpdate", updateColor)
        editor.on("transaction", updateColor)

        // cleanup listener saat unmount
        return () => {
            editor.off("selectionUpdate", updateColor)
            editor.off("transaction", updateColor)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editor, label])

    const handleChangeColor = (color: string) => {
        setSelectedValue(color)
        setOpen(false)

        if (label === "Text") {
            currectEditor.chain().focus().setColor(color).run()
        } else {
            editor.chain().focus().setHighlight({ color }).run()
        }
    }
    /*
        Allow keyboard shortcut to reset color (spacebar) when color button is focused.
        Attach handleKeyDown to the color button.
    */
    return (
        <div className="flex items-center justify-between">
            <span>{label}</span>
            <div className="relative">
                <button
                    type="button"
                    className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center"
                    style={{ backgroundColor: selectedValue }}
                    onClick={() => setOpen((v) => !v)}
                    aria-label="Select color"
                />
                {open && (
                    <div className="absolute right-0 mt-2 z-10 bg-white border rounded shadow p-2 flex gap-2 flex-wrap w-44">
                        {TAILWIND_COLORS.map((color) => (
                            <button
                                key={color.value}
                                type="button"
                                className={`w-6 h-6 rounded-full border-2 ${selectedValue === color.value ? "border-blue-500" : "border-gray-200"}`}
                                style={{ backgroundColor: color.value }}
                                title={color.name}
                                onClick={() => {
                                    handleChangeColor(color.value);
                                    setOpen(false);
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

interface DisclosurePanelProps {
    title: string;
    open?: boolean;
}

function DisclosurePanel({ title, open = false }: DisclosurePanelProps) {
    return (
        <details open={open} className="border-t pt-2">
            <summary className="cursor-pointer font-medium text-xs">{title}</summary>
            <div className="mt-2 text-xs text-gray-500">
                {/* Isi panel di sini */}
                Additional settings...
            </div>
        </details>
    );
}


type typeCurrentBlock = { type?: { name?: string } } | null
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

interface SidebarEditorProps {
    activeBlock: typeCurrentBlock
    activeTab: "post" | "block";
    setActiveTab: React.Dispatch<React.SetStateAction<"post" | "block">>;
    editor: Editor,
    post: Post
}

export default function SidebarEditor({ activeBlock, editor, post, activeTab, setActiveTab }: SidebarEditorProps) {
    // const [activeTab, setActiveTab] = useState<"post" | "block">("post")

    return (
        <aside className="w-72 border-l shadow-md  flex flex-col text-sm ">
            {/* Tabs */}
            <div className="flex border-b pt-2">
                <button
                    className={`flex-1 p-2 text-center font-medium ${activeTab === "post" ? "border-b-2 border-gray-700 dark:border-white" : "border-none"
                        }`}
                    onClick={() => setActiveTab("post")}
                >
                    Post
                </button>
                <button
                    className={`flex-1 p-2 text-center font-medium ${activeTab === "block" ? "border-b-2 border-gray-700 dark:border-white" : "border-none"
                        }`}
                    onClick={() => {
                        setActiveTab("block")
                    }}
                    // style={!currentBlock ? { opacity: 0.5, cursor: "not-allowed" } : {}}
                >
                    Block
                </button>
            </div>

            {/* Panel Content */}
            <div className="p-4 space-y-6 overflow-y-auto flex-1">
                {renderView(activeBlock, editor, post)}
            </div>
        </aside>
    )
}