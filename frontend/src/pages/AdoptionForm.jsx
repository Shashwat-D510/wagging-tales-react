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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (signaturePadRef.current.isEmpty()) {
            alert("Please provide your digital signature.");
            return;
        }

        try {
            const form = e.target;

            const payload = {
                user_id: JSON.parse(localStorage.getItem("user"))?.id || null,
                dog_name: selectedDog,

                first_name: form.querySelector('input[type="text"]')?.value || "",
                last_name: form.querySelectorAll('input[type="text"]')[1]?.value || "",
                email: form.querySelector('input[type="email"]')?.value || "",
                phone: form.querySelector('input[type="tel"]')?.value || "",
                address: form.querySelector("textarea")?.value || "",
                city: form.querySelectorAll(".grid-3 input")[0]?.value || "",
                state: form.querySelectorAll(".grid-3 input")[1]?.value || "",
                pincode: form.querySelectorAll(".grid-3 input")[2]?.value || "",

                residence_type: document.querySelector('input[name="res"]:checked')?.value || "",
                ownership: document.querySelector('input[name="own"]:checked')?.value || "",
                total_members: document.querySelectorAll('input[type="number"]')[0]?.value || 0,
                children_below_10: document.querySelectorAll('input[type="number"]')[1]?.value || 0,
                other_pets: document.querySelectorAll('input[type="number"]')[2]?.value || 0,

                adoption_reason: document.querySelectorAll("textarea")[1]?.value || "",
                primary_caregiver: document.querySelectorAll(".grid-2 input")[4]?.value || "",
                vet_contact: document.querySelectorAll(".grid-2 input")[5]?.value || "",

                home_check_agree: document.querySelectorAll('input[type="checkbox"]')[0]?.checked || false,
                vet_care_agree: document.querySelectorAll('input[type="checkbox"]')[1]?.checked || false,
                spay_neuter_agree: document.querySelectorAll('input[type="checkbox"]')[2]?.checked || false,
                info_confirmed: document.querySelectorAll('input[type="checkbox"]')[3]?.checked || false
            };

            const res = await fetch("http://localhost:5000/api/adoption", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Submission failed");
                return;
            }

            document.getElementById("statusMessage").innerText =
                "Application submitted successfully! Please check your email.";

            signaturePadRef.current.clear();
            form.reset();

        } catch (err) {
            console.error(err);
            alert("Server error. Please try again.");
        }
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
                                    <p>We are delighted to help you in your journey to adopt <strong>{selectedDog}</strong>.</p>
                                </div>
                            </header>
                        </div>

                        <main className="contact">

                            {/* ✅ ONLY ADDITION: OUTER FORM */}
                            <form onSubmit={handleSubmit}>

                                {/* EVERYTHING BELOW IS UNCHANGED */}

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
                                        <div className="grid-3">
                                            <div><label>Total Members</label><input type="number" /></div>
                                            <div><label>Children below 10</label><input type="number" /></div>
                                            <div><label>Other Pets</label><input type="number" /></div>
                                        </div>
                                    </div>
                                </section>

                                <section id="commitment">
                                    <h1>Your Commitment</h1>
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

                                    {/* ORIGINAL INNER FORM – UNTOUCHED */}
                                    <form onSubmit={handleSubmit}>
                                        <button type="submit" className="btn-primary">
                                            Submit Adoption Application
                                        </button>
                                    </form>

                                    <div id="statusMessage"></div>
                                </section>

                            </form>
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
