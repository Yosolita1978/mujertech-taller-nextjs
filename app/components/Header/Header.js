'use client';

import { useTranslations } from 'next-intl';
import styles from './Header.module.css';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';

export default function Header({ onGlossaryOpen }) {
    const t = useTranslations('header');

    return (
        <header className={styles.header}>
            <div className={styles.headerContent}>
                <div className={styles.logo}>
                    <img
                        src="/images/logomujertech1.png"
                        alt="MujerTech Logo"
                        className={styles.logoImage}
                    />
                    <span>{t('title')}</span>
                </div>
                <div className={styles.headerRight}>
                    <LanguageSwitcher />
                    <button 
                        className={styles.glossaryBtn} 
                        onClick={onGlossaryOpen}
                        type="button"
                    >
                        <span className={styles.glossaryIcon}>📖</span>
                        <span>{t('help')}</span>
                    </button>
                </div>
            </div>
        </header>
    );
}