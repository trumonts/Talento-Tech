export const actualizarContador = (carrito) => {
  const contador = document.getElementById("contador-carrito");
  if (contador) {
    contador.textContent = carrito.length;
  }
};

export const mostrarMensaje = (texto) => {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.classList.add("toast-container");
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.classList.add("toast-item");
  toast.textContent = texto;

  container.appendChild(toast);

  // Se destruye automáticamente en 3 segundos
  setTimeout(() => {
    toast.remove();
  }, 3000);
};