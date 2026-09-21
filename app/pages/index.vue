<template>
  <div class="flex flex-1 flex-col">
    <ProjectsLoading v-if="isLoading" />
    <ProjectsEmpty v-else-if="!projects.length" />

    <div v-else>
      <CommonsPageSubHeader
        title="Projetos"
        :description="`(${projects.length})`"
      >
        <template #actions>
          <CommonsButton
            class="w-45"
            label="Novo projeto"
            :-icon="CirclePlus"
            @click="goToCreatePage"
          />
        </template>
      </CommonsPageSubHeader>

      <ProjectsList
        @on-favorite="handleFavoriteProject"
        class="mt-4"
        :projects="projects"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { CirclePlus } from "lucide-vue-next";
import type { StoredProject } from "~/types/projects/project-types";

const { getProjects, updateProject } = useProjectsApi();
const { projects, setProjects, toggleProjectFavorited } = useProjectsStore();
const router = useRouter();
const { $toast } = useNuxtApp();

const isLoading = ref(true);

const { data, error } = useAsyncData("projects", () => getProjects(), {
  server: false,
});

const goToCreatePage = () => {
  router.push("/create");
};

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
