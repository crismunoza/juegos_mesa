// Validación del formulario
(function () {
    'use strict'
   //seleccionar todos los formularios con la clase needs-validation
    var forms = document.querySelectorAll('.needs-validation')

   //for each para recorrer los formularios
    Array.prototype.slice.call(forms)
        //recorrer los formularios
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                if (form.password.value !== form.confirmPassword.value) {
                    form.confirmPassword.setCustomValidity("Las contraseñas no coinciden.");
                } else {
                    form.confirmPassword.setCustomValidity("");
                }

                if (new Date().getFullYear() - new Date(form.birthdate.value).getFullYear() < 13) {
                    form.birthdate.setCustomValidity("Debe tener al menos 13 años.");
                } else {
                    form.birthdate.setCustomValidity("");
                }

                form.classList.add('was-validated')
            }, false)
        })
})();

//actualizacion de las imagenes en minutos
document.addEventListener('DOMContentLoaded', function() {
    const section = document.querySelector('section.mt-5.pt-5'); 
    const cards = section.querySelectorAll('.card'); 

    
    function updateTimestampForCard(card) {
        const imageElement = card.querySelector('.col-md-4 img'); 
        const timestampElement = card.querySelector('.text-body-secondary'); 

        const currentTime = new Date();

        const timeElapsed = currentTime - imageElement.dataset.lastModified;

        if (isNaN(timeElapsed) || timeElapsed < 60000) {
            timestampElement.textContent = 'se actualizó recién';
        } else {
            const minutesAgo = Math.floor(timeElapsed / 60000);
            const formattedTimestamp = `actualizado hace ${minutesAgo} minuto${minutesAgo > 1 ? 's' : ''}`;
            timestampElement.textContent = formattedTimestamp;
        }
    }
    cards.forEach(card => {
        const imageElement = card.querySelector('.col-md-4 img');
        imageElement.dataset.lastModified = new Date().getTime(); 
        updateTimestampForCard(card);
    });

    cards.forEach(card => {
        const imageElement = card.querySelector('.col-md-4 img');
        imageElement.addEventListener('load', () => {
            imageElement.dataset.lastModified = new Date().getTime(); 
            updateTimestampForCard(card);
        });
    });
});
