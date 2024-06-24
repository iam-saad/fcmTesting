'use client';
import { useEffect, useState } from 'react';

const useNotificationPermission = () => {
	const [notificationPermissionStatus, setNotificationPermissionStatus] =
		useState<NotificationPermission>('default');

	useEffect(() => {
		const handler = () =>
			setNotificationPermissionStatus(Notification.permission);

		const requestPermission = async () => {
			await Notification.requestPermission();
			handler();
		};

		const queryPermission = async () => {
			const notificationPermission = await navigator.permissions.query({
				name: 'notifications',
			});
			notificationPermission.onchange = handler;
		};

		requestPermission();
		queryPermission();
	}, []);

	return notificationPermissionStatus;
};

export default useNotificationPermission;
