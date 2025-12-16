import styles from './PresessionCheck.module.css';

export default function PresessionCheck({ onStartPresession, onSkipPresession }) {
    return (
        <section className={styles.container}>
            <div className={styles.welcomeIcon}>👋</div>
            <h1 className={styles.title}>¡Hola!</h1>
            <p className={styles.welcomeText}>Antes de empezar, queremos saber:</p>
            
            <div className={styles.questionBox}>
                <h2>¿Es tu primera vez cursando un taller en el celular?</h2>
            </div>
            
            <div className={styles.choiceButtons}>
                <button 
                    className={`${styles.btnLarge} ${styles.btnPrimary}`}
                    onClick={onStartPresession}
                    type="button"
                >
                    SÍ, AYÚDAME A PRACTICAR
                </button>
                <button 
                    className={`${styles.btnLarge} ${styles.btnSecondary}`}
                    onClick={onSkipPresession}
                    type="button"
                >
                    YA SÉ CÓMO, IR AL TALLER
                </button>
            </div>
        </section>
    );
}