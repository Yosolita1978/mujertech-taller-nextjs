'use client';

import { useEffect, useCallback } from 'react';

export function useClarity(currentModule) {
    useEffect(() => {
        if (typeof window === 'undefined' || !window.clarity) return;
        if (!currentModule) return;

        window.clarity('set', 'module', currentModule);
        window.clarity('event', `module_${currentModule}`);
    }, [currentModule]);

    const trackEvent = useCallback((eventName, eventData) => {
        console.log('[Clarity Event]', eventName, eventData);
        
        if (typeof window === 'undefined' || !window.clarity) {
            console.warn('[Clarity] window.clarity not available');
            return;
        }

        window.clarity('event', eventName);

        if (eventData) {
            Object.entries(eventData).forEach(([key, value]) => {
                window.clarity('set', key, String(value));
            });
        }
    }, []);

    const setTag = useCallback((key, value) => {
        if (typeof window === 'undefined' || !window.clarity) return;
        window.clarity('set', key, String(value));
    }, []);

    return { trackEvent, setTag };
}