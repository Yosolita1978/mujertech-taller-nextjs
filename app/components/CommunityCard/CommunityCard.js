import styles from './CommunityCard.module.css';

const WHATSAPP_COMMUNITY_LINK = 'https://chat.whatsapp.com/BeKIk6RzQ68JFnHOL1ah12';

export default function CommunityCard() {
    const handleJoinClick = () => {
        window.open(WHATSAPP_COMMUNITY_LINK, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <span className={styles.icon}>👩‍👩‍👧‍👦</span>
                <h2 className={styles.title}>Conecta con otras mujeres aprendiendo IA</h2>
            </div>
            <p className={styles.description}>
                Únete a nuestra comunidad de WhatsApp donde emprendedoras como tú comparten ideas, preguntas y experiencias usando IA en sus negocios.
            </p>
            <div className={styles.benefits}>
                <span>✨ Comparte tus dudas</span>
                <span>💡 Aprende de otras</span>
                <span>🤝 Haz conexiones</span>
            </div>
            <button 
                className={styles.btnJoin}
                onClick={handleJoinClick}
                type="button"
            >
                <span className={styles.whatsappIcon}>📱</span>
                UNIRME A LA COMUNIDAD
            </button>
        </div>
    );
}