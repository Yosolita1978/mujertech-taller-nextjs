import { useState, useCallback } from 'react';

export function useNotification() {
    const [notification, setNotification] = useState({
        message: '',
        type: 'info',
        isVisible: false
    });

    const showNotification = useCallback((message, type = 'info') => {
        setNotification({ message, type, isVisible: true });
    }, []);

    const hideNotification = useCallback(() => {
        setNotification(prev => ({ ...prev, isVisible: false }));
    }, []);

    return {
        notification,
        showNotification,
        hideNotification
    };
}