import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';

const config = {
  apiKey: 'AIzaSyAkOp-JiILbQwN00x9zjAIaKRN8Lklw4dI',
  authDomain: 'pwa-estudo.firebaseapp.com',
  projectId: 'pwa-estudo',
  storageBucket: 'estudopwa.netlify.app',
  messagingSenderId: '979272127734',
  appId: '1:979272127734:web:30c9203eb85d02cb7c48d7',
};
// pwa-estudo.appspot.com
const firebaseApp = initializeApp(config);
const messaging = getMessaging(firebaseApp);

export const getFirebaseToken = (): Promise<string> => {
  return getToken(messaging, {
    vapidKey:
      'BGNYo89UnCq7p1t6f9ZbbTY3KKHx-lRuciI8zn3nePzKbSpQCeOUEBhk9LIjSaBMUnIZBfJlEe1oAGEny1DvIkI',
  })
    .then(token => {
      alert(token);

      const text = 'Example text to appear on clipboard';
      navigator.clipboard.writeText(token).then(
        function () {
          console.log('Async: Copying to clipboard was successful!');
          alert('sucesso');
        },
        function (err) {
          alert('falha');
        },
      );

      console.log(`Token: ${token}`);
      console.log(
        'No registration token available. Request permission to generate one.',
      );

      return token;
    })
    .catch(err => {
      console.log('An error occurred while retrieving token. ', err);
      return '';
    });
};

export default messaging;
