export const URL = "https://50ba-2409-40c1-1033-fa8c-f8a4-6a49-9125-5b94.ngrok-free.app/";




// Get yesterday's date
const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

// Format the date as 'YYYY-MM-DD'
export const yesterdayFormatted = yesterday.toISOString().split('T')[0];