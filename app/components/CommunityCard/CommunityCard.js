'use client';

import { useTranslations } from 'next-intl';
import styles from './CommunityCard.module.css';

const WHATSAPP_COMMUNITY_LINK = 'https://chat.whatsapp.com/BeKIk6RzQ68JFnHOL1ah12';

export default function CommunityCard() {
    const t = useTranslations('welcome.community');

    const handleJoinClick = () => {
        window.open(WHATSAPP_COMMUNITY_LINK, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <span className={styles.icon}>👩‍👩‍👧‍👦</span>
                <h2 className={styles.title}>{t('title')}</h2>
            </div>
            <p className={styles.description}>{t('description')}</p>
            <div className={styles.benefits}>
                <span>{t('benefit1')}</span>
                <span>{t('benefit2')}</span>
                <span>{t('benefit3')}</span>
            </div>
            <button 
                className={styles.btnJoin}
                onClick={handleJoinClick}
                type="button"
            >
                <span className={styles.whatsappIcon}>📱</span>
                {t('button')}
            </button>
        </div>
    );
}