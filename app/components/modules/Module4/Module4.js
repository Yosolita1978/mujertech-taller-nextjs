'use client';

import { useTranslations } from 'next-intl';
import styles from './Module4.module.css';
import SuccessCriteria from '../../SuccessCriteria/SuccessCriteria';
import Image from 'next/image';

export default function Module4({ onNext, onPrev, showNotification, hidePrev, trackEvent }) {
    const t = useTranslations('module4');
    const tCommon = useTranslations('common');
    const tNotifications = useTranslations('notifications');

    const MODULE_OUTCOMES = [
        t('outcomes.item1'),
        t('outcomes.item2')
    ];

    const copyToClipboard = async (text, source) => {
        if (trackEvent) {
            trackEvent('copy_clicked', { module: 'module4', source: source });
        }
        try {
            await navigator.clipboard.writeText(text);
            showNotification(tNotifications('copied'), 'success');
            if (trackEvent) {
                trackEvent('copy_success', { module: 'module4', source: source });
            }
        } catch (err) {
            showNotification(tNotifications('copyFailed'), 'error');
            if (trackEvent) {
                trackEvent('copy_failed', { module: 'module4', source: source });
            }
        }
    };

    const handleOpenCanva = () => {
        if (trackEvent) {
            trackEvent('open_canva', { module: 'module4' });
        }
        window.open('https://www.canva.com/', '_blank');
    };

    const handleWhatsAppShare = () => {
        if (trackEvent) {
            trackEvent('whatsapp_share', { module: 'module4' });
        }
        const message = encodeURIComponent(`💬 Pregunta del taller MujerTech:\n\n${t('ethics.shareText')}\n\n¿Qué opinan ustedes?`);
        window.open(`https://wa.me/?text=${message}`, '_blank');
        showNotification(tNotifications('shareSuccess'), 'success');
    };

    const handleNext = () => {
        if (trackEvent) {
            trackEvent('module4_completed', {});
        }
        onNext();
    };

    return (
        <div className={styles.moduleContent}>
            {/* Module Header */}
            <header className={styles.moduleHeader}>
                <h1>{t('title')}</h1>
                <p className={styles.moduleSubtitle}>{t('subtitle')}</p>
                <span className={styles.timeBadge}>{t('duration')}</span>
            </header>

            {/* Success Criteria - Intro */}
            <SuccessCriteria 
                mode="intro"
                outcomes={MODULE_OUTCOMES}
            />

            {/* Images Sell Intro */}
            <div className={`${styles.card} ${styles.introCard}`}>
                <div className={styles.bigIcon}>🖼️</div>
                <h2 className={styles.cardTitle}>{t('intro.title')}</h2>
                <p className={styles.cardText}>{t('intro.text1')}</p>
                <p className={styles.cardText}>{t('intro.text2')}</p>
                <div className={styles.examplesBox}>
                    <h3>{t('intro.examples.title')}</h3>
                    <ul>
                        <li>{t('intro.examples.item1')}</li>
                        <li>{t('intro.examples.item2')}</li>
                        <li>{t('intro.examples.item3')}</li>
                        <li>{t('intro.examples.item4')}</li>
                    </ul>
                </div>
            </div>

            {/* What is Canva */}
            <div className={styles.card}>
                <h2 className={styles.cardTitle}>
                    <span className={styles.cardIcon}>🎨</span>
                    {t('canvaIntro.title')}
                </h2>
                <p className={styles.cardText}>{t('canvaIntro.text')}</p>
                <div className={styles.featuresList}>
                    <p>{t('canvaIntro.features.item1')}</p>
                    <p>{t('canvaIntro.features.item2')}</p>
                    <p>{t('canvaIntro.features.item3')}</p>
                    <p>{t('canvaIntro.features.item4')}</p>
                </div>
            </div>

            {/* How To Steps */}
            <div className={`${styles.card} ${styles.howToCard}`}>
                <h2 className={styles.cardTitle}>
                    <span className={styles.cardIcon}>📝</span>
                    {t('howTo.title')}
                </h2>
                <div className={styles.howToSteps}>
                    <div className={styles.howToStep}>
                        <span className={styles.stepNumber}>{t('howTo.step1.number')}</span>
                        <div>
                            <h3>{t('howTo.step1.title')}</h3>
                            <p>{t('howTo.step1.description')}</p>
                        </div>
                    </div>
                    <div className={styles.howToStep}>
                        <span className={styles.stepNumber}>{t('howTo.step2.number')}</span>
                        <div>
                            <h3>{t('howTo.step2.title')}</h3>
                            <p>{t('howTo.step2.description')}</p>
                        </div>
                    </div>
                    <div className={styles.howToStep}>
                        <span className={styles.stepNumber}>{t('howTo.step3.number')}</span>
                        <div>
                            <h3>{t('howTo.step3.title')}</h3>
                            <p>{t('howTo.step3.description')}</p>
                        </div>
                    </div>
                    <div className={styles.howToStep}>
                        <span className={styles.stepNumber}>{t('howTo.step4.number')}</span>
                        <div>
                            <h3>{t('howTo.step4.title')}</h3>
                            <p>{t('howTo.step4.description')}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Prompt Tips */}
            <div className={`${styles.card} ${styles.tipsCard}`}>
                <h2 className={styles.cardTitle}>
                    <span className={styles.cardIcon}>💡</span>
                    {t('promptTips.title')}
                </h2>
                <div className={styles.tipsList}>
                    <div className={styles.tipItem}>
                        <h3>{t('promptTips.tip1.title')}</h3>
                        <div className={styles.tipComparison}>
                            <p className={styles.tipBad}>❌ {t('promptTips.tip1.bad')}</p>
                            <p className={styles.tipGood}>✅ {t('promptTips.tip1.good')}</p>
                        </div>
                    </div>
                    <div className={styles.tipItem}>
                        <h3>{t('promptTips.tip2.title')}</h3>
                        <p className={styles.tipExamples}>{t('promptTips.tip2.examples')}</p>
                    </div>
                    <div className={styles.tipItem}>
                        <h3>{t('promptTips.tip3.title')}</h3>
                        <p className={styles.tipExample}>{t('promptTips.tip3.example')}</p>
                    </div>
                    <div className={styles.tipItem}>
                        <h3>{t('promptTips.tip4.title')}</h3>
                        <p className={styles.tipExample}>{t('promptTips.tip4.example')}</p>
                    </div>
                </div>
            </div>

            {/* María Example */}
            <div className={styles.caseStudy}>
                <div className={styles.caseHeader}>
                    <span className={styles.caseIcon}>👩</span>
                    <h2>{t('maria.title')}</h2>
                </div>

                <div className={styles.caseStep}>
                    <h3><span className={styles.caseStepNumber}>1</span>{t('maria.step1.title')}</h3>
                    <p>{t('maria.step1.text')}</p>
                </div>

                <div className={styles.caseStep}>
                    <h3><span className={styles.caseStepNumber}>2</span>{t('maria.step2.title')}</h3>
                    <div className={styles.promptDisplay}>
                        <div className={styles.promptBox}>{t('maria.step2.prompt')}</div>
                        <button 
                            className={styles.btnCopy}
                            onClick={() => copyToClipboard(t('maria.step2.prompt'), 'maria_image')}
                            type="button"
                        >
                            {t('maria.step2.copyButton')}
                        </button>
                    </div>
                </div>

                <div className={styles.caseStep}>
                    <h3><span className={styles.caseStepNumber}>3</span>{t('maria.step3.title')}</h3>
                    <p>{t('maria.step3.description')}</p>
                    <div className={styles.imageResult}>
                        <Image 
                            src="/images/jabones-maria.png" 
                            alt="María's AI-generated soap image"
                            className={styles.generatedImage}
                            width={500}
                            height={500}
                        />
                    </div>
                </div>

                <div className={styles.caseResult}>
                    <div className={styles.resultIcon}>🎉</div>
                    <p className={styles.resultText}>{t('maria.result.text')}</p>
                    <div className={styles.resultStats}>
                        <div className={styles.stat}>
                            <span className={styles.statValue}>{t('maria.result.time')}</span>
                            <span className={styles.statLabel}>{t('maria.result.timeLabel')}</span>
                        </div>
                        <div className={styles.stat}>
                            <span className={styles.statValue}>{t('maria.result.cost')}</span>
                            <span className={styles.statLabel}>{t('maria.result.costLabel')}</span>
                        </div>
                        <div className={styles.stat}>
                            <span className={styles.statValue}>{t('maria.result.options')}</span>
                            <span className={styles.statLabel}>{t('maria.result.optionsLabel')}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Your Turn */}
            <div className={styles.yourTurnCard}>
                <h2 className={styles.cardTitle}>
                    <span className={styles.cardIcon}>🎯</span>
                    {t('yourTurn.title')}
                </h2>
                <p className={styles.cardText}>{t('yourTurn.intro')}</p>

                <div className={styles.yourTurnSteps}>
                    <div className={styles.yourTurnStep}>
                        <span className={styles.stepNumber}>{t('yourTurn.step1.number')}</span>
                        <p>{t('yourTurn.step1.text')}</p>
                    </div>
                    <div className={styles.yourTurnStep}>
                        <span className={styles.stepNumber}>{t('yourTurn.step2.number')}</span>
                        <p>{t('yourTurn.step2.text')}</p>
                    </div>
                    <div className={styles.yourTurnStep}>
                        <span className={styles.stepNumber}>{t('yourTurn.step3.number')}</span>
                        <div>
                            <p>{t('yourTurn.step3.text')}</p>
                            <div className={styles.promptDisplay}>
                                <div className={styles.promptBox}>{t('yourTurn.step3.examplePrompt')}</div>
                                <button 
                                    className={styles.btnCopy}
                                    onClick={() => copyToClipboard(t('yourTurn.step3.examplePrompt'), 'example_image')}
                                    type="button"
                                >
                                    {t('yourTurn.step3.copyButton')}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.yourTurnStep}>
                        <span className={styles.stepNumber}>{t('yourTurn.step4.number')}</span>
                        <p>{t('yourTurn.step4.text')}</p>
                    </div>
                </div>

                <button 
                    className={styles.btnCanva}
                    onClick={handleOpenCanva}
                    type="button"
                >
                    {t('yourTurn.openCanvaButton')}
                </button>
            </div>

            {/* Ethics Card */}
            <div className={styles.ethicsCard}>
                <div className={styles.ethicsCardHeader}>
                    <span className={styles.ethicsIcon}>⚠️</span>
                    <h3>{t('ethics.title')}</h3>
                </div>
                <div className={styles.ethicsPoints}>
                    <div className={styles.ethicsPoint}>
                        <h4>{t('ethics.point1.title')}</h4>
                        <p>{t('ethics.point1.text')}</p>
                    </div>
                    <div className={styles.ethicsPoint}>
                        <h4>{t('ethics.point2.title')}</h4>
                        <p>{t('ethics.point2.text')}</p>
                    </div>
                    <div className={styles.ethicsPoint}>
                        <h4>{t('ethics.point3.title')}</h4>
                        <p>{t('ethics.point3.text')}</p>
                    </div>
                </div>
                <div className={styles.ethicsQuestion}>
                    <span className={styles.ethicsQuestionIcon}>💬</span>
                    <p>{t('ethics.question')}</p>
                </div>
                <button 
                    className={styles.btnWhatsapp}
                    onClick={handleWhatsAppShare}
                    type="button"
                >
                    <span className={styles.whatsappIcon}>📱</span>
                    {t('ethics.shareButton')}
                </button>
            </div>

            {/* Success Criteria - Completion */}
            <SuccessCriteria 
                mode="completion"
                completionText={t('completion')}
            />

            {/* Navigation */}
            <div className={styles.navButtons}>
                {!hidePrev && (
                    <button 
                        className={`${styles.btnNav} ${styles.btnPrev}`}
                        onClick={onPrev}
                        type="button"
                    >
                        ← {tCommon('previous')}
                    </button>
                )}
                <button 
                    className={`${styles.btnNav} ${styles.btnNext}`}
                    onClick={handleNext}
                    type="button"
                >
                    {tCommon('next')} →
                </button>
            </div>
        </div>
    );
}