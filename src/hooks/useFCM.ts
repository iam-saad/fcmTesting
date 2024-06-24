'use client';

import { useEffect, useState } from 'react';
import useFCMToken from './useFCMToken';
import { messaging } from '../utils/firebase/';
import { MessagePayload, onMessage } from 'firebase/messaging';
import { toast } from 'react-toastify';

const useFCM = () => {
	const fcmToken = useFCMToken();
	const [messages, setMessages] = useState<MessagePayload[]>([]);

	useEffect(() => {
		if ('serviceWorker' in navigator) {
			const fcmMessaging = messaging();
			const unsubscribe = onMessage(fcmMessaging, (payload) => {
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
	}, [fcmToken]);

	return { fcmToken, messages };
};

export default useFCM;
