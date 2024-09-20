document.addEventListener('DOMContentLoaded', async () => {
    const productForm = document.getElementById('productForm');
    const loginMessage = document.getElementById('loginMessage');
    const apiUrl = 'https://repuestos-backend.vercel.app';

    // Manejo del formulario de agregar repuesto
    if (productForm) {
        productForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            const id = document.getElementById('id').value;
            const name = document.getElementById('name').value;
            const price = document.getElementById('price').value;

            try {
                const response = await fetch(`${apiUrl}/repuestos/registrar`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, price, id })
                });
                const data = await response.json();
                if (response.ok) {
                    loginMessage.textContent = 'Registro Exitoso';
                    loginMessage.style.color = 'green';
                    window.location.href = '/AgregarRepuesto.html'; // Verifica la ruta
                } else {
                    loginMessage.textContent = data.message || 'Error al agregar el repuesto';
                    loginMessage.style.color = 'red';
                }
            } catch (error) {
                console.log(error);
                loginMessage.textContent = 'Hubo un Error al agregar el repuesto';
                loginMessage.style.color = 'red';
            }
        });
    }

    // Cargar
