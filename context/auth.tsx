import { createContext, useContext } from "react";
import type { ReactNode } from "react";

const AuthContext = createContext({});

interface AuthProviderProps {
  user: {
    id: string;
  } | null;
  children: ReactNode;
}

export default function AuthProvider(props: AuthProviderProps) {
  return (
    <AuthContext.Provider value={{ user: props.user }}>
      {props.children};
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
