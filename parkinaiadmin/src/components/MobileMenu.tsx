import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/mobile-menu.css";

const MobileMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const menuItems = [
    { path: "/", label: "Home" },
    { path: "/investor", label: "Investor" },
    { path: "/individuals", label: "Individuals" },
    { path: "/about", label: "About Us" },
    { path: "/login", label: "Login" },
  ];

  return (
    <div className="mobile-menu">
      {/* Hamburger Button */}
      <button
        className={`hamburger ${isOpen ? "active" : ""}`}
        onClick={toggleMenu}
        aria-label="Toggle mobile menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Mobile Menu Overlay */}
      <div
        className={`mobile-menu-overlay ${isOpen ? "active" : ""}`}
        onClick={closeMenu}
      ></div>

      {/* Mobile Menu Content */}
      <nav className={`mobile-menu-content ${isOpen ? "active" : ""}`}>
        <div className="mobile-menu-header">
          <img
            src="/logoparkin.png"
            alt="Parkin Logo"
            className="mobile-logo"
          />
          <button
            className="close-btn"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            ×
          </button>
        </div>

        <ul className="mobile-menu-list">
          {menuItems.map((item) => (
            <li key={item.path} className="mobile-menu-item">
              <Link
                to={item.path}
                className={`mobile-menu-link ${
                  location.pathname === item.path ? "active" : ""
                }`}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default MobileMenu;
