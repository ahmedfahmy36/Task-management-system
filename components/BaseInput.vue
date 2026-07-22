<template>
  <div class="flex flex-col gap-1 mb-4">
    <label v-if="label" class="text-sm font-medium text-gray-700">{{ label }}</label>
    <input
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      class="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      :placeholder="placeholder"
      :required="required"
      :min="min"
    />
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  modelValue: string | number
  label?: string
  type?: string
  placeholder?: string
  required?: boolean
  min?: string
}>(), {
  type: 'text'
})
defineEmits(['update:modelValue'])
</script>
