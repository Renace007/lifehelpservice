<template>
  <div
    class="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 border-l-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group relative overflow-hidden"
    :class="styles.border"
  >
    <div class="absolute top-0 right-0 p-3 opacity-5">
      <span class="material-icons text-9xl">{{ getMaterialIcon(phone.number) }}</span>
    </div>

    <div class="relative z-10">
      <div class="flex items-start justify-between mb-3">
        <div>
          <p class="text-3xl font-black text-slate-800 dark:text-white tracking-tighter">{{ phone.number }}</p>
          <p class="text-sm font-bold mt-1" :class="styles.text">{{ phone.name }}</p>
        </div>
        <span class="material-icons text-3xl text-slate-300 group-hover:text-primary transition-colors">
          {{ getMaterialIcon(phone.number) }}
        </span>
      </div>

      <p class="text-xs text-slate-500 dark:text-slate-400 mb-5 leading-relaxed min-h-[2.5rem]">
        {{ getDescription(phone.number) }}
      </p>

      <div class="flex gap-2 mt-auto">
        <RouterLink
          class="flex-1 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          :to="{ name: 'ServiceDetail', params: { number: phone.number } }"
        >
          查看详情
        </RouterLink>
        <a
          class="flex-1 py-2 rounded-lg text-white text-xs font-bold flex items-center justify-center gap-1 hover:opacity-95 shadow-md"
          :class="styles.button"
          :href="phoneHref"
        >
          <span class="material-icons text-[14px]">{{ actionIcon }}</span> {{ actionText }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  phone: {
    type: Object,
    required: true
  }
})

const phoneHref = computed(() => {
  if (props.phone.number === '12110') {
    return 'sms:12110'
  }
  return `tel:${props.phone.number}`
})

const actionText = computed(() => {
  return props.phone.number === '12110' ? '发送短信' : '拨打'
})

// Material Icons映射
const getMaterialIcon = (number) => {
  const iconMap = {
    '110': 'security',
    '12110': 'sms',
    '119': 'local_fire_department',
    '120': 'local_hospital',
    '122': 'car_crash',
    '96110': 'shield_person',
    '12315': 'balance',
    '12333': 'badge',
    '12329': 'home',
    '12345': 'support_agent',
    '12366': 'receipt_long',
    '12348': 'gavel',
    '114': 'contacts',
    '95598': 'bolt',
    '95338': 'local_shipping',
    '11183': 'mail',
    '950616': 'inventory',
    '95311': 'local_shipping',
    '95554': 'inventory_2',
    '95543': 'local_shipping',
    '95546': 'local_shipping',
    '95353': 'local_shipping',
    '12306': 'train',
    '12326': 'flight',
    '12328': 'directions_car',
    '10086': 'smartphone',
    '10000': 'phone_in_talk',
    '10010': 'signal_cellular_alt',
    '10099': 'tv'
  }
  return iconMap[number] || 'call'
}

// actionIcon计算属性
const actionIcon = computed(() => {
  return props.phone.number === '12110' ? 'sms' : 'call'
})

const styles = computed(() => {
  const color = props.phone.color || 'slate'
  const map = {
    red: { text: 'text-red-600', border: 'border-red-600', button: 'bg-red-600 hover:bg-red-700 shadow-red-500/20' },
    orange: { text: 'text-orange-600', border: 'border-orange-500', button: 'bg-orange-500 hover:bg-orange-600 shadow-orange-500/20' },
    green: { text: 'text-green-600', border: 'border-green-600', button: 'bg-green-600 hover:bg-green-700 shadow-green-500/20' },
    blue: { text: 'text-blue-600', border: 'border-blue-600', button: 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/20' },
    secondary: { text: 'text-blue-800', border: 'border-blue-700', button: 'bg-blue-700 hover:bg-blue-800 shadow-blue-500/20' },
    indigo: { text: 'text-indigo-600', border: 'border-indigo-600', button: 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/20' },
    purple: { text: 'text-purple-600', border: 'border-purple-600', button: 'bg-purple-600 hover:bg-purple-700 shadow-purple-500/20' },
    teal: { text: 'text-teal-600', border: 'border-teal-600', button: 'bg-teal-600 hover:bg-teal-700 shadow-teal-500/20' },
    cyan: { text: 'text-cyan-600', border: 'border-cyan-600', button: 'bg-cyan-600 hover:bg-cyan-700 shadow-cyan-500/20' },
    slate: { text: 'text-slate-600', border: 'border-slate-500', button: 'bg-slate-700 hover:bg-slate-800 shadow-slate-500/20' },
    yellow: { text: 'text-yellow-600', border: 'border-yellow-500', button: 'bg-yellow-500 hover:bg-yellow-600 shadow-yellow-500/20' },
    gray: { text: 'text-slate-600', border: 'border-slate-500', button: 'bg-slate-700 hover:bg-slate-800 shadow-slate-500/20' },
  }
  return map[color] || map.slate
})

// 获取描述信息
const getDescription = (number) => {
  const descriptions = {
    '110': '刑事/治安案件、危及人身安全紧急情况。',
    '12110': '听障人士或不便语音通话时的静默报警通道。',
    '119': '火灾扑救、抢险救援、化学品泄漏。',
    '120': '突发急症、意外伤害、需要救护车。',
    '122': '交通事故报警、路况查询、交通举报。',
    '96110': '劝阻诈骗、咨询反诈知识、举报线索。',
    '12315': '消费维权、假冒伪劣、价格欺诈投诉。',
    '12333': '社保政策、医保报销、养老金咨询。',
    '12329': '公积金查询、提取、贷款业务咨询。',
    '95338': '顺丰快递查询、寄件、投诉服务。',
    '95554': '圆通快递查询、寄件、投诉服务。',
    '95543': '中通快递查询、寄件、投诉服务。'
  }
  return descriptions[number] || '服务热线'
}
</script>

<style scoped>
</style>
