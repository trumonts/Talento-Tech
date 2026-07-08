import { agregarAlCarrito } from "./funcionesCarrito.js";

document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("contenedor-productos-dummy");
  if (!contenedor) return;

  // Obtengo Categorias skincare y belleza
  const categorias = ["beauty", "skin-care", "fragrances"];

  // Fetc categorias
  Promise.all(
    categorias.map((cat) =>
      fetch(`https://dummyjson.com/products/category/${cat}`).then((response) =>
        response.json()
      )
    )
  )
    .then((results) => {
      contenedor.innerHTML = ""; // Limpio por si acaso

      // Combinamos los productos de todas las categorías
      const todosProductos = results.flatMap((data) => data.products);

      // Mostramos un máximo de 9 productos
      todosProductos.slice(0, 9).forEach((prod) => {
        // Creamos la tarjeta usando tus clases de style.css
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("producto");

        // Traducimos o adaptamos la categoría del producto para mostrarla
        const catNombre = prod.category === "skin-care" ? "Skin Care" : (prod.category === "beauty" ? "Belleza" : "Fragancias");

        tarjeta.innerHTML = `
          <div class="infoProducto">
              <div class="infoProductoBody">
                  <img src="${prod.thumbnail}" alt="${prod.title}">
                  <p class="nombreProducto"><strong>${prod.title}</strong></p>
                  <p class="descripcionProducto">${prod.description.substring(0, 50)}...</p>
              </div>
              <div class="infoProductoFooter">
                  <p class="preciProducto">$${prod.price}</p>
                  <button class="addCart">
                    Añadir al carrito
                  </button>
              </div>
          </div>
        `;

        // Buscamos el botón dentro de la tarjeta recién creada para asignarle el evento
        const boton = tarjeta.querySelector(".addCart");

        // Preparamos el objeto del producto con la estructura que espera tu storage
        const productoParaCarrito = {
          id: `dummy-${prod.id}`,
          nombre: prod.title,
          precio: prod.price,
          img: prod.thumbnail,
          detalles: { "Categoría": catNombre }
        };

        boton.addEventListener("click", () => {
          agregarAlCarrito(productoParaCarrito);
        });

        contenedor.appendChild(tarjeta);
      });
    })
    .catch((error) => console.log("Error al cargar la API de cosméticos:", error));
});