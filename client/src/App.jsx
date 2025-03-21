import React, { useContext } from "react";
import Result from "./pages/Result";
import Home from "./pages/Home";
import BuyCredit from "./pages/BuyCredit";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import { AppContext } from "./context/AppContext";
import { ToastContainer } from "react-toastify";

export default function App() {
  const { showLogin, token } = useContext(AppContext);
  return (
    <div className="px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-orange-50">
      <ToastContainer position="bottom-right" />
      <Navbar />
      {showLogin && <Login />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/result"
          element={token ? <Result /> : <Navigate to="/" />}
        />
        <Route path="/buy-credit" element={<BuyCredit />} />
      </Routes>
      <Footer />
    </div>
  );
}
