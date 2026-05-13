import type { AuthResponse, SignInData, User } from '@/types';
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useAuthStore = defineStore(
  'auth',
  () => {
    const users = ref<User[]>(JSON.parse(localStorage.getItem('all_users') || '[]'));
    const currentUser = ref<User | null>(null);

    function register(newUser: User): AuthResponse {
      const exists = users.value.find((user) => user.email === newUser.email);

      if (exists) return { success: false, message: 'User already exists' };

      users.value.push(newUser);
      return { success: true };
    }

    function login(credantials: SignInData) {
      const user = users.value.find(
        (user) => user.email === credantials.email && user.password === credantials.password,
      );

      if (user) {
        const token = btoa(user.email + Date.now());
        localStorage.setItem('token', token);
        currentUser.value = user;
        return true;
      }
      return false;
    }

    function remove(id: string) {
      users.value = users.value.filter((user) => user.id !== id);
      currentUser.value = null;
      localStorage.removeItem('token');
    }

    function edit(currUser: User) {
      currentUser.value = currUser;
      users.value = users.value.map((user) => (user.id === currUser.id ? currUser : user));
    }

    watch(
      currentUser,
      (newUser) => {
        if (newUser) {
          users.value = users.value.map((user) => (user.id === newUser.id ? { ...newUser } : user));
        }
      },
      { deep: true },
    );

    return {
      users,
      currentUser,
      edit,
      login,
      remove,
      register,
    };
  },
  {
    persist: {
      key: 'auth-store',
      pick: ['users', 'currentUser'],
    },
  },
);
