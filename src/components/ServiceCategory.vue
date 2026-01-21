<template>
  <section>
    <div class="category-header h-24 mb-6 group relative shadow-lg rounded-xl overflow-hidden">
      <img :src="categoryImage" class="absolute inset-0 w-full h-full object-cover" :alt="category.title">
      <div class="glass-overlay absolute inset-0 flex items-center px-8">
        <h2 class="text-2xl font-bold text-white flex items-center gap-3">
          <i :class="categoryIcon" class="text-blue-400"></i> {{ category.title }}
        </h2>
      </div>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <PhoneCard 
        v-for="phone in category.phones" 
        :key="phone.number"
        :phone="phone"
      />
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import PhoneCard from './PhoneCard.vue'

const props = defineProps({
  category: {
    type: Object,
    required: true
  }
})

// 类别图标
const categoryIcon = computed(() => {
  return `fa-solid ${props.category.icon}`
})

// 类别背景图片
const categoryImage = computed(() => {
  const images = {
    'express': 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?q=80&w=2000&auto=format&fit=crop'
  }
  return images[props.category.id] || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop'
})
</script>

<style scoped>
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
</style>