import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";
import { Table } from "@/components/ui/table";
const TableView = () => {
    return (
        <NodeViewWrapper as={Table} className='border border-gray-100 dark:border-white/[0.05]'>
                <NodeViewContent as="tbody" />
        </NodeViewWrapper>
    );
};

export default TableView;
