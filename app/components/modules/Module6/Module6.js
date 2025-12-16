import { useState } from 'react';
import styles from './Module6.module.css';

const LEARNED_ITEMS = [
    'Qué es la Inteligencia Artificial',
    'Cómo hablarle a la IA para que te ayude',
    'Qué herramientas puedes usar (ChatGPT y Canva)',
    'Cómo crear imágenes para tu negocio',
    'Cómo usar la IA de forma segura'
];

const GOLDEN_RULES = [
    {
        icon: '🔒',
        title: 'Protege la información privada',
        description: 'Nunca le des a la IA datos personales de tus clientes'
    },
    {
        icon: '👀',
        title: 'Siempre revisa antes de publicar',
        description: 'La IA puede equivocarse. Lee todo antes de usar.'
    },
    {
        icon: '💬',
        title: 'Sé honesta con tus clientes',
        description: 'Si una imagen es de IA, no digas que es foto real.'
    }
];

const TEASER_CARDS = [
    {
        icon: '📊',
        title: 'Analiza tus datos con IA',
        description: 'Aprende a usar IA para entender qué productos se venden más, en qué horarios, y por qué.',
        example: '"Tus jabones de lavanda se venden 3x más los viernes. ¿Quieres promocionarlos ese día?"'
    },
    {
        icon: '💰',
        title: 'Revisa la salud de tu negocio',
        description: '¿Estás ganando o perdiendo? La IA te ayuda a ver tu negocio con claridad.',
        example: '"Este mes gastaste más en materiales. Considera subir precios o reducir costos."'
    },
    {
        icon: '🎯',
        title: 'Marketing automático',
        description: 'Crea campañas para Instagram y WhatsApp que se adaptan a cada cliente.',
        example: '"Hola María, vimos que te gustaron nuestros jabones. ¡Tenemos uno nuevo de menta!"'
    },
    {
        icon: '🤖',
        title: 'Tu asistente virtual 24/7',
        description: 'Configura un chatbot que responde preguntas de clientes mientras duermes.',
        example: '"¡Hola! Sí tenemos jabones de lavanda. Cuestan $15.000 y hacemos envíos a toda Colombia."'
    },
    {
        icon: '📈',
        title: 'Predice tu próximo mes',
        description: 'Usa IA para saber cuánto vas a vender y planear mejor tu inventario.',
        example: '"Basado en tu historial, el próximo mes venderás ~45 jabones. Prepara materiales para 50."'
    }
];

const TASKS = [
    'Abre ChatGPT y pide una idea para tu negocio',
    'Abre Canva y crea una imagen simple',
    'Comparte tu experiencia en el grupo de WhatsApp'
];

export default function Module6({ onPrev, onGoToStart, showNotification }) {
    const [email, setEmail] = useState('');
    const [emailSubmitted, setEmailSubmitted] = useState(false);
    const [emailSkipped, setEmailSkipped] = useState(false);
    const [certificateName, setCertificateName] = useState('');

    const handleEmailSubmit = () => {
        if (!email.trim()) {
            showNotification('Por favor escribe tu correo', 'error');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Por favor escribe un correo válido', 'error');
            return;
        }

        // Here you would normally send to Airtable or your backend
        // For now, we just show success
        setEmailSubmitted(true);
        showNotification('¡Gracias! Te avisaremos pronto 💌', 'success');
    };

    const handleSkipEmail = () => {
        setEmailSkipped(true);
    };

    const handleDownloadCertificate = () => {
        if (!certificateName.trim()) {
            showNotification('Por favor escribe tu nombre', 'error');
            return;
        }

        showNotification('Generando tu certificado... ⏳', 'info');

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = 1200;
        canvas.height = 850;

        // Background gradient
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#fffcf9');
        gradient.addColorStop(1, '#f0f9fa');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Outer border
        ctx.strokeStyle = '#2c8e9c';
        ctx.lineWidth = 12;
        ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

        // Inner border
        ctx.strokeStyle = '#ff6978';
        ctx.lineWidth = 3;
        ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

        // Trophy emoji
        ctx.font = '80px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('🏆', canvas.width / 2, 130);

        // Certificate title
        ctx.font = 'bold 48px Georgia';
        ctx.fillStyle = '#2c8e9c';
        ctx.fillText('CERTIFICADO', canvas.width / 2, 200);

        // MujerTech
        ctx.font = 'bold 36px Georgia';
        ctx.fillStyle = '#232443';
        ctx.fillText('MujerTech', canvas.width / 2, 250);

        // Subtitle
        ctx.font = '18px Arial';
        ctx.fillStyle = '#6B7280';
        ctx.fillText('Women Business & AI', canvas.width / 2, 280);

        // Divider line
        ctx.strokeStyle = '#E5E7EB';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(200, 310);
        ctx.lineTo(canvas.width - 200, 310);
        ctx.stroke();

        // "Se certifica que"
        ctx.font = '20px Arial';
        ctx.fillStyle = '#6B7280';
        ctx.fillText('Se certifica que', canvas.width / 2, 360);

        // Name
        ctx.font = 'bold 42px Georgia';
        ctx.fillStyle = '#232443';
        ctx.fillText(certificateName.trim().toUpperCase(), canvas.width / 2, 420);

        // "ha completado exitosamente el"
        ctx.font = '20px Arial';
        ctx.fillStyle = '#6B7280';
        ctx.fillText('ha completado exitosamente el', canvas.width / 2, 470);

        // Workshop title
        ctx.font = 'bold 28px Georgia';
        ctx.fillStyle = '#ff6978';
        ctx.fillText('TALLER INTRODUCTORIO DE IA', canvas.width / 2, 520);
        ctx.fillText('PARA EMPRENDEDORAS', canvas.width / 2, 555);

        // Divider line
        ctx.strokeStyle = '#E5E7EB';
        ctx.beginPath();
        ctx.moveTo(200, 590);
        ctx.lineTo(canvas.width - 200, 590);
        ctx.stroke();

        // Skills background
        ctx.fillStyle = 'rgba(44, 142, 156, 0.1)';
        ctx.fillRect(150, 610, canvas.width - 300, 80);

        // Skills text
        ctx.font = '16px Arial';
        ctx.fillStyle = '#232443';
        const skills = '✓ Fundamentos de IA   ✓ Creación de prompts   ✓ Herramientas de IA   ✓ Generación de imágenes   ✓ Uso ético';
        ctx.fillText(skills, canvas.width / 2, 655);

        // Date
        const date = new Date().toLocaleDateString('es-CO', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
        ctx.font = '18px Arial';
        ctx.fillStyle = '#232443';
        ctx.fillText(`Fecha: ${date}`, canvas.width / 2, 730);

        // Duration
        ctx.font = '16px Arial';
        ctx.fillStyle = '#6B7280';
        ctx.fillText('Duración: 2 horas', canvas.width / 2, 755);

        // Website
        ctx.font = '18px Arial';
        ctx.fillStyle = '#2c8e9c';
        ctx.fillText('www.mujertech.org', canvas.width / 2, 800);

        // Download
        const link = document.createElement('a');
        link.download = `Certificado_MujerTech_${certificateName.trim().replace(/\s+/g, '_')}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();

        showNotification('¡Certificado descargado! 🎉', 'success');
    };

    return (
        <div className={styles.moduleContent}>
            {/* Module Header */}
            <header className={styles.moduleHeader}>
                <h1>¡Felicitaciones!</h1>
                <p className={styles.moduleSubtitle}>Completaste el taller</p>
            </header>

            {/* Celebration Section */}
            <div className={styles.celebrationSection}>
                <div className={styles.celebrationIcon}>🎉</div>
                <h2>¡Lo lograste!</h2>
                <p>Has completado el Taller Introductorio de IA de MujerTech</p>
            </div>

            {/* Summary Card */}
            <div className={`${styles.card} ${styles.summaryCard}`}>
                <h2 className={styles.cardTitle}>
                    <span className={styles.cardIcon}>📚</span>
                    Hoy aprendiste
                </h2>
                <div className={styles.learnedItems}>
                    {LEARNED_ITEMS.map((item, index) => (
                        <div key={index} className={styles.learnedItem}>
                            <span className={styles.learnedCheck}>✅</span>
                            <p>{item}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Golden Rules Card */}
            <div className={`${styles.card} ${styles.warningCard}`}>
                <h2 className={styles.cardTitle}>
                    <span className={styles.cardIcon}>🔒</span>
                    Recuerda las 3 reglas de oro
                </h2>
                <div className={styles.rulesCompact}>
                    {GOLDEN_RULES.map((rule, index) => (
                        <div key={index} className={styles.ruleCompactItem}>
                            <span className={styles.ruleCompactNumber}>{index + 1}</span>
                            <div>
                                <strong>{rule.icon} {rule.title}</strong>
                                <p>{rule.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Teaser Cards */}
            <div className={styles.card}>
                <h2 className={styles.cardTitle}>
                    <span className={styles.cardIcon}>🚀</span>
                    ¿Qué más puedes aprender?
                </h2>
                <p className={styles.cardText}>Esto es solo el comienzo. Mira todo lo que la IA puede hacer por tu negocio:</p>

                <div className={styles.teaserGrid}>
                    {TEASER_CARDS.map((card, index) => (
                        <div key={index} className={styles.teaserCard}>
                            <div className={styles.teaserCardContent}>
                                <div className={styles.teaserCardHeader}>
                                    <span className={styles.teaserIcon}>{card.icon}</span>
                                    <h3>{card.title}</h3>
                                    <span className={styles.teaserBadge}>Próximamente</span>
                                </div>
                                <p>{card.description}</p>
                            </div>
                            <div className={styles.teaserPreview}>
                                <p className={styles.teaserPreviewLabel}>Ejemplo:</p>
                                <p className={styles.teaserPreviewText}>{card.example}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Email Capture */}
            {!emailSubmitted && !emailSkipped && (
                <div className={styles.emailCapture}>
                    <div className={styles.emailCaptureIcon}>🚀</div>
                    <h2>¿Quieres aprender todo esto?</h2>
                    <p>Déjanos tu correo y te avisamos cuando abramos el próximo curso.</p>

                    <div className={styles.emailForm}>
                        <input
                            type="email"
                            className={styles.emailInput}
                            placeholder="Tu correo electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                        />
                        <button
                            className={styles.btnEmailSubmit}
                            onClick={handleEmailSubmit}
                            type="button"
                        >
                            QUIERO APRENDER MÁS
                        </button>
                    </div>

                    <div className={styles.noSpamPromise}>
                        <span className={styles.noSpamIcon}>🙅‍♀️</span>
                        <span>Odiamos el spam tanto como tú. Solo te escribiremos cuando tengamos algo valioso.</span>
                    </div>

                    <button
                        className={styles.btnSkipEmail}
                        onClick={handleSkipEmail}
                        type="button"
                    >
                        Ahora no, gracias
                    </button>
                </div>
            )}

            {/* Email Success */}
            {emailSubmitted && (
                <div className={styles.emailSuccess}>
                    <div className={styles.emailSuccessIcon}>💌</div>
                    <h3>¡Listo! Te avisaremos pronto.</h3>
                    <p>Revisa tu correo en los próximos días.</p>
                </div>
            )}

            {/* Certificate Section */}
            <div className={styles.certificateSection}>
                <h2>
                    <span className={styles.cardIcon}>📜</span>
                    Obtén tu certificado
                </h2>
                <p>Escribe tu nombre para generar tu certificado:</p>
                <input
                    type="text"
                    className={styles.certificateInput}
                    placeholder="Tu nombre completo"
                    value={certificateName}
                    onChange={(e) => setCertificateName(e.target.value)}
                />
                <button
                    className={styles.btnCertificate}
                    onClick={handleDownloadCertificate}
                    type="button"
                >
                    📥 DESCARGAR MI CERTIFICADO
                </button>
            </div>

            {/* Task Card */}
            <div className={`${styles.card} ${styles.taskCard}`}>
                <h2 className={styles.cardTitle}>
                    <span className={styles.cardIcon}>🎯</span>
                    Tu tarea para mañana
                </h2>
                <div className={styles.taskList}>
                    {TASKS.map((task, index) => (
                        <div key={index} className={styles.taskItem}>
                            <span className={styles.taskNumber}>{index + 1}</span>
                            <p>{task}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Feedback CTA */}
            <div className={`${styles.card} ${styles.ctaCard}`}>
                <h2 className={styles.cardTitle}>
                    <span className={styles.cardIcon}>💬</span>
                    ¡Tu opinión es muy importante!
                </h2>
                <p className={styles.cardText}>Ayúdanos a mejorar este taller con tu feedback.</p>
                <p className={styles.cardText}>Solo te tomará <strong>2 minutos</strong> y nos ayuda mucho.</p>
                <div className={styles.feedbackBenefit}>
                    <span className={styles.benefitIcon}>🎁</span>
                    <p><strong>¿Qué ganas tú?</strong> Las personas que nos den feedback serán las <strong>primeras invitadas</strong> a nuestro próximo curso completo de IA.</p>
                </div>
                
                <div className={styles.btnCta} onClick={() => window.open('https://forms.gle/cRbQkicHhvQ8sGQJ9', '_blank')}>
                    📝 DARNOS TUS OPINIONES
                </div>
            </div>

            {/* Navigation */}
            <div className={styles.navButtons}>
                <button
                    className={`${styles.btnNav} ${styles.btnPrev}`}
                    onClick={onPrev}
                    type="button"
                >
                    ← ANTERIOR
                </button>
                <button
                    className={`${styles.btnNav} ${styles.btnNext}`}
                    onClick={onGoToStart}
                    type="button"
                >
                    VOLVER AL INICIO
                </button>
            </div>
        </div>
    );
}