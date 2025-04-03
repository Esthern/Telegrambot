// /api/bot.js
export default function handler(req, res) {
  const { message } = req.body;  // El mensaje del usuario
  const chatId = message.chat.id; // ID del chat para responder al usuario
  const text = message.text.toLowerCase(); // Convertimos el mensaje a minúsculas

  let responseText = '';

  // Responder según el pasillo mencionado en el mensaje
  if (text.includes('pasillo 1')) {
    responseText = `Pasillo 1:\n- Carne\n- Queso\n- Jamón`;
  } else if (text.includes('pasillo 2')) {
    responseText = `Pasillo 2:\n- Leche\n- Yogurth\n- Cereal`;
  } else if (text.includes('pasillo 3')) {
    responseText = `Pasillo 3:\n- Bebidas\n- Jugos`;
  } else if (text.includes('pasillo 4')) {
    responseText = `Pasillo 4:\n- Pan\n- Pasteles\n- Tortas`;
  } else if (text.includes('pasillo 5')) {
    responseText = `Pasillo 5:\n- Detergente\n- Lavaloza`;
  } else {
    responseText = '¿En qué pasillo te gustaría saber más? Puedes preguntar por Pasillo 1, Pasillo 2, etc.';
  }

  // Enviar la respuesta al usuario en Telegram
  const url = `https://api.telegram.org/bot7990224932:AAGRFRuUuuMQByEljvltdkv2ObX7po9I95I/sendMessage`;
  const body = JSON.stringify({
    chat_id: chatId,
    text: responseText,
  });

  // Enviar la respuesta con fetch
  fetch(url, {
    method: 'POST',
    body: body,
    headers: { 'Content-Type': 'application/json' },
  })
    .then(response => response.json())
    .then(data => {
      console.log('Respuesta enviada:', data);
    })
    .catch(error => {
      console.error('Error al enviar mensaje:', error);
    });

  res.status(200).send('OK'); // Responde con un 200 OK para confirmar que el webhook fue procesado
}
