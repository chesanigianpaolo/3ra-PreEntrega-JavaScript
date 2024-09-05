// (12 productos)
const products = [
    { id: 1, name: 'Hamburguesa', description: 'Hamburguesa completa, con jyq, cebolla, huevo, tomate y lechuga', price: 7500 },
    { id: 2, name: 'Pizza', description: 'Pizza especial de la casa con pepperoni', price: 9700 },
    { id: 3, name: 'Ensalada', description: 'Ensalada fresca con productos seleccionados de la huerta', price: 8000 },
    { id: 4, name: 'Sushi', description: 'Sushi variado con 6 tipos de salsa distintas', price: 12000 },
    { id: 5, name: 'Tacos', description: 'Tacos de carne vacuna, con toque de salsa picante', price: 9000 },
    { id: 6, name: 'Pasta', description: 'Pasta con salsa al dente, especial de la casa', price: 8900 },
    { id: 7, name: 'Sopa', description: 'Sopa de pollo casera con verduras propias', price: 7000 },
    { id: 8, name: 'Burrito', description: 'Burrito con frijoles y carne desmenuzada a la mostaza', price: 9150 },
    { id: 9, name: 'Brownie', description: 'Brownie de chocolate acompañado de crema americana', price: 4000 },
    { id: 10, name: 'Galletas', description: 'Galletas de avena con pasas de uva o chips de chocolate', price: 3500 },
    { id: 11, name: 'Smoothie', description: 'Smoothie de frutas de la temporada a elección', price: 4400 },
    { id: 12, name: 'Wrap', description: 'Wrap de pollo y vegetales seleccionados por el cliente', price: 5860 }
];

// Función para generar las cards de productos
function generateProductCards() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Limpiar contenido actual

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';

        card.innerHTML = `
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>$${product.price.toFixed(2)}</p>
            <div class="quantity-controls">
                <button class="quantity-decrease">-</button>
                <input type="number" class="quantity" value="0" min="0" readonly>
                <button class="quantity-increase">+</button>
            </div>
            <button class="add-to-cart">Agregar al carrito</button>
        `;
        card.querySelector('.quantity-increase').addEventListener('click', () => updateQuantity(card, 1));
        card.querySelector('.quantity-decrease').addEventListener('click', () => updateQuantity(card, -1));
        card.querySelector('.add-to-cart').addEventListener('click', () => addToCart(product, card));
        productList.appendChild(card);
    });
}

// Actualizar la cantidad en la card
function updateQuantity(card, change) {
    const quantityInput = card.querySelector('.quantity');
    let quantity = parseInt(quantityInput.value, 10) + change;
    quantity = Math.max(quantity, 0);
    quantityInput.value = quantity;
}

// Agregar producto al carrito
function addToCart(product, card) {
    const quantity = parseInt(card.querySelector('.quantity').value, 10);
    if (quantity > 0) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const itemIndex = cart.findIndex(item => item.id === product.id);

        if (itemIndex >= 0) {
            cart[itemIndex].quantity += quantity;
        } else {
            cart.push({ ...product, quantity });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    }
}

// Actualizar la visualización del carrito
function updateCartDisplay() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = '';

    let total = 0; // acumula el total

    cartItems.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        const itemTotal = item.price * item.quantity; // recordatorio: calcula el total del item
        total += itemTotal; // recordatorio: suma el total del item al total general
        cartItem.innerHTML = `
            <p>${item.name} (x${item.quantity}) - $${itemTotal.toFixed(2)}</p>
        `;
        cartContainer.appendChild(cartItem);
    });

    // Mostrar el total en el carrito
    const totalElement = document.createElement('div');
    totalElement.className = 'cart-total';
    totalElement.innerHTML = `<p>Total: $${total.toFixed(2)}</p>`;
    cartContainer.appendChild(totalElement);
}

// Finalizar compra
function checkout() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    if (cartItems.length > 0) {
        alert('Compra exitosa. ¡Gracias por su compra!');
        localStorage.removeItem('cart');
        updateCartDisplay();
        resetQuantities(); // Resetear las cantidades en las cards
    } else {
        alert('El carrito está vacío.');
    }
}

// Resetear las cantidades en las cards
function resetQuantities() {
    const quantityInputs = document.querySelectorAll('.product-card .quantity');
    quantityInputs.forEach(input => {
        input.value = 0;
    });
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    generateProductCards();
    updateCartDisplay();

    document.getElementById('checkout-btn').addEventListener('click', checkout);
});
