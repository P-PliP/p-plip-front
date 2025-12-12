import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(false);
  const accessToken = ref(null);

  const login = (token) => {
    isLoggedIn.value = true;
    accessToken.value = token;
    localStorage.setItem('accessToken', token);
  };

  const logout = () => {
    isLoggedIn.value = false;
    accessToken.value = null;
    localStorage.removeItem('accessToken');
  };

  return { isLoggedIn, accessToken, login, logout };
}, { persist: true });
