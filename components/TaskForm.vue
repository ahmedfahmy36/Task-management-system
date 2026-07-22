<template>
  <form @submit.prevent="handleSubmit" class="space-y-5">
    <div v-if="error" class="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100 flex items-center">
      <svg class="w-4 h-4 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      {{ error }}
    </div>

    <div class="flex flex-col gap-1.5">
      <label for="task-title" class="text-sm font-semibold text-slate-700">Title <span class="text-teal-500">*</span></label>
      <input
        id="task-title"
        name="title"
        v-model="formData.title"
        type="text"
        placeholder="Enter task title..."
        required
        class="border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 bg-white text-slate-800 shadow-sm placeholder-slate-400"
      />
    </div>

    <div class="flex flex-col gap-1.5">
      <label for="task-description" class="text-sm font-semibold text-slate-700">Description</label>
      <textarea
        id="task-description"
        name="description"
        v-model="formData.description"
        rows="3"
        placeholder="Describe the task..."
        class="border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 bg-white text-slate-800 shadow-sm placeholder-slate-400 resize-none"
      ></textarea>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="flex flex-col gap-1.5 md:col-span-2">
        <label for="task-priority" class="text-sm font-semibold text-slate-700">Priority</label>
        <select id="task-priority" name="priority" v-model="formData.priority" class="border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 bg-white text-slate-700 shadow-sm">
          <option value="Low">🟦 Low</option>
          <option value="Medium">🟧 Medium</option>
          <option value="High">🔴 High</option>
        </select>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="flex flex-col gap-1.5">
        <label for="task-start-date" class="text-sm font-semibold text-slate-700">Start Date <span class="text-teal-500">*</span></label>
        <input id="task-start-date" name="startDate" v-model="formData.startDate" type="date" required class="border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 bg-white text-slate-700 shadow-sm" />
      </div>
      <div class="flex flex-col gap-1.5">
        <label for="task-due-date" class="text-sm font-semibold text-slate-700">Due Date <span class="text-teal-500">*</span></label>
        <input id="task-due-date" name="dueDate" v-model="formData.dueDate" type="date" required class="border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 bg-white text-slate-700 shadow-sm" />
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="flex flex-col gap-1.5">
        <label for="task-duration" class="text-sm font-semibold text-slate-700">Duration (minutes)</label>
        <input id="task-duration" name="duration" v-model="formData.duration" type="number" placeholder="e.g. 60" class="border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 bg-white text-slate-700 shadow-sm placeholder-slate-400" />
      </div>

      <div class="flex flex-col gap-1.5">
        <label for="task-image" class="text-sm font-semibold text-slate-700">Image Upload</label>
        <input
          id="task-image"
          name="image"
          type="file"
          @change="handleFileUpload"
          accept="image/*"
          class="block w-full text-sm text-slate-500
            file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0
            file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700
            hover:file:bg-teal-100 transition-colors cursor-pointer"
        />
      </div>
    </div>

    <div v-if="formData.image" class="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
      <img :src="formData.image" class="h-14 w-14 object-cover rounded-lg border border-slate-200 shrink-0" />
      <div>
        <p class="text-xs font-semibold text-slate-600">Image Preview</p>
        <button type="button" @click="formData.image = ''" class="text-xs text-red-500 hover:text-red-700 font-medium mt-0.5">Remove</button>
      </div>
    </div>

    <div class="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-2">
      <button type="button" @click="$emit('cancel')" class="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors">
        Cancel
      </button>
      <button type="submit" class="btn-gradient px-6 py-2.5 text-sm font-bold text-white rounded-xl shadow-md hover:opacity-90 transition-all">
        {{ isEditing ? 'Update Task' : 'Add Task' }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Task, TaskStatus, TaskPriority } from '~/stores/taskStore'

const props = defineProps<{ initialTask?: Task | null }>()

const emit = defineEmits<{
  (e: 'submit', task: Omit<Task, 'id' | 'logs' | 'createdAt'> | Task): void
  (e: 'cancel'): void
}>()

const today = new Date().toISOString().split('T')[0] || ''

const formData = ref({
  title: '', description: '',
  status: 'Pending' as TaskStatus,
  priority: 'Medium' as TaskPriority,
  startDate: today, dueDate: today,
  duration: undefined as number | undefined,
  image: ''
})

const error = ref('')
const isEditing = ref(false)

const resetForm = () => {
  formData.value = { title: '', description: '', status: 'Pending', priority: 'Medium', startDate: today, dueDate: today, duration: undefined, image: '' }
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
      priority: props.initialTask.priority,
      startDate: props.initialTask.startDate || today,
      dueDate: props.initialTask.dueDate,
      duration: props.initialTask.duration,
      image: props.initialTask.image || ''
    }
  } else {
    resetForm()
  }
}

watch(() => props.initialTask, loadInitialData, { immediate: true })

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const reader = new FileReader()
    reader.onload = (e) => { if (e.target?.result) formData.value.image = e.target.result as string }
    reader.readAsDataURL(target.files[0])
  }
}

const handleSubmit = () => {
  error.value = ''
  if (!formData.value.title.trim()) { error.value = 'Title is required.'; return }
  if (!isEditing.value) {
    const now = new Date()
    now.setHours(0, 0, 0, 0)
    if (formData.value.dueDate && new Date(formData.value.dueDate) <= now) {
      error.value = 'Due date must be in the future.'; return
    }
  }
  if (formData.value.dueDate && formData.value.startDate && new Date(formData.value.dueDate) < new Date(formData.value.startDate)) {
    error.value = 'Due date cannot be earlier than start date.'; return
  }
  const payload = { ...formData.value }
  if (isEditing.value && props.initialTask) {
    emit('submit', { ...payload, id: props.initialTask.id, logs: props.initialTask.logs, createdAt: props.initialTask.createdAt })
  } else {
    emit('submit', payload)
  }
}
</script>
