<template>
  <div class="flex items-center gap-1 pt-2 overflow-x-auto hide-scrollbar w-full xl:w-auto">
    <button
      v-for="tab in tabs" 
      :key="tab.value"
      @click="$emit('update:modelValue', tab.value)"
      class="pb-3 px-4 text-sm font-semibold transition-colors relative flex items-center shrink-0 rounded-t-lg"
      :class="modelValue === tab.value
        ? 'text-teal-600'
        : 'text-slate-500 hover:text-teal-600 hover:bg-teal-50/50'"
    >
      <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="tab.icon"></path>
      </svg>
      {{ tab.label }}
      <span
        class="ml-2 text-xs py-0.5 px-2 rounded-full font-bold"
        :class="modelValue === tab.value
          ? 'bg-teal-100 text-teal-700'
          : 'bg-slate-100 text-slate-500'"
      >
        {{ tab.count }}
      </span>
      <div v-if="modelValue === tab.value" class="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-500 rounded-t-full"></div>
    </button>
  </div>
</template>

<script setup lang="ts">
export interface TabItem {
  value: string
  label: string
  count: number
  icon: string
}

defineProps<{
  modelValue: string
  tabs: TabItem[]
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>
