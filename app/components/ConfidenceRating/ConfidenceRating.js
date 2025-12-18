'use client';

import { useTranslations } from 'next-intl';
import styles from './ConfidenceRating.module.css';

const CONFIDENCE_VALUES = [1, 2, 3, 4, 5];
const CONFIDENCE_EMOJIS = {
    1: '😰',
    2: '😕',
    3: '😐',
    4: '🙂',
    5: '😄'
};

export default function ConfidenceRating({ selectedValue, onSelect, disabled }) {
    const t = useTranslations('confidenceRating');

    return (
        <div className={styles.container}>
            <div className={styles.scale}>
                {CONFIDENCE_VALUES.map((value) => (
                    <button
                        key={value}
                        className={`${styles.option} ${selectedValue === value ? styles.selected : ''}`}
                        onClick={() => onSelect(value)}
                        disabled={disabled}
                        type="button"
                        aria-label={t(`labels.${value}`)}
                    >
                        <span className={styles.emoji}>{CONFIDENCE_EMOJIS[value]}</span>
                        <span className={styles.value}>{value}</span>
                    </button>
                ))}
            </div>
            <div className={styles.labels}>
                <span>{t('scaleMin')}</span>
                <span>{t('scaleMax')}</span>
            </div>
        </div>
    );
}

export function ConfidenceComparison({ beforeValue, afterValue }) {
    const t = useTranslations('confidenceRating');
    
    const difference = afterValue - beforeValue;

    let message = '';
    let messageClass = '';

    if (difference > 0) {
        const pointsLabel = difference === 1 ? t('comparison.point') : t('comparison.points');
        message = t('comparison.improved', { points: difference, pointsLabel });
        messageClass = styles.positive;
    } else if (difference === 0) {
        message = t('comparison.same');
        messageClass = styles.neutral;
    } else {
        message = t('comparison.lower');
        messageClass = styles.neutral;
    }

    return (
        <div className={styles.comparisonContainer}>
            <div className={styles.comparisonHeader}>
                <span className={styles.comparisonIcon}>🎉</span>
                <h3>{t('comparison.title')}</h3>
            </div>
            <div className={styles.comparisonBody}>
                <div className={styles.comparisonItem}>
                    <span className={styles.comparisonLabel}>{t('comparison.before')}</span>
                    <span className={styles.comparisonEmoji}>{CONFIDENCE_EMOJIS[beforeValue]}</span>
                    <span className={styles.comparisonValue}>({beforeValue})</span>
                </div>
                <div className={styles.comparisonArrow}>→</div>
                <div className={styles.comparisonItem}>
                    <span className={styles.comparisonLabel}>{t('comparison.after')}</span>
                    <span className={styles.comparisonEmoji}>{CONFIDENCE_EMOJIS[afterValue]}</span>
                    <span className={styles.comparisonValue}>({afterValue})</span>
                </div>
            </div>
            <p className={`${styles.comparisonMessage} ${messageClass}`}>{message}</p>
        </div>
    );
}