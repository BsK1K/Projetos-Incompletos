export interface JwtPayload {
  userId: string;
  email: string;
}

export interface UserWithoutPassword {
  id: string;
  email: string;
  name: string | null;
  createdAt: Date;
}

export interface RegisterInput {
  email: string;
  password: string;
  name?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthResult {
  user: UserWithoutPassword;
  token: string;
}
