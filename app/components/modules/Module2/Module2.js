import { useState } from 'react';
import styles from './Module2.module.css';

const NEED_OPTIONS = [
    { id: 'social', icon: '📱', label: 'Ideas para redes sociales' },
    { id: 'mensaje', icon: '📧', label: 'Un mensaje para clientes' },
    { id: 'nombre', icon: '🏷️', label: 'Nombres para un producto' }
];

const TONE_OPTIONS = [
    { id: 'amigable', icon: '😊', label: 'Amigable' },
    { id: 'profesional', icon: '👔', label: 'Profesional' },
    { id: 'divertido', icon: '🎉', label: 'Divertido' }
];

const NEED_TEXTS = {
    social: '3 ideas de publicaciones para mis redes sociales',
    mensaje: 'un mensaje para enviar a mis clientes',
    nombre: '5 nombres creativos para un nuevo producto'
};

const TONE_TEXTS = {
    amigable: 'amigable y cercano, como si le hablara a una amiga',
    profesional: 'profesional y confiable',
    divertido: 'divertido y alegre'
};

const MARIA_PROMPT = `Soy María, tengo un negocio de jabones artesanales naturales en Bogotá.

Necesito 3 textos cortos para publicar en mi estado de WhatsApp.

Que sean cortos, con emojis, y que inviten a preguntar por WhatsApp.

Usa un tono amigable y cercano, como si le hablara a una amiga.`;

export default function Module2({ onNext, onPrev, showNotification }) {
    const [business, setBusiness] = useState('');
    const [selectedNeed, setSelectedNeed] = useState(null);
    const [selectedTone, setSelectedTone] = useState(null);
    const [generatedPrompt, setGeneratedPrompt] = useState('');
    const [showGenerated, setShowGenerated] = useState(false);

    const copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            showNotification('¡Copiado! 📋', 'success');
        } catch (err) {
            showNotification('No se pudo copiar. Selecciona el texto manualmente.', 'error');
        }
    };

    const handleGeneratePrompt = () => {
        if (!business.trim()) {
            showNotification('Por favor escribe qué vendes o haces', 'error');
            return;
        }
        if (!selectedNeed) {
            showNotification('Por favor elige qué necesitas', 'error');
            return;
        }
        if (!selectedTone) {
            showNotification('Por favor elige un tono', 'error');
            return;
        }

        const prompt = `Tengo un negocio de ${business.trim()}.

Necesito ${NEED_TEXTS[selectedNeed]}.

Usa un tono ${TONE_TEXTS[selectedTone]}.`;

        setGeneratedPrompt(prompt);
        setShowGenerated(true);
        showNotification('¡Tu mensaje está listo! 🎉', 'success');
    };

    const handleWhatsAppShare = (question) => {
        const message = encodeURIComponent(`💬 Pregunta del taller MujerTech:\n\n${question}\n\n¿Qué opinan ustedes?`);
        window.open(`https://wa.me/?text=${message}`, '_blank');
        showNotification('¡Gracias por compartir! 💚', 'success');
    };

    return (
        <div className={styles.moduleContent}>
            {/* Module Header */}
            <header className={styles.moduleHeader}>
                <h1>Cómo hablarle a la IA</h1>
                <p className={styles.moduleSubtitle}>Aprende a pedir lo que necesitas</p>
                <span className={styles.timeBadge}>⏱️ 30 minutos</span>
            </header>

            {/* What is a Prompt */}
            <div className={`${styles.card} ${styles.explanationCard}`}>
                <div className={styles.bigIcon}>💬</div>
                <h2 className={styles.cardTitle}>¿Qué es un &quot;prompt&quot;?</h2>
                <p className={styles.cardText}>Un <strong>prompt</strong> es el mensaje que le escribes a la IA.</p>
                <p className={styles.cardText}>Es como cuando le pides algo a alguien por WhatsApp.</p>
                <div className={styles.exampleBox}>
                    <p className={styles.exampleLabel}>Ejemplo de prompt:</p>
                    <p className={styles.exampleText}>&quot;Dame 3 ideas para publicar en Instagram sobre mi negocio de jabones&quot;</p>
                </div>
            </div>

            {/* Golden Rule */}
            <div className={styles.card}>
                <h2 className={styles.cardTitle}>
                    <span className={styles.cardIcon}>🔑</span>
                    La regla de oro
                </h2>
                <div className={styles.goldenRule}>
                    <p className={styles.ruleText}>Entre más claro le pidas las cosas a la IA, mejor te va a ayudar.</p>
                </div>
                <div className={styles.comparisonBox}>
                    <div className={`${styles.comparisonItem} ${styles.bad}`}>
                        <span className={styles.comparisonIcon}>❌</span>
                        <p><strong>Malo:</strong> &quot;Dame ideas&quot;</p>
                    </div>
                    <div className={`${styles.comparisonItem} ${styles.good}`}>
                        <span className={styles.comparisonIcon}>✅</span>
                        <p><strong>Bueno:</strong> &quot;Dame 3 ideas de posts para Instagram sobre jabones naturales, con un tono amigable&quot;</p>
                    </div>
                </div>
            </div>

            {/* 4-Step Method */}
            <div className={`${styles.card} ${styles.methodCard}`}>
                <h2 className={styles.cardTitle}>
                    <span className={styles.cardIcon}>📝</span>
                    El método de los 4 pasos
                </h2>
                <p className={styles.cardText}>Para escribir un buen mensaje a la IA, sigue estos pasos:</p>
                <div className={styles.methodSteps}>
                    <div className={styles.methodStep}>
                        <div className={styles.stepHeader}>
                            <span className={styles.stepNumber}>1</span>
                            <span className={styles.stepTitle}>¿Quién eres?</span>
                        </div>
                        <p>Cuéntale sobre ti y tu negocio</p>
                        <div className={styles.stepExample}>&quot;Tengo un negocio de jabones naturales&quot;</div>
                    </div>
                    <div className={styles.methodStep}>
                        <div className={styles.stepHeader}>
                            <span className={styles.stepNumber}>2</span>
                            <span className={styles.stepTitle}>¿Qué necesitas?</span>
                        </div>
                        <p>Dile exactamente qué quieres</p>
                        <div className={styles.stepExample}>&quot;Necesito 3 textos para WhatsApp&quot;</div>
                    </div>
                    <div className={styles.methodStep}>
                        <div className={styles.stepHeader}>
                            <span className={styles.stepNumber}>3</span>
                            <span className={styles.stepTitle}>¿Cómo lo quieres?</span>
                        </div>
                        <p>Describe cómo debe verse el resultado</p>
                        <div className={styles.stepExample}>&quot;Cortos, con emojis&quot;</div>
                    </div>
                    <div className={styles.methodStep}>
                        <div className={styles.stepHeader}>
                            <span className={styles.stepNumber}>4</span>
                            <span className={styles.stepTitle}>¿Qué tono?</span>
                        </div>
                        <p>¿Formal, amigable, divertido?</p>
                        <div className={styles.stepExample}>&quot;Tono amigable y cercano&quot;</div>
                    </div>
                </div>
            </div>

            {/* María Case Study */}
            <div className={styles.caseStudy}>
                <div className={styles.caseHeader}>
                    <span className={styles.caseIcon}>👩</span>
                    <div>
                        <h2>Ejemplo Completo: María y sus Jabones</h2>
                        <p>Veamos cómo María usa la IA para su negocio</p>
                    </div>
                </div>

                <div className={styles.caseStep}>
                    <h3><span className={styles.caseStepNumber}>1</span>Conoce a María</h3>
                    <div className={styles.mariaIntro}>
                        <p>María vende <strong>jabones artesanales</strong> en Bogotá.</p>
                        <p>Su negocio se llama <strong>&quot;Jabones de la Abuela&quot;</strong>.</p>
                        <p>Vende por WhatsApp y en ferias locales.</p>
                        <p className={styles.mariaProblem}>😰 <strong>Su problema:</strong> No sabe qué publicar en su estado de WhatsApp.</p>
                    </div>
                </div>

                <div className={styles.caseStep}>
                    <h3><span className={styles.caseStepNumber}>2</span>María piensa qué necesita</h3>
                    <div className={styles.mariaThinking}>
                        <div className={styles.thinkingItem}><span className={styles.check}>✅</span><p><strong>¿Qué vende?</strong> → Jabones naturales</p></div>
                        <div className={styles.thinkingItem}><span className={styles.check}>✅</span><p><strong>¿Qué necesita?</strong> → Textos para WhatsApp</p></div>
                        <div className={styles.thinkingItem}><span className={styles.check}>✅</span><p><strong>¿Cómo lo quiere?</strong> → Cortos con emojis</p></div>
                        <div className={styles.thinkingItem}><span className={styles.check}>✅</span><p><strong>¿Qué tono?</strong> → Amigable</p></div>
                    </div>
                </div>

                <div className={styles.caseStep}>
                    <h3><span className={styles.caseStepNumber}>3</span>María escribe su mensaje a la IA</h3>
                    <div className={styles.promptDisplay}>
                        <p className={styles.promptLabel}>El mensaje completo:</p>
                        <div className={styles.promptBox}>{MARIA_PROMPT}</div>
                        <button 
                            className={styles.btnCopy}
                            onClick={() => copyToClipboard(MARIA_PROMPT)}
                            type="button"
                        >
                            📋 COPIAR ESTE MENSAJE
                        </button>
                    </div>
                </div>

                <div className={styles.caseStep}>
                    <h3><span className={styles.caseStepNumber}>4</span>La IA le responde</h3>
                    <div className={styles.aiResponse}>
                        <p className={styles.responseLabel}>🤖 La IA le dio estas opciones:</p>
                        <div className={styles.responseOptions}>
                            <div className={styles.responseOption}>
                                <p>🧼✨ <strong>Opción 1:</strong></p>
                                <p>&quot;¿Ya probaste nuestros jabones de avena? Tu piel te lo va a agradecer 🥰 ¡Escríbeme!&quot;</p>
                            </div>
                            <div className={styles.responseOption}>
                                <p>🌿🧴 <strong>Opción 2:</strong></p>
                                <p>&quot;Ingredientes naturales + mucho amor = jabones que cuidan tu piel 💚 ¿Te cuento más?&quot;</p>
                            </div>
                            <div className={styles.responseOption}>
                                <p>🎁 <strong>Opción 3:</strong></p>
                                <p>&quot;Regalito perfecto para alguien especial: jabón artesanal hecho con cariño 💝 ¡Pregúntame!&quot;</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.caseResult}>
                    <div className={styles.resultIcon}>🎉</div>
                    <h3>¡María ya tiene contenido para publicar!</h3>
                    <div className={styles.resultStats}>
                        <div className={styles.stat}>
                            <span className={styles.statValue}>⏱️ 5 min</span>
                            <span className={styles.statLabel}>Tiempo total</span>
                        </div>
                        <div className={styles.stat}>
                            <span className={styles.statValue}>🙋‍♀️ Sola</span>
                            <span className={styles.statLabel}>Lo hizo ella misma</span>
                        </div>
                        <div className={styles.stat}>
                            <span className={styles.statValue}>📝 3</span>
                            <span className={styles.statLabel}>Opciones</span>
                        </div>
                    </div>
                    <p className={styles.resultNote}>Antes, María no sabía qué escribir. ¡Ahora tiene varias opciones para elegir!</p>
                </div>
            </div>

            {/* Your Turn: Prompt Builder */}
            <div className={styles.yourTurnCard}>
                <h2 className={styles.cardTitle}>
                    <span className={styles.cardIcon}>🎯</span>
                    ¡Ahora es tu turno!
                </h2>
                <p className={styles.cardText}>Vamos a crear tu primer mensaje para la IA:</p>

                <div className={styles.promptBuilder}>
                    <div className={styles.builderStep}>
                        <label className={styles.builderLabel}>
                            <span className={styles.builderNumber}>1</span>
                            ¿Qué vendes o haces?
                        </label>
                        <input
                            type="text"
                            className={styles.builderInput}
                            placeholder="Ejemplo: galletas caseras, ropa, servicios de limpieza..."
                            value={business}
                            onChange={(e) => setBusiness(e.target.value)}
                        />
                    </div>

                    <div className={styles.builderStep}>
                        <label className={styles.builderLabel}>
                            <span className={styles.builderNumber}>2</span>
                            ¿Qué necesitas? (elige una)
                        </label>
                        <div className={styles.builderOptions}>
                            {NEED_OPTIONS.map((option) => (
                                <button
                                    key={option.id}
                                    className={`${styles.builderOption} ${selectedNeed === option.id ? styles.selected : ''}`}
                                    onClick={() => setSelectedNeed(option.id)}
                                    type="button"
                                >
                                    {option.icon} {option.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={styles.builderStep}>
                        <label className={styles.builderLabel}>
                            <span className={styles.builderNumber}>3</span>
                            ¿Qué tono quieres? (elige uno)
                        </label>
                        <div className={styles.builderOptions}>
                            {TONE_OPTIONS.map((option) => (
                                <button
                                    key={option.id}
                                    className={`${styles.builderOption} ${selectedTone === option.id ? styles.selected : ''}`}
                                    onClick={() => setSelectedTone(option.id)}
                                    type="button"
                                >
                                    {option.icon} {option.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button 
                        className={styles.btnGenerate}
                        onClick={handleGeneratePrompt}
                        type="button"
                    >
                        ✨ CREAR MI MENSAJE
                    </button>

                    {showGenerated && (
                        <div className={styles.generatedPrompt}>
                            <p className={styles.generatedLabel}>Tu mensaje para la IA:</p>
                            <div className={styles.generatedText}>{generatedPrompt}</div>
                            <button 
                                className={styles.btnCopy}
                                onClick={() => copyToClipboard(generatedPrompt)}
                                type="button"
                            >
                                📋 COPIAR MI MENSAJE
                            </button>
                            <div className={styles.nextStepHint}>
                                <p>💡 <strong>Siguiente paso:</strong> Copia este mensaje y pégalo en ChatGPT o Claude para ver qué te responde la IA.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Tools Section Divider */}
            <div className={styles.sectionDivider}>
                <span className={styles.dividerIcon}>🛠️</span>
                <h2>Herramientas que puedes usar HOY</h2>
                <p>Conoce las apps de IA más fáciles</p>
            </div>

            {/* ChatGPT Tool Card */}
            <div className={`${styles.card} ${styles.toolCard}`}>
                <div className={styles.toolHeader}>
                    <span className={styles.toolIcon}>💬</span>
                    <div>
                        <h2>ChatGPT</h2>
                        <span className={styles.toolPrice}>GRATIS</span>
                    </div>
                </div>
                <p><strong>¿Qué es?</strong> Una IA que conversa contigo y te ayuda a escribir.</p>
                <p><strong>¿Para qué sirve?</strong></p>
                <ul className={styles.toolUses}>
                    <li>✍️ Escribir textos para redes sociales</li>
                    <li>💡 Darte ideas para tu negocio</li>
                    <li>📧 Redactar mensajes y correos</li>
                    <li>❓ Responder preguntas</li>
                </ul>
                <p><strong>¿Cómo usarlo?</strong></p>
                <ol className={styles.toolSteps}>
                    <li>Entra a <strong><a href="https://chatgpt.com/" target="_blank" rel="noopener noreferrer">chatgpt.com</a></strong> en tu celular</li>
                    <li>Crea una cuenta gratis (con tu correo)</li>
                    <li>Escribe tu mensaje y envíalo</li>
                </ol>
            </div>

            {/* Canva Tool Card */}
            <div className={`${styles.card} ${styles.toolCard}`}>
                <div className={styles.toolHeader}>
                    <span className={styles.toolIcon}>🎨</span>
                    <div>
                        <h2>Canva</h2>
                        <span className={styles.toolPrice}>GRATIS (con opciones de pago)</span>
                    </div>
                </div>
                <p><strong>¿Qué es?</strong> Una app para crear diseños e imágenes bonitas.</p>
                <p><strong>¿Para qué sirve?</strong></p>
                <ul className={styles.toolUses}>
                    <li>🖼️ Crear imágenes para redes sociales</li>
                    <li>📋 Hacer menús y catálogos</li>
                    <li>🎨 Diseñar logos simples</li>
                    <li>✨ Generar imágenes con IA</li>
                </ul>
                <p><strong>¿Cómo usarlo?</strong></p>
                <ol className={styles.toolSteps}>
                    <li>Entra a <strong><a href="https://www.canva.com/" target="_blank" rel="noopener noreferrer">canva.com</a></strong> o descarga la app de tu tienda</li>
                    <li>Crea una cuenta gratis</li>
                    <li>Elige una plantilla y personalízala</li>
                </ol>
            </div>

            {/* Tip Card */}
            <div className={styles.tipCard}>
                <span className={styles.tipIcon}>💡</span>
                <div>
                    <h3>Tip importante</h3>
                    <p>Empieza con <strong>ChatGPT</strong> para textos y <strong>Canva</strong> para imágenes. Son gratis y fáciles de usar. ¡No necesitas más por ahora!</p>
                </div>
            </div>

            {/* Ethics Reflection Card */}
            <div className={styles.ethicsCard}>
                <div className={styles.ethicsCardHeader}>
                    <span className={styles.ethicsIcon}>🤔</span>
                    <h3>Momento de reflexión</h3>
                </div>
                <div className={styles.ethicsReflection}>
                    <p>Cuando le das información a la IA, esos datos pueden ser usados para entrenar nuevos modelos. Por eso es importante no compartir información sensible de tu negocio o clientes.</p>
                </div>
                <div className={styles.ethicsQuestion}>
                    <span className={styles.ethicsQuestionIcon}>💬</span>
                    <p>¿Qué información de tu negocio NO le darías a la IA?</p>
                </div>
                <button 
                    className={styles.btnWhatsapp}
                    onClick={() => handleWhatsAppShare('¿Qué información de tu negocio NO le darías a la IA? 🔒')}
                    type="button"
                >
                    <span className={styles.whatsappIcon}>📱</span>
                    COMPARTIR EN EL GRUPO
                </button>
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
                    onClick={onNext}
                    type="button"
                >
                    SIGUIENTE →
                </button>
            </div>
        </div>
    );
}