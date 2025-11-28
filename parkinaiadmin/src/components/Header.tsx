import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/header.css";
import "../css/mobile-responsive.css";

const Header: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [username, setUsername] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const updateUserState = () => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const user = JSON.parse(userData);
        setUsername(user.username || "");
        setRole(user.role || "");
        setIsLoggedIn(true);
      } catch {
        setIsLoggedIn(false);
        setUsername("");
        setRole("");
      }
    } else {
      setIsLoggedIn(false);
      setUsername("");
      setRole("");
    }
  };

  useEffect(() => {
    updateUserState();
  }, [location]);

  // Listen for storage changes (when logged out in another tab/window)
  useEffect(() => {
    globalThis.addEventListener("storage", updateUserState);
    return () => globalThis.removeEventListener("storage", updateUserState);
  }, []);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Scroll to top whenever location changes
  useEffect(() => {
    // Small delay to ensure page is fully rendered
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const targetHref = e.currentTarget.getAttribute("href");

    // Close mobile menu when navigation link is clicked
    setIsMobileMenuOpen(false);

    // Always scroll to top when clicking navigation links
    window.scrollTo({ top: 0, behavior: "smooth" });

    // For same page navigation, prevent default to avoid unnecessary re-render
    if (location.pathname === targetHref) {
      e.preventDefault();
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <header className="theme-header">
      <div className="container">
        <div className="header-wrap">
          <div className="logo">
            <Link aria-label="Parkin" to="/">
              <img
                src="/logoparkin.png"
                alt="Parkin Logo"
                className="logo-img"
              />
            </Link>
            {/* Desktop Navigation */}
            <nav className="header-nav desktop-nav">
              <Link to="/" className="header-nav-link" onClick={handleNavClick}>
                Home
              </Link>
              <Link
                to="/investor"
                className="header-nav-link"
                onClick={handleNavClick}
              >
                Investor
              </Link>
              <Link
                to="/individuals"
                className="header-nav-link"
                onClick={handleNavClick}
              >
                Individuals
              </Link>
              <Link
                to="/about"
                className="header-nav-link"
                onClick={handleNavClick}
              >
                More
              </Link>
            </nav>
          </div>

          <div className="menu-section">
            {/* Desktop Login Button / User Info */}
            {isLoggedIn ? (
              <div className="header-user-info">
                <span className="header-username">{username}</span>
                {role && <span className="header-role">({role})</span>}
              </div>
            ) : (
              <Link
                to="/login"
                onClick={handleNavClick}
                className="desktop-login"
              >
                <button className="header-login-btn">Login</button>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="mobile-menu-toggle"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              <span className={`hamburger ${isMobileMenuOpen ? "open" : ""}`}>
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <nav className={`mobile-nav ${isMobileMenuOpen ? "open" : ""}`}>
          <Link to="/" className="mobile-nav-link" onClick={handleNavClick}>
            Home
          </Link>
          <Link
            to="/investor"
            className="mobile-nav-link"
            onClick={handleNavClick}
          >
            Investor
          </Link>
          <Link
            to="/individuals"
            className="mobile-nav-link"
            onClick={handleNavClick}
          >
            Individuals
          </Link>
          <Link
            to="/about"
            className="mobile-nav-link"
            onClick={handleNavClick}
          >
            More
          </Link>
          {!isLoggedIn && (
            <Link
              to="/login"
              className="mobile-nav-link mobile-login"
              onClick={handleNavClick}
            >
              Login
            </Link>
          )}
          {isLoggedIn && (
            <div className="mobile-user-info">
              <span className="mobile-username">{username}</span>
              {role && <span className="mobile-role">({role})</span>}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
