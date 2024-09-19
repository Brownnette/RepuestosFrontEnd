console.log('Archivo JavaScript cargado correctamente.');

function validarFormulario(event) {
    console.log('Función validarFormulario llamada');
    event.preventDefault(); // Evita el envío del formulario para validación

    var nombre = document.getElementById('nombre').value;
    var email = document.getElementById('email').value;
    var errorMensaje = '';

    if (nombre === '') {
        errorMensaje += 'El nombre es obligatorio.<br>';
    }
    if (email === '') {
        errorMensaje += 'El email es obligatorio.<br>';
    }

    // Mostrar los mensajes de error
    document.getElementById('errores').innerHTML = errorMensaje;

    // Si no hay mensajes de error, permitir el envío del formulario
    if (errorMensaje === '') {
        alert('Formulario enviado correctamente.');
    }
}

// Vincular la función de validación al evento de envío del formulario
document.getElementById('registroForm').addEventListener('submit', validarFormulario);
