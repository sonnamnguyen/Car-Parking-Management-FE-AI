export interface LoginRequest {
  account: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user_id: number;
  username: string;
  role: string;
  wallet_balance: number;
}
