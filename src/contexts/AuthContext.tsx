import { createContext, useState } from "react";

interface UserProps {
  name: string;
  avatarUrl: string;
}

export interface AuthContextProps {
  user: UserProps;
  signInWithGoogle: () => Promise<void>;
}


interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({
    name: "John Doe",
    avatarUrl: "https://github.com/alekaimer.png",
  });

  async function signInWithGoogle() {
    console.log("Sign in with Google");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
