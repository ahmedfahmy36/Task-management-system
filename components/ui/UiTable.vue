<template>
  <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-x-auto w-full min-h-[400px]">
    <table class="min-w-full divide-y divide-slate-100">
      <thead>
        <tr class="bg-gradient-to-r from-teal-600 to-cyan-600">
          <slot name="header"></slot>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-50 bg-white">
        <slot></slot>
        <tr v-if="isEmpty">
          <td :colspan="colCount" class="px-6 py-20 text-center">
            <svg class="w-12 h-12 text-slate-200 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
            <p class="text-slate-400 font-medium">{{ emptyMessage }}</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  isEmpty?: boolean
  emptyMessage?: string
  colCount?: number
}>(), {
  isEmpty: false,
  emptyMessage: 'No data found.',
  colCount: 1
})
</script>
