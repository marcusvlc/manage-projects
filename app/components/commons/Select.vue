<template>
  <div ref="selectElement" class="relative w-full">
    <button
      :id="id"
      class="flex h-10 w-full items-center justify-between rounded-lg border border-(--gray-base-1) bg-white px-4 text-left text-base text-(--gray-base-1) transition-colors hover:border-(--text-purple-2) focus-visible:border-(--text-purple-2) focus-visible:outline-2 focus-visible:outline-(--text-purple-2) focus-visible:outline-offset-2"
      type="button"
      :aria-expanded="isOpen"
      :aria-controls="`${id}-options`"
      @click="isOpen = !isOpen"
    >
      <span>{{ selectedOption?.label || placeholder }}</span>
      <ChevronUp
        v-if="isOpen"
        :size="22"
        class="shrink-0 text-(--text-purple-2)"
        aria-hidden="true"
      />
      <ChevronDown
        v-else
        :size="22"
        class="shrink-0 text-(--gray-base-1)"
        aria-hidden="true"
      />
    </button>

    <ul
      v-if="isOpen"
      :id="`${id}-options`"
      class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-(--text-purple-2) bg-white py-1 shadow-lg"
      role="listbox"
      :aria-labelledby="id"
    >
      <li v-for="option in options" :key="option.id" role="option">
        <button
          class="w-full px-4 py-3 text-left text-base text-(--gray-base-1) transition-colors hover:bg-(--bg-purple-light)"
          :class="
            selectedOption?.id === option.id
              ? 'bg-(--bg-purple-light) text-(--text-purple-1)'
              : ''
          "
          type="button"
          :aria-selected="selectedOption?.id === option.id"
          @click="selectOption(option)"
        >
          {{ option.label }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ChevronDown, ChevronUp } from "lucide-vue-next";

export interface SelectOption {
  id: string | number;
  label: string;
}

const props = withDefaults(
  defineProps<{
    options: SelectOption[];
    placeholder?: string;
    id?: string;
  }>(),
  {
    placeholder: "Selecione uma opção",
    id: "select",
  },
);

const model = defineModel<SelectOption | null>({ default: null });
const isOpen = ref(false);
const selectElement = ref<HTMLElement | null>(null);

const selectedOption = computed(() =>
  props.options.find((option) => option.id === model.value?.id),
);

const selectOption = (option: SelectOption) => {
  model.value = option;
  isOpen.value = false;
};

const closeOnOutsideClick = (event: MouseEvent) => {
  if (!selectElement.value?.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => document.addEventListener("click", closeOnOutsideClick));
onBeforeUnmount(() =>
  document.removeEventListener("click", closeOnOutsideClick),
);
</script>
