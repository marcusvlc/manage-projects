<template>
  <label
    class="relative inline-flex cursor-pointer items-center gap-1.5 text-xs text-(--gray-base-1)"
  >
    <input
      v-model="model"
      class="peer sr-only"
      type="checkbox"
      :aria-label="label"
    />
    <span
      class="inline-flex h-5 w-9 rounded-full bg-(--gray-base-1) p-0.5 transition-colors duration-200 peer-checked:bg-(--bg-gold-1) peer-focus-visible:outline-2 peer-focus-visible:outline-(--text-purple-2) peer-focus-visible:outline-offset-2"
      aria-hidden="true"
    />
    <span
      class="pointer-events-none absolute left-0.5 top-0.5 size-3.5 rounded-full bg-white transition-transform duration-200 peer-checked:translate-x-4"
      aria-hidden="true"
    />
    <span class="text-(--text-purple-3)" v-if="label">{{ label }}</span>
  </label>
</template>

<script setup lang="ts">
const model = defineModel<boolean>({ default: false });

defineProps<{
  label?: string;
}>();
</script>
