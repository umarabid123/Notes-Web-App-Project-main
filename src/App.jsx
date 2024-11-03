// src/App.jsx
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Home from "./pages/home/Home";
import NotesPage from "./pages/notesPage/NotesPage";
import ProfilePage from "./pages/profilePage/profilePage";
import NotFound from "./pages/notFound/NotFound";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Navbar from "./../src/components/shared/NavBar";
import { initializeAuthListener } from "./store/slices/userSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer/Footer";
import TermsAndServices from "./pages/termsCondition/Terms";
import PrivacyPolicy from "./pages/privacy/Privacy";
import AboutUs from "./pages/about/About";

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.userInfo !== null);
  const loadingUser = useSelector((state) => state.user.loading);

  useEffect(() => {
    console.log("Initializing Firebase Auth Listener...");
    dispatch(initializeAuthListener());
  }, [dispatch]);

  return (
    <Router>
      {isAuthenticated && <Navbar />}
      <div className="">
        <Routes>
          <Route
            path="/"
            element={!loadingUser && (isAuthenticated ? <Home /> : <Navigate to="/login" />)}
          />
          <Route
            path="/notes"
            element={!loadingUser && (isAuthenticated ? <NotesPage /> : <Navigate to="/login" />)}
          />
          <Route
            path="/profile"
            element={!loadingUser && (isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />)}
          />
          <Route
            path="/login"
            element={!loadingUser && (!isAuthenticated ? <Login /> : <Navigate to="/" />)}
          />
          <Route
            path="/register"
            element={!loadingUser && (!isAuthenticated ? <Register /> : <Navigate to="/" />)}
          />
          <Route path="*" element={<NotFound />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsAndServices />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <ToastContainer />
      {isAuthenticated && <Footer />}
    </Router>
  );
}

export default App;
