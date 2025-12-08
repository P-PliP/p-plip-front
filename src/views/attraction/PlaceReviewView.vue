<template>
  <div class="review-page">
    <AppHeader title="리뷰" />

    <main class="content">
      <div class="place-summary">
        <h2 class="place-name">{{ placeName }}</h2>
        <span class="review-count">리뷰 {{ reviews.length }}개</span>
        
        <div class="filter-wrapper">
          <SortFilter v-model="currentSort" :options="sortOptions" />
        </div>
      </div>

      <div class="review-list">
        <PlaceReviewItem 
          v-for="review in sortedReviews" 
          :key="review.id" 
          :review="review" 
        />
      </div>
    </main>

    <PlaceReviewInput @submit="addReview" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import AppHeader from '@/components/common/AppHeader.vue';
import SortFilter from '@/components/common/SortFilter.vue';
import PlaceReviewItem from '@/components/attraction/review/PlaceReviewItem.vue';
import PlaceReviewInput from '@/components/attraction/review/PlaceReviewInput.vue';

const route = useRoute();
const placeName = ref('영도 해녀촌'); 

// Sorting
const currentSort = ref('desc');
const sortOptions = [
  { label: '최신순', value: 'desc' },
  { label: '오래된순', value: 'asc' }
];

// Mock Data
const reviews = ref([
  {
    id: 1,
    author: '여행가 P',
    date: '2023.10.26',
    avatarColor: '#EFEBE9',
    text: '바다 보면서 먹는 해산물 맛이 일품이에요! 즉흥적으로 갔는데 완전 만족했습니다. 분위기 최고!',
    photos: []
  },
  {
    id: 2,
    author: '즉흥 탐험가',
    date: '2023.10.22',
    avatarColor: '#F5F5F5',
    text: '뷰는 정말 좋은데 사람이 너무 많아서 조금 기다렸어요. 그래도 맛은 있었습니다.',
    photos: ['https://images.unsplash.com/photo-1596451190630-186aff535bf2?q=80&w=600&auto=format&fit=crop']
  },
  {
    id: 3,
    author: '맛잘알 여행러',
    date: '2023.10.18',
    avatarColor: '#FFF3E0', 
    text: '여기 라면은 꼭 드세요! 인생 라면입니다. 해산물도 정말 신선해요.',
    photos: []
  }
]);

const sortedReviews = computed(() => {
  const sorted = [...reviews.value];
  sorted.sort((a, b) => {
    // Basic string comparison for mock dates. Better to use Date objects in real app
    return currentSort.value === 'desc' 
      ? b.date.localeCompare(a.date) 
      : a.date.localeCompare(b.date);
  });
  return sorted;
});

const addReview = (payload) => {
  const { text, images } = payload;
  const today = new Date();
  reviews.value.unshift({
    id: Date.now(),
    author: '나',
    date: `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`,
    avatarColor: '#E3F2FD',
    text: text,
    photos: images || [] 
  });
};

onMounted(() => {
  console.log('Place ID:', route.params.id);
});
</script>

<style scoped>
.review-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f8f9fa;
  font-family: 'Pretendard', sans-serif;
}

.content {
  flex: 1;
  overflow-y: auto;
  padding-bottom: 80px; 
}

.place-summary {
  padding: 24px 20px;
  text-align: center;
  background: white;
  margin-bottom: 2px;
}

.place-name {
  font-size: 24px;
  font-weight: 800;
  margin: 0 0 8px;
  color: #333;
}

.review-count {
  color: #666;
  font-size: 14px;
}

.filter-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}

.review-list {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
