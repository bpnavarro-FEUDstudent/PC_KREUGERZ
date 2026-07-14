// ===== Product Info (read from HTML instead of hardcoded) =====
const purchaseBoxEl = document.getElementById("Purchase_Box");

const PRODUCT = purchaseBoxEl ? {
    id: purchaseBoxEl.dataset.id,
    name: purchaseBoxEl.dataset.name,
    price: parseFloat(purchaseBoxEl.dataset.price)
} : null;

//alert("test") just to check if the js is connected to the html

// ===== Elements =====
const qtyInput = document.getElementById("Qty_Input");
const decreaseBtn = document.getElementById("Decrease_Qty");
const increaseBtn = document.getElementById("Increase_Qty");
const addToCartBtn = document.getElementById("Add_To_Cart");
const buyNowBtn = document.getElementById("Buy_Now");

// ===== Cart Helpers =====
function getCart() {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// ===== Product Page Logic (only runs if these elements + PRODUCT exist) =====
if (qtyInput && decreaseBtn && increaseBtn && addToCartBtn && buyNowBtn && PRODUCT) {

    decreaseBtn.addEventListener("click", () => {
        let qty = parseInt(qtyInput.value);
        if (qty > 1) {
            qtyInput.value = qty - 1;
        }
    });

    increaseBtn.addEventListener("click", () => {
        let qty = parseInt(qtyInput.value);
        qtyInput.value = qty + 1;
    });

    addToCartBtn.addEventListener("click", () => {
        const qty = parseInt(qtyInput.value);
        let cart = getCart();
        const existingItem = cart.find(item => item.id === PRODUCT.id);

        if (existingItem) {
            existingItem.quantity += qty;
        } else {
            cart.push({
                id: PRODUCT.id,
                name: PRODUCT.name,
                price: PRODUCT.price,
                quantity: qty
            });
        }

        saveCart(cart);
        qtyInput.value = 1;
        alert(PRODUCT.name + " added to cart!");
    });

    buyNowBtn.addEventListener("click", () => {
        const qty = parseInt(qtyInput.value);
        let cart = getCart();
        const existingItem = cart.find(item => item.id === PRODUCT.id);

        if (existingItem) {
            existingItem.quantity += qty;
        } else {
            cart.push({
                id: PRODUCT.id,
                name: PRODUCT.name,
                price: PRODUCT.price,
                quantity: qty
            });
        }

        saveCart(cart);
        window.location.href = "cart.html"; // change to your actual purchase page filename
    });
}

// ===== Purchase Page Logic (only runs if these elements exist) =====
const cartItemsEl = document.getElementById("cartItems");
const subtotalEl = document.getElementById("subtotal");
const totalEl = document.getElementById("total");
const checkoutBtn = document.getElementById("checkoutBtn");

if (cartItemsEl && subtotalEl && totalEl && checkoutBtn) {

    function updateSummary() {
        const cart = getCart();

        let totalItems = 0;
        let subtotal = 0;

        cart.forEach(item => {
            totalItems += item.quantity;
            subtotal += item.price * item.quantity;
        });

        cartItemsEl.textContent = totalItems;
        subtotalEl.textContent = "₱" + subtotal.toFixed(2);
        totalEl.textContent = "₱" + subtotal.toFixed(2);

        checkoutBtn.disabled = totalItems === 0;
    }

    updateSummary();

    checkoutBtn.addEventListener("click", () => {
        alert("Purchase complete! Thank you for your order.");
        localStorage.removeItem("cart");
        updateSummary();
    });

    const emptyCartBtn = document.getElementById("Empty_Cart_Btn");

    if (emptyCartBtn) {
        emptyCartBtn.addEventListener("click", () => {
            localStorage.removeItem("cart");
            updateSummary();
        });
    }
}