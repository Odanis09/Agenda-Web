function getContactos() {
    var cuerpo = document.querySelector('#cuerpo tbody');
    fetch("http://www.raydelto.org/agenda.php")
    .then(function(retorno){
        return retorno.json();
    })
    .then(function(contactos){
        // Limpiar 
        cuerpo.innerHTML = "";

        // Iterar
        contactos.forEach(function(contacto) {
            var fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${contacto.nombre}</td>
                <td>${contacto.apellido}</td>
                <td>${contacto.telefono}</td>
            `;
            cuerpo.appendChild(fila);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const newContact = {
            nombre: document.getElementById('nombre').value,
            apellido: document.getElementById('apellido').value,
            telefono: document.getElementById('telefono').value
        };

        fetch("http://www.raydelto.org/agenda.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newContact)
        })
        .then(response => response.json())
        .then(data => {
            // Actualizar la tabla 
            getContactos();
            // Limpiar el formulario 
            contactForm.reset();
        })
        .catch(error => {
            console.error('Error al agregar contacto:', error);
        });
    });

});
