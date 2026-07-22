<template>
  <footer class="shrink-0 border-t border-slate-200 bg-white px-6 md:px-10 py-3 flex items-center justify-between">
    <div class="flex items-center gap-2">
      <span class="text-xs font-black tracking-widest gradient-text">T.M.S</span>
      <span class="text-xs text-slate-400 font-medium">Task Management System</span>
    </div>
    <p class="text-xs text-slate-400 font-medium">
      Made by
      <a
        href="https://www.linkedin.com/in/ahmed-fahmy-6956b9195/"
        target="_blank"
        rel="noopener noreferrer"
        class="font-bold text-teal-600 hover:text-teal-700 hover:underline transition-colors"
      >Ahmed Fahmy</a>
      &middot; {{ new Date().getFullYear() }}
    </p>
  </footer>
</template>
