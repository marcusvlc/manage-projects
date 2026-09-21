<template>
  <div class="flex flex-col min-h-screen">
    <Header />

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
</script>
