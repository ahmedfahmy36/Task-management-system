<template>
  <button
    :type="type"
    class="px-4 py-2 rounded font-semibold transition-colors duration-200"
    :class="{
      'bg-blue-600 text-white hover:bg-blue-700': variant === 'primary',
      'bg-gray-200 text-gray-800 hover:bg-gray-300': variant === 'secondary',
      'bg-red-600 text-white hover:bg-red-700': variant === 'danger'
    }"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'danger'
}>(), {
  type: 'button',
  variant: 'primary'
})
</script>
