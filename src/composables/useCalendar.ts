import { computed } from "vue";
import { addMonths, subMonths } from "date-fns";
import { getCalendarDays, getMonthName } from "@/utils/dateHelpers";
import { useEventStore } from "@/stores/eventStore";
import type { CalendarDay } from "@/types";

export function useCalendar() {
  const eventStore = useEventStore();

  const calendarDays = computed((): CalendarDay[] => {
    const days = getCalendarDays(eventStore.currentDate);

    return days.map((day) => ({
      ...day,
      events: eventStore.getEventsForDate(day.date.toISOString().split("T")[0]),
    }));
  });

  const monthName = computed(() => getMonthName(eventStore.currentDate));

  const goToPreviousMonth = () => {
    eventStore.setCurrentDate(subMonths(eventStore.currentDate, 1));
  };

  const goToNextMonth = () => {
    eventStore.setCurrentDate(addMonths(eventStore.currentDate, 1));
  };

  const goToToday = () => {
    eventStore.setCurrentDate(new Date());
  };

  const selectDate = (date: Date) => {
    eventStore.setSelectedDate(date);
  };

  const isDateSelected = (date: Date): boolean => {
    if (!eventStore.selectedDate) return false;
    return date.toDateString() === eventStore.selectedDate.toDateString();
  };

  return {
    calendarDays,
    monthName,
    currentDate: computed(() => eventStore.currentDate),
    selectedDate: computed(() => eventStore.selectedDate),
    goToPreviousMonth,
    goToNextMonth,
    goToToday,
    selectDate,
    isDateSelected,
  };
}
