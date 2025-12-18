'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import styles from './Presession.module.css';

export default function Presession({ onComplete }) {
    const [currentStep, setCurrentStep] = useState(1);
    const [buttonClicked, setButtonClicked] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [inputCompleted, setInputCompleted] = useState(false);
    
    const t = useTranslations('presession');

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
                        <h1 className={styles.title}>{t('step1.title')}</h1>
                        <p className={styles.text}>{t('step1.text1')}</p>
                        <p className={styles.text}>{t('step1.text2')}</p>
                        <p className={`${styles.text} ${styles.encouragement}`}>{t('step1.encouragement')}</p>
                        <button 
                            className={styles.btnLarge}
                            onClick={() => handleNextStep(2)}
                            type="button"
                        >
                            {t('step1.button')}
                        </button>
                    </div>
                );

            case 2:
                return (
                    <div className={styles.container}>
                        <h2 className={styles.subtitle}>{t('step2.title')}</h2>
                        <p className={styles.text}>{t('step2.text')}</p>
                        <div className={styles.practiceArea}>
                            <p className={styles.instruction}>{t('step2.instruction')}</p>
                            <button 
                                className={`${styles.practiceBtn} ${buttonClicked ? styles.success : ''}`}
                                onClick={handleButtonPractice}
                                type="button"
                            >
                                {buttonClicked ? t('step2.buttonSuccess') : t('step2.buttonText')}
                            </button>
                        </div>
                        {buttonClicked && (
                            <div className={styles.feedbackArea}>
                                <div className={styles.successMessage}>
                                    <span className={styles.successIcon}>🎉</span>
                                    <p>{t('step2.feedback')}</p>
                                </div>
                                <button 
                                    className={styles.btnLarge}
                                    onClick={() => handleNextStep(3)}
                                    type="button"
                                >
                                    {t('step2.next')}
                                </button>
                            </div>
                        )}
                    </div>
                );

            case 3:
                return (
                    <div className={styles.container}>
                        <h2 className={styles.subtitle}>{t('step3.title')}</h2>
                        <p className={styles.text}>{t('step3.text')}</p>
                        <div className={styles.practiceArea}>
                            <p className={styles.instruction}>{t('step3.instruction')}</p>
                            <input
                                type="text"
                                className={styles.practiceInput}
                                placeholder={t('step3.placeholder')}
                                value={inputValue}
                                onChange={handleInputChange}
                            />
                        </div>
                        {inputCompleted && (
                            <div className={styles.feedbackArea}>
                                <div className={styles.successMessage}>
                                    <span className={styles.successIcon}>✨</span>
                                    <p>{t('step3.feedback')}</p>
                                </div>
                                <button 
                                    className={styles.btnLarge}
                                    onClick={() => handleNextStep(4)}
                                    type="button"
                                >
                                    {t('step3.next')}
                                </button>
                            </div>
                        )}
                    </div>
                );

            case 4:
                return (
                    <div className={styles.container}>
                        <h2 className={styles.subtitle}>{t('step4.title')}</h2>
                        <p className={styles.text}>{t('step4.text')}</p>
                        <div className={styles.copyInstructions}>
                            <div className={styles.copyStep}>
                                <span className={styles.stepNumber}>1</span>
                                <p>{t('step4.copyStep1')}</p>
                            </div>
                            <div className={styles.copyStep}>
                                <span className={styles.stepNumber}>2</span>
                                <p>{t('step4.copyStep2')}</p>
                            </div>
                            <div className={styles.copyStep}>
                                <span className={styles.stepNumber}>3</span>
                                <p>{t('step4.copyStep3')}</p>
                            </div>
                            <div className={styles.copyStep}>
                                <span className={styles.stepNumber}>4</span>
                                <p>{t('step4.copyStep4')}</p>
                            </div>
                        </div>
                        <div className={styles.tipBox}>
                            <span className={styles.tipIcon}>💡</span>
                            <p>{t('step4.tip')}</p>
                        </div>
                        <button 
                            className={styles.btnLarge}
                            onClick={() => handleNextStep(5)}
                            type="button"
                        >
                            {t('step4.button')}
                        </button>
                    </div>
                );

            case 5:
                return (
                    <div className={styles.container}>
                        <h2 className={styles.subtitle}>{t('step5.title')}</h2>
                        <div className={styles.navExplanation}>
                            <div className={styles.navItemExplain}>
                                <div className={styles.navIconBox}>📖</div>
                                <p><strong>{t('step5.helpBtn')}</strong></p>
                            </div>
                            <div className={styles.navItemExplain}>
                                <div className={styles.navIconBox}>→</div>
                                <p><strong>{t('step5.nextBtn')}</strong></p>
                            </div>
                            <div className={styles.navItemExplain}>
                                <div className={styles.navIconBox}>←</div>
                                <p><strong>{t('step5.prevBtn')}</strong></p>
                            </div>
                            <div className={styles.navItemExplain}>
                                <div className={styles.navIconBox}>
                                    <div className={styles.progressBarMini}></div>
                                </div>
                                <p><strong>{t('step5.progressBar')}</strong></p>
                            </div>
                        </div>
                        <button 
                            className={styles.btnLarge}
                            onClick={() => handleNextStep(6)}
                            type="button"
                        >
                            {t('step5.next')}
                        </button>
                    </div>
                );

            case 6:
                return (
                    <div className={styles.container}>
                        <div className={styles.stepIcon}>🎉</div>
                        <h1 className={styles.title}>{t('step6.title')}</h1>
                        <p className={styles.text}>{t('step6.text')}</p>
                        <div className={styles.learnedList}>
                            <p>{t('step6.learnedTitle')}</p>
                            <ul>
                                <li>{t('step6.learned1')}</li>
                                <li>{t('step6.learned2')}</li>
                                <li>{t('step6.learned3')}</li>
                            </ul>
                        </div>
                        <button 
                            className={styles.btnLarge}
                            onClick={onComplete}
                            type="button"
                        >
                            {t('step6.button')}
                        </button>
                    </div>
                );

            default:
                return null;
        }
    };

    return renderStep();
}