<template>
  <div class="min-h-screen bg-surface">
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
useHead({ 
  meta: [
    { name: 'theme-color', content: '#091426' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { charset: 'utf-8' }
  ]
})
</script>

<style scoped>
</style>
