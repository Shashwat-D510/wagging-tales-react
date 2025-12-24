import { Link } from "react-router-dom";
import "../css/style.css";

function Home() {
    return (
        <div className="home-page">

            {/* NAVBAR */}
            <nav className="navbar">
                <div className="nav-left">
                    <ul>
                        <li className="brand">WAGING TALES🐶</li>
                        <li><Link to="/home">Home</Link></li>
                        <li><a href="#contacts">Contacts</a></li>
                    </ul>
                </div>

                <div className="nav-right">
                    <Link to="/signin">
                        <button type="button">SIGN IN</button>
                    </Link>
                </div>
            </nav>

            {/* HERO SECTION */}
            <div className="t1">
                <div>
                    <h1 style={{ color: "#34495e" }}>
                        Sometimes one's we rescue, can be the reason for joy!
                    </h1>
                    <p style={{ color: "red" }}>BRING JOY HOME💖</p>
                </div>

                <img src="/src/images/1.png" alt="Rescue pets" />
            </div>

            {/* ADOPTION GRID */}
            <div className="grid">
                <div className="t4">
                    <img src="/src/images/dog.png" alt="Dog" />
                    <Link to="/dogs">
                        <button className="bottom-button">Adopt a dog</button>
                    </Link>
                </div>

                <div className="t4">
                    <img src="/src/images/cat.png" alt="Cat" />
                    <button className="bottom-button">Adopt a cat</button>
                </div>

                <div className="t4">
                    <img src="/src/images/macaw.png" alt="Bird" />
                    <button className="bottom-button">Adopt a bird</button>
                </div>
            </div>

            {/* TESTIMONIALS */}
            <h2 className="Past">Some of our happy tales!..</h2>

            <div id="past">
                <img
                    src="/src/images/past.png"
                    alt="Happy adoption"
                />

                <p>
                    "I never thought a dog could change my life so deeply. Rex came into my world
                    when I needed a friend the most. From morning jogs to lazy Sundays, he’s been
                    my constant companion. Adopting him was the best decision I’ve ever made."
                    <br />— John, Bengaluru.
                    <br /><br />
                    "Snowball was shy and quiet when I first met her. Now she curls up beside me
                    every evening, purring like a little engine. She’s not just a pet—she’s family."
                    <br />— Linda, Pune
                </p>
            </div>

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

export default Home;
