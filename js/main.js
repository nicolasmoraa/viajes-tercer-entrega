// Variables globales
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Elementos del DOM
const destinationsContainer = document.getElementById('destinos-container');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');

// Cargar destinos con Fetch
async function loadDestinations() {
  try {
    const response = await fetch('./data/destinations.json');
    if (!response.ok) throw new Error("Error al cargar destinos");
    return await response.json();
  } catch (error) {
    console.error(error);
    Swal.fire({
      title: 'Error',
      text: 'No se pudieron cargar los destinos',
      icon: 'error'
    });
    return [];
  }
}

// Renderizar destinos
function renderDestinations(destinations) {
  destinationsContainer.innerHTML = '';
  destinations.forEach(destination => {
    const card = `
      <div class="col-md-6 col-lg-4 mb-4">
        <div class="card destination-card h-100">
          <img src="${destination.image}" class="card-img-top" alt="${destination.name}">
          <div class="card-body">
            <h5 class="card-title">${destination.name}</h5>
            <p class="card-text">${destination.description}</p>
            <p class="text-primary fw-bold">$${destination.price}</p>
            <button class="btn btn-primary add-to-cart" data-id="${destination.id}">
              Agregar a reserva
            </button>
          </div>
        </div>
      </div>
    `;
    destinationsContainer.innerHTML += card;
  });
}

// Manejar el carrito con LocalStorage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(destinationId, destinations) {
  const destination = destinations.find(d => d.id === destinationId);
  if (!destination) return;

  const existingItem = cart.find(item => item.id === destinationId);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({...destination, quantity: 1});
  }
  
  saveCart();
  updateCart();
}

function updateCart() {
  renderCartItems();
  updateCartTotal();
}

function renderCartItems() {
  cartItemsContainer.innerHTML = '';
  cart.forEach(item => {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.innerHTML = `
      <span>${item.name} x${item.quantity}</span>
      <span>$${item.price * item.quantity}</span>
      <button class="btn btn-sm btn-danger remove-item" data-id="${item.id}">
        <i class="fas fa-trash"></i>
      </button>
    `;
    cartItemsContainer.appendChild(li);
  });
}

function updateCartTotal() {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  cartTotalElement.textContent = `$${total}`;
}

// Event Listeners
function setupEventListeners(destinations) {
  destinationsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
      const destinationId = parseInt(e.target.getAttribute('data-id'));
      addToCart(destinationId, destinations);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: '¡Agregado al carrito!',
        showConfirmButton: false,
        timer: 1000
      });
    }
  });

  cartItemsContainer.addEventListener('click', (e) => {
    if (e.target.closest('.remove-item')) {
      const destinationId = parseInt(e.target.closest('.remove-item').getAttribute('data-id'));
      cart = cart.filter(item => item.id !== destinationId);
      saveCart();
      updateCart();
    }
  });

  checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Carrito vacío',
        text: 'Agrega destinos para continuar'
      });
      return;
    }

    Swal.fire({
      title: '¿Confirmar reserva?',
      html: `Total: <b>$${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)}</b>`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Pagar',
      cancelButtonText: 'Seguir viendo'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: '¡Reserva confirmada!',
          text: 'Recibirás un email con los detalles',
          icon: 'success'
        });
        cart = [];
        saveCart();
        updateCart();
      }
    });
  });
}

// Inicialización
document.addEventListener('DOMContentLoaded', async () => {
  const destinations = await loadDestinations();
  if (destinations.length > 0) {
    renderDestinations(destinations);
    setupEventListeners(destinations);
  }
  updateCart(); // Cargar carrito guardado
});