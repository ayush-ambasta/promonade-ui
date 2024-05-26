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

export function formatDate(dateTimeString) {
  // Parse the input date string
  const date = new Date(dateTimeString);

  // Define options for formatting the date
  const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      timeZone: 'Asia/Kolkata' // Set timezone to Indian Standard Time (IST)
  };

  // Format the date using Intl.DateTimeFormat
  const formatter = new Intl.DateTimeFormat('en-IN', options);
  return formatter.format(date);
};