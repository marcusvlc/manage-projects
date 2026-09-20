<template>
  <div>
    <div
      v-if="previewUrl"
      class="relative max-h-[calc(100vh-12rem)] overflow-hidden rounded border border-dotted border-(--gray-base-1)"
    >
      <img
        class="block h-auto max-h-[calc(100vh-12rem)] w-full object-contain"
        :src="previewUrl"
        alt="Pré-visualização da imagem enviada"
      />

      <button
        class="absolute cursor-pointer right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-(--gray-base-1) shadow"
        type="button"
        aria-label="Remover imagem"
        @click="removeFile"
      >
        <Trash2 :size="16" />
      </button>
    </div>

    <div
      v-else
      class="flex h-43 flex-col items-center justify-center gap-4 rounded border border-dotted border-(--gray-base-1) text-(--gray-base-1)"
    >
      <template v-if="isLoading">
        <Upload :size="24" />
        <span>Carregando arquivo</span>
      </template>

      <template v-else>
        <span>{{ label }}</span>

        <CommonsButton
          class="w-36"
          variant="secondary"
          label="Selecionar"
          @click="openFileInput"
        />
      </template>
    </div>

    <input
      ref="fileInput"
      v-show="false"
      id="input-file"
      type="file"
      accept=".jpg,.jpeg,.png,image/jpeg,image/png"
      @change="handleFileChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { Trash2, Upload } from "lucide-vue-next";

const model = defineModel<string>();

withDefaults(
  defineProps<{
    label?: string;
  }>(),
  {
    label: "Escolha uma imagem .jpg ou .png no seu dispositivo",
  },
);

const emit = defineEmits<{
  uploaded: [base64: string];
  "uploaded:removed": [];
}>();

const fileInput = ref<HTMLInputElement | null>(null);
const isLoading = ref(false);
const previewUrl = ref<string | null>(null);

const openFileInput = () => {
  fileInput.value?.click();
};

const handleFileChange = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];

  if (!file) return;

  isLoading.value = true;

  await nextTick();
  await new Promise<void>((resolve) => setTimeout(resolve, 300));

  const reader = new FileReader();

  reader.onload = () => {
    if (typeof reader.result !== "string") {
      isLoading.value = false;
      return;
    }

    previewUrl.value = reader.result;
    isLoading.value = false;
    model.value = reader.result;
  };

  reader.onerror = () => {
    isLoading.value = false;
    input.value = "";
  };

  reader.readAsDataURL(file);
};

const removeFile = () => {
  previewUrl.value = null;
  isLoading.value = false;

  if (fileInput.value) {
    fileInput.value.value = "";
  }

  model.value = "";
};
</script>
