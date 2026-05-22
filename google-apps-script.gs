// ============================================================
// Google Apps Script — Web App для приёма заявок с iindev
//
// Инструкция по развёртыванию:
// 1. https://script.google.com → Новый проект
// 2. Вставь этот код в редактор (Code.gs)
// 3. Заполни CONFIG ниже (email, bot token, chat id)
// 4. Сохрани (Ctrl+S)
// 5. Разверни как Web App:
//    - Выполнить от имени: Я
//    - Кому доступно: Все, в том числе анонимные
// 6. Подтверди разрешения (почта + URL-вызовы)
// 7. Скопируй URL Web App и вставь в main.js (GAS_URL)
// ============================================================

const CONFIG = {
  // Куда присылать письмо
  EMAIL_TO: 'iindev@tuta.io',
  EMAIL_SUBJECT: 'Новая заявка с сайта iindev',

  // Telegram-уведомление
  // Токен: у @BotFather → /newbot
  // Chat ID: отправь боту любое сообщение,
  //         потом открой
  //         https://api.telegram.org/bot<TOKEN>/getUpdates
  //         и найди "chat":{"id":123456789
  TG_BOT_TOKEN: 'YOUR_BOT_TOKEN_HERE',
  TG_CHAT_ID: 'YOUR_CHAT_ID_HERE'
};

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents || '{}');
    var name = data.name || '—';
    var phone = data.phone || '—';
    var type = data.type || '—';
    var message = data.message || '';

    // ── Email ──
    var body = 'Заявка с сайта iindev\n\n';
    body += 'Имя: ' + name + '\n';
    body += 'Контакт: ' + phone + '\n';
    body += 'Тип проекта: ' + type + '\n';
    if (message) {
      body += '\nО задаче:\n' + message;
    }

    MailApp.sendEmail({
      to: CONFIG.EMAIL_TO,
      subject: CONFIG.EMAIL_SUBJECT + ' — ' + name,
      body: body,
      name: 'iindev Website'
    });

    // ── Telegram ──
    var tgText = '📬 <b>Заявка с iindev</b>\n\n';
    tgText += '<b>Имя:</b> ' + escapeHtml(name) + '\n';
    tgText += '<b>Контакт:</b> ' + escapeHtml(phone) + '\n';
    tgText += '<b>Тип:</b> ' + escapeHtml(type);
    if (message) {
      tgText += '\n\n<b>О задаче:</b>\n' + escapeHtml(message);
    }

    var tgUrl = 'https://api.telegram.org/bot' + CONFIG.TG_BOT_TOKEN
              + '/sendMessage?chat_id=' + CONFIG.TG_CHAT_ID
              + '&text=' + encodeURIComponent(tgText)
              + '&parse_mode=HTML'
              + '&disable_web_page_preview=true';

    UrlFetchApp.fetch(tgUrl, { muteHttpExceptions: true });

    return jsonResponse({ success: true });

  } catch (err) {
    return jsonResponse({ success: false, error: String(err) });
  }
}

function doOptions() {
  // Preflight CORS — ContentService автоматически добавляет Access-Control-Allow-Origin: *
  return ContentService.createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT);
}

function jsonResponse(obj) {
  var output = ContentService.createTextOutput(JSON.stringify(obj));
  output.setMimeType(ContentService.MimeType.JSON);
  // ContentService автоматически добавляет Access-Control-Allow-Origin: *
  return output;
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
