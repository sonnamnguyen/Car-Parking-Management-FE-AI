import { LoginRequest, LoginResponse } from "../types/auth";

// API Base URL - sử dụng environment variable hoặc fallback
const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  process.env.REACT_APP_DEV_API_URL ||
  "https://newparkai-production.up.railway.app/backend/parkin/v1";

export async function login(data: LoginRequest): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Đăng nhập thất bại");
  return response.json();
}
