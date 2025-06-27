<template>
  <div
    class="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
  >
    <div class="p-4 border-b border-gray-200 dark:border-gray-700">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {{ title }}
        </h3>
      </div>
    </div>

    <div class="p-4">
      <div v-if="events.length === 0" class="text-center py-8">
        <Calendar class="w-12 h-12 text-gray-400 mx-auto mb-3" />
        <p class="text-gray-500 dark:text-gray-400">No events for this date</p>
        <button
          @click="handleCreateEvent"
          class="mt-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
        >
          Create your first event
        </button>
      </div>

      <div v-else class="space-y-3">
        <div
          v-for="event in sortedEvents"
          :key="event.id"
          class="flex items-start space-x-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
          @click="handleEditEvent(event)"
        >
          <div
            class="w-3 h-3 rounded-full mt-1 flex-shrink-0"
            :class="event.tag.color"
          />

          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between">
              <h4
                class="text-sm font-medium text-gray-900 dark:text-gray-100 truncate"
              >
                {{ event.title }}
              </h4>
              <span
                v-if="event.time"
                class="text-xs text-gray-500 dark:text-gray-400 font-medium ml-2"
              >
                {{ formatTime(event.time) }}
              </span>
            </div>

            <p
              v-if="event.description"
              class="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2"
            >
              {{ event.description }}
            </p>

            <div class="flex items-center justify-between mt-2">
              <span
                class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white"
                :class="event.tag.color"
              >
                {{ event.tag.name }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Plus, Calendar } from "lucide-vue-next";
import type { Event } from "@/types";
import { useEventStore } from "@/stores/eventStore";
import { sortEventsByTime, formatTime } from "@/utils/dateHelpers";

interface Props {
  events: Event[];
  title: string;
}

const props = defineProps<Props>();
const eventStore = useEventStore();

const sortedEvents = computed(() => sortEventsByTime(props.events));

const handleCreateEvent = () => {
  eventStore.openEventModal();
};

const handleEditEvent = (event: Event) => {
  eventStore.openEventModal(event);
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
