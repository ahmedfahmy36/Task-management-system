<template>
  <div class="px-8 pb-8 pt-4">
    <!-- Tab Filters -->
    <div class="flex items-center gap-8 border-b border-gray-200 mb-6 pt-2">
      <button 
        @click="statusFilter = ''"
        class="pb-4 text-sm font-semibold transition-colors relative flex items-center"
        :class="statusFilter === '' ? 'text-[#5b51fb]' : 'text-gray-500 hover:text-[#5b51fb]'"
      >
        <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path></svg>
        By Total Tasks
        <span 
          class="ml-2 text-xs py-0.5 px-2.5 rounded-full border bg-white shadow-sm"
          :class="statusFilter === '' ? 'border-[#5b51fb]/30 text-[#5b51fb]' : 'border-gray-200 text-gray-500'"
        >
          {{ totalCount }}
        </span>
        <div v-if="statusFilter === ''" class="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5b51fb] rounded-t-full"></div>
      </button>
      
      <button 
        @click="statusFilter = 'Pending'"
        class="pb-4 text-sm font-semibold transition-colors relative flex items-center"
        :class="statusFilter === 'Pending' ? 'text-[#5b51fb]' : 'text-gray-500 hover:text-[#5b51fb]'"
      >
        <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        Pending
        <span 
          class="ml-2 text-xs py-0.5 px-2.5 rounded-full border bg-white shadow-sm"
          :class="statusFilter === 'Pending' ? 'border-[#5b51fb]/30 text-[#5b51fb]' : 'border-gray-200 text-gray-500'"
        >
          {{ pendingCount }}
        </span>
        <div v-if="statusFilter === 'Pending'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5b51fb] rounded-t-full"></div>
      </button>
      
      <button 
        @click="statusFilter = 'In Progress'"
        class="pb-4 text-sm font-semibold transition-colors relative flex items-center"
        :class="statusFilter === 'In Progress' ? 'text-[#5b51fb]' : 'text-gray-500 hover:text-[#5b51fb]'"
      >
        <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
        In Progress
        <span 
          class="ml-2 text-xs py-0.5 px-2.5 rounded-full border bg-white shadow-sm"
          :class="statusFilter === 'In Progress' ? 'border-[#5b51fb]/30 text-[#5b51fb]' : 'border-gray-200 text-gray-500'"
        >
          {{ inProgressCount }}
        </span>
        <div v-if="statusFilter === 'In Progress'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5b51fb] rounded-t-full"></div>
      </button>

      <button 
        @click="statusFilter = 'Done'"
        class="pb-4 text-sm font-semibold transition-colors relative flex items-center"
        :class="statusFilter === 'Done' ? 'text-[#5b51fb]' : 'text-gray-500 hover:text-[#5b51fb]'"
      >
        <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        Completed
        <span 
          class="ml-2 text-xs py-0.5 px-2.5 rounded-full border bg-white shadow-sm"
          :class="statusFilter === 'Done' ? 'border-[#5b51fb]/30 text-[#5b51fb]' : 'border-gray-200 text-gray-500'"
        >
          {{ doneCount }}
        </span>
        <div v-if="statusFilter === 'Done'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5b51fb] rounded-t-full"></div>
      </button>
      
      <div class="ml-auto flex items-center gap-4 pb-3">
        <div class="relative">
          <span class="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg class="w-4 h-4 text-[#5b51fb]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </span>
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Search tasks..." 
            class="pl-9 pr-4 py-2 text-sm border border-[#5b51fb]/20 rounded-full focus:outline-none focus:ring-1 focus:ring-[#5b51fb] focus:border-[#5b51fb] shadow-sm bg-white text-gray-700"
          >
        </div>
      </div>
    </div>

    <!-- Data Table -->
    <div class="bg-white rounded-xl shadow-md border border-[#5b51fb]/10 overflow-visible">
      <table class="min-w-full divide-y divide-[#5b51fb]/10">
        <thead class="bg-gradient-to-r from-[#5b51fb]/10 to-[#5b51fb]/5 border-b-2 border-[#5b51fb]/20 rounded-t-xl">
          <tr>
            <th scope="col" class="px-6 py-4 text-left text-xs font-bold text-[#5b51fb] uppercase tracking-wider rounded-tl-xl">Task Details</th>
            <th scope="col" class="px-6 py-4 text-left text-xs font-bold text-[#5b51fb] uppercase tracking-wider">Status</th>
            <th scope="col" class="px-6 py-4 text-left text-xs font-bold text-[#5b51fb] uppercase tracking-wider">Due Date</th>
            <th scope="col" class="px-6 py-4 text-right text-xs font-bold text-[#5b51fb] uppercase tracking-wider rounded-tr-xl">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 bg-white">
          <tr v-for="task in filteredTasks" :key="task.id" class="hover:bg-[#5b51fb]/5 transition-colors group">
            <td class="px-6 py-5">
              <div class="text-sm font-bold text-gray-900">{{ task.title }}</div>
              <div class="text-sm text-gray-500 mt-1 truncate max-w-sm">{{ task.description || 'No description provided.' }}</div>
            </td>
            <td class="px-6 py-5 whitespace-nowrap">
              <span 
                class="px-3 py-1 inline-flex text-xs font-bold rounded-full border shadow-sm"
                :class="{
                  'bg-white text-purple-700 border-purple-200': task.status === 'Pending',
                  'bg-white text-orange-700 border-orange-200': task.status === 'In Progress',
                  'bg-white text-green-700 border-green-200': task.status === 'Done'
                }"
              >
                {{ task.status }}
              </span>
            </td>
            <td class="px-6 py-5 whitespace-nowrap text-sm font-medium text-gray-600">
              <div class="flex items-center text-[#5b51fb]/80">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                {{ task.dueDate }}
              </div>
            </td>
            <td class="px-6 py-5 whitespace-nowrap text-right text-sm font-medium relative">
              <button 
                @click.stop="toggleDropdown(task.id)" 
                class="text-gray-400 hover:text-[#5b51fb] hover:bg-[#5b51fb]/10 p-2 rounded-full transition-colors focus:outline-none"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path></svg>
              </button>
              
              <!-- Dropdown Menu -->
              <div 
                v-if="activeDropdown === task.id" 
                class="absolute right-8 top-12 mt-1 w-36 bg-white rounded-xl shadow-xl border border-gray-100 z-50 py-2 overflow-hidden flex flex-col text-left transform origin-top-right transition-all"
              >
                <button @click="navigateTo(`/task/${task.id}`); closeDropdown()" class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#5b51fb]/10 hover:text-[#5b51fb] font-medium flex items-center">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                  View Details
                </button>
                <button @click="$emit('edit', task); closeDropdown()" class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#5b51fb]/10 hover:text-[#5b51fb] font-medium flex items-center">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                  Edit Task
                </button>
                <div class="h-px bg-gray-100 my-1"></div>
                <button @click="store.deleteTask(task.id); closeDropdown()" class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 font-medium flex items-center">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                  Delete Task
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="filteredTasks.length === 0">
            <td colspan="4" class="px-6 py-16 text-center text-[#5b51fb]/60 font-medium bg-[#5b51fb]/5 rounded-b-xl">
              No tasks found matching your filters.
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

const toggleDropdown = (id: string) => {
  activeDropdown.value = activeDropdown.value === id ? null : id
}

const closeDropdown = () => {
  activeDropdown.value = null
}

const handleClickOutside = () => {
  if (activeDropdown.value) {
    closeDropdown()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

const totalCount = computed(() => store.tasks.length)
const pendingCount = computed(() => store.tasks.filter(t => t.status === 'Pending').length)
const inProgressCount = computed(() => store.tasks.filter(t => t.status === 'In Progress').length)
const doneCount = computed(() => store.tasks.filter(t => t.status === 'Done').length)

const filteredTasks = computed(() => {
  return store.tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          task.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesStatus = statusFilter.value === '' || task.status === statusFilter.value
    return matchesSearch && matchesStatus
  })
})
</script>
