<template>
  <div class="h-full flex flex-col">
    <!-- Page header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
      <div>
        <h2 class="text-2xl font-bold text-slate-800 tracking-tight">Schedule View</h2>
        <p class="text-slate-500 text-sm mt-1">Visualise your tasks across the month.</p>
      </div>

      <!-- Month Navigation -->
      <div class="flex items-center bg-white rounded-xl shadow-sm border border-slate-200 p-1 self-start sm:self-auto">
        <button @click="prevMonth" class="p-2 text-slate-500 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors focus:outline-none">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
        </button>
        <div class="w-38 px-3 text-center font-bold text-slate-700 text-sm">
          {{ formatMonthYear(currentDate) }}
        </div>
        <button @click="nextMonth" class="p-2 text-slate-500 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors focus:outline-none">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
        </button>
        <div class="w-px h-5 bg-slate-200 mx-1"></div>
        <button @click="goToToday" class="px-3 py-1.5 text-sm font-semibold text-teal-600 hover:bg-teal-50 rounded-lg transition-colors focus:outline-none">
          Today
        </button>
      </div>
    </div>

    <!-- Calendar -->
    <div class="flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
      <!-- Day Headers -->
      <div class="grid grid-cols-7 border-b border-slate-100 shrink-0">
        <div
          v-for="day in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']"
          :key="day"
          class="py-3 text-center text-xs font-bold text-slate-400 uppercase tracking-wider border-r border-slate-100 last:border-r-0"
          :class="(day === 'Sun' || day === 'Sat') ? 'bg-slate-50/50' : ''"
        >
          {{ day }}
        </div>
      </div>

      <!-- Calendar Body -->
      <div class="flex-1 overflow-y-auto">
        <div class="grid grid-cols-7" style="grid-auto-rows: minmax(120px, auto);">
          <div
            v-for="(day, index) in calendarDays"
            :key="day.date.toISOString() + index"
            class="p-2 border-b border-r border-slate-100 last:border-r-0 transition-colors"
            :class="{
              'bg-slate-50/30': !day.isCurrentMonth || day.date.getDay() === 0 || day.date.getDay() === 6,
              'hover:bg-teal-50/30 cursor-pointer': day.isCurrentMonth,
              'border-r-0': (index + 1) % 7 === 0
            }"
            @click="day.isCurrentMonth ? store.openModal() : null"
          >
            <!-- Date Number -->
            <div class="flex justify-end mb-1.5">
              <span
                class="inline-flex items-center justify-center w-7 h-7 rounded-full text-sm font-semibold transition-colors"
                :class="isToday(day.date)
                  ? 'text-white font-bold shadow-sm'
                  : (day.isCurrentMonth ? 'text-slate-700 hover:bg-teal-100 hover:text-teal-700' : 'text-slate-300')"
                :style="isToday(day.date) ? 'background: linear-gradient(135deg, #0d9488, #0891b2);' : ''"
              >
                {{ day.date.getDate() }}
              </span>
            </div>

            <!-- Task Events -->
            <div class="space-y-1 overflow-hidden">
              <div
                v-for="task in day.starts"
                :key="'start-' + task.id"
                @click.stop="navigateTo(`/task/${task.id}`)"
                class="px-2 py-1 text-xs rounded-lg truncate font-semibold cursor-pointer flex items-center shadow-sm hover:shadow transition-shadow"
                style="background: #e0f2fe; color: #0369a1; border-left: 3px solid #0ea5e9;"
                :title="`Starts: ${task.title}`"
              >
                <span class="mr-1">▶</span> {{ task.title }}
              </div>
              <div
                v-for="task in day.dues"
                :key="'due-' + task.id"
                @click.stop="navigateTo(`/task/${task.id}`)"
                class="px-2 py-1 text-xs rounded-lg truncate font-semibold cursor-pointer flex items-center shadow-sm hover:shadow transition-shadow"
                style="background: #dcfce7; color: #166534; border-left: 3px solid #16a34a;"
                :title="`Due: ${task.title}`"
              >
                <span class="mr-1">⏰</span> {{ task.title }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Legend -->
    <div class="flex items-center gap-4 mt-4 text-xs text-slate-500">
      <div class="flex items-center gap-1.5">
        <div class="w-3 h-3 rounded" style="background: #e0f2fe; border-left: 3px solid #0ea5e9;"></div>
        <span>Task Starts</span>
      </div>
      <div class="flex items-center gap-1.5">
        <div class="w-3 h-3 rounded" style="background: #dcfce7; border-left: 3px solid #16a34a;"></div>
        <span>Task Due</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { navigateTo } from '#app'
import { useTaskStore } from '~/stores/taskStore'

const store = useTaskStore()
if (store.tasks.length === 0) store.fetchTasks()

const currentDate = ref(new Date())
const currentMonth = computed(() => currentDate.value.getMonth())
const currentYear = computed(() => currentDate.value.getFullYear())
const daysInMonth = computed(() => new Date(currentYear.value, currentMonth.value + 1, 0).getDate())
const firstDayOfMonth = computed(() => new Date(currentYear.value, currentMonth.value, 1).getDay())

const prevMonth = () => { currentDate.value = new Date(currentYear.value, currentMonth.value - 1, 1) }
const nextMonth = () => { currentDate.value = new Date(currentYear.value, currentMonth.value + 1, 1) }
const goToToday = () => { currentDate.value = new Date() }

const formatMonthYear = (date: Date) =>
  new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(date)

const isToday = (date: Date) => {
  const t = new Date()
  return date.getDate() === t.getDate() && date.getMonth() === t.getMonth() && date.getFullYear() === t.getFullYear()
}

const getTasksForDate = (date: Date) => {
  const offset = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
  const iso = offset.toISOString().split('T')[0]
  return {
    starts: store.tasks.filter(t => t.startDate === iso),
    dues: store.tasks.filter(t => t.dueDate === iso)
  }
}

const calendarDays = computed(() => {
  const days = []
  const prevDays = new Date(currentYear.value, currentMonth.value, 0).getDate()
  for (let i = firstDayOfMonth.value - 1; i >= 0; i--) {
    const d = new Date(currentYear.value, currentMonth.value - 1, prevDays - i)
    days.push({ date: d, isCurrentMonth: false, ...getTasksForDate(d) })
  }
  for (let i = 1; i <= daysInMonth.value; i++) {
    const d = new Date(currentYear.value, currentMonth.value, i)
    days.push({ date: d, isCurrentMonth: true, ...getTasksForDate(d) })
  }
  const remaining = 42 - days.length
  for (let i = 1; i <= remaining; i++) {
    const d = new Date(currentYear.value, currentMonth.value + 1, i)
    days.push({ date: d, isCurrentMonth: false, ...getTasksForDate(d) })
  }
  return days
})
</script>
