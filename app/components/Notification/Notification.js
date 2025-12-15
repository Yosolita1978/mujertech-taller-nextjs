import { useEffect } from 'react';
import styles from './Notification.module.css';

export default function Notification({ message, type = 'info', isVisible, onHide }) {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onHide();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onHide]);

    return (
        <div className={styles.container}>
            <div className={`${styles.notification} ${styles[type]} ${isVisible ? styles.show : ''}`}>
                {message}
            </div>
        </div>
    );
}