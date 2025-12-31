export function addToCart(name, price, selectId) {
    const qty = document.getElementById(selectId)?.value || 500;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({
        name,
        price,
        quantity: qty
    });

    localStorage.setItem("cart", JSON.stringify(cart));

}

export function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

export function clearCart() {
    localStorage.removeItem("cart");
}
