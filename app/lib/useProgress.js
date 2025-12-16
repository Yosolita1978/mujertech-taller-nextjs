import { useCallback, useSyncExternalStore } from 'react';

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

// Modal visibility store
let modalInitialized = false;
let modalVisible = false;
const modalListeners = new Set();

function notifyModalListeners() {
    modalListeners.forEach(listener => listener());
}

function getModalSnapshot() {
    if (!modalInitialized) {
        modalInitialized = true;
        const stored = getStoredProgress();
        modalVisible = stored !== null;
    }
    return modalVisible;
}

function getModalServerSnapshot() {
    return false;
}

function subscribeToModal(callback) {
    modalListeners.add(callback);
    return () => modalListeners.delete(callback);
}

function setModalVisible(value) {
    modalVisible = value;
    notifyModalListeners();
}

// Progress store
const storageListeners = new Set();

function notifyStorageListeners() {
    storageListeners.forEach(listener => listener());
}

function subscribeToStorage(callback) {
    storageListeners.add(callback);
    
    const handleStorageEvent = () => {
        notifyStorageListeners();
    };
    
    window.addEventListener('storage', handleStorageEvent);
    
    return () => {
        storageListeners.delete(callback);
        window.removeEventListener('storage', handleStorageEvent);
    };
}

function getProgressSnapshot() {
    return getStoredProgress();
}

function getProgressServerSnapshot() {
    return null;
}

export function useProgress() {
    const savedModule = useSyncExternalStore(
        subscribeToStorage,
        getProgressSnapshot,
        getProgressServerSnapshot
    );
    
    const showResumeModal = useSyncExternalStore(
        subscribeToModal,
        getModalSnapshot,
        getModalServerSnapshot
    );

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
        setModalVisible(false);
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