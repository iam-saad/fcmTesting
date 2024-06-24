importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js');
importScripts(
	'https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js'
);

const firebaseConfig = {
	apiKey: 'AIzaSyDuG-bbefK5YaDPKfvsNteiAyKKpsf_EnQ',
	authDomain: 'testing-fcm-d04e6.firebaseapp.com',
	projectId: 'testing-fcm-d04e6',
	storageBucket: 'testing-fcm-d04e6.appspot.com',
	messagingSenderId: '918216641010',
	appId: '1:918216641010:web:3deb470adaa013bdf7436b',
	measurementId: 'G-56731QRR41',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
	console.log('Received background message ', payload);

	// Customize notification here
	const notificationTitle = payload.notification.title;
	const notificationOptions = {
		body: payload.notification.body,
	};

	self.registration.showNotification(notificationTitle, notificationOptions);
});
