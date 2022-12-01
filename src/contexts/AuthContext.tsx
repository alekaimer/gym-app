import React, { useMemo, createContext, useState } from "react";
import { api } from "@services/api";
import axios, { AxiosError } from "axios";

interface UserProps {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface AuthContextProps {
  loading: boolean;
  user: UserProps;
  signInApi: (email: string) => Promise<{
    error: boolean;
    message?: string;
    data?: UserProps;
  }>;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserProps>({} as UserProps);

  async function signInApi(email: string) {
    setLoading(true);
    try {
      const response = await api.get("/users");
      const foundUser = response.data.find(
        (user: { email: string }) => user.email === email
      );
      if (foundUser) {
        setUser(foundUser);
      } else {
        throw new Error("Usuário não encontrado");
      }
      return {
        error: false,
        data: foundUser,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          error: true,
          message: error.response?.data,
        };
      }
      console.log('> error', error);
      return {
        error: true,
        message: error.message,
      };
    } finally {
      setLoading(false);
    }
  }

  const value = useMemo(() => {
    return {
      loading,
      user,
      signInApi,
    };
  }, [loading, user, signInApi]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
