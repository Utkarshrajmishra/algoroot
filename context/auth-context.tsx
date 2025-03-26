"use client";

import { uid } from "uid";
import { createContext, useState } from "react";

type User = {
  id: string;
  email: string;
  name: string;
  password: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (
    email: string,
    password: string
  ) => { success: boolean; message: string };
  signUp: (
    email: string,
    password: string,
    name: string
  ) => { success: boolean; message: string };
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  const login = (email: string, password: string) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user") || "[]");
    const foundUser = user.find((u: User) => u.email === email);
    if (!foundUser || foundUser.password !== password) {
      setLoading(false);
      return { success: false, message: "Invalid email or password" };
    }
    setLoading(true);
    setUser(foundUser);
    return { success: true, message: "Login successfull" };
  };

  const signUp = (email: string, password: string, name: string) => {
    setLoading(true);
    if (!email || !password || !name) {
      setLoading(false);
      return { success: false, message: "All fields are required!" };
    }

    const user = JSON.parse(localStorage.getItem("user") || "[]");

    if (user.find((u: User) => u.email === email)) {
      setLoading(false);
      return { success: false, message: "Email already registered!" };
    }

    user.push({
      id: uid(),
      name: name,
      email: email,
      password: password,
    });
    localStorage.setItem("user", JSON.stringify(user))
    setLoading(false);
          return { success: true, message: "Registered successfully" };

  };

  const logout=()=>{
    setUser(null)
  }

  return(
    <AuthContext.Provider value={{user, isLoading, signUp, login, logout }}>
        {children}
    </AuthContext.Provider>
  )
};
