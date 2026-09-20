<template>
  <div>
    <div
      class="flex flex-col gap-4 h-43 items-center border border-dotted justify-center rounded border-(--gray-base-1) text-(--gray-base-1)"
    >
      <span>
        {{ label }}
      </span>

      <CommonsButton
        class="w-36"
        variant="secondary"
        label="Selecionar"
        @click="openFileInput"
      />
    </div>
    <input
      ref="fileInput"
      v-show="false"
      id="input-file"
      type="file"
      accept=".jpg,.jpeg,.png,image/jpeg,image/png"
    />
  </div>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    label?: string;
  }>(),
  {
    label: "Escolha uma imagem .jpg ou .png no seu dispositivo",
  },
);

const fileInput = ref<HTMLInputElement | null>(null);

const openFileInput = () => {
  fileInput.value?.click();
};
</script>
