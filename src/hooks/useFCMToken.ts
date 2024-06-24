'use client';

import { useEffect, useState } from 'react';
import { getToken, isSupported, getMessaging } from 'firebase/messaging';
import firebaseApp from '@/utils/firebase';

const useFCMToken = () => {
	const [token, setToken] = useState('');
	const [notificationPermissionStatus, setNotificationPermissionStatus] =
		useState('');

	useEffect(() => {
		const retrieveToken = async () => {
			try {
				if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
					const messaging = getMessaging(firebaseApp);

					const permission = await Notification.requestPermission();
					setNotificationPermissionStatus(permission);

					// Check if permission is granted before retrieving the token
					if (permission === 'granted') {
						const isFCMSupported = await isSupported();
						if (!isFCMSupported) return;

						const registration = await navigator.serviceWorker.register(
							'/firebase-messaging-sw.js',
							{ type: 'module' }
						);

						const currentToken = await getToken(messaging, {
							vapidKey: `BKlaB-_AAy0zEMgtMnUb2FHGikN5CbzdZy6bW2CFtddX-9cmt5kYYI2uMQIJ1bZJcaKVDcXjLv1o4LpTnh-ENTc `,
							serviceWorkerRegistration: registration,
						});

						if (currentToken) {
							console.log('FCM token:', currentToken);
							setToken(currentToken);
						} else {
							console.log(
								'No registration token available. Request permission to generate one.'
							);
						}
					}
				}
			} catch (error) {
				console.log('Error retrieving token:', error);
			}
		};

		retrieveToken();
	}, []);

	return { token, notificationPermissionStatus };
};

export default useFCMToken;
