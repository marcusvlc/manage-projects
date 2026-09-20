<template>
  <div class="relative">
    <input
      type="date"
      class="w-full pr-8 [&::-webkit-calendar-picker-indicator]:opacity-0"
      :aria-invalid="error ? 'true' : undefined"
      v-model="model"
    />
    <component
      :is="icon"
      v-if="icon"
      class="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-(--gray-base-1)"
      :size="16"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, type Component } from "vue";
import { Calendar } from "lucide-vue-next";

const model = defineModel<Date | null>();

const props = defineProps<{
  error?: boolean;
  Icon?: Component;
}>();

const icon = computed(() => props.Icon ?? Calendar);
</script>
