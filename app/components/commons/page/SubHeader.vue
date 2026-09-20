<template>
  <div class="flex items-center justify-between">
    <div class="flex flex-col gap-2">
      <div
        v-if="showBackButton"
        @click="onClickBackButton"
        class="flex items-center gap-1 cursor-pointer"
      >
        <ArrowLeftIcon class="text-(--text-purple-2)" :size="16" />
        <span class="text-sm text-(--text-purple-2)">Voltar</span>
      </div>
      <h2 class="text-(--text-purple-1) font-semibold text-2xl">{{ title }}</h2>
    </div>

    <slot name="actions" />
  </div>
</template>

<script setup lang="ts">
import { ArrowLeftIcon } from "lucide-vue-next";

defineProps<{
  title: string;
  showBackButton?: boolean;
}>();

const router = useRouter();

const onClickBackButton = () => {
  router.back();
};
</script>
