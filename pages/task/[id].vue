<template>
  <div class="flex flex-col h-full">
    <div class="mb-6">
      <button @click="navigateTo('/')" class="text-slate-500 hover:text-teal-600 font-semibold text-sm flex items-center transition-colors group">
        <svg class="w-4 h-4 mr-1.5 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        Back to Tasks
      </button>
    </div>

    <div v-if="!task" class="flex-1 flex items-center justify-center">
      <div class="text-center">
        <svg class="w-16 h-16 text-slate-200 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
        <p class="text-slate-500 font-medium">Task not found.</p>
      </div>
    </div>

    <div v-else class="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">

      <!-- Left: Task Details -->
      <div class="lg:col-span-2 space-y-5">
        <!-- Task Card -->
        <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <!-- Header gradient -->
          <div class="h-2 w-full accent-bar"></div>
          <div class="p-6">
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-5">
              <h2 class="text-2xl font-bold text-slate-800 tracking-tight leading-tight">{{ task.title }}</h2>
              <div class="flex items-center gap-2 shrink-0">
                <span
                  class="px-3 py-1 text-xs font-bold rounded-full border"
                  :class="{
                    'bg-sky-50 text-sky-700 border-sky-200': task.status === 'Pending',
                    'bg-amber-50 text-amber-700 border-amber-200': task.status === 'In Progress',
                    'bg-emerald-50 text-emerald-700 border-emerald-200': task.status === 'Done'
                  }"
                >{{ task.status }}</span>
                <span
                  class="px-3 py-1 text-xs font-bold rounded-full border"
                  :class="{
                    'bg-red-50 text-red-700 border-red-200': task.priority === 'High',
                    'bg-orange-50 text-orange-700 border-orange-200': task.priority === 'Medium',
                    'bg-slate-50 text-slate-600 border-slate-200': task.priority === 'Low'
                  }"
                >{{ task.priority }}</span>
              </div>
            </div>

            <div class="flex gap-3 mb-6 border-b border-slate-100 pb-5">
               <button v-if="task.status === 'Pending'" @click="store.updateTaskStatus(task.id, 'In Progress')" class="px-4 py-2 bg-teal-50 text-teal-700 hover:bg-teal-100 border border-teal-200 rounded-lg text-sm font-bold flex items-center transition-colors">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  Start Task
                </button>
                <button v-if="task.status === 'In Progress'" @click="store.updateTaskStatus(task.id, 'Done')" class="px-4 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 rounded-lg text-sm font-bold flex items-center transition-colors">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  Complete Task
                </button>
            </div>

            <div v-if="task.image" class="mb-5 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
              <img :src="task.image" alt="Task Image" class="w-full h-auto object-cover max-h-72" />
            </div>

            <p class="text-slate-600 leading-relaxed whitespace-pre-wrap text-sm mb-6">{{ task.description || 'No description provided.' }}</p>

            <!-- Info Grid -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-5 border-t border-slate-100">
              <div class="bg-slate-50 rounded-xl p-3 border border-slate-100">
                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Created</p>
                <p class="font-semibold text-slate-700 text-sm">{{ new Date(task.createdAt).toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' }) }}</p>
              </div>
              <div class="bg-slate-50 rounded-xl p-3 border border-slate-100">
                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Start Date</p>
                <p class="font-semibold text-slate-700 text-sm">{{ task.startDate || 'Not set' }}</p>
              </div>
              <div class="bg-teal-50 rounded-xl p-3 border border-teal-100">
                <p class="text-[10px] font-bold text-teal-500 uppercase tracking-wider mb-1">Due Date</p>
                <p class="font-semibold text-teal-700 text-sm">{{ task.dueDate }}</p>
              </div>
              <div class="bg-slate-50 rounded-xl p-3 border border-slate-100">
                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Duration</p>
                <p class="font-semibold text-slate-700 text-sm">{{ task.duration ? `${task.duration} min` : 'Not set' }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Activity Log -->
      <div class="flex flex-col bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden max-h-[calc(100vh-10rem)]">
        <div class="p-5 border-b border-slate-100 shrink-0">
          <h3 class="text-base font-bold text-slate-800">Activity Log</h3>
          <p class="text-xs text-slate-400 mt-0.5">Track progress and updates</p>
        </div>

        <div class="flex-1 overflow-y-auto p-4 space-y-3">
          <div v-if="task.logs.length === 0" class="flex flex-col items-center justify-center h-full py-8 text-center">
            <svg class="w-10 h-10 text-slate-200 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
            <p class="text-slate-400 text-sm font-medium">No activity yet</p>
          </div>

          <div
            v-for="log in sortedLogs"
            :key="log.id"
            class="bg-slate-50 rounded-xl p-3.5 border border-slate-100 text-sm"
          >
            <p class="text-slate-700 leading-relaxed mb-2">{{ log.content }}</p>
            <p class="text-[11px] text-slate-400 font-semibold flex items-center">
              <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              {{ formatDate(log.timestamp) }}
            </p>
          </div>
        </div>

        <form @submit.prevent="submitLog" class="p-4 border-t border-slate-100 shrink-0">
          <textarea
            v-model="newLogContent"
            rows="2"
            class="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 bg-slate-50 placeholder-slate-400 resize-none mb-2.5"
            placeholder="What did you do today?..."
            required
          ></textarea>
          <button type="submit" class="btn-gradient w-full text-sm font-bold text-white py-2.5 rounded-xl transition-all hover:opacity-90 shadow-sm">
            Post Update
          </button>
        </form>
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

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(iso))

if (store.tasks.length === 0) store.fetchTasks()
</script>
