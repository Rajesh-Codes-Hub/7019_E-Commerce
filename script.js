// Fetch products from Fake Store API
const productContainer = document.getElementById('product-list');
const cartCountElement = document.getElementById('cart-count');
const cartContainer = document.getElementById('cart-container');
const cartItemsContainer = document.getElementById('cart-items');
let cart = [];

// Function to fetch and display products
function fetchProducts() {
  fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(products => {
      products.forEach(product => {
        const productCard = `
          <div class="product">
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>$${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
          </div>
        `;
        productContainer.innerHTML += productCard;
      });
    })
    .catch(error => console.log('Error fetching products:', error));
}

// Function to add product to cart
function addToCart(productId) {
  fetch(`https://fakestoreapi.com/products/${productId}`)
    .then(response => response.json())
    .then(product => {
      cart.push(product);
      updateCartCount();
      showToast(`${product.title} has been added to the cart`);
    })
    .catch(error => console.log('Error adding to cart:', error));
}

// Function to update the cart count
function updateCartCount() {
  cartCountElement.textContent = cart.length;
}

// Function to show cart modal
function showCart() {
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>Your cart is empty!</p>';
  } else {
    cartItemsContainer.innerHTML = cart.map((item, index) => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.title}">
        <p>${item.title} - $${item.price}</p>
        <button class="remove-button" onclick="removeFromCart(${index})">&times;</button>
      </div>
    `).join('');
  }
  cartContainer.style.display = 'block';
}

// Function to hide cart modal
function hideCart() {
  cartContainer.style.display = 'none';
}

// Function to remove item from cart
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartCount();
  showCart();
}

// Function to purchase items
function purchaseItems() {
  if (cart.length > 0) {
    alert('Thank you for your purchase!');
    cart = [];
    updateCartCount();
    showCart();
    hideCart();
  } else {
    alert('Your cart is empty!');
  }
}

// Function to show toast notification
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = 'show';
  setTimeout(() => { toast.className = toast.className.replace('show', ''); }, 3000);
}

// Initialize products on page load
document.addEventListener('DOMContentLoaded', fetchProducts);
