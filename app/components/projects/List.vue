<template>
  <div
    class="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
  >
    <ProjectsCard
      v-for="project in projects"
      :key="project.id"
      :project="project"
      @on-favorite="emit('onFavorite', $event)"
    />
  </div>
</template>

<script lang="ts" setup>
import type { StoredProject } from "~/types/projects/project-types";

const emit = defineEmits<{
  onFavorite: [project: StoredProject];
}>();

defineProps<{
  projects: StoredProject[];
}>();
</script>
