"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

export interface User {
  id?: string;
  email: string;
  name: string;
  photoURL?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password?: string, redirectPath?: string) => Promise<boolean>;
  loginWithGithub: (redirectPath?: string) => Promise<void>;
  register: (name: string, email: string, photoURL: string, password?: string, redirectPath?: string) => Promise<boolean>;
  logout: () => void;
  updateUserProfile: (name: string, photoURL?: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  const syncUserWithBackend = async (userData: { email: string; name?: string; photoURL?: string }) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/jwt`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
      });
      const data = await res.json();
      if (res.ok && data.token) {
        setToken(data.token);
        localStorage.setItem("uprise_token", data.token);
        return data.token;
      }
    } catch (err) {
      console.warn("Backend JWT sync fallback:", err);
    }
    return null;
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        try {
          const session = await authClient.getSession();
          if (session?.data?.user) {
            const bUser = session.data.user;
            const appUser: User = {
              id: bUser.id,
              email: bUser.email,
              name: bUser.name || bUser.email.split("@")[0],
              photoURL: bUser.image || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(bUser.name || bUser.email)}`
            };
            setUser(appUser);
            localStorage.setItem("uprise_user", JSON.stringify(appUser));
            await syncUserWithBackend(appUser);
            setIsLoading(false);
            return;
          }
        } catch (bErr) {
          console.warn("BetterAuth getSession check:", bErr);
        }

        const storedUser = localStorage.getItem("uprise_user");
        const storedToken = localStorage.getItem("uprise_token");

        if (storedUser && storedToken) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setToken(storedToken);

          try {
            const res = await fetch(`${API_BASE_URL}/auth/me`, {
              headers: { Authorization: `Bearer ${storedToken}` }
            });
            if (res.ok) {
              const data = await res.json();
              if (data.user) {
                setUser(data.user);
                localStorage.setItem("uprise_user", JSON.stringify(data.user));
              }
            } else if (res.status === 401 || res.status === 403) {
              localStorage.removeItem("uprise_user");
              localStorage.removeItem("uprise_token");
              setUser(null);
              setToken(null);
            }
          } catch {
            console.warn("Backend auth verification unreachable, keeping stored session.");
          }
        }
      } catch (e) {
        console.error("Failed to parse stored auth session:", e);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password = "", redirectPath = "/") => {
    try {
      setIsLoading(true);

      const res = await authClient.signIn.email({
        email: email.trim().toLowerCase(),
        password
      });

      if (res.error) {
        throw new Error(res.error.message || "Invalid email or password. Please check your credentials or register first.");
      }

      if (!res.data?.user) {
        throw new Error("No account found with this email. Please register first!");
      }

      const bUser = res.data.user;
      const authenticatedUser: User = {
        id: bUser.id,
        email: bUser.email,
        name: bUser.name || bUser.email.split("@")[0],
        photoURL: bUser.image || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(bUser.name || bUser.email)}`
      };

      const jwtToken = await syncUserWithBackend(authenticatedUser);

      setUser(authenticatedUser);
      localStorage.setItem("uprise_user", JSON.stringify(authenticatedUser));
      if (jwtToken) {
        setToken(jwtToken);
      }

      toast.success(`Welcome back, ${authenticatedUser.name}!`);
      router.push(redirectPath);
      return true;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Invalid credentials. Please register first.";
      toast.error(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGithub = async (redirectPath = "/") => {
    try {
      setIsLoading(true);
      const callbackURL = typeof window !== "undefined"
        ? (redirectPath.startsWith("http") ? redirectPath : `${window.location.origin}${redirectPath}`)
        : "http://localhost:3000";

      await authClient.signIn.social({
        provider: "github",
        callbackURL
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "GitHub sign in failed";
      toast.error(message);
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, photoURL: string, password = "", redirectPath = "/") => {
    try {
      setIsLoading(true);

      const avatar = photoURL.trim() || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name.trim())}`;

      const res = await authClient.signUp.email({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        image: avatar
      });

      if (res.error) {
        throw new Error(res.error.message || "Registration failed. An account with this email may already exist.");
      }

      if (!res.data?.user) {
        throw new Error("Failed to create account. Please try again.");
      }

      const bUser = res.data.user;
      const newUser: User = {
        id: bUser.id,
        email: bUser.email,
        name: bUser.name || name.trim(),
        photoURL: bUser.image || avatar
      };

      const jwtToken = await syncUserWithBackend(newUser);

      setUser(newUser);
      localStorage.setItem("uprise_user", JSON.stringify(newUser));
      if (jwtToken) {
        setToken(jwtToken);
      }

      toast.success(`Account created successfully! Welcome to UpRaise, ${newUser.name}.`);
      router.push(redirectPath);
      return true;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Registration failed";
      toast.error(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authClient.signOut();
    } catch (e) {
      console.warn("BetterAuth signOut notice:", e);
    }
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, { method: "POST" });
    } catch {
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem("uprise_user");
      localStorage.removeItem("uprise_token");
      toast.info("You have been signed out.");
      router.push("/");
    }
  };

  const updateUserProfile = async (name: string, photoURL?: string) => {
    if (!token && !user) return false;
    try {
      const updated: User = {
        ...user,
        email: user?.email || "",
        name: name || user?.name || "",
        photoURL: photoURL || user?.photoURL
      };

      setUser(updated);
      localStorage.setItem("uprise_user", JSON.stringify(updated));

      await syncUserWithBackend(updated);

      toast.success("Profile updated successfully!");
      return true;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Profile update failed";
      toast.error(message);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        loginWithGithub,
        register,
        logout,
        updateUserProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
