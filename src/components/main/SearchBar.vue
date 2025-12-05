<template>
  <div class="search-bar-container">
    <div class="search-input-wrapper">
      <span class="search-icon" @click="handleSearch">🔍</span>
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="장소 또는 지역 검색" 
        class="search-input"
        @keyup.enter="handleSearch"
      >
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useAttractionStore } from '@/stores/attraction';

const attractionStore = useAttractionStore();

const { VITE_SERVER_BASE_URL } = import.meta.env;
const searchQuery = ref('');

const handleSearch = async () => {
  try {
    const response = await axios.get(`${VITE_SERVER_BASE_URL}/search?q=${searchQuery.value}`);
    const data = response.json();
    // data 처리 과정 필요.
    
    attractionStore.addAttraction(data);    
  } catch (error) {
    console.error('Error fetching search results:', error);
  }
};

</script>

<style scoped>
.search-bar-container {
  width: 100%;
  padding: 0 4px;
}

.search-input-wrapper {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 12px;
  padding: 12px 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.search-icon {
  margin-right: 12px;
  font-size: 18px;
  color: #666;
}

.search-input {
  border: none;
  outline: none;
  font-size: 16px;
  width: 100%;
  color: #333;
}

.search-input::placeholder {
  color: #999;
}
</style>