'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import styles from './Module6.module.css';
import ConfidenceRating, { ConfidenceComparison } from '../../ConfidenceRating/ConfidenceRating';
import { useConfidence } from '../../../lib/useConfidence';

export default function Module6({ onPrev, onGoToStart, showNotification, userProfile, trackEvent, setTag }) {
    const [showComparison, setShowComparison] = useState(false);
    
    const t = useTranslations('module6');
    const tCommon = useTranslations('common');
    const tNotifications = useTranslations('notifications');
    
    const { beforeRating, afterRating, saveAfterRating } = useConfidence();

    const handleConfidenceSelect = (value) => {
        saveAfterRating(value);
        setShowComparison(true);
        
        if (trackEvent) {
            trackEvent('confidence_after_rated', { 
                before: beforeRating, 
                after: value,
                change: value - (beforeRating || 0)
            });
        }
        
        if (setTag) {
            setTag('confidenceAfter', String(value));
            if (beforeRating) {
                setTag('confidenceChange', String(value - beforeRating));
            }
        }
    };

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
        const message = encodeURIComponent(`🎉 ¡Completé el Taller de IA para Emprendedoras de MujerTech!\n\nAprendí a usar ChatGPT y Canva para mi negocio. 💪\n\n¿Quieres aprender tú también? https://intro.mujertech.org`);
        window.open(`https://wa.me/?text=${message}`, '_blank');
        showNotification(tNotifications('shareSuccess'), 'success');
    };

    const handleRestart = () => {
        if (trackEvent) {
            trackEvent('workshop_restart', {});
        }
        onGoToStart();
    };

    const handlePrev = () => {
        if (trackEvent) {
            trackEvent('module6_back', {});
        }
        onPrev();
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
            <div className={styles.summaryCard}>
                <h2 className={styles.cardTitle}>
                    <span className={styles.cardIcon}>📚</span>
                    {t('summary.title')}
                </h2>
                <div className={styles.learnedItems}>
                    <div className={styles.learnedItem}>
                        <span className={styles.learnedCheck}>✅</span>
                        <p>{t('summary.item1')}</p>
                    </div>
                    <div className={styles.learnedItem}>
                        <span className={styles.learnedCheck}>✅</span>
                        <p>{t('summary.item2')}</p>
                    </div>
                    <div className={styles.learnedItem}>
                        <span className={styles.learnedCheck}>✅</span>
                        <p>{t('summary.item3')}</p>
                    </div>
                    <div className={styles.learnedItem}>
                        <span className={styles.learnedCheck}>✅</span>
                        <p>{t('summary.item4')}</p>
                    </div>
                </div>
            </div>

            {/* Confidence Section */}
            <div className={styles.confidenceCard}>
                <h2 className={styles.cardTitle}>
                    <span className={styles.cardIcon}>📊</span>
                    {t('confidence.title')}
                </h2>
                <p className={styles.cardSubtitle}>{t('confidence.subtitle')}</p>
                
                {!showComparison && !afterRating ? (
                    <ConfidenceRating 
                        selectedValue={afterRating}
                        onSelect={handleConfidenceSelect}
                    />
                ) : (
                    beforeRating && (afterRating || showComparison) && (
                        <ConfidenceComparison 
                            beforeValue={beforeRating}
                            afterValue={afterRating}
                        />
                    )
                )}
                
                {!beforeRating && (
                    <p className={styles.noBeforeRating}>
                        (No registramos tu nivel inicial de confianza)
                    </p>
                )}
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
            <div className={styles.certificateSection}>
                <h2>
                    <span className={styles.certificateIcon}>🏆</span>
                    {t('certificate.title')}
                </h2>
                <p>{t('certificate.text')}</p>
                <button 
                    className={styles.btnShare}
                    onClick={handleShareWhatsApp}
                    type="button"
                >
                    📱 {t('certificate.shareButton')}
                </button>
            </div>

            {/* Final Message */}
            <div className={styles.finalMessage}>
                <h2>{t('finalMessage.title')}</h2>
                <p>{t('finalMessage.text')}</p>
                <span className={styles.finalEmoji}>{t('finalMessage.emoji')}</span>
            </div>

            {/* Navigation */}
            <div className={styles.navButtons}>
                <button 
                    className={`${styles.btnNav} ${styles.btnPrev}`}
                    onClick={handlePrev}
                    type="button"
                >
                    ← {tCommon('previous')}
                </button>
                <button 
                    className={`${styles.btnNav} ${styles.btnRestart}`}
                    onClick={handleRestart}
                    type="button"
                >
                    {t('restartButton')}
                </button>
            </div>
        </div>
    );
}