// /api/bot.js
export default function handler(req, res) {
  const { message, callback_query } = req.body;
  const chatId = message ? message.chat.id : callback_query.from.id;
  let responseText = '';
  let inlineKeyboard = [];

  if (callback_query) {
    // Si el usuario hace clic en un botón (callback_query)
    const pasillo = callback_query.data;

    // Responder con los productos del pasillo seleccionado
    if (pasillo === 'pasillo1') {
      responseText = 'Pasillo 1:\n- Carne\n- Queso\n- Jamón';
    } else if (pasillo === 'pasillo2') {
      responseText = 'Pasillo 2:\n- Leche\n- Yogurth\n- Cereal';
    } else if (pasillo === 'pasillo3') {
      responseText = 'Pasillo 3:\n- Bebidas\n- Jugos';
    } else if (pasillo === 'pasillo4') {
      responseText = 'Pasillo 4:\n- Pan\n- Pasteles\n- Tortas';
    } else if (pasillo === 'pasillo5') {
      responseText = 'Pasillo 5:\n- Detergente\n- Lavaloza';
    } else {
      responseText = 'Pasillo no encontrado';
    }

    // Asegurarse de responder a Telegram
    const url = `https://api.telegram.org/bot<YOUR_BOT_API_TOKEN>/sendMessage`;
    const body = JSON.stringify({
      chat_id: chatId,
      text: responseText,
    });

    fetch(url, {
      method: 'POST',
      body: body,
      headers: { 'Content-Type': 'application/json' },
    }).then(response => response.json())
      .then(data => {
        console.log('Respuesta enviada:', data);
      })
      .catch(error => {
        console.error('Error al enviar mensaje:', error);
      });

    // Responder a Telegram para confirmar que el callback ha sido procesado
    const callbackUrl = `https://api.telegram.org/bot<YOUR_BOT_API_TOKEN>/answerCallbackQuery`;
    const callbackBody = JSON.stringify({
      callback_query_id: callback_query.id,
      text: '¡Aquí tienes los productos del pasillo seleccionado!',
      show_alert: false,  // Puedes poner true si deseas que se muestre una alerta
    });

    fetch(callbackUrl, {
      method: 'POST',
      body: callbackBody,
      headers: { 'Content-Type': 'application/json' },
    });

    return res.status(200).send('OK');
  }

  // Si el mensaje recibido es "pasillo"
  if (message && message.text.toLowerCase() === 'pasillo') {
    responseText = 'Elige un pasillo para ver los productos disponibles:';

    inlineKeyboard = [
      [
        { text: 'Pasillo 1', callback_data: 'pasillo1' },
        { text: 'Pasillo 2', callback_data: 'pasillo2' },
      ],
      [
        { text: 'Pasillo 3', callback_data: 'pasillo3' },
        { text: 'Pasillo 4', callback_data: 'pasillo4' },
      ],
      [
        { text: 'Pasillo 5', callback_data: 'pasillo5' },
      ]
    ];

    // Enviar el mensaje con botones
    const url = `https://api.telegram.org/bot7990224932:AAGRFRuUuuMQByEljvltdkv2ObX7po9I95I/sendMessage`;
    const body = JSON.stringify({
      chat_id: chatId,
      text: responseText,
      reply_markup: JSON.stringify({ inline_keyboard: inlineKeyboard })
    });

    fetch(url, {
      method: 'POST',
      body: body,
      headers: { 'Content-Type': 'application/json' },
    }).then(response => response.json())
      .then(data => {
        console.log('Respuesta enviada:', data);
      })
      .catch(error => {
        console.error('Error al enviar mensaje:', error);
      });

    return res.status(200).send('OK');
  }

  // Si el mensaje no es "pasillo", responder con un mensaje de ayuda
  res.status(200).send('OK');
}
