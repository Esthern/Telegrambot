// /api/bot.js
export default function handler(req, res) {
  const { message } = req.body;
  const chatId = message.chat.id;
  const text = message.text ? message.text.toLowerCase() : '';
  const callbackQuery = req.body.callback_query;
  
  let responseText = '';
  let inlineKeyboard = [];

  // Si el usuario hace clic en un botón de pasillo
  if (callbackQuery) {
    const pasillo = callbackQuery.data;

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

    // Responde con los productos del pasillo seleccionado
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

    return res.status(200).send('OK');
  }

  // Si el usuario envía un mensaje de texto
  if (text === 'pasillo') {
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
  } else {
    responseText = '¿Te gustaría saber qué productos hay en algún pasillo? Escribe "pasillo" para empezar.';
  }

  // Enviar un mensaje con botones al usuario
  const url = `https://api.telegram.org/bot<YOUR_BOT_API_TOKEN>/sendMessage`;
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

  res.status(200).send('OK'); // Responde con un 200 OK para confirmar que el webhook fue procesado
}
