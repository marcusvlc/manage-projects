<template>
  <div class="flex flex-col gap-4">
    <CommonsPageSubHeader title="Novo Projeto" show-back-button />

    <div
      class="border border-(--gray-border-1) rounded flex items-center justify-center pt-6 pb-6"
    >
      <ProjectsFormsCreate class="w-[50%]" @submit="onCreateProject" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { StoredProject } from "~/types/projects/project-types";

const { saveProject } = useProjectsApi();
const { addProject } = useProjectsStore();

const onCreateProject = async (payload: StoredProject) => {
  try {
    const project = await saveProject(payload);
    if (!project) {
      console.error("Error on Save");
      return;
    }

    addProject(project);
    console.log("SAVE SUCCESSFULL");
  } catch {
    console.error("Error on Save");
  }
};
</script>
