"use client";

import { uid } from "uid";
import { createContext, useContext, useState } from "react";

export type User = {
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
  deleteAccount: (id: string) => { success: boolean; message: string };
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
  login: () => ({ success: false, message: "Function not initialized" }),
  signUp: () => ({ success: false, message: "Function not initialized" }),
  logout: () => {},
  deleteAccount: (id: string) => ({
    success: false,
    message: "Function not initialized",
  }),
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  const login = (email: string, password: string) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user") || "[]");
    const foundUser = user.find((u: User) => u.email === email);
    if (!foundUser || foundUser.password !== password) {
      setLoading(false);
      return { success: false, message: "Invalid email or password", id: "" };
    }
    setLoading(true);
    setUser(foundUser);
    return { success: true, message: "Login successfull", id: foundUser.id };
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
    localStorage.setItem("user", JSON.stringify(user));
    setLoading(false);
    return { success: true, message: "Registered successfully" };
  };

  const logout = () => {
    setUser(null);
  };

  const deleteAccount = (id: string | undefined) => {
    console.log(id)
    if(!id) return { success: false, message: "Invalid user id" };
    const user = JSON.parse(localStorage.getItem("user") || "[]");

    const userIndex = user.findIndex((u: User) => u.id === id);
    console.log(userIndex)
    if(userIndex==null) return {success:false, message:'Invalid user id'}
    //deleting user
    user.splice(userIndex,1);
        localStorage.setItem("user", JSON.stringify(user));
        setUser(null)
        return {success:true, message:'Account deleted successfully!'}


  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signUp, login, logout, deleteAccount }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
