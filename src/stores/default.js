import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  // State: 相當於 data
  const count = ref(0)

  // Getters: 相當於 computed
  const doubleCount = computed(() => count.value * 2)

  // Actions: 相當於 methods
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
