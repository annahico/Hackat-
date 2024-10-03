document.addEventListener("DOMContentLoaded", () => {
    const activityText = document.getElementById('activity-text');
    const generateBtn = document.getElementById('generate-btn');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const body = document.body;
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

    // Canvia entre dark mode i light mode
    darkModeToggle.addEventListener("click", () => {
        body.classList.toggle("dark-mode");

        // Canviar estils dels elements
        const elements = document.querySelectorAll("#activity-card, #activity-result, .filter-btn, header, footer");
        elements.forEach(element => element.classList.toggle("dark-mode"));

        // Canvi del text del botó
        darkModeToggle.textContent = body.classList.contains("dark-mode") ? "Light Mode" : "Dark Mode";
    });

    // Carregar una activitat per defecte quan es carrega la pàgina
    fetchRandomActivity();
});
