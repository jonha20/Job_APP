document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".search-bar input");
  const searchButton = document.querySelector(".search-bar button");
  const cardsContainer = document.querySelector(".cards-container");

  searchButton.addEventListener("click", async () => {
    const searchTerm = searchInput.value.trim();
    if (!searchTerm) return;
    try {
      const response = await fetch(
        `/ads/search?country=${encodeURIComponent(searchTerm)}`
      );
      if (!response.ok) {
        cardsContainer.innerHTML = "<p>No se encontraron resultados</p>";
        return;
      }
      const data = await response.json();
      if (!Array.isArray(data) || data.length === 0) {
        cardsContainer.innerHTML = "<p>No se encontraron resultados</p>";
        return;
      }
      cardsContainer.innerHTML = data
        .map(
          (ad) => `
                <div class="card">
                    <h3>${ad.title}</h3>
                    <p>${ad.description}</p>
                    <p>País: ${ad.country}</p>
                    <p>Salario: ${ad.salary}</p>
                    <form action="/favorites/add" method="POST">
                        <input type="hidden" name="ad_id" value="${ad.id}">
                        <button type="submit">Añadir a favoritos</button>
                    </form>
                </div>
            `
        )
        .join("");
    } catch (error) {
      console.error("Error en la búsqueda:", error);
      cardsContainer.innerHTML =
        "<p>Error al realizar la búsqueda. Por favor, intente nuevamente.</p>";
    }
  });
  document.querySelectorAll(".add-to-favorites").forEach((button) => {
    button.addEventListener("click", async (event) => {
      const card = event.target.closest(".card"); // Encuentra la tarjeta asociada al botón
      const title = card.querySelector(".title").textContent.trim();
      const description = card.querySelector(".description").textContent.trim();
      const country = card
        .querySelector(".country")
        .textContent.replace("País: ", "")
        .trim();
      const salary = card
        .querySelector(".salary")
        .textContent.replace("Salario: ", "")
        .trim();

      try {
        const response = await fetch("/favorites/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, description, country, salary }),
        });
        alert("Anuncio añadido a favoritos correctamente");
      } catch (error) {
        console.error("Error al añadir a favoritos:", error);
        alert("Error al añadir a favoritos");
      }
    });
  });
});
