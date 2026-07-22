<template>
  <nav class="bg-[#5b51fb] px-8 py-2.5 flex items-center justify-between shadow-sm shrink-0 w-full z-10 relative">
    <!-- Title -->
    <div class="flex items-center cursor-pointer" @click="navigateTo('/')">
      <h1 class="text-xl font-black text-white tracking-widest">T.M.S</h1>
    </div>

    <!-- Add Task Button -->
    <button 
      @click="store.openModal()" 
      class="bg-white text-[#5b51fb] hover:bg-[#5b51fb] hover:text-white border-2 border-transparent hover:border-white px-5 py-1.5 rounded-full text-sm font-bold transition-all duration-300 shadow-sm"
    >
      Add Task
    </button>
  </nav>
</template>

<script setup lang="ts">
import { navigateTo } from '#app'
import { useTaskStore } from '~/stores/taskStore'

const store = useTaskStore()
</script>
