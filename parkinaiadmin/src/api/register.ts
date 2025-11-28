import { RegisterRequest, RegisterResponse } from "../types/register";

export async function register(
  data: RegisterRequest
): Promise<RegisterResponse> {
  const response = await fetch(
    "https://newparkai-production.up.railway.app/backend/parkin/v1/register",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  if (!response.ok) throw new Error("Đăng ký thất bại");
  return response.json();
}
