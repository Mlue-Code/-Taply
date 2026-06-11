"use client";

import { useEffect, useState } from "react";
import type { User } from "@/types/api.types";

const storageKey = "taply-user";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const raw = window.localStorage.getItem(storageKey);
    if (raw) {
      setUser(JSON.parse(raw) as User);
    }
    setIsLoading(false);
  }, []);

  const login = (nextUser: User) => {
    setUser(nextUser);
    window.localStorage.setItem(storageKey, JSON.stringify(nextUser));
  };

  const logout = () => {
    setUser(null);
    window.localStorage.removeItem(storageKey);
  };

  return {
    user,
    isAuthenticated: Boolean(user),
    isLoading,
    login,
    logout,
  };
}
