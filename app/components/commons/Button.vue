<template>
  <button
    :disabled="disabled"
    :style="{
      backgroundColor: bgColor,
      color: textColor,
      borderColor: borderColor,
    }"
    :class="[
      'flex items-center gap-3 rounded-full p-3 border',
      disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
    ]"
    @mousedown="isActive = true"
    @mouseup="isActive = false"
    @mouseleave="isActive = false"
    @click="emit('click')"
  >
    <Icon v-if="Icon" />
    {{ label }}
  </button>
</template>

<script setup lang="ts">
import { ref, toRef } from "vue";

import type { ButtonVariant } from "@/types/button/button-types";

const emit = defineEmits<{
  click: [];
}>();

const props = withDefaults(
  defineProps<{
    label: string;
    variant?: ButtonVariant;
    Icon?: Component;
    disabled?: boolean;
  }>(),
  {
    variant: "primary",
    disabled: false,
  },
);

const isActive = ref(false);

const { bgColor, textColor, borderColor } = useButtonColors(
  toRef(props, "variant"),
  isActive,
);
</script>
