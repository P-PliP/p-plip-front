<template>
    <div class="toast-container">
        <transition-group name="toast">
            <div v-for="toast in toasts" :key="toast.id" class="toast-item" :class="toast.type">
                <span class="toast-icon">
                    <template v-if="toast.type === 'success'">✅</template>
                    <template v-else-if="toast.type === 'warning'">⚠️</template>
                    <template v-else-if="toast.type === 'error'">🚨</template>
                    <template v-else>ℹ️</template>
                </span>
                <span class="toast-message">{{ toast.message }}</span>
            </div>
        </transition-group>
    </div>
</template>

<script setup>
import { useToastStore } from '@/stores/toast';
import { storeToRefs } from 'pinia';

const toastStore = useToastStore();
const { toasts } = storeToRefs(toastStore);
</script>

<style scoped>
.toast-container {
    position: fixed;
    bottom: 130px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9999;
    display: flex;
    flex-direction: column;
    gap: 10px;
    pointer-events: none;
    /* Allow clicks through the container */
    width: 90%;
    max-width: 400px;
    align-items: center;
}

.toast-item {
    pointer-events: auto;
    display: flex;
    align-items: center;
    padding: 12px 20px;
    border-radius: 50px;
    background: white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    font-size: 14px;
    font-weight: 500;
    color: #333;
    min-width: 280px;
    justify-content: center;
    gap: 8px;
}

.toast-item.success {
    border-left: 4px solid #4caf50;
}

.toast-item.warning {
    border-left: 4px solid #ff9800;
}

.toast-item.error {
    border-left: 4px solid #f44336;
}

.toast-item.info {
    border-left: 4px solid #2196f3;
}

/* Transitions */
.toast-enter-active,
.toast-leave-active {
    transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
    opacity: 0;
    transform: translateY(20px);
}
</style>
