import { useCallback, useSyncExternalStore } from 'react';

const STORAGE_KEY = 'mujertech_confidence';

let cachedConfidence = null;
let cachedConfidenceString = null;

function getStoredConfidence() {
    if (typeof window === 'undefined') {
        return null;
    }
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        
        if (saved === cachedConfidenceString) {
            return cachedConfidence;
        }
        
        cachedConfidenceString = saved;
        
        if (saved) {
            cachedConfidence = JSON.parse(saved);
        } else {
            cachedConfidence = null;
        }
        
        return cachedConfidence;
    } catch (e) {
        console.warn('Could not load confidence:', e);
        return null;
    }
}

const listeners = new Set();

function notifyListeners() {
    cachedConfidenceString = null;
    cachedConfidence = null;
    listeners.forEach(listener => listener());
}

function subscribe(callback) {
    listeners.add(callback);
    return () => listeners.delete(callback);
}

function getSnapshot() {
    return getStoredConfidence();
}

function getServerSnapshot() {
    return null;
}

export function useConfidence() {
    const confidence = useSyncExternalStore(
        subscribe,
        getSnapshot,
        getServerSnapshot
    );

    const saveBeforeRating = useCallback((value) => {
        try {
            const data = {
                before: value,
                after: null,
                timestamp: new Date().toISOString()
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
            notifyListeners();
        } catch (e) {
            console.warn('Could not save before rating:', e);
        }
    }, []);

    const saveAfterRating = useCallback((value) => {
        try {
            const existing = getStoredConfidence() || {};
            const data = {
                ...existing,
                after: value,
                completedAt: new Date().toISOString()
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
            notifyListeners();
        } catch (e) {
            console.warn('Could not save after rating:', e);
        }
    }, []);

    const clearConfidence = useCallback(() => {
        try {
            localStorage.removeItem(STORAGE_KEY);
            notifyListeners();
        } catch (e) {
            console.warn('Could not clear confidence:', e);
        }
    }, []);

    return {
        beforeRating: confidence?.before || null,
        afterRating: confidence?.after || null,
        saveBeforeRating,
        saveAfterRating,
        clearConfidence
    };
}