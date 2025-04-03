console.log("El script se ha cargado correctamente");

const TOKEN = "7990224932:AAGRFRuUuuMQByEljvltdkv2ObX7po9I95I";
const CHAT_ID = "810564522";

function enviarMensaje() {
    console.log("Función enviarMensaje llamada"); // Verificar que la función se ejecuta

    const mensaje = document.getElementById("mensaje").value;
    if (!mensaje) {
        alert("Por favor, escribe un mensaje");
        return;
    }

    const url = `https://api.telegram.org/bot${TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(mensaje)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log("Respuesta de Telegram:", data); // Ver la respuesta en consola
            if (data.ok) {
                alert("Mensaje enviado a Telegram 📩");
            } else {
                alert("Error al enviar el mensaje 😞");
            }
        })
        .catch(error => console.error("Error en la petición:", error));
}

// Asegurar que el botón esté listo cuando cargue la página
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM completamente cargado ✅");
    const botonEnviar = document.getElementById("enviar");
    
    if (botonEnviar) {
        botonEnviar.addEventListener("click", enviarMensaje);
    } else {
        console.error("Error: No se encontró el botón con id 'enviar'");
    }
});
