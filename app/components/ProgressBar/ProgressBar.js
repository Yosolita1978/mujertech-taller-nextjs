'use client';

import { useTranslations } from 'next-intl';
import styles from './ProgressBar.module.css';

const DISPLAY_MODULES = ['welcome', 'module1', 'module2', 'module4', 'module6'];

export default function ProgressBar({ currentModule }) {
    const t = useTranslations('progress');
    
    const currentIndex = DISPLAY_MODULES.indexOf(currentModule);
    const isPreSession = currentModule === 'presessionCheck' || currentModule === 'presession';
    const isCapstone = currentModule === 'capstone';

    const totalModules = DISPLAY_MODULES.length;
    const progress = (isPreSession || isCapstone) ? 0 : ((currentIndex + 1) / totalModules) * 100;

    const blockText = (isPreSession || isCapstone)
        ? t('preparation')
        : t('blockOf', { current: currentIndex + 1, total: totalModules });

    const sectionName = isCapstone
        ? t('modules.capstone')
        : t(`modules.${currentModule}`);

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