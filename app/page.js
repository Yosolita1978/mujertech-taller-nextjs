'use client';

import { useState, useEffect, useRef } from 'react';
import Header from './components/Header/Header';
import ProgressBar from './components/ProgressBar/ProgressBar';
import ModuleNavBar from './components/ModuleNavBar/ModuleNavBar';
import Glossary from './components/Glossary/Glossary';
import Notification from './components/Notification/Notification';
import Timer from './components/Timer/Timer';
import ResumeModal from './components/ResumeModal/ResumeModal';
import PresessionCheck from './components/modules/PresessionCheck/PresessionCheck';
import Presession from './components/modules/Presession/Presession';
import Welcome from './components/modules/Welcome/Welcome';
import Module1 from './components/modules/Module1/Module1';
import Module2 from './components/modules/Module2/Module2';
import Module4 from './components/modules/Module4/Module4';
import Module6 from './components/modules/Module6/Module6';
import { useNotification } from './lib/useNotification';
import { useProgress } from './lib/useProgress';

const TEST_MODULES = [
    { id: 'presessionCheck', label: 'Verificación' },
    { id: 'presession', label: 'Pre-sesión' },
    { id: 'welcome', label: 'Bienvenida' },
    { id: 'module1', label: 'Qué es IA' },
    { id: 'module2', label: 'Prompts' },
    { id: 'module4', label: 'Imágenes' },
    { id: 'module6', label: 'Final' }
];

const EXPERIENCE_MESSAGES = {
    nunca: '¡Perfecto! Este taller está hecho para ti. Vamos paso a paso.',
    poco: 'Muy bien, hoy vas a pasar de la teoría a la práctica.',
    algo: 'Genial, vas a aprender trucos para mejorar tus resultados.',
    mucho: '¡Excelente! Descubrirás nuevas formas de usar la IA.'
};

export default function Home() {
    const [currentModule, setCurrentModule] = useState('presessionCheck');
    const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);
    const { notification, showNotification, hideNotification } = useNotification();
    const { 
        savedModule, 
        savedModuleName, 
        showResumeModal, 
        closeResumeModal, 
        saveProgress, 
        clearProgress 
    } = useProgress();

    const isNavVisible = currentModule !== 'presessionCheck' && currentModule !== 'presession';

    // Track if this is the first render
    const isFirstRender = useRef(true);

    // Save progress whenever module changes (skip first render)
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        saveProgress(currentModule);
    }, [currentModule, saveProgress]);

    const handleModuleChange = (moduleId) => {
        setCurrentModule(moduleId);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleStartPresession = () => {
        setCurrentModule('presession');
    };

    const handleSkipPresession = () => {
        setCurrentModule('welcome');
        showNotification('¡Perfecto! Vamos directo al taller', 'success');
    };

    const handlePresessionComplete = () => {
        setCurrentModule('welcome');
        showNotification('¡Muy bien! Ya estás lista para el taller 🎉', 'success');
    };

    const handleExperienceSelect = (experience) => {
        const message = EXPERIENCE_MESSAGES[experience];
        if (message) {
            showNotification(message, 'success');
        }
    };

    const handleResume = () => {
        closeResumeModal();
        if (savedModule) {
            setCurrentModule(savedModule);
        }
    };

    const handleStartFresh = () => {
        closeResumeModal();
        clearProgress();
        setCurrentModule('presessionCheck');
    };

    const renderModule = () => {
        switch (currentModule) {
            case 'presessionCheck':
                return (
                    <PresessionCheck 
                        onStartPresession={handleStartPresession}
                        onSkipPresession={handleSkipPresession}
                    />
                );
            case 'presession':
                return (
                    <Presession onComplete={handlePresessionComplete} />
                );
            case 'welcome':
                return (
                    <Welcome 
                        onNext={() => handleModuleChange('module1')}
                        onExperienceSelect={handleExperienceSelect}
                    />
                );
            case 'module1':
                return (
                    <Module1 
                        onNext={() => handleModuleChange('module2')}
                        onPrev={() => handleModuleChange('welcome')}
                        showNotification={showNotification}
                    />
                );
            case 'module2':
                return (
                    <Module2 
                        onNext={() => handleModuleChange('module4')}
                        onPrev={() => handleModuleChange('module1')}
                        showNotification={showNotification}
                    />
                );
            case 'module4':
                return (
                    <Module4 
                        onNext={() => handleModuleChange('module6')}
                        onPrev={() => handleModuleChange('module2')}
                        showNotification={showNotification}
                    />
                );
            case 'module6':
                return (
                    <Module6 
                        onPrev={() => handleModuleChange('module4')}
                        onGoToStart={() => handleModuleChange('welcome')}
                        showNotification={showNotification}
                    />
                );
            default:
                return (
                    <div style={{ 
                        background: 'white',
                        padding: 'var(--spacing-xl)',
                        borderRadius: 'var(--radius-lg)',
                        boxShadow: 'var(--shadow-sm)',
                        textAlign: 'center'
                    }}>
                        <h1 style={{ color: 'var(--primary)', marginBottom: 'var(--spacing-md)' }}>
                            MujerTech
                        </h1>
                        <p style={{ color: 'var(--gray)', marginBottom: 'var(--spacing-lg)' }}>
                            Módulo actual: <strong>{currentModule}</strong>
                        </p>
                        <p style={{ color: 'var(--gray)', fontSize: '0.9rem' }}>
                            (Contenido del módulo próximamente)
                        </p>
                    </div>
                );
        }
    };

    return (
        <>
            <Header onGlossaryOpen={() => setIsGlossaryOpen(true)} />
            <ProgressBar currentModule={currentModule} />
            
            <main style={{ 
                marginTop: '130px',
                padding: 'var(--spacing-md)',
                paddingBottom: '100px',
                maxWidth: '800px',
                marginLeft: 'auto',
                marginRight: 'auto'
            }}>
                {renderModule()}

                {/* Temporary navigation for testing */}
                <div style={{ 
                    marginTop: 'var(--spacing-xl)',
                    padding: 'var(--spacing-lg)',
                    background: 'var(--gray-light)',
                    borderRadius: 'var(--radius-md)',
                    textAlign: 'center'
                }}>
                    <p style={{ color: 'var(--gray)', marginBottom: 'var(--spacing-md)', fontSize: '0.8rem' }}>
                        Navegación temporal (para pruebas):
                    </p>
                    <div style={{ display: 'flex', gap: 'var(--spacing-xs)', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {TEST_MODULES.map((mod) => (
                            <button
                                key={mod.id}
                                onClick={() => handleModuleChange(mod.id)}
                                style={{
                                    padding: 'var(--spacing-xs) var(--spacing-sm)',
                                    background: currentModule === mod.id ? 'var(--primary)' : 'white',
                                    color: currentModule === mod.id ? 'white' : 'var(--dark)',
                                    border: '1px solid var(--border)',
                                    borderRadius: 'var(--radius-sm)',
                                    cursor: 'pointer',
                                    fontSize: '0.75rem'
                                }}
                            >
                                {mod.label}
                            </button>
                        ))}
                    </div>
                </div>
            </main>

            <ModuleNavBar 
                currentModule={currentModule}
                onModuleChange={handleModuleChange}
                isVisible={isNavVisible}
            />

            <Glossary 
                isOpen={isGlossaryOpen}
                onClose={() => setIsGlossaryOpen(false)}
            />

            <Notification 
                message={notification.message}
                type={notification.type}
                isVisible={notification.isVisible}
                onHide={hideNotification}
            />

            <Timer />

            {showResumeModal && (
                <ResumeModal 
                    moduleName={savedModuleName}
                    onResume={handleResume}
                    onStartFresh={handleStartFresh}
                />
            )}
        </>
    );
}