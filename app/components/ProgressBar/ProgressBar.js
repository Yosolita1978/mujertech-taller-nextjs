import styles from './ProgressBar.module.css';

const MODULE_NAMES = {
    presessionCheck: 'Inicio',
    presession: 'Práctica básica',
    welcome: 'Bienvenida',
    module1: 'Qué es la IA',
    module2: 'Prompts y Herramientas',
    module4: 'Crear imágenes',
    module6: '¡Felicitaciones!'
};

const DISPLAY_MODULES = ['welcome', 'module1', 'module2', 'module4', 'module6'];

export default function ProgressBar({ currentModule }) {
    const currentIndex = DISPLAY_MODULES.indexOf(currentModule);
    const isPreSession = currentModule === 'presessionCheck' || currentModule === 'presession';
    
    const totalModules = DISPLAY_MODULES.length;
    const progress = isPreSession ? 0 : ((currentIndex + 1) / totalModules) * 100;
    
    const blockText = isPreSession 
        ? 'Preparación' 
        : `Bloque ${currentIndex + 1} de ${totalModules}`;
    
    const sectionName = MODULE_NAMES[currentModule] || '';

    return (
        <div className={styles.progressIndicator}>
            <div className={styles.progressInfo}>
                <span className={styles.progressText}>{blockText}</span>
                <span className={styles.progressPercent}>{Math.round(progress)}%</span>
            </div>
            <div className={styles.progressTrack}>
                <div 
                    className={styles.progressFill} 
                    style={{ width: `${progress}%` }}
                />
            </div>
            <span className={styles.currentSection}>{sectionName}</span>
        </div>
    );
}