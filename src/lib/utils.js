import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}


export function convertToTitleCase(str) {
  return str.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
}

export function convertToSnakeCase(str) {
  return str.split(' ').map(word => word.toUpperCase()).join('_');
}