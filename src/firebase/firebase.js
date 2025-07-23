import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import axiosClient from '../services/axios';
import firebaseConfig from './firebaseConfig';

const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);
const generateToken = async (userType) => {
  const permission = await Notification.requestPermission();
  console.log('Permission:', permission);

  if (permission === 'granted') {
    const token = await getToken(messaging, {
      vapidKey: process.env.VAPID_KEY,
    })
      .then((firebaseToken) => {
        if (firebaseToken) {
          console.log('current token for client: ', firebaseToken);
          axiosClient
            .post('firebase/firebaseRegistrationTokenUser', {
              firebaseToken,
              userType,
            })
            .then(function (response) {
              console.log('registered token for client: ', response);
            })
            .catch(function (error) {
              console.log('error', error);
            });
        } else {
          console.log('No registration token available. Request permission to generate one.');
        }
      })
      .catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        // catch error while creating client token
      });
  }
};

export { messaging, onMessage, generateToken };
