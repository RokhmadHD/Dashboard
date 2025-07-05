// src/components/workspace/Toolbar.tsx
"use client";

import { type Editor } from "@tiptap/react";
import {
  Loader2,
} from "lucide-react";
import { Toggle } from "../ui/toggle";
import ImageToolbar from "./toolbar/Image";
import UndoRendo from "./toolbar/UndoRendo";
import TextToolbar from "./toolbar/Text";
import HeadingToolbar from "./toolbar/Heading";
import ListToolbar from "./toolbar/List";
import AlertToolbar from "./toolbar/Alert";
import OtherToolbar from "./toolbar/other";
import TableToolbar from "./toolbar/Table";

interface ToolbarProps {
  editor: Editor | null;
  progress?: number;
  loading?: boolean;
  togglFullScreen?: () => void;
}

export const Toolbar = ({ editor, loading, progress, togglFullScreen }: ToolbarProps) => {

  if (!editor) {
    return null;
  }
  // Replace the Toggle for image with this:

  return (
    <div className="border-b dark:border-gray-700/50 p-2 flex items-center flex-wrap gap-1">
      {/* Tombol Undo/Redo */}
      <UndoRendo editor={editor} />

      <div className="h-6 w-px bg-border mx-2" />

      {/* Tombol Bold, Italic, Strikethrough */}
      <TextToolbar editor={editor} />

      <div className="h-6 w-px bg-border mx-2" />

      {/* Tombol Heading */}
      <HeadingToolbar editor={editor} />
      <div className="h-6 w-px bg-border mx-2" />

      {/* Tombol List */}
      <ListToolbar editor={editor} />

      <div className="h-6 w-px bg-border mx-2" />


      {/* Tombol Blockquote & Code */}
      <OtherToolbar editor={editor} />
      <div className="h-6 w-px bg-border mx-2" />

      <ImageToolbar editor={editor} />
      <div className="h-6 w-px bg-border mx-2" />
      <AlertToolbar editor={editor} />
      <div className="h-6 w-px bg-border mx-2" />
      <TableToolbar editor={editor} />
      <div className="h-6 w-px bg-border mx-2" />
      <Toggle
        size="sm"
        pressed={document.fullscreenElement !== null}
        onPressedChange={togglFullScreen}
        aria-label="Toggle fullscreen"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 3H5a2 2 0 0 0-2 2v3" />
          <path d="M16 3h3a2 2 0 0 1 2 2v3" />
          <path d="M8 21H5a2 2 0 0 1-2-2v-3" />
          <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
        </svg>
      </Toggle>
      <div className="h-6 w-px bg-border mx-2" />
      <div className="ml-auto">
        {loading && (<div className='flex items-center gap-2 text-muted-foreground  w-full justify-center'>
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>{progress}%</span>
        </div>)}
      </div>

    </div>
  );
};
