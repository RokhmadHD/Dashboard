// components/editor/TableHeaderNodeView.tsx
"use client";

import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";
import { Editor } from "@tiptap/core";
import { Node } from 'prosemirror-model';
import { PlusIcon, TrashIcon } from "lucide-react";

interface Props {
  editor: Editor;
  node: Node;
  getPos: () => number;
}

export default function TableHeaderNodeView({ editor }: Props) {
  // const isSelected = editor?.view?.state?.selection?.$anchor?.pos === getPos();

  return (
    <NodeViewWrapper className="relative group p-2 min-w-[80px] min-h-[40px] text-sm">
      <NodeViewContent as="div" className="outline-none" />

      {/* Action Buttons on Hover */}
      <div className="absolute top-1 -left-0 hidden group-hover:flex gap-1 z-10">
          <div className="flex flex-col gap-1">
            <button
              onClick={() => editor.commands.addColumnAfter()}
              className="text-xs bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 px-1 py-0.5 rounded"
            >
               <PlusIcon className="w-3 h-3"/>
            </button>
            <button
              onClick={() => editor.commands.deleteColumn()}
              className="text-xs bg-red-200 hover:bg-red-300 dark:bg-red-700 dark:hover:bg-red-600 px-1 py-0.5 rounded"
            >
               <TrashIcon className="w-3 h-3"/>
            </button>
          </div>
        </div>
    </NodeViewWrapper>
  );
}
