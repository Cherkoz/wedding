'use client';

import { useState } from "react";
import { QuestionModal } from "./modals/question-modal";
import { Button, ArrowRightIcon } from "flowbite-react";
import { buttonTheme } from "../theme/button-theme";

export function QuestProfile() {
    const [openModal, setOpenModal] = useState(false);

    return (
        <div className="container flex flex-col items-center">
            <h2 className="mb-6 text-center text-6xl font-anastasia">Анкета гостя</h2>

            <p className="text-center text-xl">
                Пожалуйста, перейдите к анкете, нажав на кнопку ниже.<br />
                Ваши ответы на вопросы помогут на при организации торжества
            </p>

            <div className="mt-6">
                <Button size="lg" color="pink" theme={buttonTheme} onClick={() => setOpenModal(true)}>
                    Заполнить анкету
                </Button>
                <div className="flex justify-center gap-3 animate-bounce text-pink-500 mt-6">
                    <ArrowRightIcon className="w-6 h-6 -rotate-90" />
                    <ArrowRightIcon className="w-6 h-6 -rotate-90" />
                    <ArrowRightIcon className="w-6 h-6 -rotate-90" />
                </div>
            </div>

            <p className="text-center text-lg font-bold mt-6">Будем ждать ответ до 25 мая</p>

            {openModal && <QuestionModal onClose={() => setOpenModal(false)} />}
        </div>
    );
}
