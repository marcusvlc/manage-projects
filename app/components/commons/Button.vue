<template>
  <button
    :disabled="disabled"
    :type="type"
    :style="{
      backgroundColor: bgColor,
      color: textColor,
      borderColor: borderColor,
    }"
    :class="[
      'flex items-center justify-center gap-3 rounded-full p-3 border h-10',
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
    type?: "button" | "submit" | "reset";
    variant?: ButtonVariant;
    Icon?: Component;
    disabled?: boolean;
  }>(),
  {
    variant: "primary",
    disabled: false,
    type: "button",
  },
);

const isActive = ref(false);

const { bgColor, textColor, borderColor } = useButtonColors(
  toRef(props, "variant"),
  isActive,
);
</script>
