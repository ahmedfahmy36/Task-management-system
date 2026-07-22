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
    taskToEdit: null as Task | null
  }),
  actions: {
    async fetchTasks() {
      if (this.hasFetchedInitialData) return
      
      this.loading = true
      this.error = null
      
      // Mock API delay
      return new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          // Simulate a ~10% random API failure to demonstrate error handling
          if (Math.random() < 0.1) {
            this.error = 'Failed to fetch tasks. The server may be unavailable.'
            this.loading = false
            reject(new Error(this.error))
            return
          }

          this.tasks = [
            {
              id: '1',
              title: 'Initial Task',
              description: 'This is the first task which i am adding to the list. If you see me in red then it means i am pending and i should have been started by now. So do something about it.',
              status: 'Pending',
              priority: 'High',
              startDate: new Date().toISOString().split('T')[0] || '',
              dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0] || '',
              createdAt: new Date().toISOString(),
              logs: [
                { id: 'l1', content: 'Read the documentation for routing.', timestamp: new Date().toISOString() }
              ],
              duration: 120
            }
          ]
          this.loading = false
          this.hasFetchedInitialData = true
          this.checkAutoStartTasks()
          resolve()
        }, 1000)
      })
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
    },
    editTask(updatedTask: Task) {
      const index = this.tasks.findIndex(t => t.id === updatedTask.id)
      if (index !== -1) {
        this.tasks[index] = updatedTask
      }
      this.checkAutoStartTasks()
    },
    deleteTask(taskId: string) {
      this.tasks = this.tasks.filter(t => t.id !== taskId)
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
