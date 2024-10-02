document.addEventListener("DOMContentLoaded", () => {
    const activityText = document.getElementById('activity-text');
    const generateBtn = document.getElementById('generate-btn');
    const filterButtons = document.querySelectorAll('.filter-btn');
    let selectedType = ''; // Variable per emmagatzemar el tipus seleccionat (si n'hi ha)

    // Funció per obtenir una activitat (amb o sense filtre)
    function fetchRandomActivity() {
        // Si hi ha un tipus seleccionat, construïm l'URL amb el paràmetre de tipus
        const url = selectedType
            ? `https://www.boredapi.com/api/activity?type=${selectedType}`
            : 'https://www.boredapi.com/api/activity/';

        fetch(url)
            .then(response => response.json())
            .then(data => {
                // Mostrem la informació de l'activitat
                activityText.textContent = `Activitat: ${data.activity}`;

                // (Opcional) Afegir més informació sobre l'activitat
                console.log(data); // Mostra totes les dades per inspeccionar
            })
            .catch(error => {
                activityText.textContent = 'Error en carregar la nova activitat. Intenta-ho de nou més tard!';
                console.error(error);
            });
    }

    // Canvi de filtre: activa/desactiva el botó de filtre i crida l'API amb el nou tipus
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            selectedType = button.getAttribute('data-type'); // Actualitza el tipus seleccionat
            fetchRandomActivity(); // Obté una nova activitat basada en el filtre
        });
    });

    // Botó de generar nova activitat
    generateBtn.addEventListener('click', fetchRandomActivity);

    // Carregar una activitat per defecte quan es carrega la pàgina
    fetchRandomActivity();
});
