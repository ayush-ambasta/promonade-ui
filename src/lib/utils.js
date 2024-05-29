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

export function formatDateToISTWords(dateTimeString) {
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

export function convertToIndianTime(timestamp) {
  if(timestamp.endsWith("+05:30")){
    return timestamp.replace("+05:30", "")
  }
  const date = new Date(timestamp);
  const indianTime = new Date(date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
  const formattedIndianTime = indianTime.toISOString().split("T")[0] + "T" + indianTime.toTimeString().split(" ")[0];
  return formattedIndianTime;
}


export function convertToIndianDateObject(timestamp) {
  let indianTimestamp = convertToIndianTime(timestamp)
  
  const formattedTimestamp = indianTimestamp.split("T")[0] +"T00:00:00"
  console.log(formattedTimestamp)
  const date = new Date(formattedTimestamp);
  return date
}

export function isValidDateString(dateString) {
  const [year, month, day] = dateString.split("-");
  return /^\d{4}-\d{2}-\d{2}$/.test(dateString) && 
         !isNaN(Date.parse(dateString)) &&
         month >= 1 && month <= 12 &&
         day >= 1 && day <= 31;
}

export function isValidTimeString(timeString) {
  const regex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
  return regex.test(timeString);
}
