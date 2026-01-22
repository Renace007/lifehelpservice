<template>
  <div class="theme-service-detail relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark text-slate-900 dark:text-white overflow-x-hidden">
    <header class="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 sm:px-10 py-3 sticky top-0 z-50">
      <div class="flex items-center gap-8">
        <RouterLink class="flex items-center gap-4 text-slate-900 dark:text-white" :to="{ name: 'Home' }">
          <div class="size-8 text-primary flex items-center justify-center">
            <span class="material-symbols-outlined text-3xl">public</span>
          </div>
          <h2 class="text-lg font-bold leading-tight tracking-[-0.015em]">公共服务目录</h2>
        </RouterLink>
        <div class="hidden md:flex items-center gap-9">
          <RouterLink class="text-slate-600 dark:text-slate-300 hover:text-primary text-sm font-medium leading-normal transition-colors" :to="{ name: 'Home' }">
            首页
          </RouterLink>
          <RouterLink class="text-slate-600 dark:text-slate-300 hover:text-primary text-sm font-medium leading-normal transition-colors" :to="{ name: 'AreaCodeTool' }">
            区号查询
          </RouterLink>
        </div>
      </div>
    </header>

    <div class="px-4 sm:px-6 lg:px-40 flex flex-1 justify-center py-8">
      <div class="flex flex-col max-w-[960px] flex-1 gap-6">
        <nav class="flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <RouterLink class="hover:text-primary transition-colors flex items-center gap-1" :to="{ name: 'Home' }">
            <span class="material-symbols-outlined text-[18px]">home</span>
            首页
          </RouterLink>
          <span class="material-symbols-outlined text-[16px]">chevron_right</span>
          <RouterLink class="hover:text-primary transition-colors" :to="{ name: 'Home' }">返回列表</RouterLink>
          <span class="material-symbols-outlined text-[16px]">chevron_right</span>
          <span class="text-slate-900 dark:text-white font-medium">服务详情</span>
        </nav>

        <div v-if="!service" class="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
          <h1 class="text-xl font-bold mb-2">未找到该服务</h1>
          <p class="text-sm text-slate-600 dark:text-slate-300 mb-4">服务编号：{{ number }}</p>
          <RouterLink class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white font-bold" :to="{ name: 'Home' }">
            返回首页
            <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
          </RouterLink>
        </div>

        <template v-else>
          <div class="flex flex-col md:flex-row gap-6 p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div class="shrink-0">
              <div class="flex h-32 w-32 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/20 text-primary border border-blue-100 dark:border-blue-800">
                <span class="material-symbols-outlined text-[64px]">{{ icon }}</span>
              </div>
            </div>

            <div class="flex flex-1 flex-col justify-center gap-2">
              <div class="flex flex-col gap-1">
                <h1 class="text-slate-900 dark:text-white text-3xl font-bold leading-tight tracking-tight">
                  {{ service.number }} {{ service.name }}
                </h1>
                <p class="text-slate-500 dark:text-slate-400 text-lg font-medium">{{ subtitle }}</p>
              </div>

              <div class="mt-4 flex flex-wrap items-center gap-4">
                <div class="flex items-center gap-2 px-3 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono font-bold text-xl">
                  <span class="material-symbols-outlined text-primary">call</span>
                  {{ service.number }}
                </div>
                <button
                  type="button"
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-primary hover:bg-primary/10 transition-colors"
                  @click="copyNumber"
                >
                  <span class="material-symbols-outlined text-[18px]">content_copy</span>
                  <span class="text-xs font-semibold">复制号码</span>
                </button>
              </div>
            </div>

            <div class="flex items-center md:items-start md:pt-2">
              <a
                class="flex w-full md:w-auto min-w-[140px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg bg-primary hover:bg-primary-dark transition-colors h-12 px-6 text-white text-base font-bold leading-normal tracking-[0.015em] shadow-md shadow-blue-500/20"
                :href="phoneHref"
              >
                <span class="material-symbols-outlined">{{ service.number === '12110' ? 'sms' : 'call' }}</span>
                <span class="truncate">{{ service.number === '12110' ? '发送短信' : '拨打电话' }}</span>
              </a>
            </div>
          </div>

          <div class="flex flex-col gap-4">
            <div class="flex items-center gap-2 px-1">
              <span class="material-symbols-outlined text-primary">tips_and_updates</span>
              <h2 class="text-slate-900 dark:text-white text-xl font-bold leading-tight">沟通建议</h2>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="flex flex-col gap-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm transition-shadow hover:shadow-md">
                <div class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/30 text-primary">
                  <span class="material-symbols-outlined">badge</span>
                </div>
                <div class="flex flex-col gap-1">
                  <h3 class="text-slate-900 dark:text-white text-base font-bold leading-tight">准备好关键信息</h3>
                  <p class="text-slate-500 dark:text-slate-400 text-sm font-normal leading-relaxed">提前整理地点、时间、诉求要点及相关证据/编号。</p>
                </div>
              </div>
              <div class="flex flex-col gap-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm transition-shadow hover:shadow-md">
                <div class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/30 text-primary">
                  <span class="material-symbols-outlined">chat</span>
                </div>
                <div class="flex flex-col gap-1">
                  <h3 class="text-slate-900 dark:text-white text-base font-bold leading-tight">描述力求简洁</h3>
                  <p class="text-slate-500 dark:text-slate-400 text-sm font-normal leading-relaxed">先说“发生了什么、在哪里、什么时候、需要什么帮助”。</p>
                </div>
              </div>
              <div class="flex flex-col gap-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm transition-shadow hover:shadow-md">
                <div class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/30 text-primary">
                  <span class="material-symbols-outlined">assignment</span>
                </div>
                <div class="flex flex-col gap-1">
                  <h3 class="text-slate-900 dark:text-white text-base font-bold leading-tight">记录工单编号</h3>
                  <p class="text-slate-500 dark:text-slate-400 text-sm font-normal leading-relaxed">询问话务员是否生成工单，并记录编号以便跟进。</p>
                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-2">
            <div class="lg:col-span-2 flex flex-col gap-6">
              <div class="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                <h2 class="text-slate-900 dark:text-white text-xl font-bold leading-tight mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
                  业务介绍
                </h2>
                <div class="text-slate-600 dark:text-slate-300 leading-7">
                  {{ introText }}
                </div>
              </div>
            </div>

            <div class="flex flex-col gap-6">
              <div class="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                <h3 class="text-slate-900 dark:text-white text-base font-bold leading-tight mb-4 flex items-center gap-2">
                  <span class="material-symbols-outlined text-slate-400">schedule</span>
                  受理时间
                </h3>
                <div v-if="service.acceptanceTime" class="space-y-3">
                  <div v-for="t in service.acceptanceTime" :key="t.label" class="flex justify-between items-center text-sm">
                    <span class="text-slate-500 dark:text-slate-400">{{ t.label }}</span>
                    <span class="font-medium text-slate-900 dark:text-white">{{ t.value }}</span>
                  </div>
                </div>
                <p v-else class="text-sm text-slate-600 dark:text-slate-300">以官方受理时间为准。</p>
              </div>

              <div class="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                <h3 class="text-slate-900 dark:text-white text-base font-bold leading-tight mb-4 flex items-center gap-2">
                  <span class="material-symbols-outlined text-slate-400">link</span>
                  官方渠道
                </h3>
                <div v-if="service.channels" class="flex flex-col gap-3">
                  <a
                    v-for="c in service.channels"
                    :key="c.label"
                    class="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors group"
                    :href="c.href"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div class="flex items-center gap-3">
                      <div class="size-8 rounded flex items-center justify-center bg-white dark:bg-slate-900 shadow-sm text-slate-600 dark:text-slate-400">
                        <span class="material-symbols-outlined text-[20px]">{{ c.icon }}</span>
                      </div>
                      <span class="text-sm font-medium text-slate-900 dark:text-white">{{ c.label }}</span>
                    </div>
                    <span class="material-symbols-outlined text-slate-400 group-hover:text-primary text-[20px]">open_in_new</span>
                  </a>
                </div>
                <p v-else class="text-sm text-slate-600 dark:text-slate-300">暂无官方渠道链接。</p>
              </div>

              <div v-if="service.coverImage" class="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1 shadow-sm overflow-hidden">
                <div
                  class="bg-slate-100 dark:bg-slate-800 h-32 w-full rounded-lg relative overflow-hidden"
                  :style="{
                    backgroundImage: `url('${service.coverImage}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }"
                >
                  <div class="absolute inset-0 flex items-center justify-center bg-black/5">
                    <button
                      type="button"
                      class="bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      @click="openCoverage"
                    >
                      <span class="material-symbols-outlined text-[16px]">map</span>
                      查看服务范围
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { getServiceByNumber } from '../data/serviceDirectory'

const route = useRoute()
const number = computed(() => String(route.params.number || ''))
const service = computed(() => getServiceByNumber(number.value))

const phoneHref = computed(() => {
  if (!service.value) return '#'
  if (service.value.number === '12110') return 'sms:12110'
  return `tel:${service.value.number}`
})

const icon = computed(() => {
  const iconMap = {
    '110': 'local_police',
    '119': 'fire_extinguisher',
    '120': 'medical_services',
    '122': 'minor_crash',
    '12110': 'sms',
    '96110': 'security',
    '12345': 'support_agent',
  }
  return iconMap[number.value] || 'support_agent'
})

const subtitle = computed(() => {
  if (!service.value) return ''
  if (service.value.number === '12345') return '市民投诉与咨询服务'
  return '服务热线'
})

const introText = computed(() => {
  if (!service.value) return ''
  if (service.value.intro) return service.value.intro
  return `这是关于“${service.value.name}”的服务介绍页。不同地区、不同运营单位可能存在受理范围与流程差异，请以官方最新说明为准。`
})

const copyNumber = async () => {
  if (!service.value) return
  try {
    await navigator.clipboard.writeText(service.value.number)
  } catch {
    window.prompt('复制号码（手动复制）：', service.value.number)
  }
}

const openCoverage = () => {
  window.open('https://maps.google.com/?q=Beijing,China', '_blank', 'noreferrer')
}
</script>
