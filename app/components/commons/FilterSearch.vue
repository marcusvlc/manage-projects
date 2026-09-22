<template>
  <div ref="searchElement" class="relative h-(--header-height) w-screen">
    <div
      class="flex h-full items-center gap-4 overflow-hidden border border-(--gray-border-1) bg-white px-3"
      :class="isHistoryOpen ? 'rounded-t-lg' : 'rounded-lg'"
    >
      <Search
        :size="16"
        class="shrink-0 text-(--text-purple-2)"
        aria-hidden="true"
      />
      <input
        ref="searchInput"
        v-model="search"
        type="text"
        class="h-full min-w-0 flex-1 appearance-none! border-0! bg-transparent px-2 text-md text-(--gray-base-1) outline-none placeholder:text-(--gray-base-1)"
        :placeholder="props.placeholder"
        @keydown.enter="handleSearch"
      />
      <button
        class="cursor-pointer text-(--gray-base-1) transition-colors hover:text-(--text-purple-2)"
        type="button"
        aria-label="Limpar busca"
        @click="emit('onClear')"
      >
        <X :size="16" />
      </button>
    </div>

    <ul
      v-if="isHistoryOpen"
      class="absolute left-0 top-full z-30 w-full overflow-hidden rounded-b-lg border border-t-0 border-(--gray-border-1) bg-white shadow-[0px_4px_4px_0px_#00000040]"
      role="listbox"
    >
      <li
        v-for="(term, index) in props.history"
        :key="`${term}-${index}`"
        class="flex h-10 cursor-pointer items-center border-b border-(--gray-border-1) px-3 transition-colors hover:bg-gray-50 last:border-b-0"
        @click="emit('onSearch', term)"
      >
        <History
          :size="14"
          class="shrink-0 text-(--gray-base-1)"
          aria-hidden="true"
        />
        <span class="min-w-0 flex-1 truncate px-2 text-xs text-(--gray-base-1)">
          {{ term }}
        </span>
        <button
          class="cursor-pointer text-(--gray-base-1) transition-colors hover:text-(--text-purple-2)"
          type="button"
          aria-label="Remover pesquisa do histórico"
          @click.stop="emit('remove-history', index)"
        >
          <X :size="14" />
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { History, Search, X } from "lucide-vue-next";

const props = withDefaults(
  defineProps<{
    searchTerm?: string;
    placeholder?: string;
    history?: string[];
  }>(),
  {
    placeholder: "Digite sua busca",
    history: () => [],
  },
);

const emit = defineEmits<{
  "remove-history": [index: number];
  onSearch: [term: string];
  onClear: [];
}>();

const search = ref(props.searchTerm ?? "");
const searchElement = ref<HTMLElement | null>(null);
const searchInput = ref<HTMLInputElement | null>(null);
const isHistoryOpen = computed(() => props.history.length > 0);

const handleSearch = () => {
  const term = search.value.trim();

  if (!term) return;

  emit("onSearch", term);
};

const handleOutsideClick = (event: MouseEvent) => {
  if (!searchElement.value?.contains(event.target as Node)) {
    handleSearch();
  }
};

onMounted(() => {
  searchInput.value?.focus();

  nextTick(() => {
    document.addEventListener("click", handleOutsideClick);
  });
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleOutsideClick);
});
</script>
