'use client';

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { QuestionModal } from "./modals/question-modal";
import { Button, ArrowRightIcon } from "flowbite-react";

interface Family {
    id: number;
    title: string;
    members: string[];
}

export function QuestProfile() {
    const [openModal, setOpenModal] = useState(false);
    const [guestNames, setGuestNames] = useState<string[]>([]);
    const searchParams = useSearchParams();

    useEffect(() => {
        const familyId = searchParams?.get('familyId');
        if (familyId) {
            fetch(`/api/get-family?familyId=${familyId}`)
                .then(response => response.json())
                .then((data: Family) => {
                    if (data.members) {
                        setGuestNames(data.members);
                    }
                })
                .catch(error => {
                    console.error('Error loading family data:', error);
                });
        }
    }, [searchParams]);

    return (
        <div className="container flex flex-col items-center">
            <h2 className="mb-6 text-center text-6xl font-anastasia">Анкета гостя</h2>

            <p className="text-center text-2xl">
                Пожалуйста, перейдите к анкете, нажав на кнопку ниже.<br />
                Ваши ответы на вопросы помогут на при организации торжества
            </p>

            <div className="mt-6">
                <Button size="lg" color="brown" onClick={() => setOpenModal(true)}>
                    Заполнить анкету
                </Button>
                <div className="flex justify-center gap-3 animate-bounce text-second mt-6">
                    <ArrowRightIcon className="w-6 h-6 -rotate-90" />
                    <ArrowRightIcon className="w-6 h-6 -rotate-90" />
                    <ArrowRightIcon className="w-6 h-6 -rotate-90" />
                </div>
            </div>

            <p className="text-center text-2xl font-bold mt-6">Будем ждать ответ до 15 мая</p>

            {openModal && <QuestionModal onClose={() => setOpenModal(false)} guestNames={guestNames} />}
        </div>
    );
}
