export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface AuthStore {
  users: User[];
  currentUser: User | null;
  isAuthenticated: boolean;
}

export type SignUpData = Pick<User, 'username' | 'email' | 'password'>;
export type SignInData = Pick<User, 'email' | 'password'>;

export interface AuthResponse {
  success: boolean;
  message?: string;
}
