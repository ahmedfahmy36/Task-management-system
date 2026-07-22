<template>
  <div class="flex flex-col h-full">
    <!-- Loading State -->
    <div v-if="store.loading" class="flex justify-center items-center py-12 flex-1">
      <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-[#5b51fb]"></div>
    </div>
    
    <!-- Error State -->
    <div v-else-if="store.error" class="bg-red-50 text-red-600 p-4 m-8 rounded-md">
      {{ store.error }}
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
</script>
