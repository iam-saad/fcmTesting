'use client';

import useFCM from '@/hooks/useFCM';
import styles from './page.module.css';

export default function Home() {
	const { fcmToken, messages } = useFCM();

	return (
		<div className={styles.main}>
			<h1>FCM</h1>
			<p>FCM Token:{fcmToken}</p>
		</div>
	);
}
