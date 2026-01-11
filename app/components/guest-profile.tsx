'use client';

import { useState } from "react";
import { QuestionModal } from "./modals/question-modal";
import { Button } from "flowbite-react";
import { buttonTheme } from "../theme/button-theme";

export function QuestProfile() {
    const [openModal, setOpenModal] = useState(false);

    return (
        <div className="container flex flex-col items-center">
            <h2 className="mb-6 text-center text-6xl font-anastasia">Анкета гостя</h2>

            <p className="text-center">
                Пожалуйста, перейдите к анкете, нажав на кнопку ниже.<br />
                Ваши ответы на вопросы помогут на при организации торжества
            </p>
            <p className="text-center mt-6">Будем ждать ответ до 01.04.2025</p>

            <Button size="lg" color="pink" theme={buttonTheme} className="mt-6" onClick={() => setOpenModal(true)}>
                Заполнить
            </Button>

            {openModal && <QuestionModal onClose={() => setOpenModal(false)} />}
        </div>
    );
}
