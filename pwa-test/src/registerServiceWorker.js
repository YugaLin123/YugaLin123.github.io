
import { ElMessage } from 'element-plus'

const msg = (type, message) =>  {
  ElMessage({
    showClose: true,
    message: message,
    center: true,
    type: type,
    duration: 10000,
  })
}

const PUBLIC_KEY = 'BNookoBZ5lB6glB0aeijbFNe6sGLX8Vsw-QK0U5XJfHiUhb18pQ0KqluHJ9Vmgsl19tsgO3nHPMZavhhEuq9oPk'
// const PRIVATE_KEY = 'cbVY2q0s0eXCVB3wNNtfJjWRtTmfJFPfNrcuWGR6_JI'
const NOTIFICATION_USABILITY = 'serviceWorker' in navigator && 'PushManager' in window
const init = () => {
  if (!NOTIFICATION_USABILITY) {
    console.log('Service Worker and Push is supported')
    // Disable subscribe button when user device is not support
    console.log('未支援訂閱')
    msg('error', '不支援Service Worker')
  } else {
    navigator.serviceWorker.register(`sw.js`)
      .then((reg) => {
        console.log('[Service Worker] 註冊成功. 範圍：' + reg.scope)
        msg('success', '[Service Worker] 註冊成功.')
        msg('info', '通知權限默認狀態:'+ Notification.permission)
        Notification.requestPermission(function (status) {
          msg('success', '現在的權限狀態:'+ status)
        })
        console.log(localStorage.getItem('subscription'))
        return getSubscription(reg)
      })
      .then(subscription => {
        console.log(subscription)
        const isSubscribed = subscription !== null
        if (isSubscribed) {
          saveSubscription(subscription)
          console.log('已訂閱')
        } else {
          console.log('未訂閱')
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
// Push Manager ，取得使用者目前的訂閱資訊
// 若是已訂閱則將最新版本的訂閱資訊，傳給 saveSubscription 同步到伺服器端
const getSubscription = (reg) => {
  return reg.pushManager.getSubscription()
}
const saveSubscription = (subscription) => {
  console.log('[save]subscription:')
  console.log(subscription)
  // TODO: upload subscription data to server side
}
// 處理使用者點擊訂閱按鈕後的訂閱流程。
const subscribe = () => {
  console.log('處理使用者點擊訂閱按鈕後的訂閱流程。')
  let swRegistration
  const subscribeButton = document.querySelector('.user-profile__subscribe-button')
  navigator.serviceWorker.ready
    .then(reg => {
      swRegistration = reg
      return getSubscription(reg)
    })
    .then(subscription => {
      const isSubscribed = subscription !== null
      if (isSubscribed) {
        return subscription
      }
      return requestSubscription(swRegistration)
    })
    .then(subscription => saveSubscription(subscription))
    .then(response => {
      if (response.ok) {
        console.log('[subscribe()]已訂閱')
      } else {
        alert(response.message)
      }
    })
    .catch(error => {
      subscribeButton.disabled = false
      console.log('[subscribe()]訂閱失敗：')
      console.error(error)
    })
}
// 如果尚未訂閱，則透過 requestSubscription() 來取得使用者的訂閱資訊
const requestSubscription = (registration) => {
  const result = confirm('是否要訂閱 ？')
  if (result) {
    return registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlB64ToUint8Array(PUBLIC_KEY),
    })
      .then(subscription => {
        console.log('[註冊成功]:')
        console.log(JSON.stringify(subscription))
        // TODO：要儲存在伺服器裡
        localStorage.setItem('subscription', JSON.stringify(subscription))
        // >>> [註冊成功]:
        // {
        //   "endpoint": "https://fcm.googleapis.com/fcm/send/edqjnBN9azE:APA91bEcorbG19sFZyqwsPUPRMvzFp2afD8cdMCGwIGZi1x4diS6IfKgjGEsoMM78n9DGi_ktM7e9qLzvR6nkScuY0J2fAtSmwrIsGE86Do1ss7NOWsQ5fT4WxnSgM395wBitCNFWuYy",
        //   "expirationTime": null,
        //   "keys": {
        //     "p256dh": "BH8cYSuGgfAoG3m6AjgO7J1aledY9TVERHnm564upSB9Cckk4dYA1DlohoN6uiJ6lVu0dA1AYqYDBW3uG7Fl_xs",
        //     "auth": "BwNcnwLqp9OjpIkrky44Rw"
        //   }
        // }
      })
      .catch(err => {
        console.log('[註冊失敗]: ', err)
      })
  }
  return Promise.reject(new Error('Failed to request push notification permission'))
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
init()
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
export const displayNotification = (param, type = '') => {
  // 現在的權限狀態為『允許』
  if ('Notification' in window && Notification.permission === 'granted') {
    navigator.serviceWorker.getRegistration().then(reg => {
      console.log('發送訊息')
      // type = '' 一般訊息推送
      // type = 'link' 添加跳轉連結
      // type = 'action' 添加選項
      const options = {
        icon: param.icon ?? '/img/icons/android-chrome-512x512.png',
        title: param.title ?? 'GPG神遊平台',
        body: 'body',
        requireInteraction: param.requireInteraction ?? false,
        data: param.data ?? {},
        // actions: param.actions ?? {},
      }
      options.data.type = type
      reg.showNotification(options.title, options)
    })
  }
}
