import React, { useMemo, createContext, useState, useEffect } from "react";
import { api } from "@services/api";
import { UserDTO } from "@dtos/UserDTO";
import {
  storageUserRemove,
  storageUserGet,
  storageUserSave,
} from "@storage/storageUser";
import {
  storageAuthTokenGet,
  storageAuthTokenRemove,
  storageAuthTokenSave,
} from "@storage/storageAuthToken";

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

  async function userAndTokenUpdate(user: UserDTO, token: string) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser(user);
  }

  async function storageUserAndTokenSave(user: UserDTO, token: string) {
    try {
      setIsLoadingUserStorage(true);

      await storageUserSave(user);
      await storageAuthTokenSave(token);
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorage(false);
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post("/sessions", { email, password });
      if (data.user && data.token) {
        await storageUserAndTokenSave(data.user, data.token)

        userAndTokenUpdate(data.user, data.token);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorage(false);
    }
  }

  async function loadUserData() {
    try {
      setIsLoadingUserStorage(true);

      const userLogged = await storageUserGet();
      const token = await storageAuthTokenGet();

      if (userLogged && token) {
        userAndTokenUpdate(userLogged, token);
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
      await storageAuthTokenRemove();
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
