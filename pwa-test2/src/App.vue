

<template>
  <div>
    <img src="/vite.svg" class="logo" alt="Vite logo" />
    <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
  </div>
  <p> 0420 5:47new token : </p>
  <p>
    <el-text class="mx-1" type="danger">{{ token  }}</el-text>
  </p>
  <button v-on:click="requestPermission()">
      Request Permission
  </button>
  <HelloWorld />
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { ref } from 'vue'

export default {
  name: 'hello-world',

  components: {
    HelloWorld,
  },

  setup () {
    const firebaseApp = initializeApp({
      apiKey: "AIzaSyDEYWHma9rEroGOs5XYe8gZaDax8TIWRMo",
      authDomain: "test-58de1.firebaseapp.com",
      databaseURL: "https://test-58de1-default-rtdb.firebaseio.com",
      projectId: "test-58de1",
      storageBucket: "test-58de1.appspot.com",
      messagingSenderId: "439805881996",
      appId: "1:439805881996:web:41a120bee954577e1895a9"
    });

    const messaging = getMessaging(firebaseApp);
    const token = ref('')
    const requestPermission = () => {
      const VAPID_KEY = 'BCn-idO9957h3uKL4NDyjLZgm8Xh9_wWFAu0oQEgiDwXzZpv4oui3Iw3MTZd7T2iUZzarv_H-rRZZwlAHkVu0bo'

      getToken(messaging, { vapidKey: VAPID_KEY }).then((currentToken) => {
        console.log('getToken-app.vue')
        console.log(currentToken)
        token.value = currentToken ?? 'error'
      }).catch((err) => {
        console.log('檢索token時出錯', err);
        // ...
      });
    }
    // requestPermission()
    return {
      requestPermission,
      token,
    }
  },
}
</script>
<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
p { 
  word-break: break-all;
}
</style>
