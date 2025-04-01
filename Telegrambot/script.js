const TOKEN = "7990224932:AAGRFRuUuuMQByEljvltdkv2ObX7po9I95I";
const CHAT_ID = "810564522";

function enviarMensaje() {
    const mensaje = document.getElementById("mensaje").value;
    if (!mensaje) {
        alert("Por favor, escribe un mensaje");
        return;
    }

    const url = `https://api.telegram.org/bot${TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(mensaje)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                alert("Mensaje enviado a Telegram 📩");
            } else {
                alert("Error al enviar el mensaje 😞");
            }
        })
        .catch(error => console.error("Error:", error));
}
