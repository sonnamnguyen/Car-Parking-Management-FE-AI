import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import { LoginRequest } from "../types/auth";
import "../css/login.css";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data: LoginRequest = { account, password };
      const res = await login(data);
      // Lưu thông tin user và token vào localStorage
      localStorage.setItem("user", JSON.stringify(res));
      localStorage.setItem("token", res.access_token);
      setTimeout(() => {
        navigate("/home");
      }, 500);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <img src="/loginanh.jpg" alt="Parkin Logo" className="login-logo" />
      </div>
      <div className="login-right">
        <div className="login-form-container">
          <div className="login-title">Admin Login</div>
          <div className="login-divider">
            <div className="login-divider-line" />
            <div className="login-divider-or">Or</div>
            <div className="login-divider-line" />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="login-label">Username</div>
            <input
              type="text"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              required
              className="login-input"
              placeholder="Type in your username"
            />
            <div className="login-row">
              <div className="login-label">Password</div>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="login-input"
              placeholder="Enter password"
            />
            <div className="login-row">
              <label className="login-remember">
                <input type="checkbox" /> Remember Me
              </label>
              <a className="login-link" href="/login">
                Forgot Password?
              </a>
            </div>
            <button type="submit" disabled={loading} className="login-button">
              {loading ? "Logging in..." : "Continue"}
            </button>
            {error && <div className="login-error">{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
