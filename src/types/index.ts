export type Event = {
  id: string;
  title: string;
  description?: string;
  date: string;
  time?: string;
  tag: EventTag;
  createdAt: string;
  updatedAt: string;
};

export type EventTag = {
  id: string;
  name: string;
  color: string;
};

export type CalendarDay = {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  events: Event[];
};

export type CalendarState = {
  currentDate: Date;
  selectedDate: Date | null;
  events: Event[];
  tags: EventTag[];
  activeTagFilter: string | null;
};

export type CreateEventData = {
  title: string;
  description?: string;
  date: string;
  time?: string;
  tagId: string;
};
