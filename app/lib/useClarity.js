'use client';

import { useEffect, useCallback, useRef } from 'react';

const CLARITY_ID = 'your_actual_id_here'; // Your Clarity ID

export function useClarity(currentModule) {
    const clarityLoaded = useRef(false);

    // Initialize Clarity on mount (client-side only)
    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (clarityLoaded.current) return;

        // Dynamically import clarity-js only on client
        import('clarity-js').then(({ clarity }) => {
            clarity.start({
                projectId: CLARITY_ID,
                upload: 'https://m.clarity.ms/collect',
                track: true,
                content: true,
            });
            clarityLoaded.current = true;
            window.clarityInstance = clarity;
        });
    }, []);

    // Track module changes
    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (!window.clarityInstance || !currentModule) return;

        window.clarityInstance.set('module', currentModule);
        window.clarityInstance.event(`module_${currentModule}`);
    }, [currentModule]);

    // Custom event tracker
    const trackEvent = useCallback((eventName, eventData) => {
        if (typeof window === 'undefined') return;
        if (!window.clarityInstance) return;

        window.clarityInstance.event(eventName);

        if (eventData) {
            Object.entries(eventData).forEach(([key, value]) => {
                window.clarityInstance.set(key, String(value));
            });
        }
    }, []);

    // Set custom tag
    const setTag = useCallback((key, value) => {
        if (typeof window === 'undefined') return;
        if (!window.clarityInstance) return;

        window.clarityInstance.set(key, String(value));
    }, []);

    return { trackEvent, setTag };
}