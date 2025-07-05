import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";

export default function TableCellView() {
  return (
    <NodeViewWrapper as="td" className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
      <NodeViewContent as="div" />
    </NodeViewWrapper>
  );
}
