import styles from './ConfidenceRating.module.css';

const CONFIDENCE_OPTIONS = [
    { value: 1, emoji: '😰', label: 'Nada segura' },
    { value: 2, emoji: '😕', label: 'Poco segura' },
    { value: 3, emoji: '😐', label: 'Más o menos' },
    { value: 4, emoji: '🙂', label: 'Bastante segura' },
    { value: 5, emoji: '😄', label: 'Muy segura' }
];

export default function ConfidenceRating({ selectedValue, onSelect, disabled }) {
    return (
        <div className={styles.container}>
            <div className={styles.scale}>
                {CONFIDENCE_OPTIONS.map((option) => (
                    <button
                        key={option.value}
                        className={`${styles.option} ${selectedValue === option.value ? styles.selected : ''}`}
                        onClick={() => onSelect(option.value)}
                        disabled={disabled}
                        type="button"
                        aria-label={option.label}
                    >
                        <span className={styles.emoji}>{option.emoji}</span>
                        <span className={styles.value}>{option.value}</span>
                    </button>
                ))}
            </div>
            <div className={styles.labels}>
                <span>Nada segura</span>
                <span>Muy segura</span>
            </div>
        </div>
    );
}

export function ConfidenceComparison({ beforeValue, afterValue }) {
    const getOption = (value) => CONFIDENCE_OPTIONS.find(o => o.value === value);
    const beforeOption = getOption(beforeValue);
    const afterOption = getOption(afterValue);
    const difference = afterValue - beforeValue;

    let message = '';
    let messageClass = '';

    if (difference > 0) {
        message = `¡Subiste ${difference} ${difference === 1 ? 'punto' : 'puntos'}! 📈`;
        messageClass = styles.positive;
    } else if (difference === 0) {
        message = '¡Mantienes tu confianza! 💪';
        messageClass = styles.neutral;
    } else {
        message = 'Está bien, la práctica te dará más confianza 💚';
        messageClass = styles.neutral;
    }

    return (
        <div className={styles.comparisonContainer}>
            <div className={styles.comparisonHeader}>
                <span className={styles.comparisonIcon}>🎉</span>
                <h3>¡Mira tu progreso!</h3>
            </div>
            <div className={styles.comparisonBody}>
                <div className={styles.comparisonItem}>
                    <span className={styles.comparisonLabel}>ANTES:</span>
                    <span className={styles.comparisonEmoji}>{beforeOption?.emoji}</span>
                    <span className={styles.comparisonValue}>({beforeValue})</span>
                </div>
                <div className={styles.comparisonArrow}>→</div>
                <div className={styles.comparisonItem}>
                    <span className={styles.comparisonLabel}>AHORA:</span>
                    <span className={styles.comparisonEmoji}>{afterOption?.emoji}</span>
                    <span className={styles.comparisonValue}>({afterValue})</span>
                </div>
            </div>
            <p className={`${styles.comparisonMessage} ${messageClass}`}>{message}</p>
        </div>
    );
}