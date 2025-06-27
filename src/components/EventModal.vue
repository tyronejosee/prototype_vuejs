<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 animate-fade-in"
      @click="handleBackdropClick"
    >
      <div
        class="w-full max-w-md bg-white dark:bg-gray-900 rounded-lg shadow-xl animate-scale-in"
        @click.stop
      >
        <div
          class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700"
        >
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {{ isEditing ? "Edit Event" : "Create Event" }}
          </h3>
          <button
            @click="closeModal"
            class="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-md transition-colors"
          >
            <X class="w-5 h-5" />
          </button>
        </div>

        <form @submit.prevent="handleSubmit" class="p-6 space-y-4">
          <div>
            <label
              for="title"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Title *
            </label>
            <input
              id="title"
              v-model="form.title"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
              placeholder="Enter event title"
            />
          </div>

          <div>
            <label
              for="description"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              v-model="form.description"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100 resize-none"
              placeholder="Enter event description"
            />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label
                for="date"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Date *
              </label>
              <input
                id="date"
                v-model="form.date"
                type="date"
                required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
              />
            </div>

            <div>
              <label
                for="time"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Time
              </label>
              <input
                id="time"
                v-model="form.time"
                type="time"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
              />
            </div>
          </div>

          <div>
            <label
              for="tag"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Tag *
            </label>
            <select
              id="tag"
              v-model="form.tagId"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
            >
              <option value="" disabled>Select a tag</option>
              <option v-for="tag in tags" :key="tag.id" :value="tag.id">
                {{ tag.name }}
              </option>
            </select>
          </div>

          <div class="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              v-if="isEditing"
              type="button"
              @click="handleDelete"
              class="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors"
            >
              Delete
            </button>
            <button
              type="submit"
              class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
            >
              {{ isEditing ? "Update" : "Create" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { X } from "lucide-vue-next";
import { useEventStore } from "@/stores/eventStore";
import type { CreateEventData } from "@/types";

const eventStore = useEventStore();

const isOpen = computed(() => eventStore.isEventModalOpen);
const isEditing = computed(() => !!eventStore.editingEvent);
const tags = computed(() => eventStore.tags);

const form = ref<CreateEventData>({
  title: "",
  description: "",
  date: "",
  time: "",
  tagId: "",
});

const resetForm = () => {
  form.value = {
    title: "",
    description: "",
    date: eventStore.selectedDate?.toISOString().split("T")[0] || "",
    time: "",
    tagId: "",
  };
};

const loadEvent = () => {
  if (eventStore.editingEvent) {
    const event = eventStore.editingEvent;
    form.value = {
      title: event.title,
      description: event.description || "",
      date: event.date,
      time: event.time || "",
      tagId: event.tag.id,
    };
  }
};

watch(
  () => eventStore.isEventModalOpen,
  (isOpen) => {
    if (isOpen) {
      if (eventStore.editingEvent) {
        loadEvent();
      } else {
        resetForm();
      }
    }
  }
);

const closeModal = () => {
  eventStore.closeEventModal();
};

const handleBackdropClick = (event: MouseEvent) => {
  if (event.target === event.currentTarget) {
    closeModal();
  }
};

const handleSubmit = () => {
  if (isEditing.value && eventStore.editingEvent) {
    eventStore.updateEvent(eventStore.editingEvent.id, form.value);
  } else {
    eventStore.createEvent(form.value);
  }
  closeModal();
};

const handleDelete = () => {
  if (
    eventStore.editingEvent &&
    confirm("Are you sure you want to delete this event?")
  ) {
    eventStore.deleteEvent(eventStore.editingEvent.id);
    closeModal();
  }
};
</script>
