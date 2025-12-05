<template>
  <div 
    ref="filterContainer"
    class="category-filter"
    @mousedown="startDrag"
    @mousemove="onDrag"
    @mouseup="stopDrag"
    @mouseleave="stopDrag"
  >
    <button 
      v-for="category in categories" 
      :key="category.id"
      class="category-btn"
      :class="{ active: selectedCategory === category.id }"
      @click="selectCategory(category.id)"
    >
      <span class="icon">{{ category.icon }}</span> {{ category.name }}
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const selectedCategory = ref('restaurant');
const filterContainer = ref(null);
const isDown = ref(false);
const isDragging = ref(false);
const startX = ref(0);
const scrollLeft = ref(0);

const categories = [
  { id: 'restaurant', name: '식당', icon: '🍽️' },
  { id: 'tourist', name: '관광지', icon: '🗺️' },
  { id: 'cafe', name: '카페', icon: '☕' },
  { id: 'accommodation', name: '숙박', icon: '🏨' },
  { id: 'shopping', name: '쇼핑', icon: '🛍️' },
  { id: 'culture', name: '문화', icon: '🎭' },
  { id: 'leisure', name: '레포츠', icon: '⚽' },
  { id: 'festival', name: '축제', icon: '🎉' },
];

const selectCategory = (id) => {
  if (isDragging.value) return; // Prevent selection if dragging
  selectedCategory.value = id;
};

const startDrag = (e) => {
  isDown.value = true;
  isDragging.value = false;
  startX.value = e.pageX - filterContainer.value.offsetLeft;
  scrollLeft.value = filterContainer.value.scrollLeft;
};

const onDrag = (e) => {
  if (!isDown.value) return;
  e.preventDefault();
  const x = e.pageX - filterContainer.value.offsetLeft;
  const walk = (x - startX.value) * 2; // Scroll-fast
  
  // Only consider it a drag if moved more than 5px
  if (Math.abs(x - startX.value) > 5) {
    isDragging.value = true;
    filterContainer.value.scrollLeft = scrollLeft.value - walk;
  }
};

const stopDrag = () => {
  isDown.value = false;
  setTimeout(() => {
    isDragging.value = false;
  }, 0);
};
</script>

<style scoped>
.category-filter {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding: 10px 0;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  padding-left: 4px; /* Visual padding */
  padding-right: 4px;
}

.category-filter::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.category-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: white;
  border: 1px solid #eee;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  color: #333;
  white-space: nowrap;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0; /* Prevent shrinking */
}

.category-btn:hover {
  background: #f9f9f9;
}

.category-btn.active {
  border-color: #4CAF50; /* Example active color */
  color: #4CAF50;
  background: #f0fdf4;
}

.icon {
  font-size: 16px;
}
</style>
