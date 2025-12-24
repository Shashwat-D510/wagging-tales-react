import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import SignaturePad from "signature_pad";
import "../css/adoption_form.css";

function AdoptionForm() {
    const location = useLocation();
    const selectedDog = location.state?.dogName || "a furry friend";
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const canvasRef = useRef(null);
    const signaturePadRef = useRef(null);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
        setTimeout(() => {
            window.dispatchEvent(new Event("resize"));
        }, 310);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        signaturePadRef.current = new SignaturePad(canvas, {
            backgroundColor: "#ffffff",
            penColor: "#000000",
        });

        const resizeCanvas = () => {
            const ratio = Math.max(window.devicePixelRatio || 1, 1);
            const width = canvas.parentElement.offsetWidth;
            const data = signaturePadRef.current.toData();

            canvas.width = width * ratio;
            canvas.height = 150 * ratio;
            canvas.style.width = `${width}px`;
            canvas.style.height = "150px";

            const ctx = canvas.getContext("2d");
            ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

            signaturePadRef.current.clear();
            signaturePadRef.current.fromData(data);
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        return () => window.removeEventListener("resize", resizeCanvas);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (signaturePadRef.current.isEmpty()) {
            alert("Please provide your digital signature.");
            return;
        }

        document.getElementById("statusMessage").innerText =
            "Application submitted successfully!";
        signaturePadRef.current.clear();
        e.target.reset();
    };

    return (
        <div className="a-page">
            <div className={`adoption-layout ${!isSidebarOpen ? "sidebar-collapsed" : ""}`}>
                <aside>
                    <a href="#personalinfo">Personal Information</a>
                    <a href="#household">Household Environment</a>
                    <a href="#commitment">Your Commitment</a>
                    <a href="#declaration">Declaration</a>
                </aside>
                <div className="adoption-page">
                    <div className="adoption-main">
                        <nav className="navbar">
                            <div className="nav-left">
                                <ul>
                                    <li>
                                        <button
                                            type="button"
                                            className="sidebar-toggle-btn"
                                            onClick={toggleSidebar}
                                        >
                                            ☰
                                        </button>
                                    </li>
                                    <li className="brand">WAGING TALES 🐶</li>
                                    <li><a href="/home">Home</a></li>
                                    <li><a href="#contacts">Contacts</a></li>
                                </ul>
                            </div>
                            <div className="nav-right">
                                <button>SIGN IN</button>
                            </div>
                        </nav>

                        <div className="form-intro-container">
                            <header className="dog-welcome-banner">
                                <div className="welcome-content">
                                    <h1>Thank you for choosing {selectedDog}!</h1>
                                    <p>We are delighted to help you in your journey to adopt <strong>{selectedDog}</strong>. This application helps us understand your lifestyle and environment to ensure a happy, permanent match for both you and your new companion.</p>
                                </div>
                            </header>
                        </div>

                        <main className="contact">
                            <section id="personalinfo">
                                <h1>Personal Information</h1>
                                <div className="grid-2">
                                    <div>
                                        <label>First Name</label>
                                        <input type="text" required />
                                    </div>
                                    <div>
                                        <label>Last Name</label>
                                        <input type="text" />
                                    </div>
                                </div>
                                <div className="grid-2">
                                    <div>
                                        <label>Email</label>
                                        <input type="email" required />
                                    </div>
                                    <div>
                                        <label>Phone</label>
                                        <input type="tel" required />
                                    </div>
                                </div>
                                <label>Address</label>
                                <textarea rows="3" />
                                <div className="grid-3">
                                    <div><label>City</label><input /></div>
                                    <div><label>State</label><input /></div>
                                    <div><label>Pincode</label><input /></div>
                                </div>
                            </section>

                            <section id="household">
                                <h1>Household Environment</h1>
                                <div className="grid-2">
                                    <div>
                                        <label>Residence Type</label>
                                        <label><input type="radio" name="res" /> Flat</label>
                                        <label><input type="radio" name="res" /> Independent House</label>
                                    </div>
                                    <div>
                                        <label>Own or Rent</label>
                                        <label><input type="radio" name="own" /> Own</label>
                                        <label><input type="radio" name="own" /> Rent</label>
                                    </div>
                                </div>
                                <div className="grid-3">
                                    <div><label>Total Members</label><input type="number" /></div>
                                    <div><label>Children below 10</label><input type="number" /></div>
                                    <div><label>Other Pets</label><input type="number" /></div>
                                </div>
                            </section>

                            <section id="commitment">
                                <h1>Your Commitment</h1>
                                <label>Why do you want to adopt?</label>
                                <textarea rows="3" />
                                <div className="grid-2">
                                    <div><label>Primary Caregiver</label><input /></div>
                                    <div><label>Veterinary Contact</label><input /></div>
                                </div>
                            </section>

                            <section id="declaration">
                                <h1>Declaration & Signature</h1>
                                <label><input type="checkbox" /> Home check may be conducted</label>
                                <label><input type="checkbox" /> Regular vet care</label>
                                <label><input type="checkbox" /> Spay / Neuter agreement</label>
                                <label><input type="checkbox" /> Information is accurate</label>
                                <div className="signature-wrapper">
                                    <canvas ref={canvasRef}></canvas>
                                </div>
                                <button
                                    type="button"
                                    className="btn-secondary"
                                    onClick={() => signaturePadRef.current.clear()}
                                >
                                    Clear Signature
                                </button>
                                <form onSubmit={handleSubmit}>
                                    <button type="submit" className="btn-primary">
                                        Submit Adoption Application
                                    </button>
                                </form>
                                <div id="statusMessage"></div>
                            </section>
                        </main>

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
                </div>
            </div>
        </div>
    );
}

export default AdoptionForm;