export default async function handler(req, res) {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    const mensaje = req.query.text || "Mensaje de prueba";

    if (!token || !chatId) {
        return res.status(500).json({ success: false, message: "Faltan variables de entorno" });
    }

    const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(mensaje)}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.ok) {
            res.status(200).json({ success: true, message: "Mensaje enviado" });
        } else {
            res.status(500).json({ success: false, message: "Error al enviar el mensaje" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Error en la solicitud a Telegram" });
    }
}
