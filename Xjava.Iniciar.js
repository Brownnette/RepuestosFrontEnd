window.onload = async () => {
    const loginForm = document.getElementById('loginForm');
    const loginMessage = document.getElementById('loginMessage');
    const registerForm = document.getElementById('registerForm');
    const registerMessage = document.getElementById('registerMessage');

    // Manejo del formulario de login
    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const user = document.getElementById('user').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:3000/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('authToken', data.token); // Guardar el token
                loginMessage.textContent = 'Login Exitoso';
                loginMessage.style.color = 'green';
                window.location.href = '/AgregarRepuesto.html';
            } else {
                loginMessage.textContent = data.message || 'Error en el Login';
                loginMessage.style.color = 'red';
            }
        } catch (error) {
            console.log(error);
            loginMessage.textContent = 'Hubo un Error en el Login';
            loginMessage.style.color = 'red';
        }
    });

    // Manejo del formulario de registro
    registerForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const new_user = document.getElementById('new_user').value;
        const new_password = document.getElementById('new_password').value;
        const new_email = document.getElementById('new_email').value;

        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch('http://localhost:3000/users/registrarUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ new_user, new_password, new_email })
            });

            const data = await response.json();

            if (response.ok) {
                registerMessage.textContent = 'Registro Exitoso';
                registerMessage.style.color = 'green';
            } else if (response.status === 401 || response.status === 403) {
                await refreshToken(); // Intenta refrescar el token
                // Reintenta la solicitud después de refrescar el token
                await registerForm.submit();
            } else {
                registerMessage.textContent = data.message || 'Error en el registro';
                registerMessage.style.color = 'red';
            }
        } catch (error) {
            console.log(error);
            registerMessage.textContent = 'Hubo un Error en el registro';
            registerMessage.style.color = 'red';
        }
    });

    async function refreshToken() {
        try {
            const response = await fetch('http://localhost:3000/users/refreshToken', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ /* Datos necesarios para el refresh token */ })
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('authToken', data.token); // Guardar el nuevo token
            } else {
                window.location.href = '/login'; // Redirigir al login si falla
            }
        } catch (error) {
            console.log('Error al refrescar el token:', error);
            window.location.href = '/login'; // Redirigir al login si ocurre un error
        }
    }
};
