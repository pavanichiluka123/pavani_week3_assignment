// Add to Cart with Quantity and Remove Functionality for Multiple Products
let cart = [];
let totalPrice = 0;

document.querySelectorAll(".addToCartBtn").forEach(button => {
    button.addEventListener("click", () => {
        const productName = button.getAttribute("data-product-name");
        const productPrice = parseInt(button.getAttribute("data-product-price"));

        const product = {
            name: productName,
            price: productPrice,
            quantity: 1
        };

        const productExists = cart.find(item => item.name === product.name);

        if (productExists) {
            productExists.quantity += 1; // Increment quantity if product already in cart
        } else {
            cart.push(product);
        }

        updateCart();
    });
});

function updateCart() {
    const cartItems = document.getElementById("cartItems");
    cartItems.innerHTML = "";

    cart.forEach((item, index) => {
        const li = document.createElement("li");

        const productInfo = document.createElement("div");
        productInfo.textContent = `${item.name} - $${item.price} x ${item.quantity}`;

        // Add quantity controls
        const quantityControls = document.createElement("div");
        quantityControls.className = "quantity-controls";

        const increaseBtn = document.createElement("button");
        increaseBtn.textContent = "+";
        increaseBtn.addEventListener("click", () => increaseQuantity(index));

        const decreaseBtn = document.createElement("button");
        decreaseBtn.textContent = "-";
        decreaseBtn.addEventListener("click", () => decreaseQuantity(index));

        quantityControls.appendChild(decreaseBtn);
        quantityControls.appendChild(increaseBtn);

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.addEventListener("click", () => removeItem(index));

        li.appendChild(productInfo);
        li.appendChild(quantityControls);
        li.appendChild(removeBtn);

        cartItems.appendChild(li);
    });

    totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    document.getElementById("totalPrice").textContent = totalPrice;
}

function increaseQuantity(index) {
    cart[index].quantity += 1;
    updateCart();
}

function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        removeItem(index);
    }
    updateCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}
