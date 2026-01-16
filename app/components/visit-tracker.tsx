'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export function VisitTracker() {
    const searchParams = useSearchParams();

    useEffect(() => {
        const familyId = searchParams.get('familyId');

        if (familyId) {
            // Отправляем уведомление о визите семьи
            fetch('/api/track-visit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ familyId }),
            }).catch((error) => {
                console.error('Error tracking visit:', error);
            });
        }
    }, [searchParams]);

    return null;
}
