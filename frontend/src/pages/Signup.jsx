import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../css/signup.css";

function Signup() {
    const navigate = useNavigate();

    // 🔹 ADDED STATE (no UI change)
    const [formData, setFormData] = useState({
        role: "adopter",
        fullName: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: ""
    });

    // 🔹 HANDLE INPUT (no UI change)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // 🔹 HANDLE SIGNUP (backend connection)
    const handleSignup = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const res = await fetch("http://localhost:5000/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    role: formData.role,
                    name: formData.fullName,
                    email: formData.email,
                    username: formData.username,
                    password: formData.password
                })
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Signup failed");
                return;
            }

            alert("Account created successfully!");
            navigate("/signin");
        }
        catch (err) {
            console.error("Signup error:", err);
            alert("Server error. Please try again.");
        }

    };

    return (
        <div className="container">
            <div className="left-panel">
                <h1>
                    Wagging Tales:
                    <br />
                    Find Your Tale-Wagging Match.
                </h1>
                <p>
                    Where Every Wagging Tale Begins
                    <br />
                    with pets across India
                </p>
            </div>

            <div className="right-panel">
                <h2>Sign Up</h2>

                {/* 🔹 ONLY CHANGE: onSubmit */}
                <form onSubmit={handleSignup}>
                    <div className="role-selection">
                        <p>I want to sign up as:</p>

                        <div className="radio-group">
                            <input
                                type="radio"
                                id="adopter"
                                name="role"
                                value="adopter"
                                checked={formData.role === "adopter"}
                                onChange={handleChange}
                            />
                            <label htmlFor="adopter">Adopter</label>

                            <input
                                type="radio"
                                id="member"
                                name="role"
                                value="member"
                                checked={formData.role === "member"}
                                onChange={handleChange}
                            />
                            <label htmlFor="member">Member</label>
                        </div>
                    </div>

                    <input
                        type="text"
                        placeholder="Full Name"
                        name="fullName"
                        required
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        required
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        required
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        required
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        required
                        onChange={handleChange}
                    />

                    {/* 🔹 LOOKS SAME, NOW SUBMITS FORM */}
                    <button type="submit" className="Create">
                        Create Account
                    </button>
                </form>

                <p className="signin-text">
                    Already have an account?{" "}
                    <Link to="/signin">Sign In</Link>
                </p>
            </div>
        </div>
    );
}

export default Signup;
