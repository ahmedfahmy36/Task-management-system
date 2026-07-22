<template>
  <div class="flex flex-col h-full bg-[#f9fafb]">
    <div class="mb-6 pl-2">
      <button @click="navigateTo('/')" class="text-gray-500 hover:text-[#5b51fb] font-semibold text-sm flex items-center transition-colors">
        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        Back to Tasks
      </button>
    </div>

    <div class="flex-1">
      <div v-if="!task" class="text-center py-12 text-gray-500">
        Task not found.
      </div>
      
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- Left Column: Details -->
        <div class="lg:col-span-2 space-y-6">
          <BaseCard>
            <div class="flex justify-between items-start mb-6">
              <h2 class="text-2xl font-bold text-gray-900 tracking-tight">{{ task.title }}</h2>
              <span 
                class="px-3 py-1 inline-flex text-sm font-bold rounded-full border shadow-sm"
                :class="{
                  'bg-purple-50 text-purple-700 border-purple-200': task.status === 'Pending',
                  'bg-orange-50 text-orange-700 border-orange-200': task.status === 'In Progress',
                  'bg-green-50 text-green-700 border-green-200': task.status === 'Done'
                }"
              >
                {{ task.status }}
              </span>
            </div>
            
            <div v-if="task.image" class="mb-6 rounded-xl overflow-hidden border border-gray-100 shadow-sm">
              <img :src="task.image" alt="Task Image" class="w-full h-auto object-cover max-h-96" />
            </div>
            
            <div class="prose max-w-none text-gray-600 mb-8 whitespace-pre-wrap leading-relaxed">
              {{ task.description || 'No description provided.' }}
            </div>
            
            <div class="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100">
              <div class="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <p class="text-sm font-semibold text-gray-500 mb-1 uppercase tracking-wider">Due Date</p>
                <p class="font-bold text-gray-900">{{ task.dueDate }}</p>
              </div>
              <div class="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <p class="text-sm font-semibold text-gray-500 mb-1 uppercase tracking-wider">Duration</p>
                <p class="font-bold text-gray-900">{{ task.duration ? `${task.duration} minutes` : 'Not set' }}</p>
              </div>
            </div>
          </BaseCard>
        </div>

        <!-- Right Column: Task Log -->
        <div class="space-y-6 flex flex-col h-full">
          <BaseCard class="flex-1 flex flex-col h-[calc(100vh-140px)]">
            <h3 class="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-3">Task Activity Log</h3>
            
            <div class="flex-1 overflow-y-auto mb-4 pr-2 space-y-4">
              <div v-if="task.logs.length === 0" class="text-sm text-gray-400 text-center py-8 font-medium">
                No activity logged yet.
              </div>
              
              <div 
                v-for="log in sortedLogs" 
                :key="log.id" 
                class="bg-gray-50/80 p-4 rounded-xl text-sm border border-gray-100 shadow-sm"
              >
                <p class="text-gray-800 mb-3 leading-relaxed">{{ log.content }}</p>
                <p class="text-[11px] font-semibold text-gray-400 text-right uppercase tracking-wider">{{ formatDate(log.timestamp) }}</p>
              </div>
            </div>
            
            <form @submit.prevent="submitLog" class="pt-4 border-t border-gray-100 shrink-0">
              <textarea
                v-model="newLogContent"
                rows="2"
                class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#5b51fb]/50 focus:border-[#5b51fb] shadow-sm mb-3 bg-gray-50 placeholder-gray-400"
                placeholder="What did you do today?..."
                required
              ></textarea>
              <BaseButton type="submit" variant="primary" class="w-full font-bold shadow-sm py-2">
                Post Update
              </BaseButton>
            </form>
          </BaseCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from '#vue-router'
import { navigateTo } from '#app'
import { useTaskStore } from '~/stores/taskStore'

const route = useRoute()
const store = useTaskStore()

const taskId = route.params.id as string
const task = computed(() => store.getTaskById(taskId))

const newLogContent = ref('')

const sortedLogs = computed(() => {
  if (!task.value) return []
  return [...task.value.logs].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
})

const submitLog = () => {
  if (newLogContent.value.trim() && task.value) {
    store.addLogToTask(task.value.id, newLogContent.value)
    newLogContent.value = ''
  }
}

const formatDate = (isoString: string) => {
  const date = new Date(isoString)
  return new Intl.DateTimeFormat('en-US', {
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  }).format(date)
}

if (store.tasks.length === 0) {
  store.fetchTasks()
}
</script>
