export async function logout(
  access_token: string
): Promise<{ message: string }> {
  const response = await fetch(
    "https://newparkai-production.up.railway.app/backend/parkin/v1/logout",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  if (!response.ok) throw new Error("Logout thất bại");
  return response.json();
}
