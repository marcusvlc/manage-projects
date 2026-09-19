<template>
  <header
    class="text-white bg-(--bg-purple-1) h-(--header-height) flex items-center justify-center shadow-[40px]"
  >
    <div class="flex items-center gap-2">
      <img :src="symbolImage" alt="Clicksign" class="h-18 w-auto" />
      <span class="text-xl"
        >Gerenciador <br />
        de Projetos</span
      >
    </div>
  </header>
</template>

<script setup lang="ts">
import symbolImage from "~/assets/images/symbol.png";
</script>
