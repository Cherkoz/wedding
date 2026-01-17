'use client';

import Image from 'next/image';
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
        <div className="bg-[url('/assets/images/bg/s3.webp')] bg-cover bg-bottom">
            {/* <Image className="absolute w-full" src="/assets/images/bg/s3.webp" width={200} height={200} alt="" /> */}

            <div className="container">
                <h2 className="text-6xl font-anastasia text-center mb-6">До нашей встречи</h2>

                <div className="bg-white grid grid-cols-4 rounded-2xl p-6 max-w-[800px] mx-auto">
                    <div className="flex flex-col items-center">
                        <div className="text-4xl sm:text-6xl font-bold">{timeLeft.days}</div>
                        <div className="text-base sm:text-lg">дней</div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="text-4xl sm:text-6xl font-bold">{timeLeft.hours}</div>
                        <div className="text-base sm:text-lg">часов</div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="text-4xl sm:text-6xl font-bold">{timeLeft.minutes}</div>
                        <div className="text-base sm:text-lg">минут</div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="text-4xl sm:text-6xl font-bold">{timeLeft.seconds}</div>
                        <div className="text-base sm:text-lg">секунд</div>
                    </div>
                </div>

                <p className="mt-6 text-center text-2xl font-bold">
                    С нетерпением ждем,<br />
                    Искренне ваши, Владислав и Валерия
                </p>
            </div>
        </div>
    );
}