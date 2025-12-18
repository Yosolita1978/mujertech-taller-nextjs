'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import styles from './ResumeModal.module.css';

const JUMP_OPTIONS = [
    { id: 'welcome', icon: '🏠' },
    { id: 'module1', icon: '🤖' },
    { id: 'module2', icon: '💬' },
    { id: 'module4', icon: '🎨' },
    { id: 'module6', icon: '🎉' }
];

export default function ResumeModal({ moduleName, onResume, onStartFresh, onJumpToModule }) {
    const [showModuleSelector, setShowModuleSelector] = useState(false);
    const t = useTranslations('resumeModal');

    const handleJumpClick = () => {
        setShowModuleSelector(true);
    };

    const handleModuleSelect = (moduleId) => {
        onJumpToModule(moduleId);
    };

    const handleBackToOptions = () => {
        setShowModuleSelector(false);
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                {!showModuleSelector ? (
                    <>
                        <div className={styles.icon}>📚</div>
                        <h2>{t('title')}</h2>
                        <p>{t('lastTimeAt')}</p>
                        <p className={styles.moduleName}>{moduleName}</p>
                        <p>{t('whatToDo')}</p>
                        <div className={styles.buttons}>
                            <button 
                                className={styles.btnResume}
                                onClick={onResume}
                                type="button"
                            >
                                {t('btnResume')}
                            </button>
                            <button 
                                className={styles.btnJump}
                                onClick={handleJumpClick}
                                type="button"
                            >
                                {t('btnJump')}
                            </button>
                            <button 
                                className={styles.btnStartFresh}
                                onClick={onStartFresh}
                                type="button"
                            >
                                {t('btnStartFresh')}
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className={styles.icon}>🗺️</div>
                        <h2>{t('jumpTitle')}</h2>
                        <p>{t('jumpSubtitle')}</p>
                        <div className={styles.moduleSelector}>
                            {JUMP_OPTIONS.map((option) => (
                                <button
                                    key={option.id}
                                    className={styles.moduleOption}
                                    onClick={() => handleModuleSelect(option.id)}
                                    type="button"
                                >
                                    <span className={styles.moduleOptionIcon}>{option.icon}</span>
                                    <span className={styles.moduleOptionLabel}>{t(`modules.${option.id}`)}</span>
                                </button>
                            ))}
                        </div>
                        <button 
                            className={styles.btnBack}
                            onClick={handleBackToOptions}
                            type="button"
                        >
                            {t('btnBack')}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}