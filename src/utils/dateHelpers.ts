import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  parseISO,
  isValid,
  isSameDay,
} from "date-fns";

export const formatDate = (
  date: Date | string,
  formatString: string = "yyyy-MM-dd"
): string => {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return isValid(dateObj) ? format(dateObj, formatString) : "";
};

export const formatTime = (time: string): string => {
  if (!time) return "";
  const [hours, minutes] = time.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes);
  return format(date, "h:mm a");
};

export const getCalendarDays = (currentDate: Date) => {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 }); // Monday
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

  return eachDayOfInterval({ start: calendarStart, end: calendarEnd }).map(
    (date) => ({
      date,
      isCurrentMonth: isSameMonth(date, currentDate),
      isToday: isToday(date),
    })
  );
};

export const getMonthName = (date: Date): string => format(date, "MMMM yyyy");

export const getDayName = (date: Date): string =>
  format(date, "EEEE, MMMM do, yyyy");

export const isSameDateString = (date1: string, date2: string): boolean => {
  const d1 = parseISO(date1);
  const d2 = parseISO(date2);
  return isValid(d1) && isValid(d2) && isSameDay(d1, d2);
};

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const sortEventsByTime = (events: Event[]): Event[] => {
  return [...events].sort((a, b) => {
    if (!a.time && !b.time) return 0;
    if (!a.time) return 1;
    if (!b.time) return -1;
    return a.time.localeCompare(b.time);
  });
};
