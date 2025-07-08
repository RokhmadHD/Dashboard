// components/editor/TableCellNodeView.tsx
"use client";

import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";
import { Editor } from "@tiptap/core";
import { Node } from 'prosemirror-model';

interface Props {
  editor: Editor;
  node: Node;
  getPos: () => number;
}

export default function TableCellNodeView({ }: Props) {
  // const isSelected = editor?.view?.state?.selection?.$anchor?.pos === getPos();

  return (
    <NodeViewWrapper className="p-2 min-w-[80px] min-h-[40px] text-sm">
      <NodeViewContent as="div" className="outline-none" />
     
    </NodeViewWrapper>
  );
}
