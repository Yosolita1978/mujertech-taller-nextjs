import styles from './ModuleNavBar.module.css';

const NAV_ITEMS = [
    { id: 'welcome', icon: '🏠', label: 'Inicio' },
    { id: 'module1', icon: '🤖', label: 'IA' },
    { id: 'module2', icon: '💬', label: 'Prompts' },
    { id: 'module4', icon: '🎨', label: 'Imagen' },
    { id: 'module6', icon: '🎉', label: 'Final' }
];

export default function ModuleNavBar({ currentModule, onModuleChange, isVisible }) {
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
                    <span className={styles.navItemLabel}>{item.label}</span>
                </button>
            ))}
        </nav>
    );
}