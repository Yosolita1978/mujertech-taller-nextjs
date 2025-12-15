import { useState } from 'react';
import styles from './Glossary.module.css';

const GLOSSARY_TERMS = [
    { term: 'App', definition: 'Un programa que vive en tu celular. Ejemplo: WhatsApp es una app.' },
    { term: 'Botón', definition: 'Un cuadro en la pantalla que hace algo cuando lo tocas.' },
    { term: 'ChatGPT', definition: 'Una app de inteligencia artificial que te ayuda a escribir textos. Es gratis.' },
    { term: 'Canva', definition: 'Una app para crear imágenes y diseños bonitos. Tiene versión gratis.' },
    { term: 'Copiar', definition: 'Guardar un texto para usarlo en otro lugar. Tocas y mantienes, luego eliges "Copiar".' },
    { term: 'Descargar', definition: 'Guardar algo de internet en tu celular.' },
    { term: 'IA', definition: 'Inteligencia Artificial. Programas de computadora muy inteligentes que pueden crear textos, imágenes y más.' },
    { term: 'Imagen generada', definition: 'Una imagen creada por la IA, no es una foto real tomada con cámara.' },
    { term: 'Internet', definition: 'La red que conecta computadoras y celulares en todo el mundo. Necesitas internet para usar ChatGPT y Canva.' },
    { term: 'Pegar', definition: 'Poner el texto que copiaste en un lugar nuevo. Tocas y mantienes donde quieres pegar.' },
    { term: 'Prompt', definition: 'El mensaje que le escribes a la IA para pedirle algo. Como cuando le pides algo a alguien por WhatsApp.' },
    { term: 'Redes sociales', definition: 'Apps donde compartes fotos y mensajes con otras personas. Ejemplo: WhatsApp, Instagram, Facebook.' },
    { term: 'Tono', definition: 'La forma en que "suena" un texto. Puede ser amigable, profesional, divertido, etc.' }
];

export default function Glossary({ isOpen, onClose }) {
    const [searchValue, setSearchValue] = useState('');

    const filteredTerms = GLOSSARY_TERMS.filter(item =>
        item.term.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.definition.toLowerCase().includes(searchValue.toLowerCase())
    );

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <>
            <div 
                className={`${styles.overlay} ${isOpen ? styles.active : ''}`}
                onClick={handleOverlayClick}
            />
            <div className={`${styles.panel} ${isOpen ? styles.active : ''}`}>
                <div className={styles.header}>
                    <h2>📖 Palabras que usamos</h2>
                    <button 
                        className={styles.closeBtn}
                        onClick={onClose}
                        type="button"
                    >
                        ✕
                    </button>
                </div>
                <div className={styles.search}>
                    <input
                        type="text"
                        className={styles.searchInput}
                        placeholder="Buscar palabra..."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                </div>
                <div className={styles.content}>
                    {filteredTerms.length === 0 ? (
                        <p className={styles.empty}>No se encontraron palabras</p>
                    ) : (
                        filteredTerms.map((item) => (
                            <div key={item.term} className={styles.item}>
                                <h4>{item.term}</h4>
                                <p>{item.definition}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}