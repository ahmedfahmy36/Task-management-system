<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div v-if="error" class="bg-red-50 text-red-600 p-3 rounded-md text-sm mb-4 border border-red-200">
      {{ error }}
    </div>

    <BaseInput
      v-model="formData.title"
      label="Title *"
      placeholder="Task title"
      required
    />

    <div class="flex flex-col gap-1 mb-4">
      <label class="text-sm font-medium text-gray-700">Description</label>
      <textarea
        v-model="formData.description"
        rows="3"
        class="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Task description"
      ></textarea>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="flex flex-col gap-1">
        <label class="text-sm font-medium text-gray-700">Status</label>
        <select
          v-model="formData.status"
          class="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>

      <BaseInput
        v-model="formData.dueDate"
        label="Due Date *"
        type="date"
        required
        :min="today"
      />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <BaseInput
        v-model="formData.duration"
        label="Duration (minutes)"
        type="number"
        placeholder="e.g. 60"
      />

      <BaseInput
        v-model="formData.image"
        label="Image URL"
        placeholder="https://..."
      />
    </div>

    <div class="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-6">
      <BaseButton type="button" variant="secondary" @click="$emit('cancel')">
        Cancel
      </BaseButton>
      <BaseButton type="submit" variant="primary">
        {{ isEditing ? 'Update Task' : 'Add Task' }}
      </BaseButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Task, TaskStatus } from '~/stores/taskStore'

const props = defineProps<{
  initialTask?: Task | null
}>()

const emit = defineEmits<{
  (e: 'submit', task: Omit<Task, 'id' | 'logs'> | Task): void
  (e: 'cancel'): void
}>()

const today = new Date().toISOString().split('T')[0]

const formData = ref({
  title: '',
  description: '',
  status: 'Pending' as TaskStatus,
  dueDate: today,
  duration: undefined as number | undefined,
  image: ''
})

const error = ref('')
const isEditing = ref(false)

const resetForm = () => {
  formData.value = {
    title: '',
    description: '',
    status: 'Pending',
    dueDate: today,
    duration: undefined,
    image: ''
  }
  error.value = ''
  isEditing.value = false
}

const loadInitialData = () => {
  if (props.initialTask) {
    isEditing.value = true
    formData.value = {
      title: props.initialTask.title,
      description: props.initialTask.description,
      status: props.initialTask.status,
      dueDate: props.initialTask.dueDate,
      duration: props.initialTask.duration,
      image: props.initialTask.image || ''
    }
  } else {
    resetForm()
  }
}

watch(() => props.initialTask, loadInitialData, { immediate: true })

const handleSubmit = () => {
  error.value = ''

  if (!formData.value.title.trim()) {
    error.value = 'Title is required.'
    return
  }

  const selectedDate = new Date(formData.value.dueDate)
  const currentDate = new Date(today)
  if (selectedDate < currentDate) {
    error.value = 'Due date must be today or in the future.'
    return
  }

  const payload = { ...formData.value }
  
  if (isEditing.value && props.initialTask) {
    emit('submit', { ...payload, id: props.initialTask.id, logs: props.initialTask.logs })
  } else {
    emit('submit', payload)
  }
}
</script>
