import styles from './Header.module.css';

export default function Header({ onGlossaryOpen }) {
    return (
        <header className={styles.header}>
            <div className={styles.headerContent}>
                <div className={styles.logo}>
                    <img
                        src="/images/logomujertech1.png"
                        alt="MujerTech Logo"
                        className={styles.logoImage}
                    />
                    <span>MujerTech</span>
                </div>
                <button 
                    className={styles.glossaryBtn} 
                    onClick={onGlossaryOpen}
                    type="button"
                >
                    <span className={styles.glossaryIcon}>📖</span>
                    <span>Ayuda</span>
                </button>
            </div>
        </header>
    );
}