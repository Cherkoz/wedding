export function QuestProfile() {
    return (
        <div className="container flex flex-col items-center">
            <h2 className="mb-6 text-center text-6xl font-anastasia">Анкета гостя</h2>

            <p className="text-center">
                Пожалуйста, перейдите к анкете, нажав на кнопку ниже.<br />
                Ваши ответы на вопросы помогут на при организации торжества
            </p>
            <p className="text-center mt-6">Будем ждать ответ до 01.04.2025</p>

            <button className="py-4 px-6 bg-pink-100 rounded-2xl mt-6">Заполнить</button>
        </div>
    );
}
