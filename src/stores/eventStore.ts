import { ref, computed } from "vue";
import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { generateId, isSameDateString } from "@/utils/dateHelpers";
import type { Event, EventTag, CreateEventData } from "@/types";

const defaultTags: EventTag[] = [
  { id: "work", name: "Work", color: "bg-blue-500" },
  { id: "personal", name: "Personal", color: "bg-green-500" },
  { id: "meeting", name: "Meeting", color: "bg-purple-500" },
  { id: "birthday", name: "Birthday", color: "bg-pink-500" },
  { id: "reminder", name: "Reminder", color: "bg-yellow-500" },
  { id: "health", name: "Health", color: "bg-red-500" },
];

export const useEventStore = defineStore("events", () => {
  // Persistent state
  const events = useStorage<Event[]>("calendar-events", []);
  const tags = useStorage<EventTag[]>("calendar-tags", defaultTags);

  // Local reactive state
  const currentDate = ref(new Date());
  const selectedDate = ref<Date | null>(null);
  const activeTagFilter = ref<string | null>(null);
  const isEventModalOpen = ref(false);
  const editingEvent = ref<Event | null>(null);

  // Computed
  const filteredEvents = computed(() => {
    if (!activeTagFilter.value) return events.value;
    return events.value.filter(
      (event) => event.tag.id === activeTagFilter.value
    );
  });

  const getEventsForDate = computed(() => (dateString: string) => {
    return filteredEvents.value.filter((event) =>
      isSameDateString(event.date, dateString)
    );
  });

  const getEventCountForDate = computed(() => (dateString: string) => {
    return getEventsForDate.value(dateString).length;
  });

  const getTagById = computed(() => (tagId: string) => {
    return tags.value.find((tag) => tag.id === tagId) || tags.value[0];
  });

  // Actions
  const createEvent = (eventData: CreateEventData): Event => {
    const tag = getTagById.value(eventData.tagId);
    const now = new Date().toISOString();

    const newEvent: Event = {
      id: generateId(),
      title: eventData.title,
      description: eventData.description,
      date: eventData.date,
      time: eventData.time,
      tag,
      createdAt: now,
      updatedAt: now,
    };

    events.value.push(newEvent);
    return newEvent;
  };

  const updateEvent = (
    eventId: string,
    updates: Partial<CreateEventData>
  ): Event | null => {
    const eventIndex = events.value.findIndex((e) => e.id === eventId);
    if (eventIndex === -1) return null;

    const event = events.value[eventIndex];
    const updatedEvent: Event = {
      ...event,
      ...updates,
      tag: updates.tagId ? getTagById.value(updates.tagId) : event.tag,
      updatedAt: new Date().toISOString(),
    };

    events.value[eventIndex] = updatedEvent;
    return updatedEvent;
  };

  const deleteEvent = (eventId: string): boolean => {
    const initialLength = events.value.length;
    events.value = events.value.filter((e) => e.id !== eventId);
    return events.value.length < initialLength;
  };

  const setCurrentDate = (date: Date) => {
    currentDate.value = date;
  };

  const setSelectedDate = (date: Date | null) => {
    selectedDate.value = date;
  };

  const setActiveTagFilter = (tagId: string | null) => {
    activeTagFilter.value = tagId;
  };

  const openEventModal = (event?: Event) => {
    editingEvent.value = event || null;
    isEventModalOpen.value = true;
  };

  const closeEventModal = () => {
    isEventModalOpen.value = false;
    editingEvent.value = null;
  };

  const createTag = (name: string, color: string): EventTag => {
    const newTag: EventTag = {
      id: generateId(),
      name,
      color,
    };
    tags.value.push(newTag);
    return newTag;
  };

  const exportEvents = (): string => {
    return JSON.stringify(events.value, null, 2);
  };

  const importEvents = (jsonData: string): boolean => {
    try {
      const importedEvents = JSON.parse(jsonData) as Event[];
      // Validate structure
      if (!Array.isArray(importedEvents)) return false;

      events.value = importedEvents;
      return true;
    } catch {
      return false;
    }
  };

  return {
    // State
    events,
    tags,
    currentDate,
    selectedDate,
    activeTagFilter,
    isEventModalOpen,
    editingEvent,

    // Computed
    filteredEvents,
    getEventsForDate,
    getEventCountForDate,
    getTagById,

    // Actions
    createEvent,
    updateEvent,
    deleteEvent,
    setCurrentDate,
    setSelectedDate,
    setActiveTagFilter,
    openEventModal,
    closeEventModal,
    createTag,
    exportEvents,
    importEvents,
  };
});
