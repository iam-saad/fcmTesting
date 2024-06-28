'use client';

import { useEffect, useState } from 'react';
import { getToken, isSupported } from 'firebase/messaging';
import { messaging } from '../utils/firebase';
import useNotificationPermission from './useNotificationPermission';

const useFCMToken = () => {
	const permission = useNotificationPermission();
	const [fcmToken, setFcmToken] = useState<string | null>(null);

	useEffect(() => {
		const retrieveToken = async () => {
			if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
				// Check if permission is granted before retrieving the token
				if (permission === 'granted') {
					const isFCMSupported = await isSupported();
					if (!isFCMSupported) return;

					const token = await getToken(messaging(), {
						vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
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
