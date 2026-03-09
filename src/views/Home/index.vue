<template>
  <div>
    <p>當前數量：{{ counter.count }}</p>
    <p>兩倍數量：{{ counter.doubleCount }}</p>
    <button @click="counter.increment">增加</button>
    <Button label="點我" />

    <div class="card flex justify-center">
      <Breadcrumb :home="home" :model="items" />
    </div>

    <i class="pi pi-check"></i>
    <i class="pi pi-times"></i>
    <span class="pi pi-search"></span>
    <span class="pi pi-user"></span>
  </div>
</template>

<script setup>
  // import Button from 'primevue/button'
  import { useCounterStore } from '@/stores/default'
  import { ref } from 'vue'
  const value = ref(null)
  const counter = useCounterStore()

  const home = ref({
    icon: 'pi pi-home',
  })
  const items = ref([{ label: 'Electronics' }, { label: 'Computer' }, { label: 'Accessories' }, { label: 'Keyboard' }, { label: 'Wireless' }])
</script>
