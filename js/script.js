const botonCarrito = document.getElementById('carrito');
const menu = document.getElementById('menu');
const cartItems = document.getElementById('cart-items');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
const totalPrice = document.getElementById('total-price');

// Inicializar el carrito en localStorage si no existe
if (!localStorage.getItem('carrito')) {
    localStorage.setItem('carrito', JSON.stringify([]));
}

let carrito = JSON.parse(localStorage.getItem('carrito'));

function actualizarCarrito() {
    cartItems.innerHTML = ''; 
    let total = 0;

    carrito.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${item.name} - $${item.price} <button class="remove-item" data-index="${index}">Eliminar</button>`;
        cartItems.appendChild(li);
        total += parseFloat(item.price);
    });

    totalPrice.textContent = `Total: $${total.toFixed(2)}`;

    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Añadir eventos de clic a los botones de eliminación
    const removeButtons = document.querySelectorAll('.remove-item');
    removeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            carrito.splice(index, 1);
            actualizarCarrito();
        });
    });
}

function agregarAlCarrito(id, name, price) {
    carrito.push({ id, name, price });
    actualizarCarrito();
}

botonCarrito.addEventListener('click', () => {
    menu.style.display = menu.style.display === 'none' || menu.style.display === '' ? 'block' : 'none';
});

const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const id = event.target.getAttribute('data-id');
        const name = event.target.getAttribute('data-name');
        const price = event.target.getAttribute('data-price');
        agregarAlCarrito(id, name, price);
    });
});

vaciarCarritoBtn.addEventListener('click', () => {
    carrito = [];
    actualizarCarrito();
});

actualizarCarrito();