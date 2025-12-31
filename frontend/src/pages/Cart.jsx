import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/cartOnly.css";

function Cart() {
    // ⬇️ changed: added setCartItems
    const [cartItems, setCartItems] = useState(() => {
        return JSON.parse(localStorage.getItem("cart")) || [];
    });

    const total = cartItems.reduce((sum, item) => sum + item.price, 0);

    // ⬇️ added: remove handler
    const removeItem = (indexToRemove) => {
        const updatedCart = cartItems.filter((_, index) => index !== indexToRemove);
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    return (
        <div className="cart-page">

            {/* NAVBAR */}
            <nav className="navbar">
                <div className="nav-left">
                    <ul>
                        <li className="brand">WAGING TALES🐶</li>
                        <li><Link to="/home">Home</Link></li>
                        <li><a href="#contacts">Contacts</a></li>
                        <li><Link to="/foodcart">Food</Link></li>
                        <li><Link to="/cart">Cart</Link></li>
                    </ul>
                </div>

                <div className="nav-right">
                    <Link to="/signin">
                        <button type="button">SIGN IN</button>
                    </Link>
                </div>
            </nav>

            {/* CART ITEMS */}
            <section className="cart-items" id="cartItems">
                {cartItems.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    cartItems.map((item, index) => (
                        <div className="cart-item" key={index}>
                            <span>{item.name}</span>
                            <span>₹{item.price}</span>

                            {/* ⬇️ added: remove button */}
                            <button
                                className="remove-btn"
                                onClick={() => removeItem(index)}
                                title="Remove item"
                            >
                                ❌
                            </button>
                        </div>
                    ))
                )}
            </section>

            {/* TOTAL PRICE */}
            <h2 id="totalPrice">Total: ₹{total}</h2>

            <button className="buy-btn" onClick={() => window.buyNow()}>
                Proceed to Buy
            </button>

            {/* FOOTER */}
            <footer>
                <div className="footer-wrapper">
                    <div className="site-footer" id="contacts">
                        <p>📞 Contact us: +91 98765 43210</p>
                        <p>📧 Email: support@wagingtales.org</p>
                    </div>
                    <div id="cr">
                        <p>© 2025 Waging Tales. All rights reserved.</p>
                    </div>
                </div>
            </footer>

        </div>
    );
}

export default Cart;
