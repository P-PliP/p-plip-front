<template>
  <div class="review-item">
    <div class="review-header">
      <div class="user-profile">
        <div class="avatar" :style="{ backgroundColor: review.avatarColor }">
          <img v-if="review.avatarUrl" :src="review.avatarUrl" alt="User Avatar" />
          <span v-else>{{ review.author[0] }}</span>
        </div>
        <span class="username">{{ review.author }}</span>
      </div>
      <span class="date">{{ review.date }}</span>
    </div>

    <div v-if="review.photos && review.photos.length > 0" class="review-photos">
      <ImageCarousel :images="review.photos" />
    </div>

    <p class="review-text">{{ review.text }}</p>
  </div>
</template>

<script setup>
import ImageCarousel from '@/components/common/ImageCarousel.vue';

defineProps({
  review: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
.review-item {
  background: white;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.03);
  display: flex;
  flex-direction: column;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
  color: #555;
  overflow: hidden;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.username {
  font-weight: 700;
  font-size: 15px;
  color: #333;
}

.date {
  font-size: 12px;
  color: #999;
}

.review-photos {
  margin-bottom: 12px;
  border-radius: 16px;
  overflow: hidden;
}

/* Old carousel styles removed */

.review-text {
  font-size: 15px;
  line-height: 1.5;
  color: #444;
  margin: 0;
  word-break: break-word;
}
</style>
