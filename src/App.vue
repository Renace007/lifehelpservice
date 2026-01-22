<template>
  <div id="app">
    <router-view />
    <button
      class="fixed bottom-6 right-6 p-3 bg-slate-800 dark:bg-slate-700 text-white rounded-full shadow-lg hover:bg-slate-700 active:scale-95 transition-all z-50 group"
      type="button"
      @click="toggleTheme"
      aria-label="切换深色模式"
      title="切换深色模式"
    >
      <span class="material-icons group-hover:rotate-45 transition-transform">dark_mode</span>
    </button>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

const THEME_KEY = 'lifehelpservice:theme'

const applyTheme = (theme) => {
  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)')?.matches
  const shouldUseDark = theme === 'dark' || (theme === 'system' && prefersDark)
  document.documentElement.classList.toggle('dark', shouldUseDark)
}

const toggleTheme = () => {
  const isDark = document.documentElement.classList.contains('dark')
  const nextTheme = isDark ? 'light' : 'dark'
  localStorage.setItem(THEME_KEY, nextTheme)
  applyTheme(nextTheme)
}

onMounted(() => {
  const savedTheme = localStorage.getItem(THEME_KEY) || 'system'
  applyTheme(savedTheme)
})
</script>

<style>
/* 全局样式 */
</style>
