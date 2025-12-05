<template>
    <div class="main-container">
        <!-- Map Background -->
        <div class="map-background">
            <MapComponent />
        </div>

        <!-- Top Overlay: Search & Filter -->
        <div class="top-overlay">
            <SearchBar />
            <div class="filter-wrapper">
                <CategoryFilter />
            </div>
        </div>

        <!-- Toggle Button (Visible when list is closed) -->
        <button v-if="!isListOpen" class="list-toggle-btn" @click="isListOpen = true">
            목록 보기
        </button>

        <!-- Bottom Sheet: Place List -->
        <div class="bottom-sheet" :class="{ 'closed': !isListOpen }">
            <PlaceList @close="isListOpen = false" />
        </div>

        <!-- Bottom Navigation -->
        <div class="bottom-nav">
            <nav-bar></nav-bar>
        </div>

        <!-- Chat Trigger Button -->
        <button class="chat-fab" @click="isChatOpen = true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>

        <!-- Chat Modal -->
        <ChatModal :is-open="isChatOpen" @close="isChatOpen = false" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import MapComponent from '@/components/main/Mapcomponent.vue';
import SearchBar from '@/components/main/SearchBar.vue';
import CategoryFilter from '@/components/main/CategoryFilter.vue';
import PlaceList from '@/components/main/PlaceList.vue';
import NavBar from '@/components/common/Navbar.vue';
import ChatModal from '@/components/common/ChatModal.vue';

const isListOpen = ref(false);
const isChatOpen = ref(false);
</script>

<style scoped>
.main-container {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background-color: #f5f5f5;
}

.map-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%; /* Full height */
    z-index: 1;
}

.top-overlay {
    position: absolute;
    top: 20px;
    left: 20px;
    right: 20px;
    z-index: 10;
    display: flex;
    flex-direction: column;
    gap: 12px;
    pointer-events: none; /* Allow clicks to pass through to map where not clicking children */
}

.top-overlay > * {
    pointer-events: auto; /* Re-enable pointer events for children */
}

.filter-wrapper {
    width: 100%;
    overflow: hidden;
}

.list-toggle-btn {
    position: absolute;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 25;
    padding: 10px 20px;
    background: white;
    border: none;
    border-radius: 20px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    font-weight: bold;
    color: #333;
    cursor: pointer;
}

.bottom-sheet {
    position: absolute;
    bottom: calc(60px + env(safe-area-inset-bottom)); /* Height of NavBar + safe area */
    left: 0;
    right: 0;
    height: 55%;
    z-index: 20;
    border-radius: 20px 20px 0 0;
    overflow: hidden;
    transition: transform 0.3s ease-in-out;
}

.bottom-sheet.closed {
    transform: translateY(100%);
}

.bottom-nav {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: calc(60px + env(safe-area-inset-bottom));
    padding-bottom: env(safe-area-inset-bottom);
    z-index: 30;
    background: white;
    border-top: 1px solid #eee;
}

.chat-fab {
    position: absolute;
    bottom: calc(80px + env(safe-area-inset-bottom));
    right: 20px;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: #333;
    border: none;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 40;
    cursor: pointer;
    transition: transform 0.2s;
}

.chat-fab:active {
    transform: scale(0.95);
}
</style>
