/**
 * Интеграция с Telegram Bot API
 * ООО "ИДМ" - Металлообработка
 */

const BOT_TOKEN = "8024983218:AAEOib7wTWosOWoB-shxkYmV_4iZMdvE3sk";
const CHAT_ID = "1044406442";

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('tg-form');
    const status = document.getElementById('status');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Сбор данных из полей
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;

            // Формирование сообщения
            let text = `<b>🚀 Новая заявка с сайта ИДМ</b>\n\n`;
            text += `<b>👤 Имя:</b> ${name}\n`;
            text += `<b>📞 Телефон:</b> ${phone}\n`;
            text += `<b>📝 ТЗ:</b> ${message || 'Не указано'}`;

            status.style.color = "#fff";
            status.innerText = "Отправка сообщения...";

            try {
                const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        chat_id: CHAT_ID,
                        parse_mode: 'html',
                        text: text
                    })
                });

                const result = await response.json();

                if (result.ok) {
                    status.innerText = "✅ Заявка отправлена! Менеджер свяжется с вами.";
                    status.style.color = "#4BB543";
                    form.reset();
                } else {
                    throw new Error('Ошибка API');
                }

            } catch (error) {
                console.error('Telegram Error:', error);
                status.innerText = "❌ Ошибка при отправке. Попробуйте еще раз.";
                status.style.color = "#ff4444";
            }
        });
    }
});