<template>
  <section class="mt-12">
    <div class="flex items-center gap-2 mb-4">
      <span class="w-1.5 h-6 bg-primary rounded-full"></span>
      <h2 class="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
        <span class="material-icons text-primary">{{ getMaterialIcon(category.id) }}</span>
        {{ category.title }}
      </h2>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <PhoneCard 
        v-for="phone in category.phones" 
        :key="phone.number"
        :phone="phone"
        class="transform hover:scale-[1.02] transition-all duration-300 hover:shadow-xl"
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

// Material Icons映射
const getMaterialIcon = (categoryId) => {
  const iconMap = {
    'express': 'local_shipping',
    'travel': 'flight',
    'communication': 'smartphone'
  }
  return iconMap[categoryId] || 'category'
}
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