
importScripts('https://www.gstatic.com/firebasejs/9.18.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.18.0/firebase-messaging-compat.js');
var FIREBASE_CONFIG = {
apiKey: "AIzaSyDEYWHma9rEroGOs5XYe8gZaDax8TIWRMo",
authDomain: "test-58de1.firebaseapp.com",
databaseURL: "https://test-58de1-default-rtdb.firebaseio.com",
projectId: "test-58de1",
storageBucket: "test-58de1.appspot.com",
messagingSenderId: "439805881996",
appId: "1:439805881996:web:41a120bee954577e1895a9"
};

// Initialize Firebase
firebase.initializeApp(FIREBASE_CONFIG);
const messaging = firebase.messaging();
messaging.onMessage((payload) => {
    console.log('[firebase-messaging-sw.js] onMessage: ', payload);
    // ...
  });
messaging.onBackgroundMessage((payload) => {
    console.log(
      '[firebase-messaging-sw.js] Received background message ',
      payload
    );
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
      body: 'Background Message body.',
      icon: '/firebase-logo.png'
    };
  
    self.registration.showNotification(notificationTitle, notificationOptions);
  });
  
// const app = initializeApp(firebaseConfig);
// const messaging = getMessaging(app);
// getToken(messaging, {vapidKey: 'BCn-idO9957h3uKL4NDyjLZgm8Xh9_wWFAu0oQEgiDwXzZpv4oui3Iw3MTZd7T2iUZzarv_H-rRZZwlAHkVu0bo'}).then((currentToken) => {
//   console.log('getToken-firebase-Messaging-sw')
//   console.log(currentToken)
// }).catch((err) => { console.log('檢索token時出錯', err);})



// self.addEventListener("push", (event) => {
//   const payload = event.data.json();
//   const { title, body } = payload.notification;
//   const options = {
//     body,
//   };
//   event.waitUntil(self.registration.showNotification(title, options));
// });
