const products = [
    { id: 1, name: "iPhone 14", price: 80000, category: "mobiles", img: "images/iphone.jpg" },
    { id: 2, name: "Samsung Galaxy S23", price: 75000, category: "mobiles", img: "images/samsung.jpg" },
    { id: 3, name: "Dell XPS 15", price: 120000, category: "laptops", img: "images/dell.jpg" },
    { id: 4, name: "HP Spectre", price: 110000, category: "laptops", img: "images/hp.jpg" },
    { id: 5, name: "AirPods Pro", price: 20000, category: "accessories", img: "images/airpods.jpg" },
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderProducts(category = "all") {
    const productList = document.getElementById("product-list");
    if (!productList) return;  // If on cart page, don't render products

    productList.innerHTML = "";
    const filteredProducts = category === "all" ? products : products.filter(p => p.category === category);

    filteredProducts.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.className = "product";
        productDiv.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Price: Rs. ${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productDiv);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existing = cart.find(p => p.id === productId);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

function updateCart() {
    localStorage.setItem("cart", JSON.stringify(cart));

    const cartCount = document.getElementById("cart-count");
    if (cartCount) {
        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    if (!cartItems || !cartTotal) return;

    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        cartItems.innerHTML += `
            <div class="cart-item">
                <img src="${item.img}" alt="${item.name}">
                <p>${item.name} x${item.quantity} - Rs. ${item.price * item.quantity}</p>
                <button onclick="removeFromCart(${item.id})">❌</button>
            </div>
        `;
    });

    cartTotal.textContent = total;
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function clearCart() {
    cart = [];
    updateCart();
}

function checkout() {
    alert("Thank you for your purchase!");
    clearCart();
}

// Initial Rendering
renderProducts();
updateCart();
