'use client';

import { useState } from 'react';
import Header from './components/Header/Header';
import ProgressBar from './components/ProgressBar/ProgressBar';
import ModuleNavBar from './components/ModuleNavBar/ModuleNavBar';
import Glossary from './components/Glossary/Glossary';
import Notification from './components/Notification/Notification';
import Timer from './components/Timer/Timer';
import PresessionCheck from './components/modules/PresessionCheck/PresessionCheck';
import Presession from './components/modules/Presession/Presession';
import { useNotification } from './lib/useNotification';

const TEST_MODULES = [
    { id: 'presessionCheck', label: 'Verificación' },
    { id: 'presession', label: 'Pre-sesión' },
    { id: 'welcome', label: 'Bienvenida' },
    { id: 'module1', label: 'Qué es IA' },
    { id: 'module2', label: 'Prompts' },
    { id: 'module4', label: 'Imágenes' },
    { id: 'module6', label: 'Final' }
];

export default function Home() {
    const [currentModule, setCurrentModule] = useState('presessionCheck');
    const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);
    const { notification, showNotification, hideNotification } = useNotification();

    const isNavVisible = currentModule !== 'presessionCheck' && currentModule !== 'presession';

    const handleModuleChange = (moduleId) => {
        setCurrentModule(moduleId);
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
        </>
    );
}