importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyAkOp-JiILbQwN00x9zjAIaKRN8Lklw4dI',
  authDomain: 'estudopwa.netlify.app',
  projectId: 'pwa-estudo',
  storageBucket: 'pwa-estudo.appspot.com',
  messagingSenderId: '979272127734',
  appId: '1:979272127734:web:30c9203eb85d02cb7c48d7',
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();


messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'mensagem chegou 22';
  const notificationOptions = {
    body: 'pwa'
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
    
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(swreg => {
      swreg.showNotification(notificationTitle, {
        actions: [{ action: 'archive', title: 'Archive' }],
      });
    });
  }
  self.registration.showNotification(notificationTitle,
    notificationOptions);
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register(`${process.env.PUBLIC_URL}/firebase-messaging-sw.js`)
  .then(function(registration) {
    console.log('Registration successful, scope is:', registration.scope);
  }).catch(function(err) {
    console.log('Service worker registration failed, error:', err);
  });
}