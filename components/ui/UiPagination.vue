<template>
  <div v-if="totalItems > 0" class="flex flex-col sm:flex-row items-center justify-between mt-6 bg-white p-4 rounded-2xl shadow-sm border border-slate-200 gap-3">
    <div class="text-sm text-slate-500 hidden sm:block">
      Showing <span class="font-bold text-slate-700">{{ startIndex + 1 }}</span> to <span class="font-bold text-slate-700">{{ Math.min(endIndex, totalItems) }}</span> of <span class="font-bold text-slate-700">{{ totalItems }}</span> results
    </div>
    <div class="text-sm text-slate-500 sm:hidden">
      Page <span class="font-bold text-slate-700">{{ currentPage }}</span> of <span class="font-bold text-slate-700">{{ totalPages }}</span>
    </div>
    <div class="flex gap-1.5 items-center flex-wrap justify-center">
      <button
        @click="$emit('update:currentPage', currentPage - 1)"
        :disabled="currentPage === 1"
        class="p-2 text-sm font-semibold rounded-lg border transition-colors disabled:opacity-50 disabled:cursor-not-allowed border-slate-200 text-slate-500 hover:bg-slate-50"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
      </button>
      
      <button
        v-for="page in totalPages"
        :key="page"
        @click="$emit('update:currentPage', page)"
        class="min-w-[36px] h-9 px-2 text-sm font-bold rounded-lg border transition-colors flex items-center justify-center"
        :class="currentPage === page 
          ? 'bg-teal-600 text-white border-teal-600 shadow-sm' 
          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300'"
      >
        {{ page }}
      </button>

      <button
        @click="$emit('update:currentPage', currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="p-2 text-sm font-semibold rounded-lg border transition-colors disabled:opacity-50 disabled:cursor-not-allowed border-slate-200 text-slate-500 hover:bg-slate-50"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  currentPage: number
  totalPages: number
  startIndex: number
  endIndex: number
  totalItems: number
}>()

defineEmits<{
  (e: 'update:currentPage', page: number): void
}>()
</script>
