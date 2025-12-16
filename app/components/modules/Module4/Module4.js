import { useState } from 'react';
import styles from './Module4.module.css';

const BACKGROUND_OPTIONS = [
    { id: 'mesa', icon: '🪵', label: 'Mesa de madera' },
    { id: 'blanco', icon: '⬜', label: 'Fondo blanco' },
    { id: 'naturaleza', icon: '🌿', label: 'Con plantas' }
];

const COLOR_OPTIONS = [
    { id: 'pastel', icon: '🎀', label: 'Suaves y pastel' },
    { id: 'brillantes', icon: '🌈', label: 'Brillantes y alegres' },
    { id: 'naturales', icon: '🍂', label: 'Naturales y tierra' }
];

const BACKGROUND_TEXTS = {
    mesa: 'sobre una mesa de madera',
    blanco: 'con fondo blanco limpio',
    naturaleza: 'rodeado de plantas verdes'
};

const COLOR_TEXTS = {
    pastel: 'colores suaves y pastel',
    brillantes: 'colores brillantes y alegres',
    naturales: 'colores naturales y tierra'
};

const MARIA_IMAGE_PROMPT = 'Foto de jabones artesanales coloridos sobre una mesa de madera, con flores secas alrededor, luz natural suave, colores pastel, foto profesional';

export default function Module4({ onNext, onPrev, showNotification }) {
    const [product, setProduct] = useState('');
    const [selectedBackground, setSelectedBackground] = useState(null);
    const [selectedColors, setSelectedColors] = useState(null);
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
        if (!product.trim()) {
            showNotification('Por favor escribe qué producto quieres mostrar', 'error');
            return;
        }
        if (!selectedBackground) {
            showNotification('Por favor elige dónde está el producto', 'error');
            return;
        }
        if (!selectedColors) {
            showNotification('Por favor elige los colores', 'error');
            return;
        }

        const prompt = `Foto de ${product.trim()} ${BACKGROUND_TEXTS[selectedBackground]}, ${COLOR_TEXTS[selectedColors]}, luz natural suave, foto profesional, alta calidad`;

        setGeneratedPrompt(prompt);
        setShowGenerated(true);
        showNotification('¡Tu descripción está lista! 🎨', 'success');
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
                <h1>Crea una imagen para tu negocio</h1>
                <p className={styles.moduleSubtitle}>Imágenes profesionales para promocionar tu negocio</p>
                <span className={styles.timeBadge}>⏱️ 20 minutos</span>
            </header>

            {/* Why Images Matter */}
            <div className={styles.card}>
                <h2 className={styles.cardTitle}>
                    <span className={styles.cardIcon}>🖼️</span>
                    ¿Por qué importan las imágenes?
                </h2>
                <p className={styles.cardText}>Las imágenes bonitas hacen que más personas quieran comprar.</p>
                <p className={styles.cardText}>Con la IA puedes crear imágenes rápidas para:</p>
                <ul className={styles.simpleList}>
                    <li>📱 Publicar en redes cuando necesites contenido urgente</li>
                    <li>💡 Visualizar ideas antes de invertir en una sesión profesional</li>
                    <li>🎨 Experimentar con estilos sin límites</li>
                </ul>
                <div className={styles.tipBox}>
                    <span className={styles.tipIcon}>💡</span>
                    <p><strong>Tip:</strong> La IA es una herramienta más en tu caja de herramientas. Para fotos de productos reales, una sesión profesional sigue siendo valiosa.</p>
                </div>
            </div>

            {/* Image Method */}
            <div className={`${styles.card} ${styles.methodCard}`}>
                <h2 className={styles.cardTitle}>
                    <span className={styles.cardIcon}>📝</span>
                    Cómo describir tu imagen
                </h2>
                <p className={styles.cardText}>Para que la IA cree una buena imagen, debes decirle:</p>
                <div className={styles.imageMethod}>
                    <div className={styles.imageStep}>
                        <span className={styles.stepNumber}>1</span>
                        <div>
                            <strong>¿Qué producto?</strong>
                            <p className={styles.stepExample}>&quot;Jabón de lavanda&quot;</p>
                        </div>
                    </div>
                    <div className={styles.imageStep}>
                        <span className={styles.stepNumber}>2</span>
                        <div>
                            <strong>¿Dónde está?</strong>
                            <p className={styles.stepExample}>&quot;Sobre una mesa de madera&quot;</p>
                        </div>
                    </div>
                    <div className={styles.imageStep}>
                        <span className={styles.stepNumber}>3</span>
                        <div>
                            <strong>¿Qué más hay?</strong>
                            <p className={styles.stepExample}>&quot;Con flores de lavanda alrededor&quot;</p>
                        </div>
                    </div>
                    <div className={styles.imageStep}>
                        <span className={styles.stepNumber}>4</span>
                        <div>
                            <strong>¿Qué colores?</strong>
                            <p className={styles.stepExample}>&quot;Colores morados y blancos&quot;</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* María Case Study */}
            <div className={styles.caseStudy}>
                <div className={styles.caseHeader}>
                    <span className={styles.caseIcon}>👩</span>
                    <div>
                        <h2>María también crea una imagen</h2>
                        <p>Veamos cómo describe su producto</p>
                    </div>
                </div>

                <div className={styles.caseStep}>
                    <h3>María describió su imagen así:</h3>
                    <div className={styles.promptDisplay}>
                        <div className={styles.promptBox}>{MARIA_IMAGE_PROMPT}</div>
                        <button 
                            className={styles.btnCopy}
                            onClick={() => copyToClipboard(MARIA_IMAGE_PROMPT)}
                            type="button"
                        >
                            📋 COPIAR
                        </button>
                    </div>
                </div>

                <div className={styles.caseResult}>
                    <p>Con esa descripción, la IA puede crear imágenes como esta:</p>
                    <div className={styles.imageResult}>
                        <img 
                            src="/images/jabones-maria.png" 
                            alt="Jabones artesanales generados con IA" 
                            className={styles.generatedImage}
                        />
                    </div>
                    <div className={styles.tipBox}>
                        <span className={styles.tipIcon}>💡</span>
                        <p>María puede usar esta imagen para sus redes mientras planea una sesión de fotos profesional de sus productos reales.</p>
                    </div>
                </div>
            </div>

            {/* Your Turn: Image Builder */}
            <div className={styles.yourTurnCard}>
                <h2 className={styles.cardTitle}>
                    <span className={styles.cardIcon}>🎯</span>
                    Crea la descripción de TU imagen
                </h2>

                <div className={styles.imageBuilder}>
                    <div className={styles.builderStep}>
                        <label className={styles.builderLabel}>
                            <span className={styles.builderNumber}>1</span>
                            ¿Qué producto quieres mostrar?
                        </label>
                        <input
                            type="text"
                            className={styles.builderInput}
                            placeholder="Ejemplo: galletas, aretes, crema facial..."
                            value={product}
                            onChange={(e) => setProduct(e.target.value)}
                        />
                    </div>

                    <div className={styles.builderStep}>
                        <label className={styles.builderLabel}>
                            <span className={styles.builderNumber}>2</span>
                            ¿Dónde está el producto? (elige una)
                        </label>
                        <div className={styles.builderOptions}>
                            {BACKGROUND_OPTIONS.map((option) => (
                                <button
                                    key={option.id}
                                    className={`${styles.builderOption} ${selectedBackground === option.id ? styles.selected : ''}`}
                                    onClick={() => setSelectedBackground(option.id)}
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
                            ¿Qué colores te gustan? (elige uno)
                        </label>
                        <div className={styles.builderOptions}>
                            {COLOR_OPTIONS.map((option) => (
                                <button
                                    key={option.id}
                                    className={`${styles.builderOption} ${selectedColors === option.id ? styles.selected : ''}`}
                                    onClick={() => setSelectedColors(option.id)}
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
                        🎨 CREAR DESCRIPCIÓN
                    </button>

                    {showGenerated && (
                        <div className={styles.generatedPrompt}>
                            <p className={styles.generatedLabel}>Tu descripción para crear la imagen:</p>
                            <div className={styles.generatedText}>{generatedPrompt}</div>
                            <button 
                                className={styles.btnCopy}
                                onClick={() => copyToClipboard(generatedPrompt)}
                                type="button"
                            >
                                📋 COPIAR
                            </button>
                            <div className={styles.nextStepHint}>
                                <p>💡 <strong>Siguiente paso:</strong> Abre <a href="https://www.canva.com/" target="_blank" rel="noopener noreferrer">Canva</a>, busca &quot;Magic Media&quot; o &quot;Texto a imagen&quot;, y pega esta descripción.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Ethics Reflection Card */}
            <div className={styles.ethicsCard}>
                <div className={styles.ethicsCardHeader}>
                    <span className={styles.ethicsIcon}>🤔</span>
                    <h3>Momento de reflexión</h3>
                </div>
                <div className={styles.ethicsReflection}>
                    <p>Las imágenes creadas con IA pueden ser muy realistas. Es importante ser honesta con tus clientes sobre cuáles son fotos reales y cuáles fueron creadas por IA.</p>
                </div>
                <div className={styles.ethicsQuestion}>
                    <span className={styles.ethicsQuestionIcon}>💬</span>
                    <p>¿Crees que deberías avisar a tus clientes cuando una imagen es de IA?</p>
                </div>
                <button 
                    className={styles.btnWhatsapp}
                    onClick={() => handleWhatsAppShare('¿Crees que deberíamos avisar a los clientes cuando una imagen es de IA? 🎨')}
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