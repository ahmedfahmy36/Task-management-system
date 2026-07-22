import { defineStore } from 'pinia'

export type TaskStatus = 'Pending' | 'In Progress' | 'Done'
export type TaskPriority = 'Low' | 'Medium' | 'High'

export interface TaskLog {
  id: string
  content: string
  timestamp: string
}

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string
  dueDate: string
  createdAt: string
  image?: string
  duration?: number // in minutes
  logs: TaskLog[]
}

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [] as Task[],
    loading: false,
    error: null as string | null,
    hasFetchedInitialData: false,
    isModalOpen: false,
    taskToEdit: null as Task | null,
    toastMessage: null as string | null
  }),
  actions: {
    async fetchTasks() {
      if (this.hasFetchedInitialData) return
      
      this.loading = true
      this.error = null
      
      try {
        const data = await $fetch<Task[]>('/api/tasks')
        this.tasks = data
        this.hasFetchedInitialData = true
        this.checkAutoStartTasks()
      } catch (err: any) {
        this.error = err.message || 'Failed to fetch tasks.'
      } finally {
        this.loading = false
      }
    },
    addTask(task: Omit<Task, 'id' | 'logs' | 'createdAt'>) {
      const newTask: Task = {
        ...task,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        logs: []
      }
      this.tasks.push(newTask)
      this.checkAutoStartTasks()
      this.showToast('New task added successfully!')
    },
    editTask(updatedTask: Task) {
      const index = this.tasks.findIndex(t => t.id === updatedTask.id)
      if (index !== -1) {
        this.tasks[index] = updatedTask
      }
      this.checkAutoStartTasks()
      this.showToast('Task updated successfully!')
    },
    deleteTask(taskId: string) {
      this.tasks = this.tasks.filter(t => t.id !== taskId)
      this.showToast('Task deleted successfully!')
    },
    updateTaskStatus(taskId: string, status: TaskStatus) {
      const task = this.tasks.find(t => t.id === taskId)
      if (task) {
        task.status = status
        this.addLogToTask(taskId, `Status changed to ${status}`)
      }
    },
    openModal(task?: Task) {
      this.taskToEdit = task || null
      this.isModalOpen = true
    },
    closeModal() {
      this.isModalOpen = false
      this.taskToEdit = null
    },
    showToast(message: string) {
      this.toastMessage = message
      setTimeout(() => {
        if (this.toastMessage === message) {
          this.toastMessage = null
        }
      }, 3000)
    },
    addLogToTask(taskId: string, logContent: string) {
      const task = this.tasks.find(t => t.id === taskId)
      if (task) {
        task.logs.push({
          id: Date.now().toString(),
          content: logContent,
          timestamp: new Date().toISOString()
        })
      }
    },
    checkAutoStartTasks() {
      const today = new Date().toISOString().slice(0, 10)
      this.tasks.forEach(task => {
        if (task.status === 'Pending' && task.startDate <= today) {
          task.status = 'In Progress'
          this.addLogToTask(task.id, 'Task auto-started because its start date was reached.')
        }
      })
    }
  },
  getters: {
    getTaskById: (state) => (id: string) => state.tasks.find(t => t.id === id)
  }
})
