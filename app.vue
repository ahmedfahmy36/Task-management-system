<template>
  <div class="flex h-screen font-sans overflow-hidden app-shell">
    <AppSidebar ref="sidebarRef" />

    <div class="flex-1 flex flex-col overflow-y-auto w-full min-w-0">
      <!-- Mobile Top Bar -->
      <div class="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200 shrink-0 z-10">
        <button @click="toggleSidebar" class="p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors focus:outline-none">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
        <span class="font-black tracking-widest gradient-text text-lg">T.M.S</span>
        <button @click="store.openModal()" class="btn-gradient p-2 rounded-xl text-white shadow-sm hover:opacity-90 transition-all focus:outline-none">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
        </button>
      </div>

      <main class="flex-1 p-4 md:p-8 overflow-x-hidden">
        <div class="max-w-7xl mx-auto">
          <NuxtPage />
        </div>
      </main>

      <AppFooter />
    </div>

    <TaskModal />

    <!-- Global Toast Message -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enter-to-class="transform translate-y-0 opacity-100 sm:translate-x-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform translate-y-0 opacity-100 sm:translate-x-0"
      leave-to-class="transform translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
    >
      <div v-if="store.toastMessage" class="fixed bottom-4 right-4 z-50 flex items-center bg-teal-600 text-white px-5 py-3 rounded-xl shadow-lg border border-teal-500 gap-3 max-w-[calc(100vw-2rem)]">
        <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <p class="text-sm font-semibold">{{ store.toastMessage }}</p>
        <button @click="store.toastMessage = null" class="ml-2 hover:bg-teal-700 p-1 rounded-lg transition-colors focus:outline-none">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTaskStore } from '~/stores/taskStore'

const store = useTaskStore()
const sidebarRef = ref<any>(null)

const toggleSidebar = () => {
  if (sidebarRef.value) {
    sidebarRef.value.toggleCollapse()
  }
}
</script>

