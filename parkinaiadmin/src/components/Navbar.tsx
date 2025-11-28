import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const location = useLocation();
  return (
    <nav
      style={{ background: "#1976d2", padding: "12px 0", textAlign: "center" }}
    >
      <Link
        to="/login"
        style={{
          color: location.pathname === "/login" ? "#fff" : "#cfd8dc",
          margin: "0 20px",
          textDecoration: "none",
          fontWeight: "bold",
          fontSize: 18,
        }}
      >
        Đăng nhập
      </Link>
      <Link
        to="/register"
        style={{
          color: location.pathname === "/register" ? "#fff" : "#cfd8dc",
          margin: "0 20px",
          textDecoration: "none",
          fontWeight: "bold",
          fontSize: 18,
        }}
      >
        Đăng ký
      </Link>
      <Link
        to="/about"
        style={{
          color: location.pathname === "/about" ? "#fff" : "#cfd8dc",
          margin: "0 20px",
          textDecoration: "none",
          fontWeight: "bold",
          fontSize: 18,
        }}
      >
        Giới thiệu
      </Link>
    </nav>
  );
};

export default Navbar;
