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

const EXPERIENCE_MESSAGES = {
    nunca: '¡Perfecto! Este taller está hecho para ti. Vamos paso a paso.',
    poco: 'Muy bien, hoy vas a pasar de la teoría a la práctica.',
    algo: 'Genial, vas a aprender trucos para mejorar tus resultados.',
    mucho: '¡Excelente! Descubrirás nuevas formas de usar la IA.'
};

function getStartingModule(experience, businessType) {
    if (!experience || experience === 'nunca' || experience === 'poco') {
        return 'module1';
    }

    if (experience === 'algo' || experience === 'mucho') {
        if (businessType === 'producto') {
            return 'module4';
        }
        if (businessType === 'servicio') {
            return 'module2';
        }
    }

    return 'module1';
}

export default function Home() {
    const [currentModule, setCurrentModule] = useState('presessionCheck');
    const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);
    const [userProfile, setUserProfile] = useState({ experience: null, businessType: null });
    const [entryModule, setEntryModule] = useState(null);

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

    const isFirstRender = useRef(true);

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

    const handleWelcomeNext = ({ experience, businessType }) => {
        setUserProfile({ experience, businessType });

        if (experience && EXPERIENCE_MESSAGES[experience]) {
            showNotification(EXPERIENCE_MESSAGES[experience], 'success');
        }

        const startingModule = getStartingModule(experience, businessType);
        setEntryModule(startingModule);
        handleModuleChange(startingModule);
    };

    const handleResume = () => {
        closeResumeModal();
        if (savedModule) {
            setEntryModule(savedModule);
            setCurrentModule(savedModule);
        }
    };

    const handleStartFresh = () => {
        closeResumeModal();
        clearProgress();
        setCurrentModule('presessionCheck');
    };

    const handleJumpToModule = (moduleId) => {
        closeResumeModal();
        setEntryModule(moduleId);
        setCurrentModule(moduleId);
        showNotification('¡Vamos allá! 🚀', 'success');
    };

    const shouldHidePrev = (moduleId) => {
        if (moduleId === 'welcome') {
            return true;
        }
        if (entryModule && moduleId === entryModule) {
            return true;
        }
        return false;
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
                    <Welcome onNext={handleWelcomeNext} />
                );
            case 'module1':
                return (
                    <Module1
                        onNext={() => handleModuleChange('module2')}
                        onPrev={() => handleModuleChange('welcome')}
                        showNotification={showNotification}
                        hidePrev={shouldHidePrev('module1')}
                    />
                );
            case 'module2':
                return (
                    <Module2
                        onNext={() => handleModuleChange('module4')}
                        onPrev={() => handleModuleChange('module1')}
                        showNotification={showNotification}
                        hidePrev={shouldHidePrev('module2')}
                    />
                );
            case 'module4':
                return (
                    <Module4
                        onNext={() => handleModuleChange('module6')}
                        onPrev={() => handleModuleChange('module2')}
                        showNotification={showNotification}
                        hidePrev={shouldHidePrev('module4')}
                    />
                );
            case 'module6':
                return (
                    <Module6
                        onPrev={() => handleModuleChange('module4')}
                        onGoToStart={() => handleModuleChange('welcome')}
                        showNotification={showNotification}
                        userProfile={userProfile}
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
                marginTop: '120px',
                padding: '12px',
                paddingBottom: '80px',
                maxWidth: '800px',
                marginLeft: 'auto',
                marginRight: 'auto'
            }}>
                {renderModule()}
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

            <Timer key={currentModule} />

            {showResumeModal && (
                <ResumeModal
                    moduleName={savedModuleName}
                    onResume={handleResume}
                    onStartFresh={handleStartFresh}
                    onJumpToModule={handleJumpToModule}
                />
            )}
        </>
    );
}