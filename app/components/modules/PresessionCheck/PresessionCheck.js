'use client';

import { useTranslations } from 'next-intl';
import styles from './PresessionCheck.module.css';

export default function PresessionCheck({ onStartPresession, onSkipPresession }) {
    const t = useTranslations('presessionCheck');

    return (
        <section className={styles.container}>
            <div className={styles.welcomeIcon}>🚀</div>
            <h1 className={styles.title}>{t('title')}</h1>
            
            <div className={styles.valueBox}>
                <p className={styles.valueIntro}>{t('valueIntro')}</p>
                <ul className={styles.valueList}>
                    <li>{t('value1')}</li>
                    <li>{t('value2')}</li>
                    <li>{t('value3')}</li>
                </ul>
                <p className={styles.duration}>{t('duration')}</p>
            </div>

            <button 
                className={`${styles.btnLarge} ${styles.btnPrimary}`}
                onClick={onSkipPresession}
                type="button"
            >
                {t('startWorkshop')}
            </button>

            <button 
                className={styles.btnHelp}
                onClick={onStartPresession}
                type="button"
            >
                {t('needHelp')}
            </button>
        </section>
    );
}