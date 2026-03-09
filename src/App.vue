<template>
  <div class="app">
    <ViewHeader class="main-header" />
    <div class="main-container">
      <router-view class="container"></router-view>
    </div>
  </div>
</template>

<script setup>
  import ViewHeader from '@/components/Header/index.vue'
</script>

<style lang="scss" scoped>
  .app {
    .main-header {
      height: var(--header-height);
      position: fixed;
      width: 100%;
      top: 0;
      left: 0;
      right: 0;
      z-index: 3;
      background-color: #f8f8f8;
      box-shadow: 0 3px 6px #45454557;
    }
    .main-container {
      margin-top: calc(var(--header-height) + 40px);
      width: 100%;
      max-width: 1200px;
      padding-right: 15px;
      padding-left: 15px;
      margin-right: auto;
      margin-left: auto;
      @media (min-width: 768px) {
        max-width: calc(100% - 60px);
      }
      @media (min-width: 576px) {
        max-width: calc(100% - 40px);
      }
    }
  }
</style>
