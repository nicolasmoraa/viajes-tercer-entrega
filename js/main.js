// Verifica si hay destinos en localStorage y los carga
const destinosFavoritos = JSON.parse(localStorage.getItem("destinos")) || [];
const listaDestinos = document.getElementById("lista-destinos");
const inputDestino = document.getElementById("nuevo-destino");
const btnAgregar = document.getElementById("agregar-destino");
const filtro = document.getElementById("filtro-destinos");

// Función para renderizar la lista de destinos
function actualizarLista() {
    listaDestinos.innerHTML = "";
    destinosFavoritos.forEach((destino, index) => {
        const li = document.createElement("li");
        li.textContent = destino;
        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.onclick = () => eliminarDestino(index);
        li.appendChild(btnEliminar);
        listaDestinos.appendChild(li);
    });
}

// Agregar destino a la lista y guardarlo en localStorage
btnAgregar.addEventListener("click", () => {
    const destino = inputDestino.value.trim();
    if (destino) {
        destinosFavoritos.push(destino);
        localStorage.setItem("destinos", JSON.stringify(destinosFavoritos));
        actualizarLista();
        inputDestino.value = "";
    }
});

// Eliminar destino de la lista y actualizar localStorage
function eliminarDestino(index) {
    destinosFavoritos.splice(index, 1);
    localStorage.setItem("destinos", JSON.stringify(destinosFavoritos));
    actualizarLista();
}

// Filtrar destinos en tiempo real
filtro.addEventListener("input", () => {
    const valorFiltro = filtro.value.toLowerCase();
    Array.from(listaDestinos.children).forEach((li) => {
        li.style.display = li.textContent.toLowerCase().includes(valorFiltro) ? "" : "none";
    });
});

// Cargar lista al inicio
actualizarLista();

// Simulación de reservas
document.getElementById("reservar").addEventListener("click", () => {
    const destinoReserva = document.getElementById("destino-reserva").value;
    const fechaReserva = document.getElementById("fecha-reserva").value;
    if (destinoReserva && fechaReserva) {
        localStorage.setItem("reserva", JSON.stringify({ destino: destinoReserva, fecha: fechaReserva }));
        alert(`Reserva guardada: ${destinoReserva} para el ${fechaReserva}`);
    }
});
