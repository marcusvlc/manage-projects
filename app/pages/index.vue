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

      <ProjectsList class="mt-4" :projects="projects" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { CirclePlus } from "lucide-vue-next";

const { getProjects } = useProjectsApi();
const { projects, setProjects } = useProjectsStore();
const router = useRouter();

const isLoading = ref(true);

const { data, error } = useAsyncData("projects", () => getProjects(), {
  server: false,
});

const goToCreatePage = () => {
  router.push("/create");
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
