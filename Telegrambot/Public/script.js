console.log("El script se ha cargado correctamente ");

document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM completamente cargado ✅");

    // Seleccionar el botón y el campo de texto
    const botonEnviar = document.getElementById("enviar");
    const inputMensaje = document.getElementById("mensaje");

    if (!botonEnviar) {
        console.error("Error: No se encontró el botón con id 'enviar'");
        return;
    }

    // Definir la función de envío
    function enviarMensaje() {
        console.log("Función enviarMensaje llamada ✅");

        const mensaje = inputMensaje.value.trim();
        if (!mensaje) {
            alert("Por favor, escribe un mensaje.");
            return;
        }

        const TOKEN = "7990224932:AAGRFRuUuuMQByEljvltdkv2ObX7po9I95I";
        const CHAT_ID = "810564522";
        const url = `https://api.telegram.org/bot${TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(mensaje)}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log("Respuesta de Telegram:", data);
                if (data.ok) {
                    alert("Mensaje enviado a Telegram 📩");
                    inputMensaje.value = ""; // Limpiar el campo después de enviar
                } else {
                    alert("Error al enviar el mensaje 😞");
                }
            })
            .catch(error => {
                console.error("Error en la petición:", error);
                alert("No se pudo enviar el mensaje.");
            });
    }

    // Asignar el evento de clic al botón
    botonEnviar.addEventListener("click", enviarMensaje);
});
