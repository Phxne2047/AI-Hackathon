<template>
  <div class="bg-surface text-on-surface min-h-screen flex flex-col">
    <!-- Screen Reader announcement helper -->
    <NuxtRouteAnnouncer />
    
    <!-- Shared Top Navigation Bar -->
    <TopNavBar />
    
    <!-- Main Content Area representing active routing page -->
    <main class="flex-grow">
      <NuxtPage />
    </main>
    
    <!-- Shared Footer -->
    <FooterBar />
    
    <!-- Shared Floating Chat Widget Assistant -->
    <ChatWidget />
  </div>
</template>
