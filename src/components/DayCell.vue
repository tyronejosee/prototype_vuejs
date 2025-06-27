<template>
  <div
    class="min-h-[100px] p-2 border border-gray-200 dark:border-gray-700 cursor-pointer transition-all hover:bg-gray-50 dark:hover:bg-gray-800"
    :class="{
      'bg-gray-50 dark:bg-gray-900': !day.isCurrentMonth,
      'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700':
        isSelected,
      'ring-2 ring-blue-500 ring-inset': day.isToday,
    }"
    @click="handleClick"
  >
    <div class="flex items-center justify-between mb-2">
      <span
        class="text-sm font-medium"
        :class="{
          'text-gray-400 dark:text-gray-600': !day.isCurrentMonth,
          'text-blue-600 dark:text-blue-400 font-bold': day.isToday,
          'text-gray-900 dark:text-gray-100':
            day.isCurrentMonth && !day.isToday,
        }"
      >
        {{ dayNumber }}
      </span>

      <div
        v-if="eventCount > 0"
        class="flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-blue-500 rounded-full"
      >
        {{ eventCount > 9 ? "9+" : eventCount }}
      </div>
    </div>

    <!-- Solo símbolos de eventos -->
    <div class="flex flex-wrap gap-1 mt-2">
      <template v-for="event in visibleDots" :key="event.id">
        <span
          class="inline-block w-2.5 h-2.5 rounded-full"
          :style="{ backgroundColor: event.tag?.color || '#3b82f6' }"
        ></span>
      </template>
      <span
        v-if="hiddenEventCount > 0"
        class="text-xs text-gray-500 dark:text-gray-400 font-medium"
      >
        +{{ hiddenEventCount }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { CalendarDay } from "@/types";
import { sortEventsByTime } from "@/utils/dateHelpers";

interface Props {
  day: CalendarDay;
  isSelected: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  click: [date: Date];
}>();

const dayNumber = computed(() => props.day.date.getDate());
const eventCount = computed(() => props.day.events.length);

const sortedEvents = computed(() => sortEventsByTime(props.day.events));
const visibleDots = computed(() => sortedEvents.value.slice(0, 3));
const hiddenEventCount = computed(() => Math.max(0, eventCount.value - 3));

const handleClick = () => {
  emit("click", props.day.date);
};
</script>
