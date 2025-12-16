import { useState } from 'react';
import styles from './Presession.module.css';

export default function Presession({ onComplete }) {
    const [currentStep, setCurrentStep] = useState(1);
    const [buttonClicked, setButtonClicked] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [inputCompleted, setInputCompleted] = useState(false);

    const handleNextStep = (step) => {
        setCurrentStep(step);
    };

    const handleButtonPractice = () => {
        setButtonClicked(true);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        if (e.target.value.length > 0) {
            setInputCompleted(true);
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className={styles.container}>
                        <div className={styles.stepIcon}>📱</div>
                        <h1 className={styles.title}>Vamos a practicar juntas</h1>
                        <p className={styles.text}>Este taller está hecho para tu celular.</p>
                        <p className={styles.text}>Te voy a enseñar cómo usarlo paso a paso.</p>
                        <p className={`${styles.text} ${styles.encouragement}`}>¡No te preocupes, es muy fácil!</p>
                        <button 
                            className={styles.btnLarge}
                            onClick={() => handleNextStep(2)}
                            type="button"
                        >
                            EMPEZAR →
                        </button>
                    </div>
                );

            case 2:
                return (
                    <div className={styles.container}>
                        <h2 className={styles.subtitle}>¿Qué es un BOTÓN?</h2>
                        <p className={styles.text}>Un botón es un cuadro que hace algo cuando lo tocas.</p>
                        <div className={styles.practiceArea}>
                            <p className={styles.instruction}>👇 Toca el botón verde:</p>
                            <button 
                                className={`${styles.practiceBtn} ${buttonClicked ? styles.success : ''}`}
                                onClick={handleButtonPractice}
                                type="button"
                            >
                                {buttonClicked ? '¡LISTO! ✓' : 'TÓCAME'}
                            </button>
                        </div>
                        {buttonClicked && (
                            <div className={styles.feedbackArea}>
                                <div className={styles.successMessage}>
                                    <span className={styles.successIcon}>🎉</span>
                                    <p>¡Muy bien! Ya sabes usar botones.</p>
                                </div>
                                <button 
                                    className={styles.btnLarge}
                                    onClick={() => handleNextStep(3)}
                                    type="button"
                                >
                                    SIGUIENTE →
                                </button>
                            </div>
                        )}
                    </div>
                );

            case 3:
                return (
                    <div className={styles.container}>
                        <h2 className={styles.subtitle}>¿Cómo ESCRIBO en el celular?</h2>
                        <p className={styles.text}>Cuando ves un cuadro con líneas, puedes escribir dentro.</p>
                        <div className={styles.practiceArea}>
                            <p className={styles.instruction}>👇 Toca el cuadro y escribe tu nombre:</p>
                            <input
                                type="text"
                                className={styles.practiceInput}
                                placeholder="Escribe aquí..."
                                value={inputValue}
                                onChange={handleInputChange}
                            />
                        </div>
                        {inputCompleted && (
                            <div className={styles.feedbackArea}>
                                <div className={styles.successMessage}>
                                    <span className={styles.successIcon}>✨</span>
                                    <p>¡Excelente! Ya sabes escribir en el celular.</p>
                                </div>
                                <button 
                                    className={styles.btnLarge}
                                    onClick={() => handleNextStep(4)}
                                    type="button"
                                >
                                    SIGUIENTE →
                                </button>
                            </div>
                        )}
                    </div>
                );

            case 4:
                return (
                    <div className={styles.container}>
                        <h2 className={styles.subtitle}>¿Cómo COPIO texto?</h2>
                        <p className={styles.text}>A veces necesitas copiar algo para usarlo en otro lugar.</p>
                        <div className={styles.copyInstructions}>
                            <div className={styles.copyStep}>
                                <span className={styles.stepNumber}>1</span>
                                <p>Toca y mantén el dedo sobre el texto</p>
                            </div>
                            <div className={styles.copyStep}>
                                <span className={styles.stepNumber}>2</span>
                                <p>Aparece un menú, toca &quot;Copiar&quot;</p>
                            </div>
                            <div className={styles.copyStep}>
                                <span className={styles.stepNumber}>3</span>
                                <p>Ve donde quieres pegarlo</p>
                            </div>
                            <div className={styles.copyStep}>
                                <span className={styles.stepNumber}>4</span>
                                <p>Toca y mantén, luego &quot;Pegar&quot;</p>
                            </div>
                        </div>
                        <div className={styles.tipBox}>
                            <span className={styles.tipIcon}>💡</span>
                            <p>No te preocupes si no lo dominas ahora. En el taller hay botones que copian por ti.</p>
                        </div>
                        <button 
                            className={styles.btnLarge}
                            onClick={() => handleNextStep(5)}
                            type="button"
                        >
                            ENTENDIDO →
                        </button>
                    </div>
                );

            case 5:
                return (
                    <div className={styles.container}>
                        <h2 className={styles.subtitle}>¿Cómo NAVEGO este taller?</h2>
                        <div className={styles.navExplanation}>
                            <div className={styles.navItemExplain}>
                                <div className={styles.navIconBox}>📖</div>
                                <p>El botón <strong>Ayuda</strong> te explica palabras difíciles</p>
                            </div>
                            <div className={styles.navItemExplain}>
                                <div className={styles.navIconBox}>→</div>
                                <p>Los botones <strong>Siguiente</strong> te llevan adelante</p>
                            </div>
                            <div className={styles.navItemExplain}>
                                <div className={styles.navIconBox}>←</div>
                                <p>Los botones <strong>Anterior</strong> te llevan atrás</p>
                            </div>
                            <div className={styles.navItemExplain}>
                                <div className={styles.navIconBox}>
                                    <div className={styles.progressBarMini}></div>
                                </div>
                                <p>La <strong>barra arriba</strong> muestra tu progreso</p>
                            </div>
                        </div>
                        <button 
                            className={styles.btnLarge}
                            onClick={() => handleNextStep(6)}
                            type="button"
                        >
                            SIGUIENTE →
                        </button>
                    </div>
                );

            case 6:
                return (
                    <div className={styles.container}>
                        <div className={styles.stepIcon}>🎉</div>
                        <h1 className={styles.title}>¡Ya estás lista!</h1>
                        <p className={styles.text}>Ahora sabes todo lo necesario para usar este taller.</p>
                        <div className={styles.learnedList}>
                            <p>Aprendiste a:</p>
                            <ul>
                                <li>✅ Usar botones</li>
                                <li>✅ Escribir en campos de texto</li>
                                <li>✅ Navegar el taller</li>
                            </ul>
                        </div>
                        <button 
                            className={styles.btnLarge}
                            onClick={onComplete}
                            type="button"
                        >
                            EMPEZAR EL TALLER →
                        </button>
                    </div>
                );

            default:
                return null;
        }
    };

    return renderStep();
}