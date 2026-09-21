<template>
  <div class="flex items-center gap-4">
    <CommonsRadioInput v-model="onlyFavorites" label="Apenas favoritos" />

    <div>
      <CommonsSelect :options="sortingOptions" v-model="sortingBy" />
    </div>
  </div>
</template>

<script setup lang="ts">
const { onlyFavorites, sortingOptions, sortingBy } = useProjectFilters();
</script>
