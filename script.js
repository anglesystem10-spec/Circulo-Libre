// Actualiza el año en el pie de página
document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Pequeño efecto al pasar el ratón sobre los artículos
  const articles = document.querySelectorAll(".features article");
  articles.forEach((art) => {
    art.addEventListener("mouseenter", () => {
      art.style.transform = "translateY(-4px)";
      art.style.transition = "transform 0.3s ease";
    });
    art.addEventListener("mouseleave", () => {
      art.style.transform = "translateY(0)";
    });
  });
});