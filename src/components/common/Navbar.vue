<template>
    <div>
        <ul>
            <li><router-link :to="{ name: 'board' }"><span>❤️</span>게시판</router-link></li>
            <li><router-link :to="{ name: 'main' }"><span>🏠</span>홈</router-link></li>
            <li><router-link :to="{ name: 'plan' }"><span>📝</span>플랜</router-link></li>
            <li><router-link :to="{ name: 'myinfo' }"><span>👤</span>프로필</router-link></li>
        </ul>
        <router-view />
    </div>    
</template>

<script setup>
import { ref } from 'vue';


</script>

<style scoped>
div {
    height: 100%;
}

ul {
    display: flex;
    justify-content: space-around;
    align-items: center;
    list-style: none;
    padding: 0;
    margin: 0;
    height: 100%;
}

li {
    flex: 1;
    text-align: center;
}

a {
    text-decoration: none;
    color: #999;
    font-size: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
}

a.router-link-active {
    color: #4CAF50; /* Active color */
    font-weight: bold;
}
</style>