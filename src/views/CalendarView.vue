<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Prototype VueJS
          </h1>
          <p class="text-gray-600 dark:text-gray-400 mt-1">
            Manage your calendar events
          </p>
        </div>

        <div class="flex items-center space-x-4">
          <button
            @click="openEventModal"
            class="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            <Plus class="w-4 h-4" />
            <span>New Event</span>
          </button>
          <ThemeToggle />
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Main Calendar -->
        <div class="lg:col-span-3">
          <CalendarGrid />
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Tag Filter -->
          <TagFilter />

          <!-- Selected Date Events -->
          <div v-if="selectedDate">
            <EventList
              :events="selectedDateEvents"
              :title="selectedDateTitle"
            />
          </div>

          <!-- Export/Import -->
          <div
            class="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4"
          >
            <h4
              class="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3"
            >
              Data Management
            </h4>
            <div class="space-y-2">
              <button
                @click="exportData"
                class="w-full flex items-center justify-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition-colors"
              >
                <Download class="w-4 h-4" />
                <span>Export Events</span>
              </button>
              <input
                ref="importInput"
                type="file"
                accept=".json"
                class="hidden"
                @change="importData"
              />
              <button
                @click="$refs.importInput?.click()"
                class="w-full flex items-center justify-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition-colors"
              >
                <Upload class="w-4 h-4" />
                <span>Import Events</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Event Modal -->
    <EventModal />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { Plus, Download, Upload } from "lucide-vue-next";
import CalendarGrid from "@/components/CalendarGrid.vue";
import EventModal from "@/components/EventModal.vue";
import EventList from "@/components/EventList.vue";
import TagFilter from "@/components/TagFilter.vue";
import ThemeToggle from "@/components/ThemeToggle.vue";
import { useEventStore } from "@/stores/eventStore";
import { getDayName } from "@/utils/dateHelpers";

const eventStore = useEventStore();
const importInput = ref<HTMLInputElement>();

const selectedDate = computed(() => eventStore.selectedDate);

const selectedDateEvents = computed(() => {
  if (!selectedDate.value) return [];
  const dateString = selectedDate.value.toISOString().split("T")[0];
  return eventStore.getEventsForDate(dateString);
});

const selectedDateTitle = computed(() => {
  if (!selectedDate.value) return "";
  return getDayName(selectedDate.value);
});

const openEventModal = () => {
  eventStore.openEventModal();
};

const exportData = () => {
  const data = eventStore.exportEvents();
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `calendar-events-${
    new Date().toISOString().split("T")[0]
  }.json`;
  link.click();
  URL.revokeObjectURL(url);
};

const importData = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const content = e.target?.result as string;
    const success = eventStore.importEvents(content);

    if (success) {
      alert("Events imported successfully!");
    } else {
      alert("Failed to import events. Please check the file format.");
    }
  };
  reader.readAsText(file);
};
</script>
