import MediaImage from '@/components/media/MediaImage';
import { Modal } from '@/components/ui/modal';
import { Toggle } from '@/components/ui/toggle';
import { Editor } from '@tiptap/react'
import React, { useState } from 'react'

type Image = {
    src: string;
    desc: string;
    title: string;
};

const init_image = {
    src: "",
    desc: "",
    title: "",
}

function ImageToolbar({ editor }: { editor: Editor }) {
    const [openImageModal, setOpenImageModal] = useState(false);
    const [image, setImage] = useState<Image>(init_image);

    const handleInsertImage = () => {
        if (image || !editor) {
            editor?.chain().focus().insertImageBox({ src: image.src, caption: image.desc, alt: image.title }).run();
            setImage(init_image);
            setOpenImageModal(false);
        }
    };
    if (!editor) return null;
    return (
        <>
            <Toggle
                size="sm"
                pressed={editor.isActive("image")}
                onPressedChange={() => setOpenImageModal(true)}
                aria-label="Insert image"
            >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                </svg>
            </Toggle>
            <Modal isOpen={openImageModal} onClose={() => setOpenImageModal(false)} className="w-full max-w-6xl">
                <div className=" rounded-lg shadow-lg w-full p-6">
                    {/* Header */}
                    <div className="mb-4">
                        <h2 className="text-lg font-semibold">Insert Image</h2>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 max-h-[calc(65vh)] overflow-auto beautiful-scrollbar p-4 mb-4">
                        {[
                            {
                                src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
                                title: 'Mountain View',
                                desc: 'A beautiful mountain landscape.',
                            },
                            {
                                src: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
                                title: 'City Lights',
                                desc: 'Night view of a bustling city.',
                            },
                            {
                                src: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
                                title: 'Forest Path',
                                desc: 'A serene path through the forest.',
                            },
                            {
                                src: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80',
                                title: 'Desert Dunes',
                                desc: 'Golden sand dunes under the sun.',
                            },
                            {
                                src: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80',
                                title: 'Ocean Breeze',
                                desc: 'Waves crashing on the shore.',
                            },
                            {
                                src: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
                                title: 'Sunset Glow',
                                desc: 'A vibrant sunset over the hills.',
                            },
                            {
                                src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
                                title: 'Mountain View',
                                desc: 'A beautiful mountain landscape.',
                            },
                            {
                                src: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
                                title: 'City Lights',
                                desc: 'Night view of a bustling city.',
                            },
                            {
                                src: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
                                title: 'Forest Path',
                                desc: 'A serene path through the forest.',
                            },
                            {
                                src: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80',
                                title: 'Desert Dunes',
                                desc: 'Golden sand dunes under the sun.',
                            },
                            {
                                src: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80',
                                title: 'Ocean Breeze',
                                desc: 'Waves crashing on the shore.',
                            },
                            {
                                src: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
                                title: 'Sunset Glow',
                                desc: 'A vibrant sunset over the hills.',
                            },
                            {
                                src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
                                title: 'Mountain View',
                                desc: 'A beautiful mountain landscape.',
                            },
                            {
                                src: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
                                title: 'City Lights',
                                desc: 'Night view of a bustling city.',
                            },
                            {
                                src: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
                                title: 'Forest Path',
                                desc: 'A serene path through the forest.',
                            },
                            {
                                src: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80',
                                title: 'Desert Dunes',
                                desc: 'Golden sand dunes under the sun.',
                            },
                            {
                                src: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80',
                                title: 'Ocean Breeze',
                                desc: 'Waves crashing on the shore.',
                            },
                            {
                                src: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
                                title: 'Sunset Glow',
                                desc: 'A vibrant sunset over the hills.',
                            },
                        ].map((media, idx) => (
                            <div
                                onClick={() => setImage(media)}
                                key={idx}
                                className="rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-gray-800"
                            >
                                <MediaImage
                                    src={media.src}
                                    alt={media.title}
                                    width={200}
                                    height={192}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="font-semibold text-lg mb-1">{media.title}</h3>
                                    <p className="text-gray-500 text-sm">{media.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="flex justify-between gap-2">
                        <div className="flex-1 flex items-center gap-2 px-4">
                            <span className="text-sm text-gray-700/70 ">{image.src}</span>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={handleInsertImage}
                                disabled={!image.src}
                                className={`px-4 py-2 text-sm rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50`}
                            >
                                Insert
                            </button>
                            <button
                                onClick={() => {
                                    setOpenImageModal(false);
                                    setImage(init_image);
                                }}
                                className="px-4 py-2 text-sm rounded border border-gray-300 hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default ImageToolbar
