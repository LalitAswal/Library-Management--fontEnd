
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// eslint-disable-next-line no-undef
firebase.initializeApp({
  apiKey: "AIzaSyAWfgLdsgI6uYOnA19p1cv12FDlwp8aapc",
  authDomain: "library-management-45c4a.firebaseapp.com",
  projectId: "library-management-45c4a",
  storageBucket: "library-management-45c4a.firebasestorage.app",
  messagingSenderId: "1094365069482",
  appId: "1:1094365069482:web:609e562ca8543269ed90d3",
  measurementId: "G-XY1QZTRH28"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();



messaging.onBackgroundMessage((payload) => {
    console.log(
      '[firebase-messaging-sw.js] Received background message ',
      payload
    );

    const currentTime = new Date().toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });

    // Customize notification here
    const notificationTitle = payload.data?.title;
    const notificationOptions = {
      name: payload.data?.name,
      body: payload.data?.body,
      icon: payload.data?.imageUrl,
      time: currentTime
    };
  
    console.log('notificationTitle',notificationOptions)
    // eslint-disable-next-line no-undef, no-restricted-globals
    self.registration.showNotification(notificationTitle, notificationOptions);
  });