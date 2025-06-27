<template>
  <div
    class="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
  >
    <!-- Calendar Header -->
    <div
      class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700"
    >
      <div class="flex items-center space-x-4">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
          {{ monthName }}
        </h2>
        <button
          @click="goToToday"
          class="px-3 py-1 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors"
        >
          Today
        </button>
      </div>

      <div class="flex items-center space-x-2">
        <button
          @click="goToPreviousMonth"
          class="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
        >
          <ChevronLeft class="w-5 h-5" />
        </button>
        <button
          @click="goToNextMonth"
          class="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
        >
          <ChevronRight class="w-5 h-5" />
        </button>
      </div>
    </div>

    <!-- Weekday Headers -->
    <div class="grid grid-cols-7 border-b border-gray-200 dark:border-gray-700">
      <div
        v-for="day in weekdays"
        :key="day"
        class="p-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800"
      >
        {{ day }}
      </div>
    </div>

    <!-- Calendar Days -->
    <div class="grid grid-cols-7">
      <DayCell
        v-for="day in calendarDays"
        :key="day.date.toISOString()"
        :day="day"
        :is-selected="isDateSelected(day.date)"
        @click="selectDate"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronLeft, ChevronRight } from "lucide-vue-next";
import { useCalendar } from "@/composables/useCalendar";
import DayCell from "./DayCell.vue";

const {
  calendarDays,
  monthName,
  goToPreviousMonth,
  goToNextMonth,
  goToToday,
  selectDate,
  isDateSelected,
} = useCalendar();

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
</script>
