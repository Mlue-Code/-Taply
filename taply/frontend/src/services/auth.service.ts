import type { AuthCredentials, AuthResult, User } from "@/types/api.types";

const demoUser: User = {
  id: "user_1",
  name: "Taply User",
  email: "user@taply.dev",
};

export async function login(
  credentials: AuthCredentials,
): Promise<AuthResult> {
  return {
    token: "demo-token",
    user: {
      ...demoUser,
      email: credentials.email,
    },
  };
}

export async function register(
  credentials: AuthCredentials & { name: string },
): Promise<AuthResult> {
  return {
    token: "demo-token",
    user: {
      id: "user_new",
      name: credentials.name,
      email: credentials.email,
    },
  };
}

export async function logout(): Promise<void> {
  return;
}
