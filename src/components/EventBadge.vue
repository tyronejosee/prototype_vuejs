<template>
  <div
    class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white shadow-sm"
    :class="tag.color"
  >
    <span class="truncate">{{ event.title }}</span>
    <span v-if="event.time" class="ml-1 opacity-75">{{ formattedTime }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { Event } from "@/types";
import { formatTime } from "@/utils/dateHelpers";

interface Props {
  event: Event;
}

const props = defineProps<Props>();

const tag = computed(() => props.event.tag);
const formattedTime = computed(() => formatTime(props.event.time || ""));
</script>
