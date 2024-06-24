'use client';

import { useEffect, useState } from 'react';
import useFCMToken from './useFCMToken';
import { MessagePayload, getMessaging, onMessage } from 'firebase/messaging';
import { toast } from 'react-toastify';
import firebaseApp from '../utils/firebase/';

const useFCM = () => {
	const { token, notificationPermissionStatus } = useFCMToken();
	const [messages, setMessages] = useState<MessagePayload[]>([]);

	useEffect(() => {
		if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
			if (notificationPermissionStatus === 'granted') {
				const messaging = getMessaging(firebaseApp);

				const unsubscribe = onMessage(messaging, (payload) => {
					console.log('Foreground push notification received:', payload);
					toast.dark(payload.notification?.title);
					setMessages((prev) => [...prev, payload]);
					// Handle the received push notification while the app is in the foreground
					// You can display a notification or update the UI based on the payload
				});

				return () => {
					unsubscribe();
				};
			}
		}
	}, [notificationPermissionStatus]);

	return { token, messages };
};

export default useFCM;
