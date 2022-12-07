import { createContext, useContext } from "react";
import type { ReactNode } from "react";

interface AuthContext {
  user: User | null;
}

const AuthContext = createContext<AuthContext>({
  user: null,
});

interface AuthProviderProps {
  user: User | null;
  children: ReactNode;
}

export default function AuthProvider(props: AuthProviderProps) {
  return (
    <AuthContext.Provider value={{ user: props.user }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
