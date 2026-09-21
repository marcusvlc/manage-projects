<template>
  <div
    class="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
  >
    <ProjectsCard
      v-for="(project, index) in projects"
      :key="index"
      :project="project"
    />
  </div>
</template>

<script lang="ts" setup>
import type { StoredProject } from "~/types/projects/project-types";

defineProps<{
  projects: StoredProject[];
}>();
</script>
