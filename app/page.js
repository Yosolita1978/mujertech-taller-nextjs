'use client';

import { useState } from 'react';
import Header from './components/Header/Header';
import ProgressBar from './components/ProgressBar/ProgressBar';
import ModuleNavBar from './components/ModuleNavBar/ModuleNavBar';
import Glossary from './components/Glossary/Glossary';
import Notification from './components/Notification/Notification';
import Timer from './components/Timer/Timer';
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
    const [currentModule, setCurrentModule] = useState('welcome');
    const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);
    const { notification, showNotification, hideNotification } = useNotification();

    const isNavVisible = currentModule !== 'presessionCheck' && currentModule !== 'presession';

    const handleModuleChange = (moduleId) => {
        setCurrentModule(moduleId);
        const moduleName = TEST_MODULES.find(m => m.id === moduleId)?.label || moduleId;
        showNotification(`Navegando a: ${moduleName}`, 'success');
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
                    <div style={{ display: 'flex', gap: 'var(--spacing-sm)', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {TEST_MODULES.map((mod) => (
                            <button
                                key={mod.id}
                                onClick={() => handleModuleChange(mod.id)}
                                style={{
                                    padding: 'var(--spacing-sm) var(--spacing-md)',
                                    background: currentModule === mod.id ? 'var(--primary)' : 'var(--gray-light)',
                                    color: currentModule === mod.id ? 'white' : 'var(--dark)',
                                    border: 'none',
                                    borderRadius: 'var(--radius-md)',
                                    cursor: 'pointer'
                                }}
                            >
                                {mod.label}
                            </button>
                        ))}
                    </div>
                    
                    <div style={{ marginTop: 'var(--spacing-xl)', paddingTop: 'var(--spacing-lg)', borderTop: '1px solid var(--border)' }}>
                        <p style={{ color: 'var(--gray)', marginBottom: 'var(--spacing-md)', fontSize: '0.9rem' }}>
                            Probar notificaciones:
                        </p>
                        <div style={{ display: 'flex', gap: 'var(--spacing-sm)', flexWrap: 'wrap', justifyContent: 'center' }}>
                            <button
                                onClick={() => showNotification('¡Texto copiado! 📋', 'success')}
                                style={{
                                    padding: 'var(--spacing-sm) var(--spacing-md)',
                                    background: 'var(--success)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: 'var(--radius-md)',
                                    cursor: 'pointer'
                                }}
                            >
                                Éxito
                            </button>
                            <button
                                onClick={() => showNotification('Por favor completa todos los campos', 'error')}
                                style={{
                                    padding: 'var(--spacing-sm) var(--spacing-md)',
                                    background: 'var(--error)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: 'var(--radius-md)',
                                    cursor: 'pointer'
                                }}
                            >
                                Error
                            </button>
                            <button
                                onClick={() => showNotification('Generando tu certificado... ⏳', 'info')}
                                style={{
                                    padding: 'var(--spacing-sm) var(--spacing-md)',
                                    background: 'var(--primary)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: 'var(--radius-md)',
                                    cursor: 'pointer'
                                }}
                            >
                                Info
                            </button>
                        </div>
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