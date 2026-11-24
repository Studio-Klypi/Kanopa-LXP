<script setup lang="ts">
import TopBar from '~/components/layout/TopBar.vue';
</script>

<template>
  <UiLayout>
    <TopBar />

    <main class="bg-secondary/25 flex-1 flex flex-col">
      <NuxtPage />
    </main>
  </UiLayout>
</template>
