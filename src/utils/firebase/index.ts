// Import the functions you need from the SDKs you need
'use client';
import { type FirebaseOptions, initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig: FirebaseOptions = {
	apiKey: 'AIzaSyDuG-bbefK5YaDPKfvsNteiAyKKpsf_EnQ',
	authDomain: 'testing-fcm-d04e6.firebaseapp.com',
	projectId: 'testing-fcm-d04e6',
	storageBucket: 'testing-fcm-d04e6.appspot.com',
	messagingSenderId: '918216641010',
	appId: '1:918216641010:web:3deb470adaa013bdf7436b',
	measurementId: 'G-56731QRR41',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// export const messaging = () => getMessaging(firebaseApp);

export default firebaseApp;
