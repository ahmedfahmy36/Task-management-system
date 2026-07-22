<template>
  <header class="bg-[#f9fafb] px-8 pt-8 pb-4 flex items-center justify-between shrink-0">
    <div class="flex items-center gap-4">
      <h1 class="text-3xl font-bold text-gray-900 tracking-tight">Kanban Dashboard</h1>
      <div class="flex items-center">
        <img class="w-8 h-8 rounded-full border-2 border-white shadow-sm object-cover" src="https://i.pravatar.cc/100?img=5" alt="Avatar" />
      </div>
    </div>
    
    <div class="flex items-center gap-3">
      <button class="p-2 text-gray-500 hover:text-gray-700 transition-colors bg-white rounded-full shadow-sm border border-gray-100">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
      </button>
      <button class="bg-[#5b51fb] hover:bg-[#4f46e5] text-white px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 transition-colors shadow-sm">
        Share
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
      </button>
      <button class="p-2.5 border border-gray-200 bg-white rounded-full text-gray-600 hover:bg-gray-50 transition-colors shadow-sm">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
      </button>
      <button @click="$emit('add')" class="p-2.5 border border-gray-200 bg-white rounded-full text-gray-600 hover:bg-gray-50 transition-colors shadow-sm">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
defineEmits(['add'])
</script>
