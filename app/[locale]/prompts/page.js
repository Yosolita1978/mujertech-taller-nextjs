'use client';

import { useRouter } from 'next/navigation';
import Header from '../../components/Header/Header';
import Glossary from '../../components/Glossary/Glossary';
import Notification from '../../components/Notification/Notification';
import Capstone from '../../components/modules/Capstone/Capstone';
import { useNotification } from '../../lib/useNotification';
import { useClarity } from '../../lib/useClarity';
import { useState } from 'react';

export default function PromptsPage() {
    const router = useRouter();
    const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);
    const { notification, showNotification, hideNotification } = useNotification();
    const { trackEvent } = useClarity('capstone');

    const handleBack = () => {
        router.push('/');
    };

    return (
        <>
            <Header onGlossaryOpen={() => setIsGlossaryOpen(true)} />

            <main style={{
                marginTop: '70px',
                padding: '12px',
                paddingBottom: '40px',
                maxWidth: '800px',
                marginLeft: 'auto',
                marginRight: 'auto'
            }}>
                <Capstone
                    onBack={handleBack}
                    showNotification={showNotification}
                    trackEvent={trackEvent}
                />
            </main>

            <Glossary
                isOpen={isGlossaryOpen}
                onClose={() => setIsGlossaryOpen(false)}
            />

            <Notification
                message={notification.message}
                type={notification.type}
                isVisible={notification.isVisible}
                onHide={hideNotification}
            />
        </>
    );
}
