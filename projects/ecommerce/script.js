// ===== PRODUCT DATA =====
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 49.99,
        image: "https://picsum.photos/seed/headphone/300/200",
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 89.99,
        image: "https://picsum.photos/seed/watch/300/200",
    },
    {
        id: 3,
        name: "Laptop Backpack",
        price: 39.99,
        image: "https://picsum.photos/seed/backpack/300/200",
    },
    {
        id: 4,
        name: "Bluetooth Speaker",
        price: 29.99,
        image: "https://picsum.photos/seed/speaker/300/200",
    },
    {
        id: 5,
        name: "Phone Case",
        price: 14.99,
        image: "https://picsum.photos/seed/case/300/200",
    },
    {
        id: 6,
        name: "USB-C Hub",
        price: 34.99,
        image: "https://picsum.photos/seed/hub/300/200",
    },
];

// ===== STATE =====
let cart = [];
const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const productGrid = document.getElementById("product-grid");

// ===== RENDER PRODUCTS =====
const renderProducts = () => {
    productGrid.innerHTML = products
        .map(
            (product, index) => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" loading="lazy" />
            <h3>${product.name}</h3>
            <p class="price">$${product.price.toFixed(2)}</p>
            <button class="add-btn" data-id="${product.id}">Add to Cart</button>
        </div>
    `,
        )
        .join("");

    // Add event listeners to all "Add to Cart" buttons
    document.querySelectorAll(".add-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const id = parseInt(e.target.dataset.id);
            addToCart(id);
        });
    });
};

// ===== ADD TO CART =====
const addToCart = (id) => {
    const product = products.find((p) => p.id === id);
    const existing = cart.find((item) => item.id === id);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
};

// ===== REMOVE FROM CART =====
const removeFromCart = (id) => {
    cart = cart.filter((item) => item.id !== id);
    updateCartUI();
};

// ===== UPDATE CART UI =====
const updateCartUI = () => {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Update cart items list
    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
        cartTotal.textContent = "0.00";
        return;
    }

    cartItems.innerHTML = cart
        .map(
            (item) => `
        <div class="cart-item">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
            </div>
            <button onclick="removeFromCart(${item.id})">✕</button>
        </div>
    `,
        )
        .join("");

    // Update total
    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
    );
    cartTotal.textContent = total.toFixed(2);
};

// ===== CART TOGGLE =====
document.getElementById("cart-icon").addEventListener("click", () => {
    document.getElementById("cart-sidebar").classList.toggle("open");
    document.getElementById("overlay").classList.toggle("active");
});

document.getElementById("close-cart").addEventListener("click", closeCart);
document.getElementById("overlay").addEventListener("click", closeCart);

function closeCart() {
    document.getElementById("cart-sidebar").classList.remove("open");
    document.getElementById("overlay").classList.remove("active");
}

// ===== CHECKOUT =====
document.getElementById("checkout-btn").addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
    );
    alert(`✅ Thank you for your purchase! Total: $${total.toFixed(2)}`);
    cart = [];
    updateCartUI();
    closeCart();
});

// ===== INIT =====
renderProducts();
