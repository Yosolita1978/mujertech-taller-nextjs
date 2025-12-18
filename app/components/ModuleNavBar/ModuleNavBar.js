'use client';

import { useTranslations } from 'next-intl';
import styles from './ModuleNavBar.module.css';

const NAV_ITEMS = [
    { id: 'welcome', icon: '🏠' },
    { id: 'module1', icon: '🤖' },
    { id: 'module2', icon: '💬' },
    { id: 'module4', icon: '🎨' },
    { id: 'module6', icon: '🎉' }
];

export default function ModuleNavBar({ currentModule, onModuleChange, isVisible }) {
    const t = useTranslations('nav');
    const currentIndex = NAV_ITEMS.findIndex(item => item.id === currentModule);

    const getItemState = (index) => {
        if (NAV_ITEMS[index].id === currentModule) return 'current';
        if (index < currentIndex) return 'completed';
        return 'upcoming';
    };

    return (
        <nav className={`${styles.navBar} ${isVisible ? styles.visible : ''}`}>
            {NAV_ITEMS.map((item, index) => (
                <button
                    key={item.id}
                    className={`${styles.navItem} ${styles[getItemState(index)]}`}
                    onClick={() => onModuleChange(item.id)}
                    type="button"
                >
                    <span className={styles.navItemIcon}>{item.icon}</span>
                    <span className={styles.navItemLabel}>{t(item.id)}</span>
                </button>
            ))}
        </nav>
    );
}