'use client';

import { useState } from 'react';
import Header from './components/Header/Header';
import ProgressBar from './components/ProgressBar/ProgressBar';
import ModuleNavBar from './components/ModuleNavBar/ModuleNavBar';
import Glossary from './components/Glossary/Glossary';

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

    const isNavVisible = currentModule !== 'presessionCheck' && currentModule !== 'presession';

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
                                onClick={() => setCurrentModule(mod.id)}
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
                </div>
            </main>

            <ModuleNavBar 
                currentModule={currentModule}
                onModuleChange={setCurrentModule}
                isVisible={isNavVisible}
            />

            <Glossary 
                isOpen={isGlossaryOpen}
                onClose={() => setIsGlossaryOpen(false)}
            />
        </>
    );
}