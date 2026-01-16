'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import styles from './Welcome.module.css';
import ConfidenceRating from '../../ConfidenceRating/ConfidenceRating';
import { useConfidence } from '../../../lib/useConfidence';
import CommunityCard from '../../CommunityCard/CommunityCard';

export default function Welcome({ onNext }) {
    const [selectedExperience, setSelectedExperience] = useState(null);
    const [selectedBusinessType, setSelectedBusinessType] = useState(null);
    const [selectedConfidence, setSelectedConfidence] = useState(null);
    const { saveBeforeRating } = useConfidence();
    
    const t = useTranslations('welcome');

    const EXPERIENCE_OPTIONS = [
        { id: 'nunca', icon: '🆕', label: t('experience.never') },
        { id: 'poco', icon: '🤔', label: t('experience.little') },
        { id: 'algo', icon: '👍', label: t('experience.some') },
        { id: 'mucho', icon: '⭐', label: t('experience.lots') }
    ];

    const BUSINESS_TYPE_OPTIONS = [
        { id: 'producto', icon: '📦', label: t('businessType.product') },
        { id: 'servicio', icon: '💼', label: t('businessType.service') }
    ];

    const handleExperienceSelect = (experience) => {
        setSelectedExperience(experience);
    };

    const handleBusinessTypeSelect = (businessType) => {
        setSelectedBusinessType(businessType);
    };

    const handleConfidenceSelect = (value) => {
        setSelectedConfidence(value);
        saveBeforeRating(value);
    };

    const handleNext = () => {
        onNext({
            experience: selectedExperience,
            businessType: selectedBusinessType
        });
    };

    return (
        <div className={styles.moduleContent}>
            {/* Hero Section */}
            <section className={styles.heroSection}>
                <Image
                    src="/images/bannerlogo1.png"
                    alt="MujerTech"
                    width={300}
                    height={120}
                    className={styles.heroLogo}
                    priority
                    sizes="(max-width: 768px) 100vw, 300px"
                />
                <h1 className={styles.heroTitle}>{t('heroTitle')}</h1>
                <p className={styles.heroSubtitle}>{t('heroSubtitle')}</p>
                <span className={styles.timeBadge}>{t('duration')}</span>
            </section>

            {/* Context Card */}
            <div className={styles.card}>
                <h2 className={styles.cardTitle}>
                    <span className={styles.cardIcon}>🌍</span>
                    {t('context.title')}
                </h2>
                <p className={styles.cardText}>{t('context.text1')}</p>
                <p className={styles.cardText}>{t('context.text2')}</p>
                <ul className={styles.simpleList}>
                    <li>{t('context.item1')}</li>
                    <li>{t('context.item2')}</li>
                    <li>{t('context.item3')}</li>
                </ul>
                <p className={styles.cardText} dangerouslySetInnerHTML={{ __html: t.raw('context.text3') }} />
            </div>

            {/* Benefits Card */}
            <div className={`${styles.card} ${styles.highlightCard}`}>
                <h2 className={styles.cardTitle}>
                    <span className={styles.cardIcon}>💪</span>
                    {t('benefits.title')}
                </h2>
                <p className={styles.cardText}>{t('benefits.subtitle')}</p>
                <div className={styles.benefitList}>
                    <div className={styles.benefitItem}>
                        <span className={styles.benefitIcon}>⏰</span>
                        <div>
                            <strong>{t('benefits.time.title')}</strong>
                            <p>{t('benefits.time.description')}</p>
                        </div>
                    </div>
                    <div className={styles.benefitItem}>
                        <span className={styles.benefitIcon}>💰</span>
                        <div>
                            <strong>{t('benefits.more.title')}</strong>
                            <p>{t('benefits.more.description')}</p>
                        </div>
                    </div>
                    <div className={styles.benefitItem}>
                        <span className={styles.benefitIcon}>📱</span>
                        <div>
                            <strong>{t('benefits.sell.title')}</strong>
                            <p>{t('benefits.sell.description')}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Learning Objectives Card */}
            <div className={styles.card}>
                <h2 className={styles.cardTitle}>
                    <span className={styles.cardIcon}>🎯</span>
                    {t('objectives.title')}
                </h2>
                <div className={styles.learningObjectives}>
                    <div className={styles.objectiveItem}>
                        <span className={styles.objectiveNumber}>1</span>
                        <p>{t('objectives.item1')}</p>
                    </div>
                    <div className={styles.objectiveItem}>
                        <span className={styles.objectiveNumber}>2</span>
                        <p>{t('objectives.item2')}</p>
                    </div>
                    <div className={styles.objectiveItem}>
                        <span className={styles.objectiveNumber}>3</span>
                        <p>{t('objectives.item3')}</p>
                    </div>
                    <div className={styles.objectiveItem}>
                        <span className={styles.objectiveNumber}>4</span>
                        <p>{t('objectives.item4')}</p>
                    </div>
                </div>
            </div>

            {/* Community Card */}
            <CommunityCard />

            {/* Experience Question */}
            <div className={styles.questionCard}>
                <h3>{t('experience.title')}</h3>
                <p>{t('experience.question')}</p>
                <div className={styles.experienceOptions}>
                    {EXPERIENCE_OPTIONS.map((option) => (
                        <button
                            key={option.id}
                            className={`${styles.experienceBtn} ${selectedExperience === option.id ? styles.selected : ''}`}
                            onClick={() => handleExperienceSelect(option.id)}
                            type="button"
                        >
                            <span className={styles.expIcon}>{option.icon}</span>
                            <span>{option.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Business Type Question */}
            <div className={styles.questionCard}>
                <h3>{t('businessType.title')}</h3>
                <p>{t('businessType.subtitle')}</p>
                <div className={styles.businessTypeOptions}>
                    {BUSINESS_TYPE_OPTIONS.map((option) => (
                        <button
                            key={option.id}
                            className={`${styles.businessTypeBtn} ${selectedBusinessType === option.id ? styles.selected : ''}`}
                            onClick={() => handleBusinessTypeSelect(option.id)}
                            type="button"
                        >
                            <span className={styles.businessIcon}>{option.icon}</span>
                            <span>{option.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Confidence Rating Question */}
            <div className={styles.questionCard}>
                <h3>{t('confidence.title')}</h3>
                <p>{t('confidence.subtitle')}</p>
                <ConfidenceRating 
                    selectedValue={selectedConfidence}
                    onSelect={handleConfidenceSelect}
                />
            </div>

            {/* Navigation */}
            <div className={styles.navButtons}>
                <button 
                    className={`${styles.btnNav} ${styles.btnNext}`}
                    onClick={handleNext}
                    type="button"
                >
                    {t('startButton')}
                </button>
            </div>
        </div>
    );
}