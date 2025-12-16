import { useState, useCallback, useSyncExternalStore } from 'react';

const STORAGE_KEY = 'mujertech_progress';

const MODULE_NAMES = {
    presessionCheck: 'Inicio',
    presession: 'Práctica básica',
    welcome: 'Bienvenida',
    module1: 'Qué es la IA',
    module2: 'Prompts y Herramientas',
    module4: 'Crear imágenes',
    module6: '¡Felicitaciones!'
};

const RESUMABLE_MODULES = ['welcome', 'module1', 'module2', 'module4', 'module6'];

function getStoredProgress() {
    if (typeof window === 'undefined') {
        return null;
    }
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            const data = JSON.parse(saved);
            if (data.currentModule && RESUMABLE_MODULES.includes(data.currentModule)) {
                return data.currentModule;
            }
        }
    } catch (e) {
        console.warn('Could not load progress:', e);
    }
    return null;
}

function subscribe(callback) {
    window.addEventListener('storage', callback);
    return () => window.removeEventListener('storage', callback);
}

function getSnapshot() {
    return getStoredProgress();
}

function getServerSnapshot() {
    return null;
}

export function useProgress() {
    const savedModule = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
    const [showResumeModal, setShowResumeModal] = useState(() => {
        return getStoredProgress() !== null;
    });

    const saveProgress = useCallback((moduleId) => {
        try {
            const data = {
                currentModule: moduleId,
                lastUpdated: new Date().toISOString()
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch (e) {
            console.warn('Could not save progress:', e);
        }
    }, []);

    const clearProgress = useCallback(() => {
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch (e) {
            console.warn('Could not clear progress:', e);
        }
    }, []);

    const getModuleName = useCallback((moduleId) => {
        return MODULE_NAMES[moduleId] || moduleId;
    }, []);

    const closeResumeModal = useCallback(() => {
        setShowResumeModal(false);
    }, []);

    return {
        savedModule,
        savedModuleName: savedModule ? getModuleName(savedModule) : '',
        showResumeModal,
        closeResumeModal,
        saveProgress,
        clearProgress
    };
}