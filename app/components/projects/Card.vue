<template>
  <article
    class="flex h-107.5 w-full max-w-86.5 flex-col overflow-hidden rounded-[20px] border border-(--gray-border-1) bg-white shadow-sm"
  >
    <div
      class="relative aspect-3/2 shrink-0 overflow-hidden bg-(--bg-purple-1)"
    >
      <img
        v-if="projectImage"
        class="h-full w-full object-cover"
        :src="projectImage"
        :alt="`Capa do projeto ${project.name}`"
      />

      <div class="absolute bottom-4 right-4 flex items-center gap-4">
        <button
          class="flex h-8 w-8 cursor-pointer items-center justify-center text-white drop-shadow-md"
          type="button"
          aria-label="Favoritar projeto"
        >
          <Star
            :size="28"
            :fill="starColor"
            stroke="#ffffff"
            stroke-width="2"
            @click="onFavoriteProject"
          />
        </button>

        <button
          class="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white text-(--text-purple-1) shadow-md"
          type="button"
          aria-label="Mais opções do projeto"
        >
          <Ellipsis :size="22" />
        </button>
      </div>
    </div>

    <div
      class="flex min-h-0 flex-1 flex-col justify-center space-y-4 px-7 pb-6 pt-6 text-(--gray-base-1)"
    >
      <div class="border-b border-(--gray-border-1) pb-4">
        <h4 class="text-2xl font-bold text-(--text-purple-1)">
          {{ project.name }}
        </h4>
        <p class="mt-1 text-xl">
          <strong class="font-bold text-sm">Cliente:</strong>
          <span class="ml-2 text-sm">{{ project.customer }}</span>
        </p>
      </div>

      <div class="flex items-center gap-4 text-md">
        <CalendarDays :size="28" stroke-width="1.8" />
        <span>{{ humanizeDate(new Date(project.initDate)) }}</span>
      </div>

      <div class="flex items-center gap-4 text-md">
        <CalendarCheck2 :size="28" stroke-width="1.8" />
        <span>{{ humanizeDate(new Date(project.endDate)) }}</span>
      </div>
    </div>
  </article>
</template>

<script lang="ts" setup>
import type { StoredProject } from "~/types/projects/project-types";
import { CalendarCheck2, CalendarDays, Ellipsis, Star } from "lucide-vue-next";
import coverImage from "~/assets/images/cover.png";

const emit = defineEmits<{
  onFavorite: [project: StoredProject];
}>();

const props = defineProps<{
  project: StoredProject;
}>();

const { humanizeDate } = useDateUtils();

const project = props.project;

const projectImage = computed(() => props.project.coverImage || coverImage);
const starColor = computed(() =>
  props.project.favorited ? "var(--bg-gold-1)" : "none",
);

const onFavoriteProject = () => {
  emit("onFavorite", props.project);
};
</script>
