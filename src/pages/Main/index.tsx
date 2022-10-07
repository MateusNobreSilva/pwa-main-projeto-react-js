import React, { useState } from 'react';
import { getFirebaseToken } from '../../firebase';

import Button from '../../components/Button';

const Main: React.FC = () => {
  const [inscricao, setInscricao] = useState('');

  const displayConfirmNotification = () => {
    if ('serviceWorker' in navigator) {
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
          const publicKey =
            'BGNYo89UnCq7p1t6f9ZbbTY3KKHx-lRuciI8zn3nePzKbSpQCeOUEBhk9LIjSaBMUnIZBfJlEe1oAGEny1DvIkI';

          return reg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: publicKey,
          });
        }

        return null;
        // We have a subscription
      })
      .then(newSub => {
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

  const firebaseAskPermission = async () => {
    let aaa = '';
    aaa = await getFirebaseToken();

    // alert(`aaa = ${aaa}`);

    setInscricao(aaa);
  };

  return (
    <>
      <Button
        onClick={() => {
          if ('Notification' in window) {
            firebaseAskPermission();
          }
        }}
      >
        Ativa FCM 9
      </Button>

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
        Ativa Push Notification 8
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
