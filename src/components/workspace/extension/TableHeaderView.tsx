import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";

export default function TableHeaderView() {
  return (
    <NodeViewWrapper as="th" className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-left font-semibold">
      <NodeViewContent as="div" />
    </NodeViewWrapper>
  );
}
