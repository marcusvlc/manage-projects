<template>
  <header
    class="header relative flex items-center justify-center bg-(--bg-purple-1) text-white shadow-[0px_4px_4px_0px_#00000040]"
  >
    <div class="flex items-center gap-2 cursor-pointer" @click="goHome">
      <img :src="symbolImage" alt="Clicksign" class="h-18 w-auto" />
      <span class="text-xl"
        >Gerenciador <br />
        de Projetos
      </span>
    </div>
    <Search
      v-if="route.path === '/'"
      @click.stop="onSearchClick"
      class="absolute right-10 cursor-pointer"
    />
  </header>
</template>

<script setup lang="ts">
import symbolImage from "~/assets/images/symbol.png";
import { Search } from "lucide-vue-next";

const emit = defineEmits<{
  openSearch: [];
}>();

const router = useRouter();
const route = useRoute();

const goHome = () => {
  router.push("/");
};

const onSearchClick = () => {
  emit("openSearch");
};
</script>
