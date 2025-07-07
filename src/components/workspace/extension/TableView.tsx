import { NodeViewWrapper, NodeViewContent, Editor } from "@tiptap/react";
import { TrashIcon } from "lucide-react";

interface TableProps {
    editor: Editor;
}

const TableView = ({ editor }: TableProps) => {
    return (
        <NodeViewWrapper className='tableWrapper beautiful-scrollbar relative'>
            <NodeViewContent as='div' className="" />
            <div className="absolute bottom-0 right-0 flex gap-1 z-50">
                <div><button
                    onClick={() => editor.commands.deleteTable()}
                    className="text-xs bg-red-200 hover:bg-red-300 dark:bg-red-700 dark:hover:bg-red-600 px-1 py-0.5 rounded"
                >
                    <TrashIcon className="w-3 h-3" /> Delete Table
                </button></div>
            </div>
        </NodeViewWrapper>
    );
};

export default TableView;
