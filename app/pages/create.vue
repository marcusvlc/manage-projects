<template>
  <div class="p-4">
    <CommonsPageSubHeader title="Novo Projeto" show-back-button />

    <div
      class="border border-(--gray-border-1) rounded flex items-center justify-center p-4"
    >
      <ProjectsFormsCreate class="w-[50%]" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const verifyErrorField = (field: any) => {
  return !!field;
};
</script>
