import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import dogs from "../data/DogListing";
import "../css/dog_listing.css";

function DogListing() {
    const [activeDog, setActiveDog] = useState(null);

    useEffect(() => {
        document.body.style.overflow = activeDog ? "hidden" : "auto";
    }, [activeDog]);

    return (
        <div className="dog-page">
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
                    <Link to="/signin"><button>SIGN IN</button></Link>
                </div>
            </nav>

            {/* DOG GRID */}
            <div className="dog-container">
                {dogs.map(dog => (
                    <div className="dog-card" key={dog.id}>
                        <img className="card-img" src={dog.image} alt={dog.name} />
                        <div className="card-body">
                            <h3 className="dog-short">{dog.name} – {dog.breed}</h3>

                            {/* SINGLE-LINE PREVIEW */}
                            <p className="card-preview">{dog.description}</p>
                        </div>
                        <button onClick={() => setActiveDog(dog)}>
                            More details
                        </button>
                    </div>
                ))}
            </div>

            {/* OVERLAY */}
            {activeDog && (
                <div className="overlay">
                    <div className="overlay-content">

                        {/* CLOSE */}
                        <button
                            className="close-btn"
                            onClick={() => setActiveDog(null)}
                        >
                            ×
                        </button>

                        <div className="overlay-body">
                            <img src={activeDog.image} alt={activeDog.name} />

                            <div className="overlay-text">
                                <h2>{activeDog.name}</h2>
                                <p><strong>Breed:</strong> {activeDog.breed}</p>
                                <p><strong>Age:</strong> {activeDog.age}</p>
                                <p><strong>Gender:</strong> {activeDog.gender}</p>
                                <p><strong>Location:</strong> {activeDog.location}</p>

                                <p className="overlay-desc">{activeDog.details}</p>

                                <div className="traits">
                                    {activeDog.traits.map(t => (
                                        <span key={t}>{t}</span>
                                    ))}
                                </div>

                                {/* ADOPTION BUTTON */}
                                <Link to="/form" state={{ dogName: activeDog.name }}>
                                    <button className="adopt-btn">Start Adoption Process</button>
                                </Link>

                            </div>
                        </div>
                    </div>
                </div>
            )
            }

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
        </div >
    );
}

export default DogListing;
