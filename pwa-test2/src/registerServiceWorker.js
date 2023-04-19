
import { ElMessage, ElMessageBox } from 'element-plus'
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

/**
 * 提示訊息
 */
const msg = (type = 'info' ,message) =>  {
  ElMessage({
    showClose: true,
    message: message,
    type: type,
  })
}

const PUBLIC_KEY = 'BIVbuJ7G107uwvslGvVgiTuDuihsLRQN6lkmZyUgGEw0kb5_vsvtoKY1syVt5iQrZMlsetzZOlQ_iIofLOM7stQ'
// const PRIVATE_KEY = 'cei7SaEYo7caT8AhmLYusTft1CZ105K5n7A5mD0pydg'
const NOTIFICATION_USABILITY = 'serviceWorker' in navigator && 'PushManager' in window
const API_HOST = 'https://us-central1-pwa-day08.cloudfunctions.net/api'


export const init = () => {
  msg('serviceWorker' in navigator ? 'success' : 'error', 'serviceWorker in navigator = ' + Boolean('serviceWorker' in navigator))
  msg('PushManager' in window ? 'success' : 'error','PushManager in window = ' + Boolean('PushManager' in window))
  if (!NOTIFICATION_USABILITY) {
    console.log('未支援訂閱')
    msg('error', '不支援Service Worker')
  } else {
    navigator.serviceWorker.register(`sw.js`)
      .then((reg) => {
        console.log('[Service Worker] 註冊成功. 範圍：' + reg.scope)
        msg('success', '[Service Worker] 註冊成功.')
        msg('info', '通知權限默認狀態:'+ Notification.permission)
        console.log(reg)
        localStorage.setItem('reg', JSON.stringify(reg))
        return reg.pushManager.getSubscription()
      })
      .then(subscription => {
        console.log(subscription)
        const isSubscribed = subscription !== null
        if (isSubscribed) {
          localStorage.setItem('subscription', JSON.stringify(subscription))
          console.log('已訂閱: 儲存訂閱資料')
        } else {
          console.log('未訂閱：訂閱詢問')
          subscribe()
        }
      })
      .catch(error => {
        console.log(error)
        console.error('[Service Worker] 註冊失敗.', error)
        msg('error', '[Service Worker] 註冊失敗.')
      })
  }
}
const subscribe = () => {
  console.log('進入訂閱流程')
  let swRegistration
  navigator.serviceWorker.ready
    .then(reg => {
      swRegistration = reg
      return reg.pushManager.getSubscription()
    })
    .then(subscription => {
      const result = ElMessageBox.confirm('是否要訂閱推送服務？')
      .then(() => {
        if (result && !subscription) {
          swRegistration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlB64ToUint8Array(PUBLIC_KEY),
          })
          .then(subscription => saveSubscription(subscription))
          .then(subscription => {
            console.log('[訂閱成功]:')
            // TODO：要儲存在伺服器裡
            console.log(subscription)
            localStorage.setItem('subscription', JSON.stringify(subscription))
            // >>> [訂閱成功]:
            // {
            //   "endpoint": "https://fcm.googleapis.com/fcm/send/edqjnBN9azE:APA91bEcorbG19sFZyqwsPUPRMvzFp2afD8cdMCGwIGZi1x4diS6IfKgjGEsoMM78n9DGi_ktM7e9qLzvR6nkScuY0J2fAtSmwrIsGE86Do1ss7NOWsQ5fT4WxnSgM395wBitCNFWuYy",
            //   "expirationTime": null,
            //   "keys": {
            //     "p256dh": "BH8cYSuGgfAoG3m6AjgO7J1aledY9TVERHnm564upSB9Cckk4dYA1DlohoN6uiJ6lVu0dA1AYqYDBW3uG7Fl_xs",
            //     "auth": "BwNcnwLqp9OjpIkrky44Rw"
            //   }
            // }
            // 將推送訂閱保存在後端伺服器中
            sendSubscriptionToServer(subscription);
          })
          
          .catch(err => {
            console.log('[catch訂閱失敗]: ', err)
          })
        }
      }).catch(() => {
        console.log('拒絕訂閱')
        console.log('TODO 儲存拒絕資訊，避免重複詢問')
      })
      console.log(result)
    })
    .catch(error => {
      console.log('big catch訂閱失敗：')
      console.error(error)
    })
}
const urlB64ToUint8Array = (base64String) => {
  const padding = '='.repeat((4 - base64String.length % 4) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}
const sendSubscriptionToServer = (subscription) => {
  console.log("儲存訂閱資料給後端")
  console.log(subscription)
}
const saveSubscription = async (subscription) => {
  const options = {
    method: 'PUT',
    body: JSON.stringify({
      fingerprint: localStorage.getItem('fingerprint'),
      subscription
    }),
    headers: new Headers({
      'Content-Type': 'Application/json'
    })
  }

  const response = await fetch(`${API_HOST}/subscriptions`, options)
  return await response.json()
}
/**
  * @param {string} tag - ID(非必填），唯一值，同tag的通知不會出現第二次
  * @param {string} icon - 圖示路徑url
  * @param {string} title - 通知中顯示的標題
  * @param {string} body - 內文文字
  * @param {string} image - 內文圖片
  * @param {boolean} requireInteraction - false(預設)：自動關閉 / true：只有使用者點擊或是按關閉按鈕才會消失
  * @param {object} data - 夾帶資料
  * @param {object} actions - 操作選項
  * @param {string} lang - 通知語言
  * @param {boolean} renotify - false(預設)：重複使用tag值時是否抑制振動和聲音
  * @param {boolean} silent - false(預設)：是否靜音
  * @param {array} vibrate - 振動時間設定
  */
const displayNotification = (param, type = '') => {
  // 現在的權限狀態為『允許』
  if ('Notification' in window && Notification.permission === 'granted') {
    navigator.serviceWorker.getRegistration().then(reg => {
      console.log('發送訊息')
      // type = '' 一般訊息推送
      // type = 'link' 添加跳轉連結
      // type = 'action' 添加選項
      const options = {
        icon: param.icon ?? '/PWA4/images/144x144.png',
        title: param.title ?? '預設測試用title',
        body: param.body ?? '測試用body' ,
        requireInteraction: param.requireInteraction ?? false,
        data: param.data ?? {},
        // actions: param.actions ?? {},
      }
      console.log(options)
      options.data.type = type
      reg.showNotification(options.title, options)
    })
  }
}
export const sendNotification =  (param, type = '') => {
  const notification = Notification.permission
  if(notification === 'denied') return
  else if(notification === 'granted') displayNotification(param, type)
  else if(notification === 'default') {
    Notification.requestPermission(function (status) {
      msg(status === 'granted' ? 'success' : 'info', '現在的權限狀態:'+ status)
      displayNotification(param, type)
    })
  }
}

init()


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEYWHma9rEroGOs5XYe8gZaDax8TIWRMo",
  authDomain: "test-58de1.firebaseapp.com",
  databaseURL: "https://test-58de1-default-rtdb.firebaseio.com",
  projectId: "test-58de1",
  storageBucket: "test-58de1.appspot.com",
  messagingSenderId: "439805881996",
  appId: "1:439805881996:web:41a120bee954577e1895a9"
};
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);


getToken(messaging, { vapidKey: '<YOUR_PUBLIC_VAPID_KEY_HERE>' }).then((currentToken) => {
  if (currentToken) {
    // Send the token to your server and update the UI if necessary
    // ...
  } else {
    // Show permission request UI
    console.log('No registration token available. Request permission to generate one.');
    // ...
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
  // ...
});

// 監聽來自 Firebase Cloud Messaging 的訊息
messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Received background message: ", payload);
});