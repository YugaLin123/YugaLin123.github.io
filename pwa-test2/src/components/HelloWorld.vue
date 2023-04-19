

<template>
  <h1> pwa </h1>
  <p>sec = {{ sec }}</p>
  <el-button :plain="true" @click="sendLink">可以開啟別的連結的通知</el-button>
  <el-button :plain="true" @click="send">傳送通知</el-button>
  <el-button :plain="true" @click="interval">定時器</el-button>

</template>
<script>
import { inject, ref } from 'vue'
import { sendNotification } from '../registerServiceWorker.js'

export default {
  name: 'view-hello',
  components: {
  },
  setup () {
    const send = () => {
      const options = {
        body: '通知測試',
      }
      // displayNotification('message', options)
      sendNotification(options, 'action')
    }
    const sendLink = () => {
      const options = {
        body: '通知測試',
        data: {
          link: 'https://www.google.com/',
        },
      }
      // displayNotification('message', options)
      sendNotification(options, 'action')
    }
    const sec = ref(10)
    const interval = () => {
      const secondInterval = setInterval(() => {
        if (sec.value === 0) clearInterval(secondInterval)
        sec.value--
        const options = {
          title: '計時器測試',
          body: `第${sec.value}次`,
        }
        // displayNotification('message', options)
        sendNotification(options, '')
      }, 3000)
    }
    
    return {
      sendLink,
      send,
      sec,
      interval,
    }
    
  },
}
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
