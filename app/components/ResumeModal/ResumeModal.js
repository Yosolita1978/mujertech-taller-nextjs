import styles from './ResumeModal.module.css';

export default function ResumeModal({ moduleName, onResume, onStartFresh }) {
    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.icon}>📚</div>
                <h2>¡Hola de nuevo!</h2>
                <p>La última vez llegaste a:</p>
                <p className={styles.moduleName}>{moduleName}</p>
                <p>¿Quieres continuar donde lo dejaste?</p>
                <div className={styles.buttons}>
                    <button 
                        className={styles.btnResume}
                        onClick={onResume}
                        type="button"
                    >
                        SÍ, CONTINUAR
                    </button>
                    <button 
                        className={styles.btnStartFresh}
                        onClick={onStartFresh}
                        type="button"
                    >
                        NO, EMPEZAR DE NUEVO
                    </button>
                </div>
            </div>
        </div>
    );
}