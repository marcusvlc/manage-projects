<template>
  <div class="flex flex-1 flex-col">
    <ProjectsEmpty v-if="!projects.length" />

    <div v-else class="flex min-h-0 flex-1 flex-col">
      <CommonsPageSubHeader
        title="Projetos"
        class="mb-4"
        :description="`(${projects.length})`"
      >
        <template #actions>
          <div class="flex items-center gap-4">
            <ProjectsFilters />

            <CommonsButton
              class="w-45"
              label="Novo projeto"
              :-icon="CirclePlus"
              @click="goToCreatePage"
            />
          </div>
        </template>
      </CommonsPageSubHeader>

      <ProjectsFilteredEmpty
        class="min-h-0 w-full flex-1"
        v-if="projects.length && !filteredProjects.length"
      />

      <ProjectsList
        v-else
        @on-favorite="handleFavoriteProject"
        @on-edit="goToEditPage"
        @on-remove="handleRemoveProject"
        :projects="filteredProjects"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { CirclePlus } from "lucide-vue-next";
import type { StoredProject } from "~/types/projects/project-types";

const { updateProject } = useProjectsApi();
const { projects, toggleProjectFavorited } = useProjectsStore();
const { filteredProjects } = useProjectFilters(projects);
const router = useRouter();
const { $toast } = useNuxtApp();

const goToCreatePage = () => {
  router.push("/create");
};

const goToEditPage = (project: StoredProject) => {
  router.push({
    path: "/edit",
    query: { projectId: project.id },
  });
};

const handleRemoveProject = () => {};

const handleFavoriteProject = async (project: StoredProject) => {
  try {
    const favorited = toggleProjectFavorited(project.id);
    await updateProject(project);

    const successMessage = favorited
      ? "Projeto adicionado aos favoritos com sucesso"
      : "Você removeu esse projeto dos favoritos";
    $toast.success(successMessage);
  } catch {
    $toast.error("Ocorreu um erro ao favoritar esse projeto");
  }
};
</script>
