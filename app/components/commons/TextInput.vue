<template>
  <input
    v-model="model"
    type="text"
    :aria-invalid="error ? 'true' : undefined"
  />
</template>

<script lang="ts" setup>
const model = defineModel<string>();

defineProps<{
  error?: boolean;
}>();
</script>
