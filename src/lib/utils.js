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

//Output in words
export function formatDateToISTWords(dateTimeString) {
  const date = new Date(dateTimeString);
  const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      timeZone: 'Asia/Kolkata' 
  };
  const formatter = new Intl.DateTimeFormat('en-IN', options);
  return formatter.format(date);
};

//output as a date-time string 
export function convertToIndianTime(timestamp) {
  if(timestamp.endsWith("+05:30")){
    return timestamp.replace("+05:30", "")
  }
  const date = new Date(timestamp);
  const indianTime = new Date(date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
  const formattedIndianTime = indianTime.toISOString().split("T")[0] + "T" + indianTime.toTimeString().split(" ")[0];
  return formattedIndianTime;
}

//output as a date object
export function convertToIndianDateObject(timestamp) {
  let indianTimestamp = convertToIndianTime(timestamp)
  
  const formattedTimestamp = indianTimestamp.split("T")[0] +"T00:00:00"
  console.log(formattedTimestamp)
  const date = new Date(formattedTimestamp);
  return date
}

//retuns as date string only, no conversions involved
export function getDateString(date){
  let year = date.getFullYear();
  let month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1 and pad with zero if necessary
  let day = String(date.getDate()).padStart(2, '0');

  let formattedDate = `${year}-${month}-${day}`;

  return formattedDate
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
