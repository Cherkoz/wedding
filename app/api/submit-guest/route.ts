import { NextRequest, NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

interface GuestData {
    fullName: string;
    attendance: 'yes' | 'no';
    eventAttendance?: 'zags' | 'banquet' | 'both';
    alcoholPreferences: string[];
}

interface GuestFormData {
    guests: GuestData[];
}

const alcoholLabels: Record<string, string> = {
    redWine: 'Вино красное',
    whiteWine: 'Вино белое',
    champagne: 'Шампанское',
    vodka: 'Водка',
    whiskey: 'Виски',
    cognac: 'Коньяк',
    beer: 'Пиво',
    none: 'Не употребляю',
};

const eventAttendanceLabels: Record<string, string> = {
    zags: 'Только в ЗАГСе',
    banquet: 'Только на банкете',
    both: 'И в ЗАГСе, и на банкете',
};

export async function POST(request: NextRequest) {
    try {
        const data: GuestFormData = await request.json();

        // Валидация данных
        if (!data.guests || !Array.isArray(data.guests) || data.guests.length === 0) {
            return NextResponse.json(
                { error: 'Данные гостей отсутствуют' },
                { status: 400 }
            );
        }

        // Валидация каждого гостя
        for (const guest of data.guests) {
            if (!guest.fullName || !guest.attendance || !guest.alcoholPreferences?.length) {
                return NextResponse.json(
                    { error: 'Все поля обязательны для заполнения для каждого гостя' },
                    { status: 400 }
                );
            }
            // Если гость планирует присутствовать, должно быть указано где именно
            if (guest.attendance === 'yes' && !guest.eventAttendance) {
                return NextResponse.json(
                    { error: 'Укажите где планируете присутствовать для каждого гостя' },
                    { status: 400 }
                );
            }
        }

        // Проверка переменных окружения
        if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
            console.error('Telegram bot token or chat ID not configured');
            return NextResponse.json(
                { error: 'Сервер не настроен для отправки сообщений' },
                { status: 500 }
            );
        }

        // Форматируем сообщение для Telegram с информацией о всех гостях
        const guestsInfo = data.guests.map((guest, index) => {
            const alcoholPrefs = guest.alcoholPreferences
                .map(pref => alcoholLabels[pref] || pref)
                .join(', ');

            const attendanceText = guest.attendance === 'yes'
                ? '✅ Обязательно буду'
                : '❌ К сожалению, не смогу присутствовать';

            const eventAttendanceText = guest.attendance === 'yes' && guest.eventAttendance
                ? `\n🎯 <b>Где:</b> ${eventAttendanceLabels[guest.eventAttendance] || guest.eventAttendance}`
                : '';

            return `
<b>Гость ${index + 1}:</b>
👤 <b>ФИО:</b> ${guest.fullName}
📍 <b>Присутствие:</b> ${attendanceText}${eventAttendanceText}
🍷 <b>Предпочтения по алкоголю:</b> ${alcoholPrefs}
            `.trim();
        }).join('\n\n');

        const message = `
🎉 <b>Новая анкета гостя${data.guests.length > 1 ? ' (семья)' : ''}</b>

${guestsInfo}
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
