import './globals.css';

export const metadata = {
    title: 'MujerTech - Taller Introductorio de IA',
    description: 'Aprende a usar Inteligencia Artificial para tu negocio',
};

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
};

export default function RootLayout({ children }) {
    return (
        <html lang="es">
            <body suppressHydrationWarning>
                {children}
            </body>
        </html>
    );
}