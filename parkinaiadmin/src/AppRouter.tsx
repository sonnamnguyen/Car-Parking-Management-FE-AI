import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
// import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Register from "./components/Register";
import Home from "./components/Home";
import AboutUs from "./components/AboutUs";
import Homepage from "./components/Homepage";
import Investor from "./components/Investor";
import Individual from "./components/Individual";

const AppRouter: React.FC = () => (
  <Router>
    <Header />
    {/* <Navbar /> */}
    <div style={{ minHeight: "80vh" }}>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/investor" element={<Investor />} />
        <Route path="/individuals" element={<Individual />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
    <Footer />
  </Router>
);

export default AppRouter;
