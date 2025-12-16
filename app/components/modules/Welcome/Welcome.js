import { useState } from 'react';
import styles from './Welcome.module.css';
import ConfidenceRating from '../../ConfidenceRating/ConfidenceRating';
import { useConfidence } from '../../../lib/useConfidence';

const EXPERIENCE_OPTIONS = [
    { id: 'nunca', icon: '🆕', label: 'Nunca la he usado' },
    { id: 'poco', icon: '🤔', label: 'Sé qué es pero no la uso' },
    { id: 'algo', icon: '👍', label: 'La uso a veces' },
    { id: 'mucho', icon: '⭐', label: 'La uso seguido' }
];

const BUSINESS_TYPE_OPTIONS = [
    { id: 'producto', icon: '📦', label: 'Vendo productos (comida, ropa, artesanías...)' },
    { id: 'servicio', icon: '💼', label: 'Ofrezco servicios (limpieza, belleza, asesoría...)' }
];

export default function Welcome({ onNext }) {
    const [selectedExperience, setSelectedExperience] = useState(null);
    const [selectedBusinessType, setSelectedBusinessType] = useState(null);
    const [selectedConfidence, setSelectedConfidence] = useState(null);
    const { saveBeforeRating } = useConfidence();

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
                <img 
                    src="/images/bannerlogo1.png" 
                    alt="MujerTech" 
                    className={styles.heroLogo}
                />
                <h1 className={styles.heroTitle}>¡Bienvenida al Taller de IA!</h1>
                <p className={styles.heroSubtitle}>Aprende a usar Inteligencia Artificial para tu negocio</p>
                <span className={styles.timeBadge}>⏱️ Duración: 45 minutos</span>
            </section>

            {/* Context Card */}
            <div className={styles.card}>
                <h2 className={styles.cardTitle}>
                    <span className={styles.cardIcon}>🌍</span>
                    ¿En qué momento estamos?
                </h2>
                <p className={styles.cardText}>Estamos viviendo un cambio muy grande en el mundo.</p>
                <p className={styles.cardText}>Ahora existen programas de computadora que pueden:</p>
                <ul className={styles.simpleList}>
                    <li>✍️ Escribir textos</li>
                    <li>🎨 Crear imágenes</li>
                    <li>💡 Darte ideas para tu negocio</li>
                </ul>
                <p className={styles.cardText}>Estos programas se llaman <strong>Inteligencia Artificial</strong> o <strong>IA</strong>.</p>
            </div>

            {/* Benefits Card */}
            <div className={`${styles.card} ${styles.highlightCard}`}>
                <h2 className={styles.cardTitle}>
                    <span className={styles.cardIcon}>💪</span>
                    ¿Por qué esto importa para TU negocio?
                </h2>
                <p className={styles.cardText}>Con la IA puedes:</p>
                <div className={styles.benefitList}>
                    <div className={styles.benefitItem}>
                        <span className={styles.benefitIcon}>⏰</span>
                        <div>
                            <strong>Ahorrar tiempo</strong>
                            <p>Lo que antes tomaba horas, ahora toma minutos</p>
                        </div>
                    </div>
                    <div className={styles.benefitItem}>
                        <span className={styles.benefitIcon}>💰</span>
                        <div>
                            <strong>Hacer más con menos</strong>
                            <p>Crea contenido tú misma cuando lo necesites</p>
                        </div>
                    </div>
                    <div className={styles.benefitItem}>
                        <span className={styles.benefitIcon}>📱</span>
                        <div>
                            <strong>Vender más</strong>
                            <p>Crea contenido atractivo para tus redes</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Learning Objectives Card */}
            <div className={styles.card}>
                <h2 className={styles.cardTitle}>
                    <span className={styles.cardIcon}>🎯</span>
                    Hoy vas a aprender
                </h2>
                <div className={styles.learningObjectives}>
                    <div className={styles.objectiveItem}>
                        <span className={styles.objectiveNumber}>1</span>
                        <p>Qué es la IA (explicado fácil)</p>
                    </div>
                    <div className={styles.objectiveItem}>
                        <span className={styles.objectiveNumber}>2</span>
                        <p>Cómo hablarle a la IA para que te ayude</p>
                    </div>
                    <div className={styles.objectiveItem}>
                        <span className={styles.objectiveNumber}>3</span>
                        <p>Cómo crear imágenes bonitas para tu negocio</p>
                    </div>
                    <div className={styles.objectiveItem}>
                        <span className={styles.objectiveNumber}>4</span>
                        <p>Cómo usar la IA de forma segura</p>
                    </div>
                </div>
            </div>

            {/* Experience Question */}
            <div className={styles.questionCard}>
                <h3>Antes de empezar, cuéntanos:</h3>
                <p>¿Cuánto sabes de IA?</p>
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
                <h3>¿Qué tipo de negocio tienes?</h3>
                <p>Esto nos ayuda a personalizar tu experiencia</p>
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
                <h3>📊 ¿Qué tan segura te sientes usando herramientas de IA?</h3>
                <p>Sé honesta, no hay respuesta correcta</p>
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
                    EMPEZAR EL TALLER →
                </button>
            </div>
        </div>
    );
}