import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

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