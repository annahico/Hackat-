document.addEventListener("DOMContentLoaded", () => {
    const activityText = document.getElementById('activity-text');
    const generateBtn = document.getElementById('generate-btn');
    const filterButtons = document.querySelectorAll('.filter-btn');
    let selectedType = '';

    // Funció per obtenir una activitat segons el filtre seleccionat
    function fetchActivity() {
        const url = selectedType
            ? `https://www.boredapi.com/api/activity?type=${selectedType}`
            : 'https://www.boredapi.com/api/activity/';

        fetch(url)
            .then(response => response.json())
            .then(data => {
                activityText.textContent = data.activity;
            })
            .catch(error => {
                activityText.textContent = 'Error en carregar la nova activitat. Intenta-ho de nou més tard!';
                console.error(error);
            });
    }

    // Canvi de filtre
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            selectedType = button.getAttribute('data-type');
            fetchActivity();
        });
    });

    // Botó de generar nova activitat
    generateBtn.addEventListener('click', fetchActivity);
});
