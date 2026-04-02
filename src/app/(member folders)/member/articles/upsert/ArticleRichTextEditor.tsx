"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Undo2,
  Redo2,
  Link as LinkIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ArticleRichTextEditorProps = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  disabled?: boolean;
  /** Bump when loading existing article so the editor remounts with new HTML */
  editorKey: number | string;
  /** Root wrapper (e.g. `flex flex-col flex-1 min-h-0` for a tall column layout) */
  className?: string;
  /** Extra classes for the scrollable editor area */
  editorContentClassName?: string;
};

const btn =
  "p-2 rounded-md text-slate-200 hover:bg-white/10 disabled:opacity-40 disabled:pointer-events-none transition-colors";
const btnActive = "bg-[#FAA336]/25 text-[#FAA336]";

export function ArticleRichTextEditor({
  value,
  onChange,
  placeholder = "Write the article body…",
  disabled,
  editorKey,
  className,
  editorContentClassName,
}: ArticleRichTextEditorProps) {
  const editor = useEditor(
    {
      extensions: [
        StarterKit.configure({
          heading: { levels: [2, 3] },
        }),
        Placeholder.configure({ placeholder }),
        Link.configure({
          openOnClick: false,
          HTMLAttributes: {
            class: "text-[#FAA336] underline underline-offset-2",
          },
        }),
      ],
      content: value,
      editable: !disabled,
      immediatelyRender: false,
      onUpdate: ({ editor: ed }) => onChange(ed.getHTML()),
    },
    [editorKey]
  );

  if (!editor) {
    return (
      <div
        className={cn(
          "rounded-xl border border-white/10 bg-black/20 min-h-[280px] animate-pulse",
          className
        )}
      />
    );
  }

  const setLink = () => {
    const previous = editor.getAttributes("link").href as string | undefined;
    const next = window.prompt("Link URL", previous ?? "https://");
    if (next === null) return;
    if (next === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: next }).run();
  };

  return (
    <div
      className={cn(
        "flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-white/10 bg-black/20",
        className
      )}
    >
      <div className="flex shrink-0 flex-wrap gap-1 p-2 border-b border-white/10 bg-white/5 ">
        <button
          type="button"
          className={`${btn} ${editor.isActive("bold") ? btnActive : ""}`}
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={disabled}
          aria-label="Bold"
        >
          <Bold size={18} />
        </button>
        <button
          type="button"
          className={`${btn} ${editor.isActive("italic") ? btnActive : ""}`}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={disabled}
          aria-label="Italic"
        >
          <Italic size={18} />
        </button>
        <span className="w-px h-6 bg-white/15 self-center mx-1" />
        <button
          type="button"
          className={`${btn} ${editor.isActive("heading", { level: 2 }) ? btnActive : ""}`}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          disabled={disabled}
          aria-label="Heading 2"
        >
          <Heading2 size={18} />
        </button>
        <button
          type="button"
          className={`${btn} ${editor.isActive("heading", { level: 3 }) ? btnActive : ""}`}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          disabled={disabled}
          aria-label="Heading 3"
        >
          <Heading3 size={18} />
        </button>
        <span className="w-px h-6 bg-white/15 self-center mx-1" />
        <button
          type="button"
          className={`${btn} ${editor.isActive("bulletList") ? btnActive : ""}`}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          disabled={disabled}
          aria-label="Bullet list"
        >
          <List size={18} />
        </button>
        <button
          type="button"
          className={`${btn} ${editor.isActive("orderedList") ? btnActive : ""}`}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          disabled={disabled}
          aria-label="Numbered list"
        >
          <ListOrdered size={18} />
        </button>
        <button
          type="button"
          className={`${btn} ${editor.isActive("blockquote") ? btnActive : ""}`}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          disabled={disabled}
          aria-label="Quote"
        >
          <Quote size={18} />
        </button>
        <span className="w-px h-6 bg-white/15 self-center mx-1" />
        <button
          type="button"
          className={`${btn} ${editor.isActive("link") ? btnActive : ""}`}
          onClick={setLink}
          disabled={disabled}
          aria-label="Link"
        >
          <LinkIcon size={18} />
        </button>
        <span className="w-px h-6 bg-white/15 self-center mx-1" />
        <button
          type="button"
          className={btn}
          onClick={() => editor.chain().focus().undo().run()}
          disabled={disabled || !editor.can().undo()}
          aria-label="Undo"
        >
          <Undo2 size={18} />
        </button>
        <button
          type="button"
          className={btn}
          onClick={() => editor.chain().focus().redo().run()}
          disabled={disabled || !editor.can().redo()}
          aria-label="Redo"
        >
          <Redo2 size={18} />
        </button>
      </div>
      <EditorContent
        editor={editor}
        className={cn(
          "article-editor flex min-h-0 flex-1 flex-col overflow-y-auto px-4 py-3 text-slate-100 [&_.ProseMirror]:min-h-full [&_.ProseMirror]:outline-none [&_.ProseMirror]:prose-headings:text-[#FAA336] [&_h2]:text-xl [&_h2]:font-bold [&_h3]:text-lg [&_h3]:font-semibold [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_blockquote]:border-l-4 [&_blockquote]:border-[#FAA336]/60 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-slate-300",
          editorContentClassName
        )}
      />
    </div>
  );
}
