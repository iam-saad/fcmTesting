'use client';

import { useEffect, useState } from 'react';
import { getToken, isSupported } from 'firebase/messaging';
import { messaging } from '../utils/firebase';
import useNotificationPermission from './useNotificationPermission';

const useFCMToken = () => {
	const permission = useNotificationPermission();
	const [fcmToken, setFcmToken] = useState('');

	useEffect(() => {
		const retrieveToken = async () => {
			if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
				// Check if permission is granted before retrieving the token
				if (permission === 'granted') {
					const isFCMSupported = await isSupported();
					if (!isFCMSupported) return;

					const registration = await navigator.serviceWorker.register(
						'/firebase-messaging-sw.js',
						{ type: 'module' }
					);

					const token = await getToken(messaging(), {
						vapidKey:
							'BKlaB-_AAy0zEMgtMnUb2FHGikN5CbzdZy6bW2CFtddX-9cmt5kYYI2uMQIJ1bZJcaKVDcXjLv1o4LpTnh-ENTc',
						serviceWorkerRegistration: registration,
					});

					if (token) {
						console.log('FCM token:', token);
						setFcmToken(token);
					} else {
						console.log(
							'No registration token available. Request permission to generate one.'
						);
					}
				}
			}
		};

		retrieveToken();
	}, [permission]);

	return fcmToken;
};

export default useFCMToken;
