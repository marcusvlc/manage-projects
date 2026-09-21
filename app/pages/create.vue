<template>
  <div class="flex flex-col gap-4">
    <CommonsPageSubHeader title="Novo Projeto" show-back-button />

    <div
      class="border border-(--gray-border-1) rounded flex items-center justify-center pt-6 pb-6"
    >
      <ProjectsFormsCreate
        class="w-[50%]"
        @submit="onCreateProject"
        clear-on-submit
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ProjectPayload } from "~/types/projects/project-types";

const { saveProject } = useProjectsApi();
const { addProject } = useProjectsStore();
const { $toast } = useNuxtApp();

const onCreateProject = async (payload: ProjectPayload) => {
  try {
    const project = await saveProject(payload);
    if (!project) {
      $toast.error(
        "Ocorreu um erro ao criar o projeto, tente novamente mais tarde.",
      );
      return;
    }

    addProject(project);
    $toast.success("Projeto criado com sucesso!");
  } catch {
    $toast.error(
      "Ocorreu um erro ao criar o projeto, tente novamente mais tarde.",
    );
  }
};
</script>
