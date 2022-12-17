import React, { useMemo, createContext, useState, useEffect } from "react";
import { api } from "@services/api";
import { UserDTO } from "@dtos/UserDTO";
import {
  storageUserRemove,
  storageUserGet,
  storageUserSave,
} from "@storage/storageUser";

export interface AuthContextProps {
  user: UserDTO;
  signIn(email: string, password: string): Promise<void>;
  signOut(): Promise<void>;
  isLoadingUserStorage: boolean;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [isLoadingUserStorage, setIsLoadingUserStorage] = useState(true);
  const [user, setUser] = useState<UserDTO>({} as UserDTO);

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post("/sessions", { email, password });
      if (data.user) {
        setUser(data.user);
        storageUserSave(data.user);
      }
    } catch (error) {
      throw error;
    }
  }

  async function loadUserData() {
    try {
      const user = await storageUserGet();
      if (user) {
        setUser(user);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorage(false);
    }
  }

  async function signOut() {
    try {
      setIsLoadingUserStorage(true);
      setUser({} as UserDTO);
      await storageUserRemove();
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorage(false);
    }
  }

  useEffect(() => {
    loadUserData();
  }, []);

  const value = useMemo(() => {
    return {
      user,
      signIn,
      signOut,
      isLoadingUserStorage,
    };
  }, [user, signIn, signOut, isLoadingUserStorage]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
