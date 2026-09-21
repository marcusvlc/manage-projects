<template>
  <div>
    <CommonsRadioInput v-model="onlyFavorites" label="Apenas favoritos" />
  </div>
</template>

<script setup lang="ts">
const { onlyFavorites } = useProjectFilters();
</script>
