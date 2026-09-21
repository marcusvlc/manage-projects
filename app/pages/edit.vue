<template>
  <div class="flex flex-col gap-4">
    <CommonsPageSubHeader title="Editar projeto" show-back-button />

    <div
      class="border border-(--gray-border-1) rounded flex items-center justify-center pt-6 pb-6"
    >
      <ProjectsFormsCreate
        v-if="project"
        class="w-[50%]"
        :initial-project="project"
        @submit="handleProjectEdit"
      />

      <div
        class="flex flex-col items-center justify-center gap-5 text-(--text-purple-2) font-semibold"
        v-else
      >
        <Ghost :size="40" />
        <span>Não é possível editar o projeto com o ID fornecido</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type {
  StoredProject,
  ProjectPayload,
} from "~/types/projects/project-types";
import { Ghost } from "lucide-vue-next";

const route = useRoute();
const project = ref<StoredProject | null>(null);
const { getProjectById } = useProjectsStore();

onBeforeMount(() => {
  const projectId = route.query.projectId;

  if (typeof projectId !== "string") return;

  const searchProject = getProjectById(projectId);

  if (!searchProject) return;

  project.value = searchProject;
});

const handleProjectEdit = (payload: ProjectPayload) => {
  console.log(payload);
};
</script>
