<template>
  <div ref="dropdownElement" class="relative" :class="isOpen ? 'z-30' : 'z-0'">
    <button
      class="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white text-(--text-purple-1) shadow-md transition-colors hover:bg-(--bg-purple-light) focus-visible:outline-2 focus-visible:outline-(--text-purple-2) focus-visible:outline-offset-2"
      type="button"
      aria-label="Mais opções do projeto"
      :aria-expanded="isOpen"
      @click.stop="isOpen = !isOpen"
    >
      <Ellipsis :size="22" />
    </button>

    <ul
      v-if="isOpen"
      class="absolute right-0 top-full z-20 mt-2 w-72 overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-(--gray-border-1)"
      role="menu"
    >
      <li v-for="(option, index) in options" :key="option.id" role="none">
        <button
          class="flex w-full cursor-pointer items-center gap-4 px-6 py-3 text-left text-lg text-(--text-purple-2) transition-colors hover:bg-(--bg-purple-light)"
          :class="index > 0 ? 'border-t border-(--gray-border-1)' : ''"
          type="button"
          role="menuitem"
          @click="selectOption(option)"
        >
          <component :is="option.icon" :size="24" stroke-width="1.8" />
          <span>{{ option.label }}</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { Ellipsis } from "lucide-vue-next";
import type { Component } from "vue";

export interface DropdownOption {
  id: string | number;
  icon: Component;
  label: string;
  onClick: () => void;
}

defineProps<{
  options: DropdownOption[];
}>();

const isOpen = ref(false);
const dropdownElement = ref<HTMLElement | null>(null);

const selectOption = (option: DropdownOption) => {
  option.onClick();
  isOpen.value = false;
};

const closeOnOutsideClick = (event: MouseEvent) => {
  if (!dropdownElement.value?.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => document.addEventListener("click", closeOnOutsideClick));
onBeforeUnmount(() =>
  document.removeEventListener("click", closeOnOutsideClick),
);
</script>
