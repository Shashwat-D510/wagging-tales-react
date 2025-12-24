import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/signin.css";

function Signin() {
    const navigate = useNavigate();

    // ✅ ADDED (logic only)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const userBtn = document.getElementById("userBtn");
        const adminBtn = document.getElementById("adminBtn");

        if (!userBtn || !adminBtn) return;

        const handleUserClick = () => {
            userBtn.classList.add("active");
            adminBtn.classList.remove("active");
        };

        const handleAdminClick = () => {
            adminBtn.classList.add("active");
            userBtn.classList.remove("active");
        };

        userBtn.addEventListener("click", handleUserClick);
        adminBtn.addEventListener("click", handleAdminClick);

        return () => {
            userBtn.removeEventListener("click", handleUserClick);
            adminBtn.removeEventListener("click", handleAdminClick);
        };
    }, []);

    // ✅ ADDED (logic only)
    const handleSignin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await fetch("http://localhost:5000/api/auth/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "Invalid credentials");
                return;
            }

            // optional but useful
            localStorage.setItem("user", JSON.stringify(data.user));

            navigate("/home");

        } catch (err) {
            console.error("Signup error:", err);
            setError("Server error. Try again.");
        }
    };

    return (
        <>
            <div className="signin-page">
                <div className="login-container">

                    {/* LEFT PANEL — UNTOUCHED */}
                    <div className="info-panel">
                        <div>
                            <h2>Wagging Tales</h2>
                            <br />
                            <h3>Your New Best Friend Awaits.</h3>
                            <p>
                                Discover loving homes and companions across India with ease.
                            </p>
                        </div>

                        {/* SVG — UNTOUCHED */}
                        <svg className="paw-trail-svg" viewBox="0 0 500 100">
                            <path d="M40,50 C20,30 20,70 40,50 M35,40 C15,20 15,60 35,40 M45,40 C25,20 25,60 45,40 M35,60 C15,80 15,40 35,60 M45,60 C25,80 25,40 45,60" fill="none" strokeWidth="2" strokeLinecap="round" />
                            <path d="M120,60 C100,40 100,80 120,60 M115,50 C95,30 95,70 115,50 M125,50 C105,30 105,70 125,50 M115,70 C95,90 95,50 115,70 M125,70 C105,90 105,50 125,70" fill="none" strokeWidth="2" strokeLinecap="round" />
                            <path d="M200,50 C180,30 180,70 200,50 M195,40 C175,20 175,60 195,40 M205,40 C185,20 185,60 205,40 M195,60 C175,80 175,40 195,60 M205,60 C185,80 185,40 205,60" fill="none" strokeWidth="2" strokeLinecap="round" />
                            <path d="M280,60 C260,40 260,80 280,60 M275,50 C255,30 255,70 275,50 M285,50 C265,30 265,70 285,50 M275,70 C255,90 255,50 275,70 M285,70 C265,90 265,50 285,70" fill="none" strokeWidth="2" strokeLinecap="round" />
                            <path d="M10 90 Q 200 10, 480 90" fill="none" strokeWidth="3" />
                        </svg>
                    </div>

                    {/* RIGHT PANEL — UNTOUCHED STRUCTURE */}
                    <div className="form-panel">
                        <h2>Sign In</h2>
                        <p className="signin-as">Continue as:</p>

                        <div className="toggle-buttons">
                            <button id="userBtn" className="active" type="button">Member</button>
                            <button id="adminBtn" type="button">Adopter</button>
                        </div>

                        {/* 🔴 ONLY CHANGE: form now submits */}
                        <form onSubmit={handleSignin}>
                            <div className="form-group">
                                <label>Email or Username</label>
                                <input
                                    type="text"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            {error && <p style={{ color: "red" }}>{error}</p>}

                            {/* 👇 LOOK SAME, BEHAVES DIFFERENT */}
                            <button type="submit" className="signin-btn">
                                Secure Sign In
                            </button>
                        </form>

                        <p className="signup-link">
                            New to Pet Connect? <Link to="/signup">Create an Account</Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Signin;
