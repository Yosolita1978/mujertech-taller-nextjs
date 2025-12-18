'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import styles from './Module6.module.css';
import ConfidenceRating, { ConfidenceComparison } from '../../ConfidenceRating/ConfidenceRating';
import CommunityCard from '../../CommunityCard/CommunityCard';
import { useConfidence } from '../../../lib/useConfidence';

export default function Module6({ onPrev, onGoToStart, showNotification, userProfile, trackEvent, setTag }) {
    const [showComparison, setShowComparison] = useState(false);
    const [email, setEmail] = useState('');
    const [emailSubmitted, setEmailSubmitted] = useState(false);
    const [emailLoading, setEmailLoading] = useState(false);
    const [certificateName, setCertificateName] = useState('');
    
    const t = useTranslations('module6');
    const tCommon = useTranslations('common');
    const tNotifications = useTranslations('notifications');
    const locale = useLocale();

    const { beforeRating, afterRating, saveAfterRating } = useConfidence();

    const handleConfidenceSelect = (value) => {
        saveAfterRating(value);
        setShowComparison(true);
        showNotification(tNotifications('confidenceRated'), 'success');
        
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

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        
        if (!email.trim()) {
            showNotification(tNotifications('emailRequired'), 'error');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification(tNotifications('emailInvalid'), 'error');
            return;
        }
        
        setEmailLoading(true);
        if (trackEvent) trackEvent('email_submit_started', {});
        
        try {
            const res = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, source: 'module6_teaser' })
            });
            
            if (res.ok) {
                setEmailSubmitted(true);
                showNotification(tNotifications('emailSuccess'), 'success');
                if (trackEvent) trackEvent('email_submit_success', {});
            } else {
                throw new Error('Failed');
            }
        } catch (err) {
            showNotification(tNotifications('emailError'), 'error');
            if (trackEvent) trackEvent('email_submit_failed', {});
        } finally {
            setEmailLoading(false);
        }
    };

    const handleSkipEmail = () => {
        setEmailSubmitted(true);
        if (trackEvent) trackEvent('email_skipped', {});
    };

    const handleDownloadCertificate = () => {
        if (!certificateName.trim()) {
            showNotification(tNotifications('nameRequired'), 'error');
            return;
        }
        
        showNotification(tNotifications('certificateGenerating'), 'info');
        if (trackEvent) trackEvent('certificate_download_started', {});
        
        const canvas = document.createElement('canvas');
        canvas.width = 1200;
        canvas.height = 850;
        const ctx = canvas.getContext('2d');
        
        // Colors
        const teal = '#2c8e9c';
        const coral = '#ff6978';
        const darkText = '#333';
        const grayText = '#666';
        
        // Helper function for rounded rectangles
        const roundRect = (x, y, width, height, radius) => {
            ctx.beginPath();
            ctx.moveTo(x + radius, y);
            ctx.lineTo(x + width - radius, y);
            ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
            ctx.lineTo(x + width, y + height - radius);
            ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
            ctx.lineTo(x + radius, y + height);
            ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
            ctx.lineTo(x, y + radius);
            ctx.quadraticCurveTo(x, y, x + radius, y);
            ctx.closePath();
        };
        
        // Background - light gradient
        const bgGradient = ctx.createLinearGradient(0, 0, 1200, 850);
        bgGradient.addColorStop(0, '#e8f4f6');
        bgGradient.addColorStop(0.5, '#ffffff');
        bgGradient.addColorStop(1, '#e8f4f6');
        ctx.fillStyle = bgGradient;
        ctx.fillRect(0, 0, 1200, 850);
        
        // Outer border - teal
        ctx.strokeStyle = teal;
        ctx.lineWidth = 12;
        ctx.strokeRect(20, 20, 1160, 810);
        
        // Inner border - coral
        ctx.strokeStyle = coral;
        ctx.lineWidth = 3;
        ctx.strokeRect(40, 40, 1120, 770);
        
        // Trophy emoji
        ctx.font = '72px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('🏆', 600, 110);
        
        // CERTIFICADO title
        ctx.fillStyle = teal;
        ctx.font = 'bold 52px Georgia';
        ctx.fillText(t('certificate.certificateTitle').toUpperCase(), 600, 180);
        
        // MujerTech
        ctx.fillStyle = darkText;
        ctx.font = 'italic 36px Georgia';
        ctx.fillText('MujerTech', 600, 230);
        
        // Tagline
        ctx.fillStyle = grayText;
        ctx.font = '18px Arial';
        ctx.fillText('Women Business & AI', 600, 260);
        
        // Certifies text
        ctx.fillStyle = darkText;
        ctx.font = '22px Arial';
        ctx.fillText(t('certificate.certifiesText'), 600, 320);
        
        // Name
        ctx.fillStyle = darkText;
        ctx.font = 'bold 48px Georgia';
        ctx.fillText(certificateName.toUpperCase(), 600, 385);
        
        // Line under name
        ctx.strokeStyle = coral;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(200, 410);
        ctx.lineTo(1000, 410);
        ctx.stroke();
        
        // Completed text
        ctx.fillStyle = darkText;
        ctx.font = '22px Arial';
        ctx.fillText(t('certificate.completedText'), 600, 470);
        
        // Workshop name - two lines
        ctx.fillStyle = teal;
        ctx.font = 'bold 32px Georgia';
        ctx.fillText(t('certificate.workshopLine1'), 600, 530);
        ctx.fillStyle = coral;
        ctx.fillText(t('certificate.workshopLine2'), 600, 575);
        
        // Skills bar background
        ctx.fillStyle = 'rgba(44, 142, 156, 0.15)';
        roundRect(100, 610, 1000, 50, 8);
        ctx.fill();
        
        // Skills text
        ctx.fillStyle = darkText;
        ctx.font = '16px Arial';
        ctx.fillText(t('certificate.skills'), 600, 642);
        
        // Date
        const dateLocale = locale === 'en' ? 'en-US' : 'es-CO';
        const today = new Date().toLocaleDateString(dateLocale, { 
            year: 'numeric', month: 'long', day: 'numeric' 
        });
        ctx.fillStyle = darkText;
        ctx.font = 'bold 20px Arial';
        ctx.fillText(`${t('certificate.dateLabel')} ${today}`, 600, 710);
        
        // Duration
        ctx.fillStyle = grayText;
        ctx.font = '18px Arial';
        ctx.fillText(t('certificate.duration'), 600, 740);
        
        // Website
        ctx.fillStyle = teal;
        ctx.font = '18px Arial';
        ctx.fillText('www.mujertech.org', 600, 790);
        
        // Download
        const link = document.createElement('a');
        link.download = `certificado-mujertech-${certificateName.toLowerCase().replace(/\s+/g, '-')}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        
        showNotification(tNotifications('certificateDownloaded'), 'success');
        if (trackEvent) trackEvent('certificate_downloaded', { name: certificateName });
    };

    const handleFeedbackClick = () => {
        if (trackEvent) trackEvent('feedback_form_opened', {});
        window.open('https://forms.gle/cRbQkicHhvQ8sGQJ9', '_blank');
    };

    const handleRestart = () => {
        if (trackEvent) trackEvent('workshop_restarted', {});
        onGoToStart();
    };

    const teaserCards = [
        { key: 'card1', icon: '📊' },
        { key: 'card2', icon: '💰' },
        { key: 'card3', icon: '📱' },
        { key: 'card4', icon: '🤖' },
        { key: 'card5', icon: '🔮' }
    ];

    return (
        <div className={styles.moduleContent}>
            {/* Celebration Header */}
            <header className={styles.heroSection}>
                <div className={styles.heroEmoji}>🎉</div>
                <h1>{t('celebration.title')}</h1>
                <p className={styles.heroSubtitle}>{t('celebration.text')}</p>
            </header>

            {/* Confidence Rating */}
            <section className={styles.confidenceCard}>
                <h2 className={styles.sectionTitle}>{t('confidence.title')}</h2>
                
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
            </section>

            {/* Summary */}
            <section className={styles.summaryCard}>
                <h2 className={styles.sectionTitle}>
                    <span>📚</span> {t('summary.title')}
                </h2>
                <ul className={styles.summaryList}>
                    <li>{t('summary.item1')}</li>
                    <li>{t('summary.item2')}</li>
                    <li>{t('summary.item3')}</li>
                    <li>{t('summary.item4')}</li>
                    <li>{t('summary.item5')}</li>
                </ul>
            </section>

            {/* Golden Rules */}
            <section className={styles.rulesCard}>
                <h2 className={styles.sectionTitle}>
                    <span>⚠️</span> {t('goldenRules.title')}
                </h2>
                <div className={styles.rulesList}>
                    <div className={styles.ruleItem}>
                        <span className={styles.ruleIcon}>🔒</span>
                        <div>
                            <h3>{t('goldenRules.rule1.title')}</h3>
                            <p>{t('goldenRules.rule1.description')}</p>
                        </div>
                    </div>
                    <div className={styles.ruleItem}>
                        <span className={styles.ruleIcon}>👀</span>
                        <div>
                            <h3>{t('goldenRules.rule2.title')}</h3>
                            <p>{t('goldenRules.rule2.description')}</p>
                        </div>
                    </div>
                    <div className={styles.ruleItem}>
                        <span className={styles.ruleIcon}>💚</span>
                        <div>
                            <h3>{t('goldenRules.rule3.title')}</h3>
                            <p>{t('goldenRules.rule3.description')}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Teaser Section */}
            <section className={styles.teaserSection}>
                <h2 className={styles.sectionTitle}>
                    <span>🚀</span> {t('teaser.title')}
                </h2>
                <p className={styles.teaserSubtitle}>{t('teaser.subtitle')}</p>
                
                <div className={styles.teaserGrid}>
                    {teaserCards.map(({ key, icon }) => (
                        <div key={key} className={styles.teaserCard}>
                            <span className={styles.teaserBadge}>{t('teaser.badge')}</span>
                            <span className={styles.teaserIcon}>{icon}</span>
                            <h3>{t(`teaser.${key}.title`)}</h3>
                            <p>{t(`teaser.${key}.description`)}</p>
                            <div className={styles.teaserExample}>
                                <span className={styles.exampleLabel}>{t('teaser.exampleLabel')}</span>
                                <p>{t(`teaser.${key}.example`)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Email Capture */}
            <section className={styles.emailSection}>
                <span className={styles.emailIcon}>🚀</span>
                <h2>{t('emailCapture.title')}</h2>
                <p>{t('emailCapture.subtitle')}</p>
                
                {!emailSubmitted ? (
                    <form onSubmit={handleEmailSubmit} className={styles.emailForm}>
                        <div className={styles.emailInputGroup}>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={t('emailCapture.placeholder')}
                                className={styles.emailInput}
                                disabled={emailLoading}
                            />
                            <button 
                                type="submit" 
                                className={styles.emailButton}
                                disabled={emailLoading}
                            >
                                {emailLoading ? t('emailCapture.sending') : t('emailCapture.button')}
                            </button>
                        </div>
                        <p className={styles.noSpam}>🙅‍♀️{t('emailCapture.noSpam')}</p>
                        <button 
                            type="button" 
                            className={styles.skipButton}
                            onClick={handleSkipEmail}
                        >
                            {t('emailCapture.skip')}
                        </button>
                    </form>
                ) : (
                    <div className={styles.emailSuccess}>
                        <span>✅</span>
                        <h3>{t('emailCapture.successTitle')}</h3>
                        <p>{t('emailCapture.successText')}</p>
                    </div>
                )}
            </section>

            {/* Certificate */}
            <section className={styles.certificateSection}>
                <span className={styles.certIcon}>🏆</span>
                <h2>{t('certificate.title')}</h2>
                <p>{t('certificate.subtitle')}</p>
                
                <div className={styles.certificateForm}>
                    <input
                        type="text"
                        value={certificateName}
                        onChange={(e) => setCertificateName(e.target.value)}
                        placeholder={t('certificate.placeholder')}
                        className={styles.certificateInput}
                    />
                    <button 
                        type="button"
                        className={styles.certificateButton}
                        onClick={handleDownloadCertificate}
                    >
                        📥 {t('certificate.downloadButton')}
                    </button>
                </div>
            </section>

            {/* Tasks */}
            <section className={styles.tasksCard}>
                <h2 className={styles.sectionTitle}>
                    <span>📝</span> {t('tasks.title')}
                </h2>
                <ol className={styles.tasksList}>
                    <li>{t('tasks.task1')}</li>
                    <li>{t('tasks.task2')}</li>
                    <li>{t('tasks.task3')}</li>
                </ol>
            </section>

            {/* Feedback */}
            <section className={styles.feedbackCard}>
                <h2>{t('feedback.title')}</h2>
                <p>{t('feedback.text1')}</p>
                <p>{t.rich('feedback.text2', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
                <p className={styles.feedbackBenefit}>
                    {t.rich('feedback.benefit', { strong: (chunks) => <strong>{chunks}</strong> })}
                </p>
                <button 
                    type="button"
                    className={styles.feedbackButton}
                    onClick={handleFeedbackClick}
                >
                    💬 {t('feedback.button')}
                </button>
            </section>

            {/* Community */}
            <CommunityCard showNotification={showNotification} trackEvent={trackEvent} />

            {/* Navigation */}
            <div className={styles.navButtons}>
                <button 
                    type="button"
                    className={styles.btnPrev}
                    onClick={onPrev}
                >
                    ← {tCommon('previous')}
                </button>
                <button 
                    type="button"
                    className={styles.btnRestart}
                    onClick={handleRestart}
                >
                    🔄 {t('restartButton')}
                </button>
            </div>
        </div>
    );
}