// src/components/auth/Register.jsx
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signupUser } from "../../store/slices/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email || !password || !displayName) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      await dispatch(signupUser(email, password, displayName));
      navigate("/"); // Redirect to home or another page after registration
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-teal-400 to-teal-600">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-teal-700">Create Your Account</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Display Name"
            className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
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
              Register
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-teal-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
