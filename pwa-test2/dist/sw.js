

// Service Worker 安裝事件
self.addEventListener('install', () => {
  console.log('Service Worker 安裝成功！');
});

// Service Worker 啟動事件
self.addEventListener('activate', () => {
  console.log('Service Worker 啟動成功！');
});

// Service Worker 接收推送消息事件
self.addEventListener('push', event => {
  const payload = event.data.text();
  console.log(`接收到新消息：${payload}`);
});

// Service Worker 接收 Firebase Cloud Messaging 消息事件
self.addEventListener('message', event => {
  console.log('接收到 Firebase Cloud Messaging 消息：', event.data);
});