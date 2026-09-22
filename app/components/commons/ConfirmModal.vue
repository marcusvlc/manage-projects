<template>
  <Teleport to="body">
    <div
      v-if="model"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm"
      role="presentation"
      @click="close"
    >
      <section
        class="w-100 h-50 relative flex flex-col rounded bg-white px-4 pb-4 pt-7 text-center"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="`${id}-title`"
        :aria-describedby="`${id}-description`"
        @click.stop
      >
        <div
          class="absolute left-1/2 top-0 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-(--text-purple-2) text-white"
        >
          <component :is="icon" :size="16" stroke-width="2" />
        </div>

        <h2
          :id="`${id}-title`"
          class="border-b border-(--gray-border-1) pb-3 text-xl font-semibold text-(--text-purple-1)"
        >
          {{ title }}
        </h2>

        <div class="h-full flex flex-col items-center justify-center">
          <p :id="`${id}-description`" class="text-[10px] text-(--gray-base-1)">
            {{ description }}
          </p>
          <p
            v-if="subDescription"
            class="mt-1 text-sm text-(--gray-base-1) font-semibold"
          >
            {{ subDescription }}
          </p>
        </div>

        <div class="mt-auto flex justify-center gap-4">
          <button
            class="h-7 w-28 cursor-pointer rounded-full border border-(--text-purple-2) text-xs text-(--text-purple-2) transition-colors hover:bg-(--bg-purple-light)"
            type="button"
            @click="close"
          >
            Cancelar
          </button>
          <button
            class="h-7 w-28 cursor-pointer rounded-full bg-(--text-purple-2) text-xs text-white transition-colors hover:bg-(--text-purple-1)"
            type="button"
            @click="confirm"
          >
            Confirmar
          </button>
        </div>
      </section>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import type { Component } from "vue";

const model = defineModel<boolean>();

withDefaults(
  defineProps<{
    icon: Component;
    title: string;
    description: string;
    subDescription?: string;
    id?: string;
  }>(),
  {
    id: "confirm-modal",
  },
);

const emit = defineEmits<{
  confirm: [];
}>();

const close = () => {
  model.value = false;
};

const confirm = () => {
  emit("confirm");
  close();
};
</script>
