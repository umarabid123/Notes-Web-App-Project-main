// src/components/shared/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"; // Assuming you're using Redux for state management
import { logoutUser } from "../../store/slices/userSlice"; // Adjust the import based on your Redux setup

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Dispatch logout action
    dispatch(logoutUser());
    
    // Optionally, you may want to clear any local storage items or authentication tokens here

    // Redirect to login page after logout
    navigate("/login");
  };

  return (
    <nav className="bg-teal-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold transition-transform duration-300 transform hover:scale-105">
          <Link to="/">Notes Web App</Link>
        </h1>
        <div className="space-x-4">
          <Link to="/" className="hover:underline hover:text-teal-300 transition duration-200">
            Home
          </Link>
          <Link to="/notes" className="hover:underline hover:text-teal-300 transition duration-200">
            Notes
          </Link>
          <Link to="/about" className="hover:underline hover:text-teal-300 transition duration-200">
            About Us
          </Link>
          <Link to="/terms" className="hover:underline hover:text-teal-300 transition duration-200">
            Terms and Services
          </Link>
          <Link to="/privacy" className="hover:underline hover:text-teal-300 transition duration-200">
            Privacy Policy
          </Link>
          <button 
            onClick={handleLogout} 
            className="hover:underline bg-white p-2 rounded-lg text-teal-800 transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
