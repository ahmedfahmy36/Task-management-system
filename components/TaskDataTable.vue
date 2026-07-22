<template>
  <div class="md:px-8 px-3 pb-8 pt-4 w-full max-w-[100vw]">

    <!-- Page Header -->
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-slate-800 tracking-tight">Task Overview</h2>
      <p class="text-slate-500 text-sm mt-1">Manage, track, and filter all your tasks.</p>
    </div>

    <!-- Tab Filters -->
    <div class="flex items-center gap-1 border-b border-slate-200 mb-6 pt-2 overflow-x-auto hide-scrollbar w-full">

      <button
        v-for="tab in tabs" :key="tab.value"
        @click="statusFilter = tab.value"
        class="pb-3 px-4 text-sm font-semibold transition-colors relative flex items-center shrink-0 rounded-t-lg"
        :class="statusFilter === tab.value
          ? 'text-teal-600'
          : 'text-slate-500 hover:text-teal-600 hover:bg-teal-50/50'"
      >
        <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="tab.icon"></path>
        </svg>
        {{ tab.label }}
        <span
          class="ml-2 text-xs py-0.5 px-2 rounded-full font-bold"
          :class="statusFilter === tab.value
            ? 'bg-teal-100 text-teal-700'
            : 'bg-slate-100 text-slate-500'"
        >
          {{ tab.count }}
        </span>
        <div v-if="statusFilter === tab.value" class="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-500 rounded-t-full"></div>
      </button>

      <!-- Search right-aligned -->
      <div class="ml-auto flex shrink-0 items-center gap-4 pb-3 pr-1">
        <div class="relative">
          <span class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </span>
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search tasks..."
            class="pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 bg-white text-slate-700 shadow-sm w-44 md:w-56"
          >
        </div>
      </div>
    </div>

    <!-- Data Table -->
    <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-x-auto w-full min-h-[400px]">
      <table class="min-w-full divide-y divide-slate-100">
        <thead>
          <tr class="bg-gradient-to-r from-teal-600 to-cyan-600">
            <th scope="col" class="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider rounded-tl-2xl">Task Details</th>
            <th scope="col" class="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Status</th>
            <th scope="col" class="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Priority</th>
            <th scope="col" class="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Created At</th>
            <th scope="col" class="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Due Date</th>
            <th scope="col" class="px-6 py-4 text-right text-xs font-bold text-white uppercase tracking-wider rounded-tr-2xl">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-50 bg-white">
          <tr v-for="task in filteredTasks" :key="task.id" class="hover:bg-teal-50/40 transition-colors group">
            <td class="px-6 py-4">
              <div class="text-sm font-semibold text-slate-800">{{ task.title }}</div>
              <div class="text-xs text-slate-400 mt-0.5 truncate max-w-xs">{{ task.description || 'No description provided.' }}</div>
            </td>

            <td class="px-6 py-4 whitespace-nowrap">
              <span
                class="px-2.5 py-1 inline-flex items-center text-xs font-bold rounded-full border"
                :class="{
                  'bg-sky-50 text-sky-700 border-sky-200': task.status === 'Pending',
                  'bg-amber-50 text-amber-700 border-amber-200': task.status === 'In Progress',
                  'bg-emerald-50 text-emerald-700 border-emerald-200': task.status === 'Done'
                }"
              >
                <span class="w-1.5 h-1.5 rounded-full mr-1.5 shrink-0"
                  :class="{
                    'bg-sky-500': task.status === 'Pending',
                    'bg-amber-500': task.status === 'In Progress',
                    'bg-emerald-500': task.status === 'Done'
                  }"
                ></span>
                {{ task.status }}
              </span>
            </td>

            <td class="px-6 py-4 whitespace-nowrap">
              <span
                class="px-2.5 py-1 inline-flex items-center text-xs font-bold rounded-full border"
                :class="{
                  'bg-red-50 text-red-700 border-red-200': task.priority === 'High',
                  'bg-orange-50 text-orange-700 border-orange-200': task.priority === 'Medium',
                  'bg-slate-50 text-slate-600 border-slate-200': task.priority === 'Low'
                }"
              >
                {{ task.priority }}
              </span>
            </td>

            <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
              {{ new Date(task.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }}
            </td>

            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center text-sm text-slate-600">
                <svg class="w-4 h-4 mr-1.5 text-teal-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                {{ task.dueDate }}
              </div>
            </td>

            <td class="px-6 py-4 whitespace-nowrap text-right text-sm relative">
              <button
                @click.stop="toggleDropdown(task.id)"
                class="text-slate-400 hover:text-teal-600 hover:bg-teal-50 p-1.5 rounded-lg transition-colors focus:outline-none"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
              </button>

              <!-- Dropdown -->
              <div
                v-if="activeDropdown === task.id"
                class="absolute right-6 top-12 mt-1 w-40 bg-white rounded-xl shadow-xl border border-slate-100 z-50 py-1.5 overflow-hidden flex flex-col text-left"
              >
                <button @click="navigateTo(`/task/${task.id}`); closeDropdown()" class="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-teal-50 hover:text-teal-700 font-medium flex items-center">
                  <svg class="w-4 h-4 mr-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                  View Details
                </button>
                <button v-if="task.status === 'Pending'" @click="store.updateTaskStatus(task.id, 'In Progress'); closeDropdown()" class="w-full text-left px-4 py-2 text-sm text-teal-600 hover:bg-teal-50 hover:text-teal-700 font-medium flex items-center">
                  <svg class="w-4 h-4 mr-2 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  Start Task
                </button>
                <button v-if="task.status === 'In Progress'" @click="store.updateTaskStatus(task.id, 'Done'); closeDropdown()" class="w-full text-left px-4 py-2 text-sm text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 font-medium flex items-center">
                  <svg class="w-4 h-4 mr-2 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  Complete Task
                </button>
                <button @click="$emit('edit', task); closeDropdown()" class="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-teal-50 hover:text-teal-700 font-medium flex items-center">
                  <svg class="w-4 h-4 mr-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                  Edit Task
                </button>
                <div class="h-px bg-slate-100 my-1"></div>
                <button @click="store.deleteTask(task.id); closeDropdown()" class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium flex items-center">
                  <svg class="w-4 h-4 mr-2 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                  Delete Task
                </button>
              </div>
            </td>
          </tr>

          <tr v-if="filteredTasks.length === 0">
            <td colspan="6" class="px-6 py-20 text-center">
              <svg class="w-12 h-12 text-slate-200 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
              <p class="text-slate-400 font-medium">No tasks found matching your filters.</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { navigateTo } from '#app'
import { useTaskStore } from '~/stores/taskStore'

const store = useTaskStore()
defineEmits(['edit'])

const searchQuery = ref('')
const statusFilter = ref('')
const activeDropdown = ref<string | null>(null)

const tabs = computed(() => [
  { value: '', label: 'All Tasks', count: store.tasks.length, icon: 'M4 6h16M4 10h16M4 14h16M4 18h16' },
  { value: 'Pending', label: 'Pending', count: store.tasks.filter(t => t.status === 'Pending').length, icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
  { value: 'In Progress', label: 'In Progress', count: store.tasks.filter(t => t.status === 'In Progress').length, icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
  { value: 'Done', label: 'Completed', count: store.tasks.filter(t => t.status === 'Done').length, icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
])

const toggleDropdown = (id: string) => {
  activeDropdown.value = activeDropdown.value === id ? null : id
}

const closeDropdown = () => { activeDropdown.value = null }

const handleClickOutside = () => { if (activeDropdown.value) closeDropdown() }

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))

const filteredTasks = computed(() => {
  return store.tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          task.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesStatus = statusFilter.value === '' || task.status === statusFilter.value
    return matchesSearch && matchesStatus
  })
})
</script>
