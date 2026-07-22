<template>
  <div class="flex flex-col h-full">
    <!-- Loading State -->
    <div v-if="store.loading" class="flex justify-center items-center py-12 flex-1">
      <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-500"></div>
    </div>
    
    <!-- Error State -->
    <div v-else-if="store.error" class="bg-red-50 text-red-600 p-6 m-8 rounded-xl border border-red-200 flex flex-col items-center gap-3">
      <svg class="w-10 h-10 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      <p class="font-semibold text-sm">{{ store.error }}</p>
      <button @click="retryFetch" class="btn-gradient px-5 py-2 text-sm font-bold text-white rounded-xl shadow-sm hover:opacity-90 transition-all mt-1">
        Retry
      </button>
    </div>

    <!-- Data Table -->
    <div v-else class="flex-1 mt-4">
      <TaskDataTable @edit="openEditModal" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useTaskStore } from '~/stores/taskStore'
import type { Task } from '~/stores/taskStore'

const store = useTaskStore()

onMounted(async () => {
  await store.fetchTasks()
})

const openEditModal = (task: Task) => {
  store.openModal(task)
}

const retryFetch = async () => {
  store.error = null
  store.hasFetchedInitialData = false
  await store.fetchTasks()
}
</script>
