// src/components/auth/Login.jsx
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/slices/userSlice";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log("Login Attempt - Email:", email, "Password:", password ? "[PROVIDED]" : "[NOT PROVIDED]");

    if (!email || !password) {
      console.log("Email or password missing.");
      return;
    }

    try {
      // Directly dispatch loginUser to handle login
      await dispatch(loginUser(email, password));
      navigate("/"); // Redirect to home on success
    } catch (error) {
      console.error("Login error:", error.message);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-teal-400 to-teal-600">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-teal-700">Login Here</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button 
              type="submit" 
              className="bg-teal-600 text-white py-2 px-4 rounded w-full hover:bg-teal-700 transition duration-200"
          >
              Login
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          New user?{" "}
          <Link to="/register" className="text-teal-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
