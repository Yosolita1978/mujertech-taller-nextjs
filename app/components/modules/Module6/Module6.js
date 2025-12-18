'use client';

import { useTranslations } from 'next-intl';
import styles from './Module6.module.css';
import ConfidenceRating from '../../ConfidenceRating/ConfidenceRating';

export default function Module6({ onRestart, initialConfidence, showNotification, trackEvent }) {
    const t = useTranslations('module6');
    const tNotifications = useTranslations('notifications');

    const handleCommunityClick = () => {
        if (trackEvent) {
            trackEvent('community_click', { module: 'module6' });
        }
        window.open('https://chat.whatsapp.com/BeKIk6RzQ68JFnHOL1ah12', '_blank');
    };

    const handleShareWhatsApp = () => {
        if (trackEvent) {
            trackEvent('certificate_share', { module: 'module6' });
        }
        const message = encodeURIComponent(`🎉 ¡Completé el Taller de IA para Emprendedoras de MujerTech!\n\nAprendí a usar ChatGPT y Canva para mi negocio. 💪\n\n¿Quieres aprender tú también?`);
        window.open(`https://wa.me/?text=${message}`, '_blank');
        showNotification(tNotifications('shareSuccess'), 'success');
    };

    const handleRestart = () => {
        if (trackEvent) {
            trackEvent('workshop_restart', {});
        }
        onRestart();
    };

    return (
        <div className={styles.moduleContent}>
            {/* Hero Section */}
            <header className={styles.heroSection}>
                <div className={styles.heroEmoji}>🎉</div>
                <h1>{t('title')}</h1>
                <p className={styles.heroSubtitle}>{t('subtitle')}</p>
                <p className={styles.heroText}>{t('heroText')}</p>
            </header>

            {/* Summary Card */}
            <div className={styles.card}>
                <h2 className={styles.cardTitle}>
                    <span className={styles.cardIcon}>📚</span>
                    {t('summary.title')}
                </h2>
                <ul className={styles.summaryList}>
                    <li><span className={styles.checkIcon}>✅</span>{t('summary.item1')}</li>
                    <li><span className={styles.checkIcon}>✅</span>{t('summary.item2')}</li>
                    <li><span className={styles.checkIcon}>✅</span>{t('summary.item3')}</li>
                    <li><span className={styles.checkIcon}>✅</span>{t('summary.item4')}</li>
                </ul>
            </div>

            {/* Confidence Comparison */}
            <div className={styles.card}>
                <h2 className={styles.cardTitle}>
                    <span className={styles.cardIcon}>📊</span>
                    {t('confidence.title')}
                </h2>
                <p className={styles.cardSubtitle}>{t('confidence.subtitle')}</p>
                <ConfidenceRating 
                    mode="comparison"
                    initialRating={initialConfidence}
                />
            </div>

            {/* Next Steps */}
            <div className={styles.card}>
                <h2 className={styles.cardTitle}>
                    <span className={styles.cardIcon}>🚀</span>
                    {t('nextSteps.title')}
                </h2>
                <div className={styles.nextStepsList}>
                    <div className={styles.nextStep}>
                        <span className={styles.stepNumber}>1</span>
                        <div>
                            <h3>{t('nextSteps.step1.title')}</h3>
                            <p>{t('nextSteps.step1.text')}</p>
                        </div>
                    </div>
                    <div className={styles.nextStep}>
                        <span className={styles.stepNumber}>2</span>
                        <div>
                            <h3>{t('nextSteps.step2.title')}</h3>
                            <p>{t('nextSteps.step2.text')}</p>
                        </div>
                    </div>
                    <div className={styles.nextStep}>
                        <span className={styles.stepNumber}>3</span>
                        <div>
                            <h3>{t('nextSteps.step3.title')}</h3>
                            <p>{t('nextSteps.step3.text')}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Community Card */}
            <div className={styles.communityCard}>
                <h2>{t('community.title')}</h2>
                <p>{t('community.text')}</p>
                <button 
                    className={styles.btnCommunity}
                    onClick={handleCommunityClick}
                    type="button"
                >
                    💬 {t('community.button')}
                </button>
            </div>

            {/* Certificate Section */}
            <div className={styles.certificateCard}>
                <div className={styles.certificateIcon}>🏆</div>
                <h2>{t('certificate.title')}</h2>
                <p>{t('certificate.text')}</p>
                <div className={styles.certificateButtons}>
                    <button 
                        className={styles.btnShare}
                        onClick={handleShareWhatsApp}
                        type="button"
                    >
                        📱 {t('certificate.shareButton')}
                    </button>
                </div>
            </div>

            {/* Final Message */}
            <div className={styles.finalMessage}>
                <h2>{t('finalMessage.title')}</h2>
                <p>{t('finalMessage.text')}</p>
                <span className={styles.finalEmoji}>{t('finalMessage.emoji')}</span>
            </div>

            {/* Restart Button */}
            <button 
                className={styles.btnRestart}
                onClick={handleRestart}
                type="button"
            >
                ← {t('restartButton')}
            </button>
        </div>
    );
}