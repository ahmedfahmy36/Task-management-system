import { defineStore } from 'pinia'

export type TaskStatus = 'Pending' | 'In Progress' | 'Done'

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
  dueDate: string
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
    taskToEdit: null as Task | null
  }),
  actions: {
    async fetchTasks() {
      if (this.hasFetchedInitialData) return
      
      this.loading = true
      this.error = null
      
      // Mock API delay
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          this.tasks = [
            {
              id: '1',
              title: 'Learn Nuxt 3',
              description: 'Understand the basics of Nuxt 3 and Vue Composition API',
              status: 'In Progress',
              dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
              logs: [
                { id: 'l1', content: 'Read the documentation for routing.', timestamp: new Date().toISOString() }
              ],
              duration: 120
            }
          ]
          this.loading = false
          this.hasFetchedInitialData = true
          resolve()
        }, 1000)
      })
    },
    addTask(task: Omit<Task, 'id' | 'logs'>) {
      const newTask: Task = {
        ...task,
        id: Date.now().toString(),
        logs: []
      }
      this.tasks.push(newTask)
    },
    editTask(updatedTask: Task) {
      const index = this.tasks.findIndex(t => t.id === updatedTask.id)
      if (index !== -1) {
        this.tasks[index] = updatedTask
      }
    },
    deleteTask(taskId: string) {
      this.tasks = this.tasks.filter(t => t.id !== taskId)
    },
    openModal(task?: Task) {
      this.taskToEdit = task || null
      this.isModalOpen = true
    },
    closeModal() {
      this.isModalOpen = false
      this.taskToEdit = null
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
    }
  },
  getters: {
    getTaskById: (state) => (id: string) => state.tasks.find(t => t.id === id)
  }
})
