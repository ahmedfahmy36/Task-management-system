import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useTaskStore } from '~/stores/taskStore'
import type { Task } from '~/stores/taskStore'

export const useTaskTable = () => {
  const store = useTaskStore()

  const searchQuery = ref('')
  const statusFilter = ref('')
  const activeDropdown = ref<string | null>(null)

  const tabs = computed(() => [
    { value: '', label: 'All Tasks', count: store.tasks.length, icon: 'M4 6h16M4 10h16M4 14h16M4 18h16' },
    { value: 'Pending', label: 'Pending', count: store.tasks.filter((t: Task) => t.status === 'Pending').length, icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
    { value: 'In Progress', label: 'In Progress', count: store.tasks.filter((t: Task) => t.status === 'In Progress').length, icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
    { value: 'Done', label: 'Completed', count: store.tasks.filter((t: Task) => t.status === 'Done').length, icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
  ])

  const toggleDropdown = (id: string) => {
    activeDropdown.value = activeDropdown.value === id ? null : id
  }

  const closeDropdown = () => { activeDropdown.value = null }

  const handleClickOutside = () => { if (activeDropdown.value) closeDropdown() }

  onMounted(() => document.addEventListener('click', handleClickOutside))
  onUnmounted(() => document.removeEventListener('click', handleClickOutside))

  const filteredTasks = computed(() => {
    return store.tasks.filter((task: Task) => {
      const titleMatch = task.title.toLowerCase().includes(searchQuery.value.toLowerCase())
      const descMatch = (task.description || '').toLowerCase().includes(searchQuery.value.toLowerCase())
      const matchesSearch = titleMatch || descMatch
      
      const matchesStatus = statusFilter.value === '' || task.status === statusFilter.value
      
      return matchesSearch && matchesStatus
    }).sort((a: Task, b: Task) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  })

  const currentPage = ref(1)
  const itemsPerPage = ref(5)

  const totalPages = computed(() => Math.max(1, Math.ceil(filteredTasks.value.length / itemsPerPage.value)))
  const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value)
  const endIndex = computed(() => startIndex.value + itemsPerPage.value)

  const paginatedTasks = computed(() => {
    return filteredTasks.value.slice(startIndex.value, endIndex.value)
  })

  watch([searchQuery, statusFilter], () => {
    currentPage.value = 1
  })

  return {
    store,
    searchQuery,
    statusFilter,
    activeDropdown,
    tabs,
    filteredTasks,
    paginatedTasks,
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    toggleDropdown,
    closeDropdown
  }
}
