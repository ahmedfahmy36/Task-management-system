<template>
  <footer class="shrink-0 border-t border-slate-200 bg-white px-4 sm:px-6 md:px-10 py-4 sm:py-3 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
    <div class="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-center sm:text-left">
      <span class="text-xs font-black tracking-widest gradient-text">T.M.S</span>
      <span class="text-xs text-slate-400 font-medium">Task Management System</span>
    </div>
    <p class="text-xs text-slate-400 font-medium text-center">
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
