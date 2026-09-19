<template>
  <div
    class="text-center rounded mt-15 mb-15 ml-10 mr-10 flex-1 bg-white flex flex-col items-center justify-center gap-5"
  >
    <h2 class="text-2xl font-semibold text-(--text-purple-1)">
      Nenhum projeto
    </h2>

    <p class="text-gray-500 text-md">
      Clique no botão abaixo para criar o primeiro e gerenciá-lo.
    </p>

    <CommonsButton
      @click="onNewProject"
      label="Novo projeto"
      variant="primary"
      :-icon="CirclePlus"
    />
  </div>
</template>

<script setup lang="ts">
import { CirclePlus } from "lucide-vue-next";

const router = useRouter();

const onNewProject = () => {
  router.push("/create");
};
</script>
