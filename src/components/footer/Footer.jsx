// src/components/Footer.jsx

import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-teal-600 text-white py-6">
      <div className="container mx-auto text-center">
        <div className="mb-4">
          <Link to="/about" className="hover:underline mx-4">About Us</Link>
          <Link to="/contact" className="hover:underline mx-4">Contact</Link>
          <Link to="/privacy" className="hover:underline mx-4">Privacy Policy</Link>
          <Link to="/terms" className="hover:underline mx-4">Terms of Service</Link>
        </div>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} YourAppName. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
