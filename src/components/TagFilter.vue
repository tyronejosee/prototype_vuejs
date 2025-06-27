<template>
  <div
    class="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4"
  >
    <div class="flex items-center justify-between mb-3">
      <h4 class="text-sm font-semibold text-gray-900 dark:text-gray-100">
        Filter by Tag
      </h4>
      <button
        v-if="activeTagFilter"
        @click="clearFilter"
        class="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
      >
        Clear
      </button>
    </div>

    <div class="flex flex-wrap gap-2">
      <button
        v-for="tag in tags"
        :key="tag.id"
        @click="setFilter(tag.id)"
        class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white transition-all hover:scale-105"
        :class="[
          tag.color,
          {
            'ring-2 ring-offset-2 ring-blue-500 dark:ring-offset-gray-900':
              activeTagFilter === tag.id,
            'opacity-60 hover:opacity-80':
              activeTagFilter && activeTagFilter !== tag.id,
          },
        ]"
      >
        {{ tag.name }}
        <span class="ml-1 text-xs opacity-75"
          >({{ getEventCountForTag(tag.id) }})</span
        >
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useEventStore } from "@/stores/eventStore";

const eventStore = useEventStore();

const tags = computed(() => eventStore.tags);
const activeTagFilter = computed(() => eventStore.activeTagFilter);

const getEventCountForTag = (tagId: string): number => {
  return eventStore.events.filter((event) => event.tag.id === tagId).length;
};

const setFilter = (tagId: string) => {
  if (activeTagFilter.value === tagId) {
    eventStore.setActiveTagFilter(null);
  } else {
    eventStore.setActiveTagFilter(tagId);
  }
};

const clearFilter = () => {
  eventStore.setActiveTagFilter(null);
};
</script>
