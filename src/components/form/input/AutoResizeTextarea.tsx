import React, { useRef, useEffect } from "react";

type Props = {
  value: string;
  placeholder?: string;
  isTitle?:boolean;
}  & React.TextareaHTMLAttributes<HTMLTextAreaElement>

export default function AutoResizeTextarea({
  value,
  placeholder,
  isTitle,
  ...props
}: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // reset
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <textarea
    ref={textareaRef}
    value={value}
    placeholder={placeholder}
    className={`w-full py-2 focus:outline-none resize-none overflow-hidden bg-transparent text-zinc-900 dark:text-white ${isTitle ? 'text-3xl': 'text-md'}`}
    rows={1}
    {...props}
    />
  );
}
