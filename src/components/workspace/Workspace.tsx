"use client";
import { useEffect, useRef, useState } from "react";
import { Editor, EditorContent, EditorContext, useEditor } from "@tiptap/react";

// --- Tiptap Core Extensions ---
import { StarterKit } from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";
import { TaskItem } from "@tiptap/extension-task-item";
import { TaskList } from "@tiptap/extension-task-list";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { Highlight } from "@tiptap/extension-highlight";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { Underline } from "@tiptap/extension-underline";
import { Color } from "@tiptap/extension-color";

// --- Custom Extensions ---
import { Link } from "@/components/tiptap-extension/link-extension";
import { Selection } from "@/components/tiptap-extension/selection-extension";
import { TrailingNode } from "@/components/tiptap-extension/trailing-node-extension";

// --- UI Primitives ---
import { Button } from "@/components/tiptap-ui-primitive/button";
import { Spacer } from "@/components/tiptap-ui-primitive/spacer";
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from "@/components/tiptap-ui-primitive/toolbar";

// --- Tiptap Node ---
import { ImageUploadNode } from "@/components/tiptap-node/image-upload-node/image-upload-node-extension";
import "@/components/tiptap-node/code-block-node/code-block-node.scss";
import "@/components/tiptap-node/list-node/list-node.scss";
import "@/components/tiptap-node/image-node/image-node.scss";
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss";

// --- Tiptap UI ---
import { HeadingDropdownMenu } from "@/components/tiptap-ui/heading-dropdown-menu";
import { ImageUploadButton } from "@/components/tiptap-ui/image-upload-button";
import { ListDropdownMenu } from "@/components/tiptap-ui/list-dropdown-menu";
import { BlockquoteButton } from "@/components/tiptap-ui/blockquote-button";
import { CodeBlockButton } from "@/components/tiptap-ui/code-block-button";
import {
  ColorHighlightPopover,
  ColorHighlightPopoverContent,
  ColorHighlightPopoverButton,
} from "@/components/tiptap-ui/color-highlight-popover";
import {
  LinkPopover,
  LinkContent,
  LinkButton,
} from "@/components/tiptap-ui/link-popover";
import { MarkButton } from "@/components/tiptap-ui/mark-button";
import { TextAlignButton } from "@/components/tiptap-ui/text-align-button";
import { UndoRedoButton } from "@/components/tiptap-ui/undo-redo-button";

// --- Icons ---
import { ArrowLeftIcon } from "@/components/tiptap-icons/arrow-left-icon";
import { HighlighterIcon } from "@/components/tiptap-icons/highlighter-icon";
import { LinkIcon } from "@/components/tiptap-icons/link-icon";
import { PanelRight } from "lucide-react";
// --- Hooks ---
import { useMobile } from "@/hooks/use-mobile";
import { useWindowSize } from "@/hooks/use-window-size";
import { useCursorVisibility } from "@/hooks/use-cursor-visibility";
// --- Lib ---
import { handleImageUpload, MAX_FILE_SIZE } from "@/lib/tiptap-utils";

// --- Styles ---
import "@/components/tiptap-templates/simple/simple-editor.scss";

import content from "@/components/tiptap-templates/simple/data/content.json";

import SidebarEditor from "./SidebarEditor";
import AutoResizeTextarea from "../form/input/AutoResizeTextarea";
import { AlertBox } from "./extension/AlertBox";
import Alert from "./toolbar/Alert";
import FloatingMenuAI from "./Ai/FloatingMenuAI";
import { AIProvider } from "@/context/AIContext";

export type Post = {
  title: string;
  slug: string | number;
  author: string;
  date: string; // ISO string atau tanggal biasa
  update_at?: string; // Optional
  excerpt: string;
  status?: "draft" | "published" | "scheduled";
  featured_image?: string;
  template?: string;
  discussion?: "open" | "closed";
};

const initial_post: Post = {
  title: "",
  author: "",
  date: "",
  update_at: "",
  excerpt: "",
  slug: "",
};

const MainToolbarContent = ({
  onHighlighterClick,
  onLinkClick,
  isMobile,
  onOpen,
}: {
  onHighlighterClick: () => void;
  onLinkClick: () => void;
  onOpen: () => void;
  isMobile: boolean;
}) => {
  return (
    <>
      {/* <Spacer /> */}

      <ToolbarGroup>
        <UndoRedoButton action="undo" />
        <UndoRedoButton action="redo" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <HeadingDropdownMenu levels={[1, 2, 3, 4]} />
        <ListDropdownMenu types={["bulletList", "orderedList", "taskList"]} />
        <BlockquoteButton />
        <CodeBlockButton />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="bold" />
        <MarkButton type="italic" />
        <MarkButton type="strike" />
        <MarkButton type="code" />
        <MarkButton type="underline" />
        {!isMobile ? (
          <ColorHighlightPopover />
        ) : (
          <ColorHighlightPopoverButton onClick={onHighlighterClick} />
        )}
        {!isMobile ? <LinkPopover /> : <LinkButton onClick={onLinkClick} />}
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="superscript" />
        <MarkButton type="subscript" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <TextAlignButton align="left" />
        <TextAlignButton align="center" />
        <TextAlignButton align="right" />
        <TextAlignButton align="justify" />
      </ToolbarGroup>

      <ToolbarSeparator />
      <Alert />
      <ToolbarSeparator />

      <ToolbarGroup>
        <ImageUploadButton text="Add" />
      </ToolbarGroup>
      <Spacer />
      {!isMobile && (
        <button onClick={onOpen}>
          <PanelRight />
        </button>
      )}

      {isMobile && <ToolbarSeparator />}
    </>
  );
};

const MobileToolbarContent = ({
  type,
  onBack,
}: {
  type: "highlighter" | "link";
  onBack: () => void;
}) => (
  <div className="flex gap-2 overflow-x-auto beautiful-scrollbar">
    <ToolbarGroup>
      <Button data-style="ghost" onClick={onBack}>
        <ArrowLeftIcon className="tiptap-button-icon" />
        {type === "highlighter" ? (
          <HighlighterIcon className="tiptap-button-icon" />
        ) : (
          <LinkIcon className="tiptap-button-icon" />
        )}
      </Button>
    </ToolbarGroup>

    <ToolbarSeparator />

    {type === "highlighter" ? (
      <ColorHighlightPopoverContent />
    ) : (
      <LinkContent />
    )}
  </div>
);

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // Remove invalid chars
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/-+/g, "-"); // Collapse multiple -
}

type EditorWithCustom = Editor & {
  custom: {
    selectedText: string;
    setSelectedText: (text: string) => void;
    getSelectedText: () => string;
  };
};

function Workspace() {
  const [post, setPost] = useState(initial_post);
  const isMobile = useMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const windowSize = useWindowSize();
  const [mobileView, setMobileView] = useState<"main" | "highlighter" | "link">(
    "main"
  );
  const toolbarRef = useRef<HTMLDivElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        "aria-label": "Main content area, start typing to enter text.",
      },
    },
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Underline,
      AlertBox,
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
      Image,
      Typography,
      Superscript,
      Subscript,
      Color,
      Selection,
      ImageUploadNode.configure({
        accept: "image/*",
        maxSize: MAX_FILE_SIZE,
        limit: 3,
        upload: handleImageUpload,
        onError: (error) => console.error("Upload failed:", error),
      }),
      TrailingNode,
      Link.configure({ openOnClick: false }),
    ],
    content: content,
    onCreate({ editor }) {
      // Tambahkan properti/fungsi custom
      // Assert the type to include the custom property
      const withCustom = editor as EditorWithCustom;
      withCustom.custom = {
        selectedText: "",
        setSelectedText(text: string) {
          this.selectedText = text;
        },
        getSelectedText() {
          return this.selectedText;
        },
      };
    },
  });

  const bodyRect = useCursorVisibility({
    editor,
    overlayHeight: toolbarRef.current?.getBoundingClientRect().height ?? 0,
  });

  useEffect(() => {
    if (!isMobile && mobileView !== "main") {
      setMobileView("main");
    }
  }, [isMobile, mobileView]);

  const handleTitle = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPost({ ...post, title: event.target.value });
  };

  useEffect(() => {
    if (post.title) {
      const slug = generateSlug(post.title);
      setPost((prev) => ({ ...prev, slug }));
    }
  }, [post.title]);

  return (
    <AIProvider>
      <EditorContext.Provider value={{ editor }}>
        <div
          className={`flex md:flex-row h-full w-full flex-col overflow-hidden p-1`}
        >
          <div className={sidebarOpen && isMobile ? "hidden" : "flex-1 "}>
            <Toolbar
              ref={toolbarRef}
              style={
                isMobile
                  ? {
                      bottom: `calc(100% - ${
                        windowSize.height - bodyRect.y
                      }px)`,
                    }
                  : {}
              }
              className={`border-b p-2 relative overflow-auto`}
            >
              {mobileView === "main" ? (
                <MainToolbarContent
                  onOpen={() => setSidebarOpen(!sidebarOpen)}
                  onHighlighterClick={() => setMobileView("highlighter")}
                  onLinkClick={() => setMobileView("link")}
                  isMobile={isMobile}
                />
              ) : (
                <MobileToolbarContent
                  type={mobileView === "highlighter" ? "highlighter" : "link"}
                  onBack={() => setMobileView("main")}
                />
              )}
            </Toolbar>
            {editor && <FloatingMenuAI />}
            {/* <div className=" "> */}
            <div className="content-wrapper h-full min-h-[calc(70vh)]  max-h-[calc(70vh)] overflow-y-auto px-4 hide-scrollbar mb-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="fixed bottom-5 right-4 z-40 bg-blue-600 text-white p-3 rounded-full shadow-lg md:hidden"
              >
                <PanelRight />
              </button>
              <AutoResizeTextarea
                isTitle
                value={post.title}
                onChange={handleTitle}
                placeholder="Enter post title"
              />
              <EditorContent
                editor={editor}
                role="presentation"
                className="md:px-4 "
              ></EditorContent>
            </div>
          </div>
          {
            <SidebarEditor
              post={post}
              isOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
              mobile={isMobile}
            />
          }
        </div>
      </EditorContext.Provider>
    </AIProvider>
  );
}

export default Workspace;
