<template>
  <div class="flex flex-1 flex-col">
    <ProjectsEmpty v-if="!projects.length" />

    <div v-else>Content!</div>
  </div>
</template>

<script lang="ts" setup>
const { projects } = useProjectsStore();
</script>
