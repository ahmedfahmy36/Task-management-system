<template>
  <div class="flex h-screen font-sans overflow-hidden" style="background: #f1f5f9;">
    <AppSidebar />

    <main class="flex-1 overflow-y-auto w-full p-4 md:p-8">
      <div class="max-w-7xl mx-auto">
        <NuxtPage />
      </div>
    </main>

    <!-- Global Modal Overlay -->
    <div v-if="store.isModalOpen" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true" @click="store.closeModal()">
          <div class="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"></div>
        </div>

        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div class="inline-block align-bottom bg-white rounded-2xl text-left shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl w-full p-5 md:p-8 border border-slate-100 mx-4 sm:mx-0 max-h-[90vh] overflow-y-auto relative z-10">
          <!-- Modal Header -->
          <div class="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
            <div>
              <h3 class="text-xl font-bold text-slate-800">
                {{ store.taskToEdit ? 'Edit Task' : 'Create New Task' }}
              </h3>
              <p class="text-sm text-slate-400 mt-0.5">{{ store.taskToEdit ? 'Update task details below.' : 'Fill in the details to add a new task.' }}</p>
            </div>
            <button @click="store.closeModal()" class="text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-full p-2 transition-colors">
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

const handleFormSubmit = (taskData: Task | Omit<Task, 'id' | 'logs' | 'createdAt'>) => {
  if (store.taskToEdit) {
    store.editTask(taskData as Task)
  } else {
    store.addTask(taskData as Omit<Task, 'id' | 'logs' | 'createdAt'>)
  }
  store.closeModal()
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

*, *::before, *::after { box-sizing: border-box; }

body {
  font-family: 'Inter', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}

.page-enter-active, .page-leave-active { transition: all 0.2s ease; }
.page-enter-from, .page-leave-to { opacity: 0; transform: translateY(6px); }
</style>
