<template>
  <div
    class="text-center rounded flex-1 bg-white flex flex-col items-center justify-center gap-5"
  >
    <VueSpinner size="48px" color="var(--text-purple-1)" />

    <p class="text-gray-500 text-md">
      Estamos carregando os projetos, aguarde...
    </p>
  </div>
</template>

<script setup lang="ts">
import { VueSpinner } from "vue3-spinners";
</script>
