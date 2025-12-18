'use client';

import { useTranslations } from 'next-intl';
import styles from './PresessionCheck.module.css';

export default function PresessionCheck({ onStartPresession, onSkipPresession }) {
    const t = useTranslations('presessionCheck');

    return (
        <section className={styles.container}>
            <div className={styles.welcomeIcon}>👋</div>
            <h1 className={styles.title}>{t('greeting')}</h1>
            <p className={styles.welcomeText}>{t('question')}</p>
            
            <div className={styles.questionBox}>
                <h2>{t('mainQuestion')}</h2>
            </div>
            
            <div className={styles.choiceButtons}>
                <button 
                    className={`${styles.btnLarge} ${styles.btnPrimary}`}
                    onClick={onStartPresession}
                    type="button"
                >
                    {t('yesHelp')}
                </button>
                <button 
                    className={`${styles.btnLarge} ${styles.btnSecondary}`}
                    onClick={onSkipPresession}
                    type="button"
                >
                    {t('noSkip')}
                </button>
            </div>
        </section>
    );
}