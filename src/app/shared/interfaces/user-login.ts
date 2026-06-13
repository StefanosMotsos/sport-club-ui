export interface LoggedInUser {
  sub: string;
  role: string;
  exp: number;
}

export interface AuthRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}
