import React, { useState } from "react";
import { register } from "../api/register";
import { RegisterRequest, RegisterResponse } from "../types/register";
import "../css/register.css";

const Register: React.FC = () => {
  const [form, setForm] = useState<RegisterRequest>({
    username: "",
    password: "",
    full_name: "",
    email: "",
    phone: "",
    gender: "",
    birth_date: "",
    avatar_url: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(null);
    try {
      const res: RegisterResponse = await register(form);
      setSuccess(res.message || "Đăng ký thành công!");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Đăng ký tài khoản Parkin AI</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(form).map((key) => (
          <div className="register-form-group" key={key}>
            <label>{key.replace(/_/g, " ")}: </label>
            <input
              type={key === "password" ? "password" : "text"}
              name={key}
              value={(form as any)[key]}
              onChange={handleChange}
              required={key !== "avatar_url"}
              className="register-input"
            />
          </div>
        ))}
        <button type="submit" disabled={loading} className="register-btn">
          {loading ? "Đang đăng ký..." : "Đăng ký"}
        </button>
        {error && <div className="register-error">{error}</div>}
        {success && <div className="register-success">{success}</div>}
      </form>
    </div>
  );
};

export default Register;
