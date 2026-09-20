<template>
  <div class="flex flex-1 flex-col">
    <ProjectsLoading v-if="isLoading" />
    <ProjectsEmpty v-else-if="!projects.length" />

    <div v-else>{{ projects }}</div>
  </div>
</template>

<script lang="ts" setup>
const { getProjects } = useProjectsApi();
const { projects, setProjects } = useProjectsStore();
const isLoading = ref(true);

const { data, error } = useAsyncData("projects", () => getProjects(), {
  server: false,
});

watch(
  [data, error],
  ([storedProjects, loadError]) => {
    if (storedProjects) {
      setProjects(storedProjects);
    }

    if (loadError) {
      console.error("Erro ao carregar projetos:", loadError);
    }

    if (storedProjects || loadError) {
      isLoading.value = false;
    }
  },
  { immediate: true },
);
</script>
