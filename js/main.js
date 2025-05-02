// Datos de destinos (podrías mover esto a un archivo destinations.js)
const destinations = [
    {
      id: 1,
      name: "Bariloche",
      price: 1200,
      category: "montaña",
      description: "Nieve, chocolate y paisajes increíbles.",
      image: "../imgenes/bariloche/bari4edit.jpeg"
    },
    {
      id: 2,
      name: "Cataratas del Iguazú",
      price: 900,
      category: "selva",
      description: "Una de las maravillas naturales del mundo.",
      image: "../imagenes/iguazu/iguazu4edit.jpeg"
    },
    // Añade más destinos...
  ];
  
  // Variables globales
  let cart = [];
  
  // DOM Elements
  const destinationsContainer = document.getElementById('destinos-container');
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalElement = document.getElementById('cart-total');
  const checkoutBtn = document.getElementById('checkout-btn');
  
  // Inicialización
  document.addEventListener('DOMContentLoaded', () => {
    renderDestinations(destinations);
    setupEventListeners();
  });
  
  // Renderizar destinos
  function renderDestinations(destinations) {
    destinationsContainer.innerHTML = '';
    
    destinations.forEach(destination => {
      const card = document.createElement('div');
      card.className = 'col-md-6 col-lg-4 mb-4';
      card.innerHTML = `
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
      `;
      destinationsContainer.appendChild(card);
    });
  }
  
  // Manejar carrito
  function addToCart(destinationId) {
    const destination = destinations.find(d => d.id === destinationId);
    if (!destination) return;
  
    const existingItem = cart.find(item => item.id === destinationId);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({...destination, quantity: 1});
    }
    
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
        <button class="remove-item" data-id="${item.id}">
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
  function setupEventListeners() {
    // Agregar al carrito
    destinationsContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('add-to-cart')) {
        const destinationId = parseInt(e.target.getAttribute('data-id'));
        addToCart(destinationId);
      }
    });
  
    // Eliminar del carrito
    cartItemsContainer.addEventListener('click', (e) => {
      if (e.target.closest('.remove-item')) {
        const destinationId = parseInt(e.target.closest('.remove-item').getAttribute('data-id'));
        cart = cart.filter(item => item.id !== destinationId);
        updateCart();
      }
    });
  
    // Checkout
    checkoutBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        alert('Tu carrito está vacío');
        return;
      }
      alert(`Reserva confirmada! Total: $${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)}`);
      cart = [];
      updateCart();
    });
  }