document.addEventListener("DOMContentLoaded", () => {
    const activityText = document.getElementById('activity-text');
    const generateBtn = document.getElementById('generate-btn');
    const filterButtons = document.querySelectorAll('.filter-btn');
    let selectedType = ''; // Variable per emmagatzemar el tipus seleccionat (si n'hi ha)

    // Funció per obtenir una activitat aleatòria
    function fetchRandomActivity() {
        const url = 'https://bored-api.appbrewery.com/random';

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

    // Canvi de filtre - Actualment, el botó de filtre no afecta l'API aleatòria
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            selectedType = button.getAttribute('data-type');
            fetchRandomActivity();
        });
    });

    // Botó de generar nova activitat
    generateBtn.addEventListener('click', fetchRandomActivity);

    // Carregar una activitat per defecte quan es carrega la pàgina
    fetchRandomActivity();
});
