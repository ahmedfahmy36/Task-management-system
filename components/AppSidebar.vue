<template>
  <!-- Mobile overlay backdrop -->
  <div
    v-if="!isCollapsed && isMobile"
    class="fixed inset-0 bg-slate-900/50 z-40 backdrop-blur-sm transition-opacity"
    @click="isCollapsed = true"
  ></div>

  <aside
    class="sidebar-gradient flex flex-col h-full shrink-0 text-white transition-all duration-300 z-50"
    :class="[
      isMobile
        ? (isCollapsed ? '-translate-x-full fixed left-0 top-0 bottom-0 w-64' : 'translate-x-0 fixed left-0 top-0 bottom-0 w-64 shadow-2xl')
        : (isCollapsed ? 'w-[72px] relative' : 'w-56 relative')
    ]"
  >
    <!-- Toggle Button (Hidden on mobile) -->
    <button
      v-if="!isMobile"
      @click="toggleCollapse"
      class="absolute -right-3 top-8 bg-white text-teal-600 rounded-full p-1 shadow-md hover:bg-teal-50 focus:outline-none z-30 border border-teal-100"
    >
      <svg v-if="!isCollapsed" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"></path>
      </svg>
      <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"></path>
      </svg>
    </button>

    <div class="p-4 flex-1 flex flex-col overflow-y-auto overflow-x-hidden hide-scrollbar">
      <!-- Title -->
      <div class="cursor-pointer mb-10 mt-2 flex items-center justify-center" @click="navigateTo('/')">
        <div class="flex flex-col items-center">
          <span
            class="font-black tracking-widest text-center text-white drop-shadow transition-all duration-300"
            :class="isCollapsed && !isMobile ? 'text-lg' : 'text-2xl'"
          >
            {{ isCollapsed && !isMobile ? 'T' : 'T.M.S' }}
          </span>
          <span
            v-if="!isCollapsed || isMobile"
            class="text-[10px] tracking-[0.3em] text-teal-200 uppercase mt-0.5 font-medium"
          >Task Manager</span>
        </div>
      </div>

      <!-- Navigation List -->
      <nav class="flex-1 space-y-1">
        <p
          v-if="!isCollapsed || isMobile"
          class="text-[10px] tracking-[0.2em] text-cyan-200/60 uppercase font-semibold px-3 mb-2"
        >Views</p>

        <NuxtLink
          to="/"
          class="flex items-center px-3 py-2.5 rounded-xl transition-all font-semibold group"
          :class="route.path === '/' || route.path.startsWith('/task') ? 'bg-white/20 shadow-sm' : 'hover:bg-white/10'"
          :title="isCollapsed && !isMobile ? 'Table View' : ''"
          @click="isMobile && (isCollapsed = true)"
        >
          <svg class="w-5 h-5 shrink-0 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 6h18M3 14h18M3 18h18"></path>
          </svg>
          <span
            class="ml-3 whitespace-nowrap text-sm transition-all duration-200"
            :class="isCollapsed && !isMobile ? 'opacity-0 hidden' : 'opacity-100 block'"
          >Table View</span>
        </NuxtLink>

        <NuxtLink
          to="/schedule"
          class="flex items-center px-3 py-2.5 rounded-xl transition-all font-semibold group"
          :class="route.path === '/schedule' ? 'bg-white/20 shadow-sm' : 'hover:bg-white/10'"
          :title="isCollapsed && !isMobile ? 'Schedule View' : ''"
          @click="isMobile && (isCollapsed = true)"
        >
          <svg class="w-5 h-5 shrink-0 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          <span
            class="ml-3 whitespace-nowrap text-sm transition-all duration-200"
            :class="isCollapsed && !isMobile ? 'opacity-0 hidden' : 'opacity-100 block'"
          >Schedule View</span>
        </NuxtLink>
      </nav>

      <!-- Add Task Button -->
      <div class="mt-auto pt-6">
        <button
          @click="store.openModal()"
          class="sidebar-btn-color bg-white/95 hover:bg-white font-bold transition-all shadow-lg flex justify-center items-center overflow-hidden"
          :class="isCollapsed && !isMobile ? 'w-11 h-11 rounded-full mx-auto p-0' : 'w-full px-4 py-3 rounded-xl text-sm'"
          :title="isCollapsed && !isMobile ? 'Add Task' : ''"
        >
          <svg class="w-5 h-5 shrink-0" :class="isCollapsed && !isMobile ? '' : 'mr-2'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"></path>
          </svg>
          <span v-if="!isCollapsed || isMobile" class="whitespace-nowrap">Add Task</span>
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from '#vue-router'
import { navigateTo } from '#app'
import { useTaskStore } from '~/stores/taskStore'

const route = useRoute()
const store = useTaskStore()
const isCollapsed = ref(false)
const windowWidth = ref(0)

const isMobile = computed(() => windowWidth.value < 768)

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
}

const handleResize = () => {
  windowWidth.value = window.innerWidth
  if (window.innerWidth < 768) {
    isCollapsed.value = true
  }
}

onMounted(() => {
  windowWidth.value = window.innerWidth
  handleResize()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

defineExpose({ isCollapsed, toggleCollapse })
</script>

