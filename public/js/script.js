document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');
    const cardsContainer = document.querySelector('.cards-container');

    searchButton.addEventListener('click', async () => {
        const searchTerm = searchInput.value.trim();
        if (!searchTerm) return;
        try {
            const response = await fetch(`/ads/search?country=${encodeURIComponent(searchTerm)}`);
            if (!response.ok) {
                cardsContainer.innerHTML = '<p>No se encontraron resultados</p>';
                return;
            }
            const data = await response.json();
            if (!Array.isArray(data) || data.length === 0) {
                cardsContainer.innerHTML = '<p>No se encontraron resultados</p>';
                return;
            }
            cardsContainer.innerHTML = data.map(ad => `
                <div class="card">
                    <h3>${ad.title}</h3>
                    <p>${ad.description}</p>
                    <p>País: ${ad.country}</p>
                    <p>Salario: ${ad.salary}</p>
                </div>
            `).join('');
        } catch (error) {
            console.error('Error en la búsqueda:', error);
            cardsContainer.innerHTML = '<p>Error al realizar la búsqueda. Por favor, intente nuevamente.</p>';
        }
    });
});
