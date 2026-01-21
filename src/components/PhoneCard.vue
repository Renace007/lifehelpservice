<template>
  <div class="bg-white p-5 rounded-2xl shadow-sm border-l-4 card-hover group relative overflow-hidden" 
       :class="borderColorClass">
    <div class="flex justify-between items-start mb-2">
      <div>
        <h3 class="text-3xl font-black text-slate-900">{{ phone.number }}</h3>
        <p class="text-sm font-bold" :class="textColorClass">{{ phone.name }}</p>
      </div>
      <i :class="iconClass" class="text-4xl group-hover:transition-colors"></i>
    </div>
    <p class="text-xs text-slate-500 mb-4 h-8">{{ getDescription(phone.number) }}</p>
    <a 
      :href="phoneAction" 
      class="flex items-center justify-center w-full py-2 font-bold rounded-lg transition phone-btning"
      :class="buttonClass"
    >
      <i :class="actionIcon" class="mr-2"></i> {{ actionText }}
    </a>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  phone: {
    type: Object,
    required: true
  }
})

// 颜色类计算
const borderColorClass = computed(() => {
  return `border-${props.phone.color}-500`
})

const textColorClass = computed(() => {
  return `text-${props.phone.color}-600`
})

const iconClass = computed(() => {
  return `fa-solid ${props.phone.icon} text-${props.phone.color}-100 group-hover:text-${props.phone.color}-500`
})

// 按钮样式
const buttonClass = computed(() => {
  return {
    [`bg-${props.phone.color}-50`]: true,
    [`text-${props.phone.color}-600`]: true,
    [`hover:bg-${props.phone.color}-600`]: true,
    'hover:text-white': true
  }
})

// 电话操作
const phoneAction = computed(() => {
  if (props.phone.number === '12110') {
    return 'sms:12110'
  }
  return `tel:${props.phone.number}`
})

const actionIcon = computed(() => {
  return props.phone.number === '12110' ? 'fa-solid fa-comments' : 'fa-solid fa-phone'
})

const actionText = computed(() => {
  return props.phone.number === '12110' ? '发送短信' : '立即拨打'
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
.card-hover {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.card-hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.15);
}

.phone-btning {
  position: relative;
  overflow: hidden;
}
.phone-btning::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: 0.5s;
}
.phone-btning:hover::after {
  left: 100%;
}
</style>