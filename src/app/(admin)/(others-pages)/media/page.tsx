'use client';
import PageBreadcrumb from '@/components/common/PageBreadCrumb'
import { Modal } from '@/components/ui/modal';
import React, { useState } from 'react'
import MediaImage from '@/components/media/MediaImage';



function Mediapage() {
    const [modalOpen, setModalOpen] = useState(false)
    return (
        <div>
            <PageBreadcrumb pageTitle="Media" />
            <div className="min-h-max rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:p-8">
                <div className="mb-5 flex items-center gap-4">
                    <button
                        onClick={() => setModalOpen(true)}
                        className="inline-block px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-500/50 transition"
                    >
                        Upload Image
                    </button>

                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 max-h-[calc(65vh)] overflow-auto beautiful-scrollbar">
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
                            key={idx}
                            className="rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-gray-800"
                        >
                            <MediaImage
                                src={media.src}
                                alt={media.title}
                                width={400}
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
            </div>
            <Modal className='w-full max-w-2xl' showCloseButton={false} isOpen={modalOpen} onClose={() => setModalOpen(!modalOpen)}>
                <div className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Upload New Image</h2>
                    <form
                        className="flex flex-col gap-4"
                        onSubmit={e => {
                            e.preventDefault();
                            // handle upload logic here
                        }}
                    >
                        <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-blue-400 transition">
                            <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12" />
                            </svg>
                            <span className="text-gray-500 mb-2">Click to upload or drag and drop</span>
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                            // onChange={handleFileChange}
                            />
                        </label>
                        <input
                            type="text"
                            placeholder="Title"
                            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        // onChange={handleTitleChange}
                        />
                        <textarea
                            placeholder="Description"
                            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            rows={3}
                        // onChange={handleDescChange}
                        />
                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                type="button"
                                className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
                                onClick={() => setModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
                            >
                                Upload
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    )
}

export default Mediapage
