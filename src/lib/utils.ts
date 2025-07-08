import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import showdown from 'showdown';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


interface SubString {
  text:string;
  max?:number
}
export function SubString({text, max = 50}: SubString) {
  if(text.length > 50){
    return `${text.substring(0,max)}...`
  }
  return text
}

const markdownConverter = new showdown.Converter();
export function convertMarkdownToHtml(markdown: string): string {
  // showdown akan mengubah **text** menjadi <strong>text</strong>, dll.
  return markdownConverter.makeHtml(markdown);
}