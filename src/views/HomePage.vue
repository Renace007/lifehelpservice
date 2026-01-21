<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 顶部导航与搜索 -->
    <header class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-red-200">
            <i class="fa-solid fa-phone"></i>
          </div>
          <h1 class="text-xl font-bold tracking-tight text-slate-900">中国生活服务黄页 <span class="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-normal">2025更正版</span></h1>
        </div>
        
        <div class="relative w-full md:w-96">
          <i class="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="搜索电话或服务 (如: 顺丰, 报警...)" 
            class="w-full pl-10 pr-4 py-2.5 bg-gray-100 border-transparent focus:bg-white focus:ring-2 focus:ring-blue-500 rounded-xl text-sm transition-all outline-none"
            @input="handleSearch"
          >
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 py-8 space-y-10">
      <!-- ⚠️ 紧急救援 (置顶) -->
      <section>
        <div class="category-header h-32 md:h-40 mb-6 group relative shadow-lg">
          <img src="https://images.unsplash.com/photo-1595180326466-9e63442a8427?q=80&w=2000&auto=format&fit=crop" class="absolute inset-0 w-full h-full object-cover" alt="Emergency">
          <div class="glass-overlay absolute inset-0 flex items-center px-8">
            <div>
              <h2 class="text-3xl font-black text-white mb-1 flex items-center gap-3">
                <i class="fa-solid fa-truck-medical text-red-500 bg-white/90 p-2 rounded-lg"></i> 
                紧急救援
              </h2>
              <p class="text-white/90 text-sm font-medium">生命通道，非紧急情况请勿占用</p>
            </div>
          </div>
        </div>

        <!-- 📍 紧急定位助手 (新增) -->
        <div class="bg-slate-900 text-white rounded-2xl p-6 shadow-xl mb-6 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -mr-16 -mt-16"></div>
          <div class="absolute bottom-0 left-0 w-64 h-64 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -ml-16 -mb-16"></div>
          
          <div class="relative z-10 flex flex-col md:flex-row gap-8">
            <!-- 左侧：操作与显示 -->
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-4">
                <h3 class="text-2xl font-bold flex items-center gap-2">
                  <i class="fa-solid fa-location-dot text-red-500"></i> 紧急定位助手
                </h3>
                <span class="text-xs bg-slate-700 px-2 py-1 rounded text-gray-300">陌生环境报警必备</span>
              </div>

              <div class="bg-slate-800/50 rounded-xl p-4 border border-slate-700 backdrop-blur-sm">
                <div v-if="!locationData" class="text-center py-6">
                  <p class="text-gray-400 mb-4">点击下方按钮获取当前精确经纬度</p>
                </div>
                
                <div v-if="locationData" class="location-result">
                  <div class="grid grid-cols-2 gap-4 mb-4">
                    <div class="bg-slate-900/80 p-3 rounded-lg border border-slate-600">
                      <div class="text-xs text-gray-400 mb-1">北纬 (Latitude)</div>
                      <div class="text-2xl md:text-3xl font-mono font-bold text-yellow-400">{{ locationData.latitude.toFixed(6) }}</div>
                    </div>
                    <div class="bg-slate-900/80 p-3 rounded-lg border border-slate-600">
                      <div class="text-xs text-gray-400 mb-1">东经 (Longitude)</div>
                      <div class="text-2xl md:text-3xl font-mono font-bold text-yellow-400">{{ locationData.longitude.toFixed(6) }}</div>
                    </div>
                  </div>
                  <div class="text-xs text-gray-400 flex items-center gap-2 mb-4">
                    <div class="pulse-ring"></div>
                    <span>精度: {{ locationData.accuracy }} 米</span>
                  </div>
                  <div class="flex gap-3">
                    <a 
                      :href="mapLink" 
                      target="_blank" 
                      class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-center font-bold text-sm transition flex items-center justify-center gap-2"
                    >
                      <i class="fa-solid fa-map"></i> 在地图中查看位置
                    </a>
                  </div>
                </div>

                <button 
                  @click="getLocation" 
                  :disabled="isGettingLocation"
                  class="w-full bg-red-600 hover:bg-red-700 active:scale-95 text-white py-3 rounded-xl font-bold text-lg shadow-lg shadow-red-900/50 transition flex items-center justify-center gap-2 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <i class="fa-solid fa-crosshairs"></i> 
                  {{ isGettingLocation ? '获取中...' : '获取我的位置' }}
                </button>
              </div>
            </div>

            <!-- 右侧：教学指南 -->
            <div class="flex-1 border-l border-slate-700 pl-0 md:pl-8 pt-4 md:pt-0">
              <h4 class="font-bold text-lg mb-3 text-blue-200"><i class="fa-solid fa-book-open mr-2"></i>如何使用坐标精确报警？</h4>
              <div class="space-y-4 text-sm text-gray-300">
                <div class="flex gap-3">
                  <div class="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0 text-xs font-bold">1</div>
                  <div>
                    <strong class="text-white block mb-1">何时使用？</strong>
                    当您在高速公路、野外、陌生街道等<span class="text-yellow-400">没有明显地标</span>的地方，无法描述具体位置时。
                  </div>
                </div>
                <div class="flex gap-3">
                  <div class="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0 text-xs font-bold">2</div>
                  <div>
                    <strong class="text-white block mb-1">怎么说？</strong>
                    "警察同志，我不知道具体路名，但我手机显示的坐标是：<span class="text-yellow-400">北纬{{ locationData ? locationData.latitude.toFixed(4) : 'xx.xxxx' }}度，东经{{ locationData ? locationData.longitude.toFixed(4) : 'xxx.xxxx' }}度</span>，请通过坐标定位我。"
                  </div>
                </div>
                <div class="flex gap-3">
                  <div class="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0 text-xs font-bold">3</div>
                  <div>
                    <strong class="text-white block mb-1">短信报警技巧</strong>
                    若使用 <span class="text-red-400 font-bold">12110</span> 短信报警，可直接将左侧显示的坐标数字复制并发送。
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <PhoneCard 
            v-for="phone in filteredEmergencyPhones" 
            :key="phone.number"
            :phone="phone"
          />
        </div>
      </section>

      <!-- 🏛️ 民生与政务 -->
      <section>
        <div class="category-header h-24 mb-6 group relative shadow-lg rounded-xl overflow-hidden">
          <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop" class="absolute inset-0 w-full h-full object-cover" alt="City Services">
          <div class="glass-overlay absolute inset-0 flex items-center px-8">
            <h2 class="text-2xl font-bold text-white flex items-center gap-3">
              <i class="fa-solid fa-city text-blue-400"></i> 市民与政务热线
            </h2>
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- 12345 Super Card -->
          <div class="md:col-span-2 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white shadow-lg">
            <div class="flex justify-between">
              <div>
                <h3 class="text-5xl font-black tracking-tighter mb-1">12345</h3>
                <div class="text-lg font-medium opacity-90">政务服务便民热线 (首选)</div>
              </div>
              <div class="text-blue-300 opacity-50"><i class="fa-solid fa-comments text-6xl"></i></div>
            </div>
            <p class="mt-4 text-blue-100 text-sm leading-relaxed">
              ★ <strong>万能热线</strong>：遇到除了紧急报警外的所有市政、行政、投诉建议问题，均可拨打此号码。
              <br>包含：社保咨询、违章停车挪车(部分城市)、消费纠纷、噪音扰民、政策咨询等。
            </p>
            <a href="tel:12345" class="mt-4 inline-block bg-white text-blue-700 px-6 py-2 rounded-lg font-bold hover:bg-blue-50 transition">拨打热线</a>
          </div>

          <PhoneCard 
            v-for="phone in filteredGovernmentPhones" 
            :key="phone.number"
            :phone="phone"
          />
        </div>
      </section>

      <!-- 其他服务类别 -->
    <ServiceCategory 
      v-for="category in filteredCategories" 
      :key="category.id"
      :category="category"
    />

    <!-- 免责声明 -->
    <div class="mt-16 bg-red-50 border border-red-200 rounded-lg p-6">
      <div class="flex items-center mb-4">
        <i class="fas fa-exclamation-triangle text-red-500 text-xl mr-3"></i>
        <h3 class="text-lg font-bold text-red-800">重要法律警示与免责声明</h3>
      </div>
      <div class="text-sm text-red-700 space-y-2">
        <p><strong>【法律警示】</strong>恶意拨打报警、急救等紧急电话，占用公共资源，将依法追究法律责任！</p>
        <p><strong>【免责声明】</strong>本服务电话指南仅供参考，号码可能变更，请以官方最新公布为准。本网站不承担因号码变更、信息错误导致的任何责任。</p>
        <p><strong>【使用须知】</strong>请合理使用电话资源，非紧急情况请勿拨打紧急电话。遇到紧急情况请保持冷静，清晰说明情况。</p>
        <p><strong>【信息更新】</strong>如发现号码错误或变更，欢迎反馈。我们将定期更新，但不保证信息的实时准确性。</p>
        <p><strong>【版权声明】</strong>本页面内容受版权保护，未经许可不得用于商业用途。</p>
      </div>
    </div>
  </main>
</div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import PhoneCard from '../components/PhoneCard.vue'
import ServiceCategory from '../components/ServiceCategory.vue'

// 搜索查询
const searchQuery = ref('')

// 定位数据
const locationData = ref(null)
const isGettingLocation = ref(false)

// 电话数据
const emergencyPhones = ref([
  { number: '110', name: '报警求助', color: 'red', icon: 'fa-shield-halved', keywords: '报警 警察 盗窃' },
  { number: '12110', name: '短信报警', color: 'red', icon: 'fa-comment-sms', keywords: '短信报警 聋哑人 不方便说话' },
  { number: '119', name: '火警消防', color: 'orange', icon: 'fa-fire-extinguisher', keywords: '火警 消防 火灾' },
  { number: '120', name: '医疗急救', color: 'green', icon: 'fa-heart-pulse', keywords: '救护车 医生 急救' },
  { number: '122', name: '交通事故', color: 'blue', icon: 'fa-car-burst', keywords: '交警 车祸 事故' },
  { number: '96110', name: '国家反诈', color: 'indigo', icon: 'fa-user-shield', keywords: '诈骗 反诈 骗子' }
])

const governmentPhones = ref([
  { number: '12315', name: '消费者投诉', color: 'purple', icon: 'fa-scale-balanced', keywords: '消费者 维权 假货' },
  { number: '12333', name: '社保服务', color: 'indigo', icon: 'fa-id-card', keywords: '社保 养老金 医保' },
  { number: '12366', name: '税务服务', color: 'teal', icon: 'fa-file-invoice-dollar', keywords: '税务 发票' },
  { number: '12329', name: '住房公积金', color: 'orange', icon: 'fa-house-chimney-user', keywords: '公积金 贷款 房贷' },
  { number: '12348', name: '法律援助', color: 'red', icon: 'fa-gavel', keywords: '法律 律师' },
  { number: '114', name: '查号台/挪车', color: 'cyan', icon: 'fa-address-book', keywords: '查号 挪车 电话' },
  { number: '95598', name: '国家电网', color: 'green', icon: 'fa-bolt', keywords: '电费 停电' }
])

const serviceCategories = ref([
  {
    id: 'express',
    title: '快递物流',
    icon: 'fa-box-open',
    phones: [
      { number: '95338', name: '顺丰速运', color: 'slate', icon: 'fa-truck', keywords: '顺丰 SF' },
      { number: '11183', name: '中国邮政EMS', color: 'green', icon: 'fa-envelope', keywords: '邮政 EMS' },
      { number: '950616', name: '京东物流', color: 'red', icon: 'fa-box', keywords: '京东 JD' },
      { number: '95311', name: '中通快递', color: 'blue', icon: 'fa-shipping-fast', keywords: '中通 ZTO' },
      { number: '95554', name: '圆通速递', color: 'purple', icon: 'fa-package', keywords: '圆通 YTO' },
      { number: '95543', name: '申通快递', color: 'orange', icon: 'fa-truck-fast', keywords: '申通 STO' },
      { number: '95546', name: '韵达快递', color: 'yellow', icon: 'fa-shipping-fast', keywords: '韵达' },
      { number: '95353', name: '德邦快递', color: 'blue', icon: 'fa-truck-moving', keywords: '德邦' }
    ]
  },
  {
    id: 'travel',
    title: '交通出行',
    icon: 'fa-plane-departure',
    phones: [
      { number: '12306', name: '铁路客户服务', color: 'blue', icon: 'fa-train', keywords: '火车 高铁 票' },
      { number: '12326', name: '民航服务质量监督', color: 'blue', icon: 'fa-plane', keywords: '飞机 航空 投诉' },
      { number: '12328', name: '交通运输监督', color: 'yellow', icon: 'fa-road', keywords: '高速 公路 出租车' }
    ]
  },
  {
    id: 'communication',
    title: '通讯服务',
    icon: 'fa-signal',
    phones: [
      { number: '10086', name: '中国移动', color: 'blue', icon: 'fa-mobile-alt', keywords: '移动 宽带' },
      { number: '10000', name: '中国电信', color: 'blue', icon: 'fa-phone-alt', keywords: '电信 宽带' },
      { number: '10010', name: '中国联通', color: 'blue', icon: 'fa-signal', keywords: '联通 宽带' },
      { number: '10099', name: '中国广电', color: 'blue', icon: 'fa-tv', keywords: '广电 宽带' }
    ]
  },
  {
    id: 'bank',
    title: '各大银行客服',
    icon: 'fa-university',
    phones: [
      { number: '95588', name: '工商银行', color: 'gray', icon: 'fa-building', keywords: '工商银行 工行' },
      { number: '95599', name: '农业银行', color: 'gray', icon: 'fa-building', keywords: '农业银行 农行' },
      { number: '95566', name: '中国银行', color: 'gray', icon: 'fa-building', keywords: '中国银行 中行' },
      { number: '95533', name: '建设银行', color: 'gray', icon: 'fa-building', keywords: '建设银行 建行' },
      { number: '95559', name: '交通银行', color: 'gray', icon: 'fa-building', keywords: '交通银行 交行' },
      { number: '95555', name: '招商银行', color: 'gray', icon: 'fa-building', keywords: '招商银行 招行' },
      { number: '95508', name: '广发银行', color: 'gray', icon: 'fa-building', keywords: '广发银行' },
      { number: '95501', name: '平安银行', color: 'gray', icon: 'fa-building', keywords: '平安银行' },
      { number: '95528', name: '浦发银行', color: 'gray', icon: 'fa-building', keywords: '浦发银行' },
      { number: '95568', name: '民生银行', color: 'gray', icon: 'fa-building', keywords: '民生银行' },
      { number: '95577', name: '华夏银行', color: 'gray', icon: 'fa-building', keywords: '华夏银行' },
      { number: '95561', name: '兴业银行', color: 'gray', icon: 'fa-building', keywords: '兴业银行' }
    ]
  }
])

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