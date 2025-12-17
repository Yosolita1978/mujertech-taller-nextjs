import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import GoogleAnalytics from './components/GoogleAnalytics/GoogleAnalytics';
import StructuredData from './components/StructuredData/StructuredData';

export const metadata = {
    title: {
        default: 'MujerTech - Taller Introductorio de IA para Emprendedoras',
        template: '%s | MujerTech',
    },
    description: 'Aprende a usar Inteligencia Artificial para tu negocio. Taller gratuito de 45 minutos diseñado para mujeres emprendedoras en Latinoamérica. Aprende ChatGPT, Canva y más.',
    keywords: [
        'inteligencia artificial',
        'IA para emprendedoras',
        'mujeres emprendedoras',
        'ChatGPT',
        'Canva',
        'negocios latinoamérica',
        'taller gratis',
        'emprendimiento femenino',
        'marketing digital',
        'redes sociales',
        'pequeños negocios',
    ],
    authors: [{ name: 'MujerTech' }],
    creator: 'MujerTech',
    publisher: 'MujerTech',
    icons: {
        icon: '/favicon.ico',
        apple: '/apple-touch-icon.png',
    },
    openGraph: {
        type: 'website',
        locale: 'es_LA',
        url: 'https://intro.mujertech.org',
        siteName: 'MujerTech',
        title: 'Taller Gratuito de IA para Emprendedoras | MujerTech',
        description: 'Aprende a usar ChatGPT y Canva para tu negocio en solo 45 minutos. Taller diseñado especialmente para mujeres emprendedoras en Latinoamérica.',
        images: [
            {
                url: 'https://intro.mujertech.org/images/og-image.png',
                width: 1200,
                height: 630,
                alt: 'MujerTech - Taller de Inteligencia Artificial para Emprendedoras',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Taller Gratuito de IA para Emprendedoras | MujerTech',
        description: 'Aprende a usar ChatGPT y Canva para tu negocio en solo 45 minutos. ¡Es gratis!',
        images: ['https://intro.mujertech.org/images/og-image.png'],
        creator: '@mujertech',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    alternates: {
        canonical: 'https://intro.mujertech.org',
    },
    category: 'education',
};

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    themeColor: '#2c8e9c',
};

export default function RootLayout({ children }) {
    return (
        <html lang="es">
            <head>
                <link rel="manifest" href="/manifest.json" />
                <StructuredData />
            </head>
            <body suppressHydrationWarning>
                <GoogleAnalytics />
                {children}
                <Analytics />
            </body>
        </html>
    );
}