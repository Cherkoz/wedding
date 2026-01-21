import { NextRequest, NextResponse } from 'next/server';
import guestsData from '@/guests.json';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function POST(request: NextRequest) {
    try {
        const { familyId } = await request.json();

        if (!familyId) {
            return NextResponse.json(
                { error: 'Family ID is required' },
                { status: 400 }
            );
        }

        // Проверка переменных окружения
        if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
            console.error('Telegram bot token or chat ID not configured');
            return NextResponse.json(
                { error: 'Server not configured' },
                { status: 500 }
            );
        }

        // Находим семью по ID
        const family = guestsData.families.find(
            (f) => f.id === familyId
        );

        if (!family) {
            return NextResponse.json(
                { error: 'Family not found' },
                { status: 404 }
            );
        }

        // Форматируем сообщение для Telegram
        const membersList = family.members.map(member => `  • ${member}`).join('\n');

        const message = `
🔔 <b>Визит на сайт свадьбы</b>

👨‍👩‍👧‍👦 <b>Семья:</b> ${family.title}
📋 <b>Члены семьи:</b>
${membersList}

⏰ <b>Время:</b> ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}
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
                { error: 'Failed to send notification' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { success: true },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error tracking visit:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
