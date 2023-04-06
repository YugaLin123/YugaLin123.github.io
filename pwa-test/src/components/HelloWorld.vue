

<template>
  <h1> pwa </h1>
  <el-button :plain="true" @click="openCenter">Show message</el-button>
  <el-button :plain="true" @click="sendNotification">傳送通知</el-button>

  
</template>
<script>
// import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { displayNotification } from '../registerServiceWorker.js'

export default {
  name: 'view-hello',
  components: {
  },
  setup () {
    const openCenter = () => {
      ElMessage({
        showClose: true,
        message: 'Centered text',
        center: true,
      })
    }
    const sendNotification = () => {
      const options = {
        icon: '/img/icons/android-chrome-512x512.png',
        body: 'OPEN WEBSITE222',
        data: {
          link: 'https://www.google.com/',
        },
        actions: [
          {
            action: 'yes',
            title: '同意',
          },
          {
            action: 'no',
            title: '拒絕',
          },
        ],
      }
      // displayNotification('message', options)
      displayNotification(options, 'action')
    }
    return {
      openCenter,
      sendNotification,
    }
    
  },
}
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
