<template>
  <div class="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display transition-colors duration-300 antialiased">
    <!-- 顶部导航与搜索 -->
    <nav class="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-glass shadow-sm">
      <div class="max-w-7xl mx-auto px-4 py-3">
        <div class="flex flex-col lg:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-start">
            <div class="flex items-center gap-3">
              <div class="bg-primary p-2 rounded-xl shadow-lg shadow-primary/20">
                <span class="material-icons text-white text-2xl">support_agent</span>
              </div>
              <div>
                <h1 class="text-xl font-bold tracking-tight text-slate-800 dark:text-white">中国公共服务热线大全</h1>
                <p class="text-[10px] text-slate-500 font-medium tracking-wider uppercase">Public Service Directory</p>
              </div>
            </div>
            <button class="lg:hidden p-2 text-slate-600">
              <span class="material-icons">menu</span>
            </button>
          </div>
          
          <div class="relative w-full max-w-xl group">
            <span class="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">search</span>
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="输入服务名称或号码 (如：社保、110...)" 
              class="w-full pl-10 pr-20 py-2.5 bg-slate-100 dark:bg-slate-900 border border-transparent focus:border-primary/30 rounded-xl focus:ring-4 focus:ring-primary/10 outline-none text-sm transition-all"
              @input="handleSearch"
            >
            <div class="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <span class="text-[10px] px-1.5 py-0.5 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 text-slate-400">ESC</span>
            </div>
          </div>
          
          <div class="hidden lg:flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <RouterLink
              class="px-5 py-2 bg-white dark:bg-slate-700 shadow-sm rounded-lg text-sm font-bold text-primary dark:text-white flex items-center gap-2"
              :to="{ name: 'Home', hash: '#categories' }"
            >
              <span class="material-icons text-base">category</span> 热线分类
            </RouterLink>
            <RouterLink
              class="px-5 py-2 text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-slate-900 dark:hover:text-white transition-colors rounded-lg flex items-center gap-2"
              :to="{ name: 'AreaCodeTool' }"
            >
              <span class="material-icons text-base">map</span> 区号查询
            </RouterLink>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto px-4 py-8 space-y-10">
      <!-- ⚠️ 紧急救援 (置顶) -->
      <section>
        <div class="flex items-center gap-2 mb-4">
          <span class="w-1.5 h-6 bg-danger rounded-full"></span>
          <h2 class="text-xl font-bold text-slate-800 dark:text-white">紧急救援</h2>
        </div>
        
        <div class="flex flex-col xl:flex-row gap-6">
          <!-- 📍 实时定位助手（对齐原型） -->
          <div class="xl:w-1/3 w-full bg-gradient-to-br from-red-600 to-red-700 rounded-2xl p-6 text-white shadow-xl shadow-red-900/20 relative overflow-hidden">
            <div class="absolute top-0 right-0 p-3 opacity-10">
              <span class="material-icons text-9xl">sos</span>
            </div>
            <div class="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div class="flex items-center gap-2 mb-2">
                  <span class="material-icons animate-pulse">my_location</span>
                  <span class="font-bold tracking-wider text-sm opacity-90">实时定位助手</span>
                </div>
                <h3 class="text-2xl font-bold mb-2">遇到危险需要帮助？</h3>
                <p class="text-sm text-red-100/90 leading-relaxed mb-6">
                  如果不确定具体位置，请使用此功能获取精确经纬度，以便告知警方或急救中心。
                </p>
              </div>

              <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 mb-4">
                <div class="flex justify-between items-center mb-2">
                  <span class="text-xs text-red-200">当前状态</span>
                  <span class="flex h-2 w-2 relative">
                    <span v-if="isGettingLocation" class="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-300 opacity-75"></span>
                    <span
                      class="relative inline-flex rounded-full h-2 w-2"
                      :class="locationData ? 'bg-green-400' : 'bg-white/60'"
                    ></span>
                  </span>
                </div>
                <div class="text-center py-2 font-mono text-lg font-bold tracking-widest text-white/90">
                  {{ locationInlineText }}
                </div>
                <div v-if="locationData" class="mt-2 text-[11px] text-red-100/90 flex items-center justify-between">
                  <span>精度约 {{ locationData.accuracy }} 米</span>
                  <a :href="mapLink" target="_blank" class="underline underline-offset-2 hover:text-white">地图打开</a>
                </div>
              </div>

              <button
                type="button"
                class="w-full bg-white text-danger font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-red-50 transition-colors shadow-lg group disabled:opacity-70 disabled:cursor-not-allowed"
                @click="getLocation"
                :disabled="isGettingLocation"
              >
                <span class="material-icons group-hover:rotate-12 transition-transform">gps_fixed</span>
                {{ isGettingLocation ? '获取中...' : '获取我的位置' }}
              </button>
            </div>
          </div>

          <!-- 📞 紧急电话卡片（对齐原型） -->
          <div class="xl:w-2/3 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              v-for="phone in filteredEmergencyPhones"
              :key="phone.number"
              class="bg-white dark:bg-slate-900 rounded-xl p-5 border-l-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group"
              :class="emergencyUi(phone.number).border"
            >
              <div>
                <div class="flex justify-between items-start mb-2">
                  <div class="p-2 rounded-lg" :class="emergencyUi(phone.number).iconWrap">
                    <span class="material-icons">{{ emergencyUi(phone.number).icon }}</span>
                  </div>
                  <span class="text-3xl font-black text-slate-800 dark:text-white tracking-tighter">{{ phone.number }}</span>
                </div>
                <h3 class="font-bold text-lg mb-1">{{ phone.name }}</h3>
                <p class="text-xs text-slate-500 mb-4">{{ emergencyDescription(phone.number) }}</p>
              </div>
              <div class="flex gap-2 mt-auto">
                <RouterLink
                  class="flex-1 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700"
                  :to="{ name: 'ServiceDetail', params: { number: phone.number } }"
                >
                  查看详情
                </RouterLink>
                <a
                  class="flex-1 py-2 rounded-lg text-white text-xs font-bold flex items-center justify-center gap-1 hover:opacity-95 shadow-md"
                  :class="emergencyUi(phone.number).callBtn"
                  :href="phone.number === '12110' ? 'sms:12110' : `tel:${phone.number}`"
                >
                  <span class="material-icons text-[14px]">{{ phone.number === '12110' ? 'sms' : 'call' }}</span>
                  {{ phone.number === '12110' ? '短信' : '拨打' }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 🏛️ 民生与政务 -->
      <section class="mt-12">
        <div class="flex items-center gap-2 mb-4">
          <span class="w-1.5 h-6 bg-primary rounded-full"></span>
          <h2 class="text-xl font-bold text-slate-800 dark:text-white">民生与政务</h2>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- 12345 Super Card -->
          <div class="md:col-span-2 bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
            <div class="absolute top-0 right-0 p-3 opacity-10">
              <span class="material-icons text-9xl">support_agent</span>
            </div>
            <div class="relative z-10">
              <div class="flex justify-between items-start mb-4">
                <div>
                  <h3 class="text-5xl font-black tracking-tighter mb-1">12345</h3>
                  <div class="text-lg font-medium opacity-90">政务服务便民热线 (首选)</div>
                </div>
                <div class="text-blue-300/50">
                  <span class="material-icons text-6xl">support_agent</span>
                </div>
              </div>
              <p class="text-blue-100/90 text-sm leading-relaxed mb-6">
                ★ <strong>万能热线</strong>：遇到除了紧急报警外的所有市政、行政、投诉建议问题，均可拨打此号码。
                <br>包含：社保咨询、违章停车挪车(部分城市)、消费纠纷、噪音扰民、政策咨询等。
              </p>
              <div class="flex flex-wrap gap-3">
                <RouterLink
                  class="inline-flex items-center justify-center bg-white/20 hover:bg-white/30 backdrop-blur rounded-xl text-sm font-bold px-6 py-3 transition-colors"
                  :to="{ name: 'ServiceDetail', params: { number: '12345' } }"
                >
                  查看详情
                </RouterLink>
                <a
                  href="tel:12345"
                  class="inline-flex items-center justify-center bg-white text-primary font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl"
                >
                  拨打热线
                </a>
              </div>
            </div>
          </div>

          <PhoneCard 
            v-for="phone in filteredGovernmentPhones" 
            :key="phone.number"
            :phone="phone"
            class="transform hover:scale-[1.02] transition-all duration-300 hover:shadow-xl"
          />
        </div>
      </section>

      <!-- 其他服务类别 -->
      <section id="categories" class="mt-12">
        <ServiceCategory 
          v-for="category in filteredCategories" 
          :key="category.id"
          :category="category"
        />
      </section>

  </main>
  <AppFooter />
</div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import PhoneCard from '../components/PhoneCard.vue'
import ServiceCategory from '../components/ServiceCategory.vue'
import AppFooter from '../components/AppFooter.vue'
import {
  emergencyPhones as emergencyPhonesData,
  governmentPhones as governmentPhonesData,
  serviceCategories as serviceCategoriesData
} from '../data/serviceDirectory'

// 搜索查询
const searchQuery = ref('')

// 定位数据
const locationData = ref(null)
const isGettingLocation = ref(false)

// 电话数据
const emergencyPhones = ref(emergencyPhonesData)
const governmentPhones = ref(governmentPhonesData)
const serviceCategories = ref(serviceCategoriesData)

// 计算属性：过滤数据
const filteredEmergencyPhones = computed(() => {
  if (!searchQuery.value) return emergencyPhones.value
  return emergencyPhones.value.filter(phone => 
    phone.number.includes(searchQuery.value) || 
    phone.name.includes(searchQuery.value) ||
    phone.keywords.includes(searchQuery.value)
  )
})

const filteredGovernmentPhones = computed(() => {
  if (!searchQuery.value) return governmentPhones.value
  return governmentPhones.value.filter(phone => 
    phone.number.includes(searchQuery.value) || 
    phone.name.includes(searchQuery.value) ||
    phone.keywords.includes(searchQuery.value)
  )
})

const filteredCategories = computed(() => {
  if (!searchQuery.value) return serviceCategories.value
  
  return serviceCategories.value.filter(category => {
    const hasMatchingPhone = category.phones.some(phone => 
      phone.number.includes(searchQuery.value) || 
      phone.name.includes(searchQuery.value) ||
      phone.keywords.includes(searchQuery.value)
    )
    return hasMatchingPhone || category.title.includes(searchQuery.value)
  }).map(category => ({
    ...category,
    phones: category.phones.filter(phone => 
      phone.number.includes(searchQuery.value) || 
      phone.name.includes(searchQuery.value) ||
      phone.keywords.includes(searchQuery.value)
    )
  }))
})

// 地图链接
const mapLink = computed(() => {
  if (!locationData.value) return '#'
  return `https://maps.google.com/?q=${locationData.value.latitude},${locationData.value.longitude}`
})

const locationInlineText = computed(() => {
  if (!locationData.value) return '--.----- , --.-----'
  return `${locationData.value.latitude.toFixed(5)} , ${locationData.value.longitude.toFixed(5)}`
})

const emergencyUi = (number) => {
  const map = {
    '110': { border: 'border-danger', iconWrap: 'bg-red-50 dark:bg-red-900/20 text-danger', callBtn: 'bg-danger hover:bg-red-700 shadow-red-500/20', icon: 'local_police' },
    '12110': { border: 'border-danger', iconWrap: 'bg-red-50 dark:bg-red-900/20 text-danger', callBtn: 'bg-danger hover:bg-red-700 shadow-red-500/20', icon: 'sms' },
    '119': { border: 'border-orange-500', iconWrap: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600', callBtn: 'bg-orange-500 hover:bg-orange-600 shadow-orange-500/20', icon: 'fire_extinguisher' },
    '120': { border: 'border-green-600', iconWrap: 'bg-green-50 dark:bg-green-900/20 text-green-600', callBtn: 'bg-green-600 hover:bg-green-700 shadow-green-500/20', icon: 'medical_services' },
    '122': { border: 'border-slate-500', iconWrap: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400', callBtn: 'bg-slate-700 hover:bg-slate-800 shadow-slate-500/20', icon: 'minor_crash' },
    '96110': { border: 'border-blue-600', iconWrap: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600', callBtn: 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/20', icon: 'security' },
  }
  return map[number] || { border: 'border-primary', iconWrap: 'bg-primary/10 text-primary', callBtn: 'bg-primary hover:bg-primary-dark shadow-primary/20', icon: 'call' }
}

const emergencyDescription = (number) => {
  const descriptions = {
    '110': '刑事治安案件、危及人身安全。',
    '12110': '短信报警通道（不便语音/听障人士）。',
    '119': '火灾扑救、化学泄漏、抢险救援。',
    '120': '突发急症、意外伤害、需要救护车。',
    '122': '交通事故报警、路况查询、交通举报。',
    '96110': '劝阻、咨询、举报电信网络诈骗。',
  }
  return descriptions[number] || '紧急服务热线'
}

// 获取位置
const getLocation = () => {
  if (!navigator.geolocation) {
    alert('您的浏览器不支持地理位置服务')
    return
  }

  isGettingLocation.value = true
  
  navigator.geolocation.getCurrentPosition(
    (position) => {
      locationData.value = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: Math.round(position.coords.accuracy)
      }
      isGettingLocation.value = false
    },
    (error) => {
      console.error('获取位置失败:', error)
      alert('获取位置失败，请检查位置权限设置')
      isGettingLocation.value = false
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000
    }
  )
}

// 搜索处理
const handleSearch = () => {
  // 搜索逻辑已通过计算属性自动处理
}

onMounted(() => {
  // 页面加载时的初始化操作
})
</script>

<style scoped>
/* 导入原HTML中的样式 */
.category-header {
  position: relative;
  overflow: hidden;
  border-radius: 1rem;
}
.category-header img {
  transition: transform 0.6s ease;
}
.category-header:hover img {
  transform: scale(1.05);
}
.glass-overlay {
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
}

.pulse-ring {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #ef4444;
  box-shadow: 0 0 0 rgba(239, 68, 68, 0.4);
  animation: pulse-red 2s infinite;
}

@keyframes pulse-red {
  0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
  100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
}
</style>
