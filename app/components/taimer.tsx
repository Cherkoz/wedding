'use client';

import { useState, useEffect } from 'react';

export function Taimer() {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const targetDate = new Date('2026-06-27T00:00:00');
            const now = new Date();
            const difference = targetDate.getTime() - now.getTime();

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="bg-pink-100">
            <div className="container">
                <h2 className="text-4xl text-center mb-6">До нашей встречи</h2>

                <div className="bg-white grid grid-cols-4 rounded-2xl p-6">
                    <div className="flex flex-col items-center">
                        <div className="text-4xl sm:text-6xl font-bold">{timeLeft.days}</div>
                        <div className="text-sm sm:text-base text-gray-600">дней</div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="text-4xl sm:text-6xl font-bold">{timeLeft.hours}</div>
                        <div className="text-sm sm:text-base text-gray-600">часов</div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="text-4xl sm:text-6xl font-bold">{timeLeft.minutes}</div>
                        <div className="text-sm sm:text-base text-gray-600">минут</div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="text-4xl sm:text-6xl font-bold">{timeLeft.seconds}</div>
                        <div className="text-sm sm:text-base text-gray-600">секунд</div>
                    </div>
                </div>

                <p className="mt-6 text-center text-base">
                    С нетерпением ждем,<br />
                    Искренне ваши, Владислав и Валерия
                </p>
            </div>
        </div>
    );
}