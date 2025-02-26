export const formatDateTime = (
  date: Date,
  options: Intl.DateTimeFormatOptions,
): string => {
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

// Date and time
export const dateFormatOptions: Intl.DateTimeFormatOptions = {
  weekday: "long",
  month: "long",
  day: "numeric",
};

// Time
export const timeFormatOptions: Intl.DateTimeFormatOptions = {
  hour: "numeric",
  minute: "numeric",
  hour12: true,
};

// Day
export const dayFormatOptions: Intl.DateTimeFormatOptions = {
  day: "2-digit",
};

// Weekday
export const weekdayFormatOptions: Intl.DateTimeFormatOptions = {
  weekday: "short",
};

// MonthAndYear
export const monthAndYearFormatOptions: Intl.DateTimeFormatOptions = {
  month: "short",
  year: "numeric",
};
