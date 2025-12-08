<template>
  <div class="input-container">
    <!-- Image Previews -->
    <div v-if="files.length > 0" class="preview-area">
      <div v-for="(file, index) in files" :key="index" class="preview-item">
        <img :src="file.url" alt="Preview" />
        <button class="remove-btn" @click="removeFile(index)">
          <span class="material-icons">x</span>
        </button>
      </div>
    </div>

    <!-- Input Bar -->
    <footer class="input-bar">
      <button class="add-btn" @click="triggerFileInput">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <input 
        type="file" 
        ref="fileInput" 
        multiple 
        accept="image/*" 
        class="hidden-input"
        @change="handleFileSelect"
      />
      
      <input 
        type="text" 
        class="text-input" 
        placeholder="리뷰를 남겨주세요..." 
        v-model="text"
        @keyup.enter="handleSubmit"
      />
      
      <button class="submit-btn" @click="handleSubmit" :disabled="!isValid">
        작성
      </button>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const emit = defineEmits(['submit']);

const text = ref('');
const fileInput = ref(null);
const files = ref([]);

const isValid = computed(() => {
  return text.value.trim().length > 0 || files.value.length > 0;
});

const triggerFileInput = () => {
  fileInput.value.click();
};

const handleFileSelect = (event) => {
  const selectedFiles = Array.from(event.target.files);
  if (!selectedFiles.length) return;

  const newFiles = selectedFiles.map(file => ({
    file,
    url: URL.createObjectURL(file)
  }));

  files.value = [...files.value, ...newFiles];
  
  // Reset input so same file can be selected again if needed (though usually not for multiple)
  event.target.value = ''; 
};

const removeFile = (index) => {
  URL.revokeObjectURL(files.value[index].url); // Clean up
  files.value.splice(index, 1);
};

const handleSubmit = () => {
  if (!isValid.value) return;
  
  emit('submit', {
    text: text.value,
    images: files.value.map(f => f.url) // In real app, you'd upload f.file
  });
  
  // Reset
  text.value = '';
  files.value.forEach(f => URL.revokeObjectURL(f.url));
  files.value = [];
};
</script>

<style scoped>
.input-container {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 430px;
  background: white;
  z-index: 50;
  border-top: 1px solid #eee;
  padding-bottom: env(safe-area-inset-bottom);
}

.preview-area {
  display: flex;
  gap: 8px;
  padding: 12px 16px 0;
  overflow-x: auto;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
}

.preview-item {
  position: relative;
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #eee;
}

.preview-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove-btn {
  position: absolute;
  top: 2px;
  right: 2px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: rgba(0,0,0,0.5);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
}

.remove-btn .material-icons {
  font-size: 16px;
  color: white;
}

.input-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
}

.hidden-input {
  display: none;
}

.add-btn {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%; /* Make it circular */
  background: #f0f0f0; 
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.2s;
}

.add-btn:active {
  background: #e0e0e0;
  transform: scale(0.95);
}

.text-input {
  flex: 1;
  border: 1px solid #ddd;
  border-radius: 20px;
  padding: 10px 16px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
  background: #f9f9f9;
}

.text-input:focus {
  border-color: #0095f6;
  background: white;
}

.submit-btn {
  background: #0095f6;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 18px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: opacity 0.2s;
  flex-shrink: 0;
  white-space: nowrap;
}

.submit-btn:disabled {
  background: #b2dffc;
  cursor: not-allowed;
}
</style>
