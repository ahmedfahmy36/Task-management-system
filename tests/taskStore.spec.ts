import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach } from 'vitest'
import { useTaskStore } from '../stores/taskStore'

describe('Task Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('adds a task correctly', () => {
    const store = useTaskStore()
    expect(store.tasks.length).toBe(0)

    store.addTask({
      title: 'Test Task',
      description: 'Testing the store',
      status: 'Pending',
      dueDate: '2050-01-01',
    })

    expect(store.tasks.length).toBe(1)
    expect(store.tasks[0].title).toBe('Test Task')
    expect(store.tasks[0].status).toBe('Pending')
  })

  it('deletes a task correctly', () => {
    const store = useTaskStore()
    store.addTask({
      title: 'To be deleted',
      description: '',
      status: 'Done',
      dueDate: '2050-01-01',
    })

    const taskId = store.tasks[0].id
    expect(store.tasks.length).toBe(1)

    store.deleteTask(taskId)
    expect(store.tasks.length).toBe(0)
  })
})
