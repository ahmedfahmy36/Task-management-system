<template>
  <div class="flex h-screen font-sans overflow-hidden app-shell">
    <AppSidebar />

    <div class="flex-1 flex flex-col overflow-y-auto w-full">
      <main class="flex-1 p-4 md:p-8">
        <div class="max-w-7xl mx-auto">
          <NuxtPage />
        </div>
      </main>

      <AppFooter />
    </div>

    <TaskModal />
  </div>
</template>

<script setup lang="ts">
</script>
