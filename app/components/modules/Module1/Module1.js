import { useState } from 'react';
import styles from './Module1.module.css';
import SuccessCriteria from '../../SuccessCriteria/SuccessCriteria';

const MYTH_ANSWERS = {
    1: { correct: 'mentira', explanation: 'La IA no piensa de verdad. Solo imita patrones que aprendió.' },
    2: { correct: 'verdad', explanation: 'Sí puede ayudarte a escribir, es una de sus mejores funciones.' },
    3: { correct: 'mentira', explanation: 'La IA puede equivocarse. Siempre debes revisar lo que te da.' }
};

const MODULE_OUTCOMES = [
    'Explicar qué es la IA en tus propias palabras',
    'Saber qué puede y qué NO puede hacer la IA'
];

const MODULE_COMPLETION = 'Ahora entiendes qué es la IA y cómo puede ayudarte en tu negocio.';

export default function Module1({ onNext, onPrev, showNotification, hidePrev }) {
    const [quizAnswers, setQuizAnswers] = useState({});

    const handleQuizAnswer = (questionNum, answer) => {
        if (quizAnswers[questionNum]) return;
        
        const isCorrect = answer === MYTH_ANSWERS[questionNum].correct;
        setQuizAnswers(prev => ({
            ...prev,
            [questionNum]: { answer, isCorrect }
        }));
    };

    const handleWhatsAppShare = (question) => {
        const message = encodeURIComponent(`💬 Pregunta del taller MujerTech:\n\n${question}\n\n¿Qué opinan ustedes?`);
        window.open(`https://wa.me/?text=${message}`, '_blank');
        if (showNotification) {
            showNotification('¡Gracias por compartir! 💚', 'success');
        }
    };

    return (
        <div className={styles.moduleContent}>
            {/* Module Header */}
            <header className={styles.moduleHeader}>
                <h1>¿Qué es la Inteligencia Artificial?</h1>
                <p className={styles.moduleSubtitle}>Explicado de forma simple</p>
                <span className={styles.timeBadge}>⏱️ 10 minutos</span>
            </header>

            {/* Success Criteria - Intro */}
            <SuccessCriteria 
                mode="intro"
                outcomes={MODULE_OUTCOMES}
            />

            {/* Explanation Card */}
            <div className={`${styles.card} ${styles.explanationCard}`}>
                <div className={styles.bigIcon}>🤖</div>
                <h2 className={styles.cardTitle}>La IA es como una asistente muy inteligente</h2>
                <p className={styles.cardText}>Imagina que tienes una asistente que:</p>
                <ul className={styles.simpleList}>
                    <li>📚 Leyó millones de libros</li>
                    <li>🖼️ Vio millones de imágenes</li>
                    <li>💬 Aprendió a escribir muy bien</li>
                </ul>
                <p className={styles.cardText}>Esa es la IA. <strong>Le puedes pedir ayuda y te responde.</strong></p>
            </div>

            {/* What AI CAN do */}
            <div className={styles.card}>
                <h2 className={styles.cardTitle}>
                    <span className={styles.cardIcon}>✅</span>
                    Lo que SÍ puede hacer la IA
                </h2>
                <div className={styles.canDoList}>
                    <div className={styles.canDoItem}>
                        <span className={styles.canIcon}>💬</span>
                        <p>Escribir textos para tus redes sociales</p>
                    </div>
                    <div className={styles.canDoItem}>
                        <span className={styles.canIcon}>💡</span>
                        <p>Darte ideas para tu negocio</p>
                    </div>
                    <div className={styles.canDoItem}>
                        <span className={styles.canIcon}>🎨</span>
                        <p>Crear imágenes bonitas</p>
                    </div>
                    <div className={styles.canDoItem}>
                        <span className={styles.canIcon}>📝</span>
                        <p>Ayudarte a escribir mensajes</p>
                    </div>
                </div>
            </div>

            {/* What AI CANNOT do */}
            <div className={`${styles.card} ${styles.warningCard}`}>
                <h2 className={styles.cardTitle}>
                    <span className={styles.cardIcon}>⚠️</span>
                    Lo que NO puede hacer la IA
                </h2>
                <div className={styles.cannotDoList}>
                    <div className={styles.cannotItem}>
                        <span className={styles.cannotIcon}>🧠</span>
                        <p><strong>No piensa de verdad.</strong> Solo imita lo que aprendió.</p>
                    </div>
                    <div className={styles.cannotItem}>
                        <span className={styles.cannotIcon}>❌</span>
                        <p><strong>No siempre tiene razón.</strong> Puede equivocarse.</p>
                    </div>
                    <div className={styles.cannotItem}>
                        <span className={styles.cannotIcon}>👀</span>
                        <p><strong>No reemplaza tu criterio.</strong> Tú decides qué usar.</p>
                    </div>
                </div>
            </div>

            {/* Quiz Activity */}
            <div className={styles.activityCard}>
                <h2 className={styles.cardTitle}>
                    <span className={styles.cardIcon}>🎯</span>
                    Actividad: ¿Verdad o Mentira?
                </h2>
                <p className={styles.cardText}>Vamos a ver si entendiste. Responde cada pregunta:</p>
                
                <div className={styles.quizSimple}>
                    {/* Question 1 */}
                    <div className={styles.quizQuestionItem}>
                        <p className={styles.quizStatement}>&quot;La IA puede pensar por sí misma&quot;</p>
                        <div className={styles.quizButtons}>
                            <button 
                                className={`${styles.quizBtn} ${quizAnswers[1] ? styles.disabled : ''}`}
                                onClick={() => handleQuizAnswer(1, 'verdad')}
                                disabled={!!quizAnswers[1]}
                                type="button"
                            >
                                🟢 VERDAD
                            </button>
                            <button 
                                className={`${styles.quizBtn} ${quizAnswers[1] ? styles.disabled : ''}`}
                                onClick={() => handleQuizAnswer(1, 'mentira')}
                                disabled={!!quizAnswers[1]}
                                type="button"
                            >
                                🔴 MENTIRA
                            </button>
                        </div>
                        {quizAnswers[1] && (
                            <div className={styles.quizFeedback}>
                                {quizAnswers[1].isCorrect ? (
                                    <div className={styles.feedbackCorrect}>
                                        <span className={styles.feedbackIcon}>✅</span>
                                        <p>¡Correcto!</p>
                                    </div>
                                ) : (
                                    <div className={styles.feedbackIncorrect}>
                                        <span className={styles.feedbackIcon}>❌</span>
                                        <p>{MYTH_ANSWERS[1].explanation}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Question 2 */}
                    <div className={styles.quizQuestionItem}>
                        <p className={styles.quizStatement}>&quot;La IA puede ayudarme a escribir textos&quot;</p>
                        <div className={styles.quizButtons}>
                            <button 
                                className={`${styles.quizBtn} ${quizAnswers[2] ? styles.disabled : ''}`}
                                onClick={() => handleQuizAnswer(2, 'verdad')}
                                disabled={!!quizAnswers[2]}
                                type="button"
                            >
                                🟢 VERDAD
                            </button>
                            <button 
                                className={`${styles.quizBtn} ${quizAnswers[2] ? styles.disabled : ''}`}
                                onClick={() => handleQuizAnswer(2, 'mentira')}
                                disabled={!!quizAnswers[2]}
                                type="button"
                            >
                                🔴 MENTIRA
                            </button>
                        </div>
                        {quizAnswers[2] && (
                            <div className={styles.quizFeedback}>
                                {quizAnswers[2].isCorrect ? (
                                    <div className={styles.feedbackCorrect}>
                                        <span className={styles.feedbackIcon}>✅</span>
                                        <p>¡Correcto!</p>
                                    </div>
                                ) : (
                                    <div className={styles.feedbackIncorrect}>
                                        <span className={styles.feedbackIcon}>❌</span>
                                        <p>{MYTH_ANSWERS[2].explanation}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Question 3 */}
                    <div className={styles.quizQuestionItem}>
                        <p className={styles.quizStatement}>&quot;La IA siempre dice la verdad&quot;</p>
                        <div className={styles.quizButtons}>
                            <button 
                                className={`${styles.quizBtn} ${quizAnswers[3] ? styles.disabled : ''}`}
                                onClick={() => handleQuizAnswer(3, 'verdad')}
                                disabled={!!quizAnswers[3]}
                                type="button"
                            >
                                🟢 VERDAD
                            </button>
                            <button 
                                className={`${styles.quizBtn} ${quizAnswers[3] ? styles.disabled : ''}`}
                                onClick={() => handleQuizAnswer(3, 'mentira')}
                                disabled={!!quizAnswers[3]}
                                type="button"
                            >
                                🔴 MENTIRA
                            </button>
                        </div>
                        {quizAnswers[3] && (
                            <div className={styles.quizFeedback}>
                                {quizAnswers[3].isCorrect ? (
                                    <div className={styles.feedbackCorrect}>
                                        <span className={styles.feedbackIcon}>✅</span>
                                        <p>¡Correcto!</p>
                                    </div>
                                ) : (
                                    <div className={styles.feedbackIncorrect}>
                                        <span className={styles.feedbackIcon}>❌</span>
                                        <p>{MYTH_ANSWERS[3].explanation}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Ethics Reflection Card */}
            <div className={styles.ethicsCard}>
                <div className={styles.ethicsCardHeader}>
                    <span className={styles.ethicsIcon}>🤔</span>
                    <h3>Momento de reflexión</h3>
                </div>
                <div className={styles.ethicsReflection}>
                    <p>La IA aprende de datos que los humanos creamos. Si esos datos tienen errores o prejuicios, la IA también los tendrá.</p>
                </div>
                <div className={styles.ethicsQuestion}>
                    <span className={styles.ethicsQuestionIcon}>💬</span>
                    <p>¿Cómo crees que esto podría afectar a tu negocio?</p>
                </div>
                <button 
                    className={styles.btnWhatsapp}
                    onClick={() => handleWhatsAppShare('¿Cómo crees que los errores de la IA podrían afectar a un negocio pequeño? 🤔')}
                    type="button"
                >
                    <span className={styles.whatsappIcon}>📱</span>
                    COMPARTIR EN EL GRUPO
                </button>
            </div>

            {/* Success Criteria - Completion */}
            <SuccessCriteria 
                mode="completion"
                completionText={MODULE_COMPLETION}
            />

            {/* Navigation */}
            <div className={styles.navButtons}>
                {!hidePrev && (
                    <button 
                        className={`${styles.btnNav} ${styles.btnPrev}`}
                        onClick={onPrev}
                        type="button"
                    >
                        ← ANTERIOR
                    </button>
                )}
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