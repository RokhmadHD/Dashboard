import { Dropdown } from '@/components/ui/dropdown/Dropdown';
import { DropdownItem } from '@/components/ui/dropdown/DropdownItem';
import { Editor } from '@tiptap/react'
import { Bell } from 'lucide-react';
import React, { useState } from 'react'

type variant = "info" | "error" | "warning" | "success"
function AlertToolbar({ editor }: { editor: Editor }) {
    const [open, setOpen] = useState(false);
    if (!editor) return null

    const handleOnclick = (variant: variant) => {
        editor?.chain().focus().insertAlertBox(variant).run();
        setOpen(false)
    }
    const variants: variant[] = ["info", "error", "warning", "success"]
    return <div className="relative">
        <button onClick={() => setOpen(true)} className="p-1.5 inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[color,box-shadow] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive whitespace-nowrap bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground/50">
            <Bell className="h-4 w-4" />
        </button>
        <Dropdown
            isOpen={open}
            onClose={() => setOpen(false)}
            className="absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
        >
            <div className="border-b py-2">
                <span className="flex gap-2 items-center font-medium text-gray-700 text-theme-xl dark:text-gray-400">
                    <Bell className="h-6 w-6" />
                    Alert
                </span>
            </div>
            <ul className="flex flex-col gap-1 pt-4 pb-3">
                {variants.map((variant) => (
                    <li key={variant}>
                        <DropdownItem
                            onItemClick={() => handleOnclick(variant)}
                            className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                        >
                            {variant}
                        </DropdownItem>
                    </li>
                ))}
            </ul>
        </Dropdown>
    </div>
}

export default AlertToolbar
