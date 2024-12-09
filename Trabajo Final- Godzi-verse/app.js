const API_KEY = 'b3bfaaeb583bcbb17b9d2ec2cf039e9b';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// Fetch y muestra películas
async function obtenerPeliculasGodzilla() {
  try {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=godzilla&language=es`);
    const data = await response.json();

    const peliculas = data.results;
    const apiDataDiv = document.getElementById('api-data');
    apiDataDiv.innerHTML = peliculas.length
      ? peliculas.map(crearTarjetaPelicula).join('')
      : '<p>No se encontraron películas.</p>';
  } catch (error) {
    console.error('Error al obtener películas:', error);
    document.getElementById('api-data').innerHTML = '<p>Ocurrió un error al cargar las películas.</p>';
  }
}

// Crear tarjeta de película
function crearTarjetaPelicula({ poster_path, title }) {
  const posterUrl = poster_path ? `${IMAGE_BASE_URL}${poster_path}` : 'https://via.placeholder.com/200x300?text=Sin+Imagen';
  return `
    <div class="movie-card">
      <img src="${posterUrl}" alt="${title}">
      <h3>${title}</h3>
    </div>
  `;
}

// Mostrar menú hamburguesa
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });

  obtenerPeliculasGodzilla();
});

// Formulario

const nombre = document.getElementById("nombre");
const mensaje = document.getElementById("mensaje");
const email = document.getElementById("email");
const nombreError = document.getElementById("nombreError");
const mensajeError = document.getElementById("mensajeError");
const emailError = document.getElementById("emailError");
const form = document.getElementById("formulario");
const formSuccess = document.getElementById("formSuccess");

// Validación para el campo "Nombre"
nombre.addEventListener("input", () => {
  if (nombre.value.trim() !== "" && nombre.value.length > 2) {
    nombreError.textContent = "Nombre válido";
    nombreError.style.color = "green";
    nombre.style.borderColor = "green";
  } else {
    nombreError.textContent = "El nombre no puede estar vacío";
    nombreError.style.color = "red";
    nombre.style.borderColor = "red";
  }
});

// Validación para el campo "Mensaje"
mensaje.addEventListener("input", () => {
  if (mensaje.value.trim() !== "") {
    mensajeError.textContent = "Mensaje válido";
    mensajeError.style.color = "green";
    mensaje.style.borderColor = "green";
  } else {
    mensajeError.textContent = "El mensaje no puede estar vacío";
    mensajeError.style.color = "red";
    mensaje.style.borderColor = "red";
  }
});

// Validación para el campo "Correo Electrónico"
email.addEventListener("input", () => {
  if (email.value.includes("@") && email.value.includes(".")) {
    emailError.textContent = "Correo electrónico válido";
    emailError.style.color = "green";
    email.style.borderColor = "green";
  } else {
    emailError.textContent = "El correo es inválido";
    emailError.style.color = "red";
    email.style.borderColor = "red";
  }
});

// Validación al enviar el formulario
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevenir el envío del formulario

  const nombreValido = nombre.value.trim() !== "";
  const mensajeValido = mensaje.value.trim() !== "";
  const emailValido = email.value.includes("@") && email.value.includes(".");

  if (nombreValido && mensajeValido && emailValido) {
    formSuccess.textContent = "Formulario enviado correctamente.";
    formSuccess.style.color = "green";

    // Limpiar los campos del formulario
    nombre.value = "";
    mensaje.value = "";
    email.value = "";

    // Limpiar mensajes de error
    nombreError.textContent = "";
    mensajeError.textContent = "";
    emailError.textContent = "";

    // Resetear estilos
    nombre.style.borderColor = "#ccc";
    mensaje.style.borderColor = "#ccc";
    email.style.borderColor = "#ccc";
  } else {
    formSuccess.textContent = "Por favor, corrige los errores.";
    formSuccess.style.color = "red";
  }
});

// Informacion

const images = [
  {
    src: "imagenes/godzilla1.jpeg",
    title: "Godzilla (1954)",
    description: "El primer Godzilla, presentado en la película de 1954, simboliza los horrores de la guerra y la energía nuclear."
  },
  {
    src: "imagenes/godzilla2.jpg",
    title: "Godzilla (1998)",
    description: "Este Godzilla fue una reinvención estadounidense, mostrando un diseño más ágil y moderno."
  },
  {
    src: "imagenes/godzilla3.jpeg",
    title: "Godzilla (2014)",
    description: "Godzilla renació en 2014, con un diseño que mezcla modernidad y respeto a su origen japonés."
  },
  {
    src: "imagenes/godzilla5.jpg",
    title: "Shin Godzilla (2016)",
    description: "Esta película japonesa presentó un Godzilla más aterrador, destacando su constante evolución y un diseño grotesco que simbolizaba desastres y problemas políticos."
  },
  {
    src: "imagenes/godzilla4.jpeg",
    title: "Godzilla Minus One (2023)",
    description: "Una representación intensa y emotiva que sitúa a Godzilla en una Japón devastada tras la Segunda Guerra Mundial, explorando temas de recuperación y desesperación."
  }
];

let currentIndex = 0;

const imageElement = document.getElementById("godzilla-image");
const infoElement = document.getElementById("godzilla-info");
const prevButton = document.getElementById("prev-btn");
const nextButton = document.getElementById("next-btn");

function updateContent() {
  imageElement.src = images[currentIndex].src;
  infoElement.innerHTML = `
    <h2>${images[currentIndex].title}</h2>
    <p>${images[currentIndex].description}</p>
  `;
}

prevButton.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateContent();
});

nextButton.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  updateContent();
});

// Inicializa el contenido al cargar la página
updateContent();