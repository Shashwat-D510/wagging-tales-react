import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/foodCart.css";
import { addToCart } from "../data/cartUtils.js";

function FoodCart() {
    const [message, setMessage] = useState("");

    const handleAddToCart = (name, price, id) => {
        addToCart(name, price, id);
        setMessage("Item added to cart");
        setTimeout(() => setMessage(""), 2000);
    };

    return (
        <div className="food-cart-page">

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

            {/* MESSAGE (OPTION A) */}
            {message && (
                <div className="cart-message">
                    {message}
                </div>
            )}

            {/* PRODUCTS */}
            <section className="products">

                <div className="product">
                    <img src="/src/images/pedigree_dog_food.png" alt="Pedigree Dog Food" />
                    <h3>Pedigree Dog Food</h3>
                    <p>Price (500g): ₹250</p>
                    <select id="p1">
                        <option value="500">500g</option>
                        <option value="1000">1kg</option>
                    </select>
                    <button onClick={() => handleAddToCart("Pedigree Dog Food", 250, "p1")}>
                        Add to Cart
                    </button>
                </div>

                <div className="product">
                    <img src="/src/images/royal_canin_dog_food.png" alt="Royal Canin Dog Food" />
                    <h3>Royal Canin Dog Food</h3>
                    <p>Price (500g): ₹350</p>
                    <select id="p2">
                        <option value="500">500g</option>
                        <option value="1000">1kg</option>
                    </select>
                    <button onClick={() => handleAddToCart("Royal Canin Dog Food", 350, "p2")}>
                        Add to Cart
                    </button>
                </div>

                <div className="product">
                    <img src="/src/images/fresh_dog_food.png" alt="Fresh Dog Food" />
                    <h3>Fresh Dog Food</h3>
                    <p>Price (500g): ₹220</p>
                    <select id="p3">
                        <option value="500">500g</option>
                        <option value="1000">1kg</option>
                    </select>
                    <button onClick={() => handleAddToCart("Fresh Dog Food", 220, "p3")}>
                        Add to Cart
                    </button>
                </div>

                <div className="product">
                    <img src="/src/images/pro_plan_dog_food.png" alt="Pro Plan Dog Food" />
                    <h3>Pro Plan Dog Food</h3>
                    <p>Price (500g): ₹300</p>
                    <select id="p4">
                        <option value="500">500g</option>
                        <option value="1000">1kg</option>
                    </select>
                    <button onClick={() => handleAddToCart("Pro Plan Dog Food", 300, "p4")}>
                        Add to Cart
                    </button>
                </div>

                <div className="product">
                    <img src="/src/images/hill_science_diet_dog.png" alt="Hill Science Diet" />
                    <h3>Hill Science Diet</h3>
                    <p>Price (500g): ₹400</p>
                    <select id="p5">
                        <option value="500">500g</option>
                        <option value="1000">1kg</option>
                    </select>
                    <button onClick={() => handleAddToCart("New Science Diet", 400, "p5")}>
                        Add to Cart
                    </button>
                </div>

                <div className="product">
                    <img src="/src/images/kimchi_cat_food.png" alt="Kimchi Cat Food" />
                    <h3>Kimchi Cat Food</h3>
                    <p>Price (500g): ₹180</p>
                    <select id="p6">
                        <option value="500">500g</option>
                        <option value="1000">1kg</option>
                    </select>
                    <button onClick={() => handleAddToCart("Kimchi Cat Food", 180, "p6")}>
                        Add to Cart
                    </button>
                </div>

                <div className="product">
                    <img src="/src/images/royal_canin_cat_food.png" alt="Royal Canin Cat" />
                    <h3>Royal Canin Cat</h3>
                    <p>Price (500g): ₹280</p>
                    <select id="p8">
                        <option value="500">500g</option>
                        <option value="1000">1kg</option>
                    </select>
                    <button onClick={() => handleAddToCart("Royal Canin Cat", 280, "p8")}>
                        Add to Cart
                    </button>
                </div>

                <div className="product">
                    <img src="/src/images/zupreem_bird_food.png" alt="ZuPreem Bird Food" />
                    <h3>ZuPreem Bird Food</h3>
                    <p>Price (500g): ₹120</p>
                    <select id="p9">
                        <option value="500">500g</option>
                        <option value="1000">1kg</option>
                    </select>
                    <button onClick={() => handleAddToCart("ZuPreem Bird Food", 120, "p9")}>
                        Add to Cart
                    </button>
                </div>

            </section>

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

export default FoodCart;
