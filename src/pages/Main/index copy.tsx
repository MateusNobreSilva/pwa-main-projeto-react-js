import React, { useState } from 'react';

import Button from '../../components/Button';

const Main: React.FC = () => {
  const [inscricao, setInscricao] = useState('');

  const displayConfirmNotification = () => {
    if ('serviceWorker' in navigator) {
      /* const options: NotificationOptions = {
      body: 'You successfully subscribed to our Notification service!',
    };

    navigator.serviceWorker.ready.then(swreg => {
      swreg.showNotification('Successfully subscribed (from SW)!', options);
    });
   */

      /* const img = '/to-do-notifications/img/icon-128.png';
    const text = `HEY! Your task is now overdue.`;
    const notification = new Notification('To do list', {
      body: text,
    }); */
      navigator.serviceWorker.ready.then(swreg => {
        swreg.showNotification('New mail', {
          actions: [{ action: 'archive', title: 'Archive' }],
        });
      });
    }
  };

  const askForNotificationPermission = () => {
    Notification.requestPermission().then(result => {
      if (result === 'granted') {
        displayConfirmNotification();
      }
    });

    /* Notification.requestPermission(result => {
    if (result === 'granted') {
      displayConfirmNotification();
    }
  }); */
  };

  const configurePushSub = () => {
    if (!('serviceWorker' in navigator)) {
      return;
    }

    let reg: ServiceWorkerRegistration;
    navigator.serviceWorker.ready
      .then(swreg => {
        reg = swreg;
        return swreg.pushManager.getSubscription();
      })
      .then(sub => {
        if (sub === null) {
          // Create a new subscription
          const publicKey = 'AIzaSyA-iIq3O8TlTLT8Q0YVb4gYBWoV1Ff3Dx8';

          return reg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: publicKey,
          });
        }

        return null;
        // We have a subscription
      })
      .then(newSub => {
        /* return fetch('https://pwagram-99adf.firebaseio.com/subscriptions.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(newSub),
      }); */
        setInscricao(JSON.stringify(newSub));
        return true;
      })
      .then(res => {
        if (res) {
          displayConfirmNotification();
        }
      })
      .catch(err => {
        setInscricao(err);
      });
  };

  return (
    <>
      <Button
        onClick={() => {
          if ('Notification' in window) {
            askForNotificationPermission();
          }
        }}
      >
        Ativa Notificações
      </Button>

      <Button
        onClick={() => {
          Notification.requestPermission(result => {
            if (result === 'granted') {
              configurePushSub();
              // displayConfirmNotification();
            }
          });
        }}
      >
        Ativa Push Notification
      </Button>

      <Button
        onClick={() => {
          if ('Notification' in window) {
            displayConfirmNotification();
          }
        }}
      >
        Exibe Notificação
      </Button>

      <input type="text" value={inscricao} />
    </>
  );
};

export default Main;
