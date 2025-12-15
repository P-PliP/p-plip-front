<template>
    <Teleport to="body">
        <div class="modal-overlay" v-if="isVisible" @click="close">
            <div class="modal-content" @click.stop>
                <h3 class="modal-title">어떤 여행을 계획하시나요?</h3>
                <p class="modal-subtitle">여행의 테마나 특별한 요구사항을 알려주세요</p>

                <div class="input-wrapper">
                    <textarea v-model="themeInput" placeholder="예: 힐링되는 숲속 산책, 아이들과 함께하는 체험 학습, 맛집 탐방 등"
                        class="theme-input" rows="3"></textarea>
                </div>

                <div class="modal-actions">
                    <button class="cancel-btn" @click="close">취소</button>
                    <button class="confirm-btn" @click="confirm" :disabled="!themeInput.trim()">
                        계획 요청하기
                    </button>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true
    }
});

const emit = defineEmits(['update:modelValue', 'confirm']);

const isVisible = ref(props.modelValue);
const themeInput = ref("");

watch(() => props.modelValue, (newVal) => {
    isVisible.value = newVal;
    if (newVal) {
        themeInput.value = ""; // Reset input on open
    }
});

const close = () => {
    emit('update:modelValue', false);
};

const confirm = () => {
    if (themeInput.value.trim()) {
        emit('confirm', themeInput.value.trim());
        close();
    }
};
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    /* Highest priority */
    padding: 24px;
    box-sizing: border-box;
}

.modal-content {
    width: 100%;
    max-width: 320px;
    background: white;
    border-radius: 20px;
    padding: 24px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    animation: popIn 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.modal-title {
    font-size: 18px;
    font-weight: 700;
    color: #111;
    margin: 0 0 8px;
    text-align: center;
}

.modal-subtitle {
    font-size: 14px;
    color: #666;
    margin: 0 0 20px;
    text-align: center;
    line-height: 1.5;
}

.input-wrapper {
    margin-bottom: 24px;
}

.theme-input {
    width: 100%;
    padding: 12px;
    border: 1px solid #eee;
    border-radius: 12px;
    background: #f8f9fa;
    font-size: 15px;
    resize: none;
    box-sizing: border-box;
    font-family: inherit;
    outline: none;
    transition: border-color 0.2s;
}

.theme-input:focus {
    border-color: #2196F3;
    background: white;
}

.modal-actions {
    display: flex;
    gap: 12px;
}

.cancel-btn {
    flex: 1;
    padding: 14px;
    border-radius: 12px;
    border: none;
    background: #f5f5f5;
    color: #666;
    font-weight: 600;
    font-size: 15px;
    cursor: pointer;
}

.confirm-btn {
    flex: 1;
    padding: 14px;
    border-radius: 12px;
    border: none;
    background: #2196F3;
    color: white;
    font-weight: 600;
    font-size: 15px;
    cursor: pointer;
}

.confirm-btn:disabled {
    background: #e0e0e0;
    color: #999;
    cursor: not-allowed;
}

@keyframes popIn {
    from {
        opacity: 0;
        transform: scale(0.95);
    }

    to {
        opacity: 1;
        transform: scale(1);
    }
}
</style>
