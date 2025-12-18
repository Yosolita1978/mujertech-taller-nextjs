'use client';

import { useTranslations } from 'next-intl';
import styles from './SuccessCriteria.module.css';

export default function SuccessCriteria({ mode, outcomes, completionText }) {
    const t = useTranslations('successCriteria');

    if (mode === 'intro') {
        return (
            <div className={styles.introCard}>
                <div className={styles.header}>
                    <span className={styles.icon}>🎯</span>
                    <h3>{t('introTitle')}</h3>
                </div>
                <ul className={styles.outcomesList}>
                    {outcomes.map((outcome, index) => (
                        <li key={index}>
                            <span className={styles.bullet}>✦</span>
                            <span>{outcome}</span>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    if (mode === 'completion') {
        return (
            <div className={styles.completionCard}>
                <div className={styles.header}>
                    <span className={styles.icon}>✅</span>
                    <h3>{t('completionTitle')}</h3>
                </div>
                <p className={styles.completionText}>{completionText}</p>
            </div>
        );
    }

    return null;
}