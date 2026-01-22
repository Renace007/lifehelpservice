<template>
  <div
    class="theme-area-code relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 overflow-x-hidden antialiased transition-colors duration-200"
  >
    <header class="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur">
      <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div class="flex items-center gap-4">
          <div class="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <span class="material-symbols-outlined">public</span>
          </div>
          <RouterLink class="text-lg font-bold tracking-tight text-slate-900 dark:text-white hidden sm:block" :to="{ name: 'Home' }">
            公共服务目录
          </RouterLink>
        </div>

        <nav class="hidden md:flex flex-1 items-center justify-end gap-8">
          <RouterLink
            class="text-sm font-medium text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-primary transition-colors"
            :to="{ name: 'Home' }"
          >
            首页
          </RouterLink>
          <RouterLink
            class="text-sm font-medium text-primary dark:text-primary transition-colors"
            :to="{ name: 'AreaCodeTool' }"
          >
            工具
          </RouterLink>
        </nav>

        <div class="flex items-center gap-4 pl-8">
          <RouterLink
            class="flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background-dark transition-all"
            :to="{ name: 'Home' }"
          >
            返回
          </RouterLink>
        </div>
      </div>
    </header>

    <main class="flex-1">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <nav class="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-8">
          <RouterLink class="hover:text-primary transition-colors" :to="{ name: 'Home' }">首页</RouterLink>
          <span class="material-symbols-outlined text-[16px]">chevron_right</span>
          <span class="font-medium text-slate-900 dark:text-white">区号查询</span>
        </nav>

        <div class="mb-10 text-center max-w-3xl mx-auto">
          <div class="inline-flex items-center justify-center p-3 mb-4 rounded-full bg-primary/10 text-primary">
            <span class="material-symbols-outlined text-3xl">call</span>
          </div>
          <h2 class="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-3">
            全国电话区号查询
          </h2>
          <p class="text-lg text-slate-600 dark:text-slate-300">
            快速查找中国各城市的电话区号。在下方搜索城市名称或区号。
          </p>
        </div>

        <div class="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 mb-8 max-w-4xl mx-auto">
          <div class="relative group">
            <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
              <span class="material-symbols-outlined">search</span>
            </div>
            <input
              v-model.trim="searchQuery"
              class="block w-full rounded-xl border-slate-200 bg-slate-50 dark:bg-background-dark dark:border-slate-700 py-4 pl-12 pr-4 text-base text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-primary focus:ring-primary dark:focus:ring-primary shadow-sm transition-all"
              placeholder="请输入城市名或区号（如：北京 / 010）"
              type="text"
            />
          </div>

          <div class="mt-6 flex flex-wrap justify-center gap-2">
            <button
              type="button"
              class="h-9 px-3 flex items-center justify-center rounded-lg bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-primary hover:text-primary transition-all text-sm font-semibold"
              :class="selectedLetter === '' ? 'border-primary text-primary' : ''"
              @click="selectedLetter = ''"
            >
              全部
            </button>
            <button
              v-for="letter in letters"
              :key="letter"
              type="button"
              class="h-9 w-9 flex items-center justify-center rounded-lg bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-primary hover:text-primary transition-all"
              :class="selectedLetter === letter ? 'border-primary text-primary' : ''"
              @click="selectedLetter = letter"
            >
              {{ letter }}
            </button>
          </div>
        </div>

        <div class="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div class="overflow-x-auto">
            <table class="min-w-full text-left text-sm whitespace-nowrap">
              <thead class="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th class="px-6 py-4 font-semibold text-slate-900 dark:text-white" scope="col">省份/地区</th>
                  <th class="px-6 py-4 font-semibold text-slate-900 dark:text-white" scope="col">城市名称</th>
                  <th class="px-6 py-4 font-semibold text-slate-900 dark:text-white" scope="col">电话区号</th>
                  <th class="px-6 py-4 font-semibold text-slate-900 dark:text-white text-right" scope="col">操作</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                <tr
                  v-for="row in filteredRows"
                  :key="row.city + row.code"
                  class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group"
                  :class="copiedCode === row.code ? 'bg-primary/5 dark:bg-primary/10' : ''"
                >
                  <td class="px-6 py-4 text-slate-600 dark:text-slate-400">{{ row.region }}</td>
                  <td class="px-6 py-4 font-medium text-slate-900 dark:text-white">{{ row.city }}</td>
                  <td
                    class="px-6 py-4 font-mono text-slate-600 dark:text-slate-300"
                    :class="copiedCode === row.code ? 'text-slate-700 dark:text-slate-200 font-bold' : ''"
                  >
                    {{ row.code }}
                  </td>
                  <td class="px-6 py-4 text-right">
                    <button
                      v-if="copiedCode !== row.code"
                      type="button"
                      class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-primary hover:bg-primary/10 transition-colors"
                      title="复制区号"
                      @click="copyAreaCode(row.code)"
                    >
                      <span class="material-symbols-outlined text-[18px]">content_copy</span>
                      <span class="text-xs font-semibold">复制</span>
                    </button>
                    <span
                      v-else
                      class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-surface-dark text-green-600 border border-green-200 shadow-sm"
                      title="已复制"
                    >
                      <span class="material-symbols-outlined text-[18px]">check</span>
                      <span class="text-xs font-semibold">已复制</span>
                    </span>
                  </td>
                </tr>
                <tr v-if="filteredRows.length === 0">
                  <td class="px-6 py-8 text-center text-slate-500 dark:text-slate-400" colspan="4">
                    未找到匹配的城市或区号
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="max-w-4xl mx-auto mt-8 bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
          <h4 class="text-sm font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
            <span class="material-symbols-outlined text-slate-400">help</span>
            找不到区号？
          </h4>
          <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            可尝试使用拼音首字母筛选，或直接输入区号数字（例如 010、021）。区号以官方电信运营商公布为准。
          </p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

const searchQuery = ref('')
const selectedLetter = ref('')
const copiedCode = ref('')

const rows = [
  { region: '北京 (BJ)', city: '北京', code: '010', letter: 'B' },
  { region: '上海 (SH)', city: '上海', code: '021', letter: 'S' },
  { region: '天津 (TJ)', city: '天津', code: '022', letter: 'T' },
  { region: '重庆 (CQ)', city: '重庆', code: '023', letter: 'C' },
  { region: '广东 (GD)', city: '广州', code: '020', letter: 'G' },
  { region: '广东 (GD)', city: '深圳', code: '0755', letter: 'S' },
  { region: '浙江 (ZJ)', city: '杭州', code: '0571', letter: 'H' },
  { region: '江苏 (JS)', city: '南京', code: '025', letter: 'N' },
  { region: '湖北 (HB)', city: '武汉', code: '027', letter: 'W' },
  { region: '四川 (SC)', city: '成都', code: '028', letter: 'C' },
  { region: '陕西 (SN)', city: '西安', code: '029', letter: 'X' },
  { region: '辽宁 (LN)', city: '沈阳', code: '024', letter: 'S' },
  { region: '黑龙江 (HL)', city: '哈尔滨', code: '0451', letter: 'H' },
  { region: '福建 (FJ)', city: '福州', code: '0591', letter: 'F' },
  { region: '山东 (SD)', city: '济南', code: '0531', letter: 'J' },
  { region: '河南 (HN)', city: '郑州', code: '0371', letter: 'Z' },
  { region: '安徽 (AH)', city: '安庆', code: '0556', letter: 'A' },
  { region: '安徽 (AH)', city: '蚌埠', code: '0552', letter: 'B' },
  { region: '新疆 (XJ)', city: '阿克苏', code: '0997', letter: 'A' },
  { region: '吉林 (JL)', city: '安图', code: '0433', letter: 'A' },
  { region: '陕西 (SN)', city: '安康', code: '0915', letter: 'A' },
]

const filteredRows = computed(() => {
  const q = searchQuery.value.trim()
  return rows.filter((r) => {
    const matchLetter = selectedLetter.value ? r.letter === selectedLetter.value : true
    const matchQuery = q
      ? r.city.includes(q) || r.code.includes(q) || r.region.includes(q)
      : true
    return matchLetter && matchQuery
  })
})

const copyAreaCode = async (code) => {
  try {
    await navigator.clipboard.writeText(code)
    copiedCode.value = code
    window.setTimeout(() => {
      if (copiedCode.value === code) copiedCode.value = ''
    }, 1200)
  } catch {
    // 兼容：无剪贴板权限时，降级为提示
    window.prompt('复制区号（手动复制）：', code)
  }
}
</script>

