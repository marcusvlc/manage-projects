<template>
  <div
    class="flex min-h-0 w-full flex-1 flex-col items-center justify-center gap-4 rounded bg-white text-center"
  >
    <FilterX :size="48" class="text-(--text-purple-2)" />

    <div>
      <h2 class="text-xl font-semibold text-(--text-purple-1)">
        Nenhum projeto encontrado
      </h2>
      <p class="mt-1 text-sm text-gray-500">
        Nenhum projeto corresponde ao filtro aplicado.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FilterX } from "lucide-vue-next";
</script>
