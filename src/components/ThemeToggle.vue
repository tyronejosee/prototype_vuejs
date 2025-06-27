<template>
  <button
    @click="toggleTheme"
    class="p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
    :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
  >
    <Sun v-if="isDark" class="w-5 h-5 text-yellow-500" />
    <Moon v-else class="w-5 h-5 text-gray-600" />
  </button>
</template>

<script setup lang="ts">
import { Sun, Moon } from "lucide-vue-next";
import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark();
const toggleTheme = () => {
  isDark.value = !isDark.value;
};
</script>
