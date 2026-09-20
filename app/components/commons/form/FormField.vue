<template>
  <div class="flex flex-col gap-1">
    <label
      class="font-medium"
      :class="[isOnError ? 'text-(--red-base-2)' : 'text-(--text-purple-2)']"
      v-if="label"
    >
      {{ label }}
      <span
        class="text-xs"
        :class="[isOnError ? 'text-(--red-base-1)' : 'text-(--gray-base-1)']"
        v-if="mandatory"
        >(Obrigatório)</span
      >
    </label>

    <slot name="input"> </slot>

    <label class="text-(--red-base-1) text-xs mt-1" v-if="errorMessage">{{
      errorMessage
    }}</label>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  label?: string;
  mandatory?: boolean;
  errorMessage?: string;
}>();

const isOnError = computed(() => !!props.errorMessage);
</script>
