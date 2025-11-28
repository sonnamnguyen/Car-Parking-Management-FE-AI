export interface RegisterRequest {
  username: string;
  password: string;
  full_name: string;
  email: string;
  phone: string;
  gender: string;
  birth_date: string;
  avatar_url: string;
}

export interface RegisterResponse {
  user_id: number;
  username: string;
  email: string;
  message?: string;
}
