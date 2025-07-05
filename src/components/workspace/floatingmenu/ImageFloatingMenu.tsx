import { Editor, FloatingMenu } from "@tiptap/react";

const ImageFloatingMenu = ({ editor }: { editor: Editor }) => {
  if (!editor) return null;

  return (
    <FloatingMenu
      editor={editor}
      shouldShow={({ editor }) => editor.isActive("imageBox")}
      className="bg-white dark:bg-gray-900 border shadow-md rounded px-3 py-2 flex gap-2 z-50"
    >
      <button
        onClick={() => {
          const { src } = editor.getAttributes("imageBox");
          const newSrc = window.prompt("Enter new image URL", src);
          if (newSrc) {
            editor.chain().focus().updateAttributes("imageBox", { src: newSrc }).run();
          }
        }}
        className="text-xs text-blue-500 hover:underline"
      >
        Ganti Gambar
      </button>

      <button
        onClick={() => {
          const { caption } = editor.getAttributes("imageBox");
          const newCaption = window.prompt("Edit caption", caption ?? "");
          editor.chain().focus().updateAttributes("imageBox", { caption: newCaption }).run();
        }}
        className="text-xs text-green-500 hover:underline"
      >
        Edit Caption
      </button>

      <button
        onClick={() => {
          editor.chain().focus().deleteSelection().run();
        }}
        className="text-xs text-red-500 hover:underline"
      >
        Hapus
      </button>
    </FloatingMenu>
  );
};

export default ImageFloatingMenu;
