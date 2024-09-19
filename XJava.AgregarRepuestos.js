window.onload = (event) => {
//const encodeData =window.location.hash.substring(1);
//const data = JSON.parse(atob(encodeData));
//console.log(data);
loadCategories()
};

async function  loadCategories() {
    
    try {
        const response = await fetch('http://localhost:3000/repuestos/listar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'

            },
        });

        const repuestos = await response.json();
        console.log(repuestos)

        const tableBody = document.getElementById('repuestoTBody');
        tableBody.innerHTML = '';
        repuestos.array.forEach(element => {
            const row = document.createElement('tr')

            const idCell =document.createElement('td');
            idCell.textContent =loadCategories.product_id;
            const nameCell =document.createElement('td');
            idCell.textContent =loadCategories.nombre;
            const priceCell =document.createElement('td');
            idCell.textContent =loadCategories.precio;
            
            row.appendChild(idCell);
            row.appendChild(nameCell);
            row.appendChild(priceCell);

            tableBody.appendChild(row);

        });

    } catch (error) {
        console.error(error)
    }
}
