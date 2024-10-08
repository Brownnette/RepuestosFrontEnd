/*Agregar repuesto*/
window.onload = async () => {
    const productForm = document.getElementById('productForm');
    const loginMessage = document.getElementById('loginMessage');
    const apiUrl = 'https://repuestos-backend.vercel.app'
    ;

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
                    window.location.href = '/AgregarRepuesto.html';
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

    // Clase
    await loadlistar(); // Llama a la función para cargar la lista de repuestos
};

async function loadlistar() {
    const apiUrl = 'https://repuestos-backend.vercel.app';
    try {
        const response = await fetch(`${apiUrl}/repuestos/listar`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const repuestos = await response.json();
        console.log(repuestos);

        const tableBody = document.getElementById('repuestoTBody');
        tableBody.innerHTML = '';

        repuestos.forEach(element => {
            const row = document.createElement('tr');

            const idCell = document.createElement('td');
            idCell.textContent = element.product_id;

            const nameCell = document.createElement('td');
            nameCell.textContent = element.nombre;

            const priceCell = document.createElement('td');
            priceCell.textContent = element.precio;

            const actionCell = document.createElement('td');

            const modifyButton = document.createElement('button');
            modifyButton.textContent = 'Modificar';
            modifyButton.className = 'modify_button'; // Cambiar a className
            modifyButton.onclick = () => modifyCategory(element.product_id); // Usar product_id

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.className = 'delete_button'; // Cambiar a className
            deleteButton.onclick = () => deleteCategory(element.product_id); // Usar product_id

            actionCell.appendChild(modifyButton);
            actionCell.appendChild(deleteButton);

            row.appendChild(idCell);
            row.appendChild(nameCell);
            row.appendChild(priceCell);
            row.appendChild(actionCell);

            tableBody.appendChild(row);
        });

    } catch (error) {
        console.log(error);
    }
}

async function deleteCategory(id) {
    const apiUrl = 'https://repuestos-backend.vercel.app';
    try {
        const response = await fetch(`${apiUrl}/repuestos/eliminar/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        
        const data = await response.json();
        if (response.ok) {
            window.alert('Categoría eliminada exitosamente');
            loadlistar(); // Recargar la lista después de eliminar
        } else {
            window.alert(data.message || 'Categoría no fue eliminada');
        }
    } catch (error) {
        console.log(error);
        window.alert('Tenemos problemas técnicos');
    }
}
