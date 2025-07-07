import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";
import { NodeViewWrapper, NodeViewContent, Editor } from "@tiptap/react";
import { ChartNoAxesGantt, TrashIcon } from "lucide-react";
import { useState } from "react";

interface TableProps {
    editor: Editor;
}

const TableView = ({ editor }: TableProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <NodeViewWrapper className="relative group/table">
            <NodeViewContent as="div" className="tableWrapper beautiful-scrollbar relative" />

            {/* Floating Action Button Area */}
            <div className="absolute hidden group-hover/table:flex top-1/2 -left-2 gap-1 z-50">
                <div className="relative">
                    <button
                        onClick={() => setIsOpen(prev => !prev)}
                        className="text-xs flex flex-col gap-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 px-1 py-0.5 rounded"
                    >
                        <ChartNoAxesGantt className="w-6 h-6" />
                    </button>

                    {/* Dropdown */}
                    {isOpen && (
                        <Dropdown
                            isOpen={isOpen}
                            onClose={() => setIsOpen(false)}
                            className="absolute left-0 top-full mt-2 w-max flex flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark z-50"
                        >
                            <ul className="flex flex-col gap-1 pt-4 pb-3">
                                <li>
                                    <DropdownItem
                                        onItemClick={() => editor.commands.deleteTable()}
                                        className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                                    >
                                         <TrashIcon className="w-6 h-6" />
                                        Delete Table
                                    </DropdownItem>
                                </li>
                            </ul>
                        </Dropdown>
                    )}
                </div>
            </div>
        </NodeViewWrapper>
    );
};


export default TableView;
