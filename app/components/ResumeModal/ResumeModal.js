import { useState } from 'react';
import styles from './ResumeModal.module.css';

const JUMP_OPTIONS = [
    { id: 'welcome', icon: '🏠', label: 'Bienvenida' },
    { id: 'module1', icon: '🤖', label: 'Qué es la IA' },
    { id: 'module2', icon: '💬', label: 'Prompts y Herramientas' },
    { id: 'module4', icon: '🎨', label: 'Crear imágenes' },
    { id: 'module6', icon: '🎉', label: 'Felicitaciones' }
];

export default function ResumeModal({ moduleName, onResume, onStartFresh, onJumpToModule }) {
    const [showModuleSelector, setShowModuleSelector] = useState(false);

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
                        <h2>¡Hola de nuevo!</h2>
                        <p>La última vez llegaste a:</p>
                        <p className={styles.moduleName}>{moduleName}</p>
                        <p>¿Qué te gustaría hacer?</p>
                        <div className={styles.buttons}>
                            <button 
                                className={styles.btnResume}
                                onClick={onResume}
                                type="button"
                            >
                                SÍ, CONTINUAR DONDE LO DEJÉ
                            </button>
                            <button 
                                className={styles.btnJump}
                                onClick={handleJumpClick}
                                type="button"
                            >
                                IR A OTRO MÓDULO
                            </button>
                            <button 
                                className={styles.btnStartFresh}
                                onClick={onStartFresh}
                                type="button"
                            >
                                EMPEZAR DESDE CERO
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className={styles.icon}>🗺️</div>
                        <h2>¿A dónde quieres ir?</h2>
                        <p>Elige el módulo:</p>
                        <div className={styles.moduleSelector}>
                            {JUMP_OPTIONS.map((option) => (
                                <button
                                    key={option.id}
                                    className={styles.moduleOption}
                                    onClick={() => handleModuleSelect(option.id)}
                                    type="button"
                                >
                                    <span className={styles.moduleOptionIcon}>{option.icon}</span>
                                    <span className={styles.moduleOptionLabel}>{option.label}</span>
                                </button>
                            ))}
                        </div>
                        <button 
                            className={styles.btnBack}
                            onClick={handleBackToOptions}
                            type="button"
                        >
                            ← VOLVER
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}