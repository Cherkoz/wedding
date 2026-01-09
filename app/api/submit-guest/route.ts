import { NextRequest, NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

interface GuestFormData {
    fullName: string;
    attendance: 'yes' | 'no';
    guestCount: '1' | 'plus-one';
    alcoholPreferences: string[];
}

const alcoholLabels: Record<string, string> = {
    wine: 'Вино',
    champagne: 'Шампанское',
    vodka: 'Водка',
    whiskey: 'Виски',
    cognac: 'Коньяк',
    beer: 'Пиво',
    none: 'Не употребляю',
};

export async function POST(request: NextRequest) {
    try {
        const data: GuestFormData = await request.json();

        // Валидация данных
        if (!data.fullName || !data.attendance || !data.guestCount || !data.alcoholPreferences?.length) {
            return NextResponse.json(
                { error: 'Все поля обязательны для заполнения' },
                { status: 400 }
            );
        }

        // Проверка переменных окружения
        if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
            console.error('Telegram bot token or chat ID not configured');
            return NextResponse.json(
                { error: 'Сервер не настроен для отправки сообщений' },
                { status: 500 }
            );
        }

        // Форматируем сообщение для Telegram
        const alcoholPrefs = data.alcoholPreferences
            .map(pref => alcoholLabels[pref] || pref)
            .join(', ');

        const attendanceText = data.attendance === 'yes'
            ? '✅ Обязательно буду'
            : '❌ К сожалению, не смогу присутствовать';

        const guestCountText = data.guestCount === '1'
            ? '1 гость'
            : '+1 гость';

        const message = `
🎉 <b>Новая анкета гостя</b>

👤 <b>ФИО:</b> ${data.fullName}
📍 <b>Присутствие:</b> ${attendanceText}
👥 <b>Количество гостей:</b> ${guestCountText}
🍷 <b>Предпочтения по алкоголю:</b> ${alcoholPrefs}
        `.trim();

        // Отправляем сообщение в Telegram
        const telegramResponse = await fetch(
            `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: TELEGRAM_CHAT_ID,
                    text: message,
                    parse_mode: 'HTML',
                }),
            }
        );

        const telegramData = await telegramResponse.json();

        if (!telegramResponse.ok) {
            console.error('Telegram API error:', telegramData);
            return NextResponse.json(
                { error: 'Не удалось отправить сообщение' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { success: true, message: 'Анкета успешно отправлена' },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error submitting guest form:', error);
        return NextResponse.json(
            { error: 'Произошла ошибка при отправке анкеты' },
            { status: 500 }
        );
    }
}
