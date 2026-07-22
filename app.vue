<template>
  <div class="flex flex-col min-h-screen bg-[#f9fafb] font-sans">
    <AppNavbar />
    
    <main class="flex-1 w-full max-w-7xl mx-auto py-8 px-4">
      <NuxtPage />
    </main>

    <!-- Global Modal Overlay -->
    <div v-if="store.isModalOpen" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true" @click="store.closeModal()">
          <div class="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"></div>
        </div>
        
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <div class="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full p-8 border border-gray-100">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-bold text-gray-900 tracking-tight">
              {{ store.taskToEdit ? 'Edit Task' : 'Create New Task' }}
            </h3>
            <button @click="store.closeModal()" class="text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-full p-2 transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
          
          <TaskForm 
            :initial-task="store.taskToEdit" 
            @submit="handleFormSubmit" 
            @cancel="store.closeModal()" 
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTaskStore } from '~/stores/taskStore'
import type { Task } from '~/stores/taskStore'

const store = useTaskStore()

const handleFormSubmit = (taskData: Task | Omit<Task, 'id' | 'logs'>) => {
  if (store.taskToEdit) {
    store.editTask(taskData as Task)
  } else {
    store.addTask(taskData as Omit<Task, 'id' | 'logs'>)
  }
  store.closeModal()
}
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(5px);
}
</style>
