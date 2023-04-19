

// 安裝 
self.addEventListener('install', event => {
  self.skipWaiting(); //異動過的程式能夠立即更新
  console.log('[ServiceWorker] Install');
});
// 啟動 
self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
  console.log('activate')
});

// 存取 
self.addEventListener('fetch', event => {
  // console.log('[ServiceWorker] fetch', event.request);
});

self.addEventListener('notificationclick', event => {
  console.log('點按了通知 notificationclick')
  console.log(event)
  const notification = event.notification;
  const action = event.action;
  const type = notification.data.type
  // type = 'link' 添加跳轉連結
  if (type === 'link' && notification.data.link) {
    clients.openWindow(notification.data.link);
  }
  // type = 'action' 選項控制
  if (type === 'action') {
    const link = notification.data.link;
    switch (action) {
      case 'yes':
        if (link) {
          clients.openWindow(link);
        }
        break;
      case 'no':
        break;
      case 'close':
        break;
      default:
        if (link) {
          clients.openWindow(link);
        }
        break;
    }
  }
  notification.close();
})

