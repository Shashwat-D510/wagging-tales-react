import { Link } from "react-router-dom";
import "../css/signup.css";

function Signup() {
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

                <form>
                    <div className="role-selection">
                        <p>I want to sign up as:</p>

                        <div className="radio-group">
                            <input
                                type="radio"
                                id="adopter"
                                name="user_role"
                                value="adopter"
                                defaultChecked
                            />
                            <label htmlFor="adopter">Adopter</label>

                            <input
                                type="radio"
                                id="member"
                                name="user_role"
                                value="member"
                            />
                            <label htmlFor="member">Member</label>
                        </div>
                    </div>

                    <input type="text" placeholder="Full Name" required />
                    <input type="email" placeholder="Email" required />
                    <input type="text" placeholder="Username" required />
                    <input type="password" placeholder="Password" required />
                    <input type="password" placeholder="Confirm Password" required />

                    {/* React-safe navigation */}
                    <Link
                        to="/signin"
                        className="Create"
                        style={{
                            color: "white",
                            textDecoration: "none",
                            display: "block",
                            textAlign: "center"
                        }}
                    >
                        Create Account
                    </Link>
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
