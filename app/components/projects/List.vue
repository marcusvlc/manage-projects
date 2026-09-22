<template>
  <TransitionGroup
    tag="div"
    class="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
    enter-active-class="transition-opacity duration-150"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-150"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <ProjectsCard
      v-for="project in projects"
      :key="project.id"
      :project="project"
      :highlight-term="searchTerm"
      @on-favorite="emit('onFavorite', $event)"
      @on-edit="emit('onEdit', $event)"
      @on-remove="emit('onRemove', $event)"
    />
  </TransitionGroup>
</template>

<script lang="ts" setup>
import type { StoredProject } from "~/types/projects/project-types";

const emit = defineEmits<{
  onFavorite: [project: StoredProject];
  onEdit: [project: StoredProject];
  onRemove: [project: StoredProject];
}>();

const { searchTerm } = useProjectFilters();

defineProps<{
  projects: StoredProject[];
}>();
</script>
