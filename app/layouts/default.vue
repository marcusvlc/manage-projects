<template>
  <div class="flex flex-col min-h-screen">
    <div class="h-(--header-height)">
      <Header
        v-if="!showProjectsSearch"
        @open-search="showProjectsSearch = true"
      />

      <CommonsFilterSearch
        v-else
        :search-term="searchTerm"
        :history="searchTerms"
        @on-search="handleSearch"
        @on-clear="handleClearSearch"
        @remove-history="handleRemoveSearchTerm"
        placeholder="Digite o nome do projeto..."
      />
    </div>

    <div
      class="flex flex-1 flex-col bg-(--bg-purple-light) pt-15 pb-15 pl-10 pr-10"
    >
      <ProjectsLoading v-if="isLoading" />
      <NuxtPage v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
const { isLoading } = useProjectsLoader();
const { searchTerm } = useProjectFilters();
const { getTerms, saveTerm, removeTerm } = useProjectsTermsApi();
const { $toast } = useNuxtApp();

const showProjectsSearch = ref(false);
const searchTerms = ref<string[]>([]);

onMounted(() => {
  searchTerms.value = getTerms();
});

const handleSearch = (term: string) => {
  if (term.length <= 2) {
    $toast.info("A busca deve conter pelo menos 3 caracteres.");
    return;
  }

  searchTerm.value = term;
  saveTerm(term);
  searchTerms.value = getTerms();
  showProjectsSearch.value = false;
};

const handleClearSearch = () => {
  searchTerm.value = "";
  showProjectsSearch.value = false;
};

const handleRemoveSearchTerm = (termIndex: number) => {
  removeTerm(termIndex);
  searchTerms.value = getTerms();
};
</script>
