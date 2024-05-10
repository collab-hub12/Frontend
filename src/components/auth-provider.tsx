"use client";
import { createContext, useContext, useState, useEffect } from "react";
import api from "@/utilities/axios";

type ProviderProps = {
  children: React.ReactNode;
};

export enum Role {
  ORG_ADMIN = "ORG_ADMIN",
  TEAM_ADMIN = "TEAM_ADMIN",
  ROOM_ADMIN = "ROOM_ADMIN",
}

type User = {
  id: number;
  name: string;
  email: string;
  picture: string;
  roles?: Role[];
};

type ThemeProviderState = {
  isAuth: boolean;
  user?: User;
  isLoading: boolean;
};

const AuthContext = createContext<ThemeProviderState>({} as ThemeProviderState);

export const AuthProvider = ({ children, ...props }: ProviderProps) => {
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      try {
        const { data } = await api.get("/users");
        setUser(data);
      } catch {}
      setIsLoading(false);
    };
    getSession();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth: !!user, user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
