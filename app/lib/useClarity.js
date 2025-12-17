'use client';

import { useEffect, useCallback } from 'react';
import { clarity } from 'clarity-js';

const CLARITY_ID = 'un48lbrzbh'; // Replace with your ID

let clarityInitialized = false;

export function useClarity(currentModule) {
    // Initialize Clarity on mount
    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (clarityInitialized) return;

        clarity.start({
            projectId: CLARITY_ID,
            upload: 'https://m.clarity.ms/collect',
            track: true,
            content: true,
        });

        clarityInitialized = true;
    }, []);

    // Track module changes
    useEffect(() => {
        if (!clarityInitialized || !currentModule) return;

        clarity.set('module', currentModule);
        clarity.event(`module_${currentModule}`);
    }, [currentModule]);

    // Custom event tracker
    const trackEvent = useCallback((eventName, eventData) => {
        if (!clarityInitialized) return;

        clarity.event(eventName);

        if (eventData) {
            Object.entries(eventData).forEach(([key, value]) => {
                clarity.set(key, String(value));
            });
        }
    }, []);

    // Set custom tag
    const setTag = useCallback((key, value) => {
        if (!clarityInitialized) return;

        clarity.set(key, String(value));
    }, []);

    return { trackEvent, setTag };
}