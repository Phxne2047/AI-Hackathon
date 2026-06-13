<template>
  <div class="min-h-screen bg-surface">
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
// Global app setup
useHead({
  meta: [
    { name: 'theme-color', content: '#091426' },
  ],
})
</script>

<style scoped>
/* Global styles are in assets/css/main.css */
</style>

