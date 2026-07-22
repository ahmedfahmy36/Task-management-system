<template>
  <aside class="w-64 bg-[#5b51fb] text-white flex flex-col h-full shrink-0">
    <!-- Logo area -->
    <div class="p-6 flex items-center gap-3">
      <div class="w-8 h-8 bg-white text-[#5b51fb] rounded-lg flex items-center justify-center font-bold text-xl">
        S
      </div>
      <span class="text-xl font-bold tracking-wide">slothui</span>
    </div>

    <!-- Search -->
    <div class="px-6 mb-6">
      <div class="relative">
        <span class="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg class="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </span>
        <input type="text" placeholder="Search" class="w-full bg-white/10 text-white placeholder-white/70 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:bg-white/20 transition-colors border border-transparent focus:border-white/30 text-sm">
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 px-4 space-y-1 overflow-y-auto">
      <a href="#" class="flex items-center justify-between px-2 py-3 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-colors">
        <div class="flex items-center gap-3">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
          <span class="font-medium text-sm">Home</span>
        </div>
        <span class="bg-white text-[#5b51fb] text-xs font-bold px-2 py-0.5 rounded-full">10</span>
      </a>

      <a href="#" class="flex items-center justify-between px-2 py-3 rounded-lg bg-white/10 text-white transition-colors">
        <div class="flex items-center gap-3">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path></svg>
          <span class="font-medium text-sm">Tasks</span>
        </div>
      </a>

      <a href="#" class="flex items-center justify-between px-2 py-3 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-colors">
        <div class="flex items-center gap-3">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
          <span class="font-medium text-sm">Users</span>
        </div>
        <span class="bg-white text-[#5b51fb] text-xs font-bold px-2 py-0.5 rounded-full">2</span>
      </a>
      
      <a href="#" class="flex items-center justify-between px-2 py-3 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-colors">
        <div class="flex items-center gap-3">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
          <span class="font-medium text-sm">APIs</span>
        </div>
      </a>
      
      <a href="#" class="flex items-center justify-between px-2 py-3 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-colors">
        <div class="flex items-center gap-3">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
          <span class="font-medium text-sm">Subscription</span>
        </div>
      </a>

      <a href="#" class="flex items-center justify-between px-2 py-3 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-colors">
        <div class="flex items-center gap-3">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          <span class="font-medium text-sm">Settings</span>
        </div>
      </a>
      
      <a href="#" class="flex items-center justify-between px-2 py-3 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-colors">
        <div class="flex items-center gap-3">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
          <span class="font-medium text-sm">Help & Support</span>
        </div>
      </a>
    </nav>
  </aside>
</template>
