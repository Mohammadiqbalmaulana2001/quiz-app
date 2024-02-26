import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null); 

    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                userCredential.user.getIdToken().then((token) => {
                    Cookies.set("firebase_token", token, { expires: 7 });
                });
                navigate("/");
            })
            .catch((error) => {
                const errorCode = error.code;
                let errorMessage = "";
                switch (errorCode) {
                    case "auth/user-not-found":
                        errorMessage = "Email not found.";
                        break;
                    case "auth/wrong-password":
                        errorMessage = "Invalid password.";
                        break;
                    default:
                        errorMessage = "An error occurred.";
                }
                setError(errorMessage); 
            });
    };

    return (
        <section className="flex flex-col space-y-4 w-5/12 bg-zinc-600 rounded-xl p-6">
            <h1 className="text-center text-xl font-bold">Login</h1>
            {error && (
                <div className="text-red-500">{error}</div>
            )}
            <form onSubmit={onLogin} className="flex flex-col space-y-6">
                <div className="flex flex-col space-y-2">
                    <label htmlFor="email-address">Email Address</label>
                    <input
                        className="border-zinc-800 border rounded-xl bg-zinc-900 focus:border-sky-400 caret-sky-400 py-2.5 px-4 outline-0"
                        type="email"
                        label="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email address"
                        required
                    />
                </div>

                <div className="flex flex-col space-y-2">
                    <label htmlFor="password">Create Password</label>
                    <input
                        className="border-zinc-800 border rounded-xl bg-zinc-900 focus:border-sky-400 caret-sky-400 py-2.5 px-4 outline-0"
                        type="password"
                        label="Create Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                </div>

                <button type="submit" className="py-2 px-4 rounded-xl font-semibold bg-sky-400 hover:bg-sky-600">
                    Login
                </button>
            </form>

            <p>
                No account yet?{' '}
                <NavLink to="/signup" className="text-sky-400 hover:underline">
                    Sign Up
                </NavLink>
            </p>
        </section>
    );
};

export default Login;
